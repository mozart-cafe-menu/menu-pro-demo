'use strict';

const nodemailer = require('nodemailer');

const DRIVE_SCRIPT_URL    = process.env.DRIVE_SCRIPT_URL;
const DRIVE_SCRIPT_SECRET = process.env.DRIVE_SCRIPT_SECRET;
const MAIN_DB             = 'https://menu-saas-platform-default-rtdb.europe-west1.firebasedatabase.app';
const MAX_FILES        = 20;
const MAX_BASE64_BYTES = 4 * 1024 * 1024;
// Garde-fou côté serveur (défense en profondeur) : le client répartit déjà les
// fichiers en lots sous ce seuil avant d'envoyer (voir _CMD_BATCH_MAX_B64 dans
// demo-page/index.html) pour rester sous la limite de corps de requête d'une
// fonction Vercel (~4.5 Mo) — cette vérification protège contre un client
// modifié/bugué qui enverrait un lot trop volumineux d'un coup. Fixé au-dessus
// de MAX_BASE64_BYTES pour ne jamais rejeter un lot légitime ne contenant
// qu'un seul fichier proche de la limite par fichier (ex: un PDF de 3 Mo).
const MAX_TOTAL_BASE64_BYTES = 4.3 * 1024 * 1024;

// Échappement HTML — restaurantName/fileNames viennent du client (formulaire
// public ou noms de fichiers choisis par l'utilisateur) et sont insérés dans
// l'email HTML envoyé à Malek. Même pattern que escHtml() dans notify-commande.js.
function escHtml(s) {
  return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

// Ajoute "_Oui"/"_Non" à la fin du nom de fichier (avant l'extension) selon que
// le client a coché vouloir de l'aide photo — visible directement dans Drive
// (si configuré) et dans le nom de la pièce jointe email, sans avoir à ouvrir
// chaque fichier ni l'email en entier.
function _appendPhotoSuffix(name, wantsPhotoHelp) {
  const suffix = wantsPhotoHelp ? '_Oui' : '_Non';
  const dot = name.lastIndexOf('.');
  return dot > 0 ? name.slice(0, dot) + suffix + name.slice(dot) : name + suffix;
}

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

// Marque le restaurant comme ayant reçu des fichiers menu à traiter — lu par
// admin.html pour décider d'afficher l'overlay "menu en cours de création"
// (Fix #222) : un client qui n'a RIEN envoyé n'a pas besoin d'attendre 24h et
// accède immédiatement à son admin pour configurer son menu lui-même.
//
// Fix #226 : cette écriture DOIT être attendue (await) par l'appelant avant de
// répondre. Vérifié en production (2026-07-05) : appelée en fire-and-forget
// (sans await), la requête HTTPS vers Firebase n'aboutissait JAMAIS — la
// fonction serverless Vercel se termine dès que la réponse est envoyée, ce qui
// tue la connexion sortante encore en vol. Résultat : `menuFilesPending` ne
// s'écrivait jamais, silencieusement, dans 100% des cas.
function markMenuFilesPending(rid) {
  const secret = process.env.FIREBASE_MAIN_SECRET;
  if (!secret) return Promise.resolve();
  const https = require('https');
  const url   = new URL(MAIN_DB + '/restaurants/' + rid + '/profile/menuFilesPending.json?auth=' + secret);
  const body  = 'true';
  return new Promise((resolve) => {
    const req = https.request(
      { hostname: url.hostname, path: url.pathname + url.search, method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(body) } },
      res => { res.on('data', () => {}); res.on('end', resolve); }
    );
    req.on('error', () => resolve());
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

// Fix #226 : les fichiers sont désormais joints DIRECTEMENT à l'email en pièce
// jointe (Buffer décodé depuis le base64 déjà reçu) — canal fiable qui ne
// dépend plus du script Google Drive (optionnel, voir plus bas). Avant ce fix,
// l'email entier n'était envoyé QUE si DRIVE_SCRIPT_URL/SECRET étaient
// configurés sur ce projet Vercel — ils ne l'étaient pas (confirmé en
// production), donc aucun email n'était jamais envoyé, quel que soit l'upload.
async function sendNotifEmail(rid, restaurantName, folderName, fileNames, wantsPhotoHelp, attachFiles, batchIndex, batchTotal, driveOk) {
  if (!process.env.GMAIL_USER || !process.env.GMAIL_PASS) return;
  const adminEmail   = process.env.ADMIN_EMAIL || 'gennextcontact@gmail.com';
  const photoHelpTxt = wantsPhotoHelp ? 'Oui' : 'Non';
  const isMultiBatch = batchTotal > 1;
  const batchTxt     = isMultiBatch ? ` — Lot ${batchIndex + 1}/${batchTotal}` : '';
  const list = fileNames.map(n => `<li style="margin:3px 0">${escHtml(n)}</li>`).join('');
  const driveLine = driveOk
    ? `<p style="margin:0 0 8px"><strong>Dossier Drive :</strong> <code style="font-size:0.82rem">${escHtml(folderName)}</code></p>`
    : '';
  const html = `
<table width="100%" cellpadding="0" cellspacing="0" bgcolor="#f2ece0" style="background-color:#f2ece0">
<tr><td align="center" style="padding:16px 8px">
<table width="540" cellpadding="0" cellspacing="0" bgcolor="#ffffff" style="max-width:540px;width:100%;background:#fff;font-family:'Segoe UI',Arial,sans-serif;border-radius:12px;overflow:hidden">
<tr><td bgcolor="#ffffff" style="padding:24px 28px;border-bottom:1px solid #ead9b8">
  <span style="font-size:1.1rem;font-weight:700;color:#c8a44e">📋 Nouveau menu client${escHtml(batchTxt)}</span>
</td></tr>
<tr><td bgcolor="#ffffff" style="padding:20px 28px;font-size:0.9rem;color:#2a1f10;line-height:1.8">
  <p style="margin:0 0 8px"><strong>Restaurant :</strong> ${escHtml(restaurantName || rid)}</p>
  <p style="margin:0 0 8px"><strong>ID :</strong> <code style="background:#f8f4ec;padding:2px 7px;border-radius:4px;color:#c8a44e">${escHtml(rid)}</code></p>
  ${driveLine}
  <p style="margin:0 0 8px"><strong>Photos demandées (aide de notre équipe) :</strong> <span style="color:${wantsPhotoHelp ? '#2e7d4f' : '#c04040'};font-weight:700">${photoHelpTxt}</span></p>
  <p style="margin:12px 0 4px"><strong>Fichiers reçus (en pièce jointe) :</strong></p>
  <ul style="margin:0;padding-left:20px;color:#4a3728">${list}</ul>
  ${isMultiBatch ? `<p style="margin:12px 0 0;font-size:0.8rem;color:#9a8060">Envoi volumineux réparti en ${batchTotal} emails — celui-ci est le lot ${batchIndex + 1}.</p>` : ''}
</td></tr>
<tr><td bgcolor="#f2ece0" style="padding:12px 28px;font-size:0.78rem;color:#9a8060;border-top:1px solid #ead9b8">
  GeNext · Menu PDF reçu
</td></tr>
</table>
</td></tr></table>`;

  await getTransport().sendMail({
    from:    `"GeNext" <${process.env.GMAIL_USER}>`,
    to:      adminEmail,
    subject: `📋 Menu reçu — ${restaurantName || rid} (${rid})${batchTxt}`,
    html,
    text:    `Menu reçu de ${restaurantName || rid} (${rid})${batchTxt}\nPhotos demandées : ${photoHelpTxt}\nFichiers (en pièce jointe) : ${fileNames.join(', ')}`,
    attachments: attachFiles.map(f => ({
      filename:    f.name,
      content:     Buffer.from(f.base64, 'base64'),
      contentType: f.mimeType || 'application/octet-stream'
    }))
  });
}

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { rid, restaurantName, files, batchIndex, batchTotal, wantsPhotoHelp: wantsPhotoHelpRaw } = req.body || {};
  const wantsPhotoHelp = wantsPhotoHelpRaw === true;
  const bIdx  = Number.isInteger(batchIndex) ? batchIndex : 0;
  const bTot  = Number.isInteger(batchTotal) && batchTotal > 0 ? batchTotal : 1;

  if (!rid || typeof rid !== 'string' || !/^[a-zA-Z0-9_-]{4,60}$/.test(rid)) {
    return res.status(400).json({ error: 'Invalid rid' });
  }
  if (!Array.isArray(files) || files.length === 0 || files.length > MAX_FILES) {
    return res.status(400).json({ error: 'Invalid files array' });
  }
  let totalBytes = 0;
  for (const f of files) {
    if (!f || typeof f.name !== 'string' || typeof f.base64 !== 'string') {
      return res.status(400).json({ error: 'Invalid file object' });
    }
    if (f.base64.length > MAX_BASE64_BYTES) {
      return res.status(400).json({ error: 'File too large' });
    }
    totalBytes += f.base64.length;
  }
  if (totalBytes > MAX_TOTAL_BASE64_BYTES) {
    return res.status(400).json({ error: 'Batch too large' });
  }

  // Fix #226 : DOIT être attendu — voir commentaire sur markMenuFilesPending().
  await markMenuFilesPending(rid);

  const now         = new Date();
  const dateStr     = now.toISOString().slice(0, 10);
  const folderName  = rid + '_' + dateStr;
  const namedFiles  = files.map(f => ({ ...f, name: _appendPhotoSuffix(f.name, wantsPhotoHelp) }));
  const fileNames   = namedFiles.map(f => f.name);

  // Google Drive : couche optionnelle en plus de l'email (dégradation gracieuse
  // si DRIVE_SCRIPT_URL/SECRET absents de ce projet Vercel — même pattern que
  // client/api/logo-notify.js). Ne bloque jamais l'email, qui est désormais le
  // canal garanti (fichiers en pièce jointe).
  let driveResult = null;
  if (DRIVE_SCRIPT_URL && DRIVE_SCRIPT_SECRET) {
    try {
      driveResult = await httpsPost(DRIVE_SCRIPT_URL, {
        secret:     DRIVE_SCRIPT_SECRET,
        action:     'saveMenuFiles',
        folderName: folderName,
        files:      namedFiles.map(f => ({ name: f.name, mimeType: f.mimeType || 'application/octet-stream', base64: f.base64 }))
      });
    } catch (err) {
      console.error('menu-upload Drive error:', err.message);
    }
  } else {
    console.log('⚠ menu-upload: DRIVE_SCRIPT_URL/SECRET manquants sur ce projet — fichiers envoyés par email uniquement');
  }

  try {
    await sendNotifEmail(rid, restaurantName, folderName, fileNames, wantsPhotoHelp, namedFiles, bIdx, bTot, !!driveResult);
  } catch (err) {
    console.error('menu-upload email error:', err.message);
  }

  return res.status(200).json({ ok: true, folderName, drive: driveResult, driveConfigured: !!(DRIVE_SCRIPT_URL && DRIVE_SCRIPT_SECRET) });
};
