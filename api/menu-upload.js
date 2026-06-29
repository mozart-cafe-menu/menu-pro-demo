'use strict';

const nodemailer = require('nodemailer');

const DRIVE_SCRIPT_URL    = process.env.DRIVE_SCRIPT_URL;
const DRIVE_SCRIPT_SECRET = process.env.DRIVE_SCRIPT_SECRET;
const MAX_FILES        = 5;
const MAX_BASE64_BYTES = 4 * 1024 * 1024;

function httpsPost(url, payload) {
  const https = require('https');
  const body  = JSON.stringify(payload);
  return new Promise((resolve, reject) => {
    const u    = new URL(url);
    const opts = { hostname: u.hostname, path: u.pathname + u.search, method: 'POST',
                   headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(body) } };
    const req  = https.request(opts, res => {
      let d = '';
      res.on('data', c => d += c);
      res.on('end', () => { try { resolve(JSON.parse(d)); } catch(e) { resolve({ ok: false, raw: d }); } });
    });
    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

function getTransport() {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: { user: process.env.GMAIL_USER, pass: process.env.GMAIL_PASS }
  });
}

async function sendNotifEmail(rid, restaurantName, folderName, fileNames) {
  if (!process.env.GMAIL_USER || !process.env.GMAIL_PASS) return;
  const adminEmail = process.env.ADMIN_EMAIL || 'gennextcontact@gmail.com';
  const list = fileNames.map(n => `<li style="margin:3px 0">${n}</li>`).join('');
  const html = `
<table width="100%" cellpadding="0" cellspacing="0" bgcolor="#f2ece0" style="background-color:#f2ece0">
<tr><td align="center" style="padding:16px 8px">
<table width="540" cellpadding="0" cellspacing="0" bgcolor="#ffffff" style="max-width:540px;width:100%;background:#fff;font-family:'Segoe UI',Arial,sans-serif;border-radius:12px;overflow:hidden">
<tr><td bgcolor="#ffffff" style="padding:24px 28px;border-bottom:1px solid #ead9b8">
  <span style="font-size:1.1rem;font-weight:700;color:#c8a44e">📋 Nouveau menu client</span>
</td></tr>
<tr><td bgcolor="#ffffff" style="padding:20px 28px;font-size:0.9rem;color:#2a1f10;line-height:1.8">
  <p style="margin:0 0 8px"><strong>Restaurant :</strong> ${restaurantName || rid}</p>
  <p style="margin:0 0 8px"><strong>ID :</strong> <code style="background:#f8f4ec;padding:2px 7px;border-radius:4px;color:#c8a44e">${rid}</code></p>
  <p style="margin:0 0 8px"><strong>Dossier Drive :</strong> <code style="font-size:0.82rem">${folderName}</code></p>
  <p style="margin:12px 0 4px"><strong>Fichiers reçus :</strong></p>
  <ul style="margin:0;padding-left:20px;color:#4a3728">${list}</ul>
</td></tr>
<tr><td bgcolor="#f2ece0" style="padding:12px 28px;font-size:0.78rem;color:#9a8060;border-top:1px solid #ead9b8">
  GeNext · Menu PDF reçu
</td></tr>
</table>
</td></tr></table>`;

  await getTransport().sendMail({
    from:    `"GeNext" <${process.env.GMAIL_USER}>`,
    to:      adminEmail,
    subject: `📋 Menu reçu — ${restaurantName || rid} (${rid})`,
    html,
    text:    `Menu reçu de ${restaurantName || rid} (${rid})\nDossier : ${folderName}\nFichiers : ${fileNames.join(', ')}`
  });
}

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { rid, restaurantName, files } = req.body || {};

  if (!rid || typeof rid !== 'string' || !/^[a-zA-Z0-9_-]{4,60}$/.test(rid)) {
    return res.status(400).json({ error: 'Invalid rid' });
  }
  if (!Array.isArray(files) || files.length === 0 || files.length > MAX_FILES) {
    return res.status(400).json({ error: 'Invalid files array' });
  }
  for (const f of files) {
    if (!f || typeof f.name !== 'string' || typeof f.base64 !== 'string') {
      return res.status(400).json({ error: 'Invalid file object' });
    }
    if (f.base64.length > MAX_BASE64_BYTES) {
      return res.status(400).json({ error: 'File too large' });
    }
  }

  if (!DRIVE_SCRIPT_URL || !DRIVE_SCRIPT_SECRET) {
    console.log('⚠ menu-upload: DRIVE_SCRIPT_URL/SECRET manquants — upload ignoré');
    return res.status(200).json({ ok: true, skipped: true });
  }

  const now        = new Date();
  const dateStr    = now.toISOString().slice(0, 10);
  const folderName = rid + '_' + dateStr;
  const fileNames  = files.map(f => f.name);

  try {
    const result = await httpsPost(DRIVE_SCRIPT_URL, {
      secret:     DRIVE_SCRIPT_SECRET,
      action:     'saveMenuFiles',
      folderName: folderName,
      files:      files.map(f => ({ name: f.name, mimeType: f.mimeType || 'application/octet-stream', base64: f.base64 }))
    });

    // Email notification — fire & forget
    sendNotifEmail(rid, restaurantName, folderName, fileNames).catch(() => {});

    return res.status(200).json({ ok: true, folderName, drive: result });
  } catch (err) {
    console.error('menu-upload Drive error:', err.message);
    return res.status(200).json({ ok: true, driveError: err.message });
  }
};
