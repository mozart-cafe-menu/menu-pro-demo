'use strict';

const DRIVE_SCRIPT_URL    = process.env.DRIVE_SCRIPT_URL;
const DRIVE_SCRIPT_SECRET = process.env.DRIVE_SCRIPT_SECRET;
const MAX_FILES = 5;
const MAX_BASE64_BYTES = 4 * 1024 * 1024; // 4 MB base64 safety cap per file

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
  const dateStr    = now.toISOString().slice(0, 10); // YYYY-MM-DD
  const folderName = rid + '_' + dateStr;

  try {
    const result = await httpsPost(DRIVE_SCRIPT_URL, {
      secret:     DRIVE_SCRIPT_SECRET,
      action:     'saveMenuFiles',
      folderName: folderName,
      files:      files.map(f => ({ name: f.name, mimeType: f.mimeType || 'application/octet-stream', base64: f.base64 }))
    });
    return res.status(200).json({ ok: true, folderName, drive: result });
  } catch (err) {
    console.error('menu-upload Drive error:', err.message);
    return res.status(200).json({ ok: true, driveError: err.message });
  }
};
