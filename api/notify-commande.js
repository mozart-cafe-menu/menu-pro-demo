/* ============================================================
   Vercel Function — FCM + Email attente + Auto-création client
   B1 : email d'attente immédiat
   Auto : création compte restaurant + email livraison immédiat
============================================================ */

const https      = require('https');
const nodemailer = require('nodemailer');
const crypto     = require('crypto');

const MAIN_DB    = 'https://menu-saas-platform-default-rtdb.europe-west1.firebasedatabase.app';
const CONTROL_DB = 'https://menu-pro-control-default-rtdb.europe-west1.firebasedatabase.app';
const ADMIN_URL  = 'https://menu-saas-platform.vercel.app/admin.html';
const APK_URL    = 'https://menu-saas-platform.vercel.app/MenuProServeur-SaaS-v1.0.apk';

// ── Transport Gmail ─────────────────────────────────────────────────────────
function createTransport() {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: { user: process.env.GMAIL_USER, pass: process.env.GMAIL_PASS }
  });
}

// ── SHA-256 ─────────────────────────────────────────────────────────────────
function sha256(str) {
  return crypto.createHash('sha256').update(str).digest('hex');
}

// ── HTML escape (emails) ─────────────────────────────────────────────────────
function escHtml(s) {
  return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

// ── Génération RID (même algo que control-app) ──────────────────────────────
function buildRidTs(name, extra) {
  const words = name.trim()
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .toLowerCase().replace(/[^a-z0-9 ]/g, '').trim()
    .split(/\s+/).filter(w => w.length > 0);
  if (!words.length) return 'r' + Date.now();
  const now = new Date();
  const pad = n => String(n).padStart(2, '0');
  const ts  = pad(now.getHours()) + pad(now.getMinutes()) + pad(now.getSeconds())
            + pad(now.getDate()) + pad(now.getMonth() + 1) + String(now.getFullYear()).slice(-2);
  const prefix = words[0].slice(0, 1 + (extra || 0)) + words.slice(1).map(w => w[0]).join('');
  return prefix + ts;
}

// ── Génération mot de passe (même algo que control-app) ─────────────────────
function buildPwdDefault(name) {
  const words = name.trim()
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .toLowerCase().replace(/[^a-z0-9 ]/g, '').trim()
    .split(/\s+/).filter(w => w.length > 0);
  if (!words.length) return 'pr' + new Date().getFullYear();
  const ini = words.length === 1 ? words[0].slice(0, 2) : words.map(w => w[0]).join('');
  return ini + new Date().getFullYear();
}

// ── Firebase REST ───────────────────────────────────────────────────────────
function fbRequest(db, path, method, secret, body) {
  return new Promise((resolve, reject) => {
    const url     = new URL(db + path + '.json?auth=' + secret);
    const bodyStr = body ? JSON.stringify(body) : null;
    const opts    = { hostname: url.hostname, path: url.pathname + url.search, method, headers: {} };
    if (bodyStr) {
      opts.headers['Content-Type']   = 'application/json';
      opts.headers['Content-Length'] = Buffer.byteLength(bodyStr);
    }
    const req = https.request(opts, res => {
      let data = '';
      res.on('data', d => data += d);
      res.on('end', () => { try { resolve(JSON.parse(data)); } catch(e) { resolve(null); } });
    });
    req.on('error', reject);
    if (bodyStr) req.write(bodyStr);
    req.end();
  });
}
const fbGet   = (db, path, s)       => fbRequest(db, path, 'GET',   s, null);
const fbPut   = (db, path, s, body) => fbRequest(db, path, 'PUT',   s, body);
const fbPatch = (db, path, s, body) => fbRequest(db, path, 'PATCH', s, body);

// ── Helper HTTPS (FCM) ───────────────────────────────────────────────────────
function httpsRequest(url, options, body) {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url);
    const opts   = { hostname: urlObj.hostname, path: urlObj.pathname + urlObj.search, method: options.method || 'POST', headers: options.headers || {} };
    const req    = https.request(opts, res => {
      let data = '';
      res.on('data', d => data += d);
      res.on('end', () => { try { resolve({ status: res.statusCode, body: JSON.parse(data) }); } catch(e) { resolve({ status: res.statusCode, body: data }); } });
    });
    req.on('error', reject);
    if (body) req.write(body);
    req.end();
  });
}

// ════════════════════════════════════════════════════════════════════════════
// TEMPLATES EMAIL ATTENTE (5 langues)
// ════════════════════════════════════════════════════════════════════════════
const WAITING_TPL = {
  fr: {
    subject: r => '✅ Demande reçue — ' + r,
    html:    (r, f, m) => _wHtml(r, f, m, { sub:'Menus digitaux &amp; Commandes', gr:'Bonjour,', p1:'Nous avons bien reçu votre demande pour', p2:'Forfait sélectionné :', box:'⏳ Votre espace est en cours de préparation.<br>Vous recevrez un <strong>email avec vos identifiants de connexion</strong> dans les 24 heures.', contact:'N\'hésitez pas à nous répondre à cet email si vous avez des questions.', ft:'GeNext · Menus digitaux pour cafés et restaurants' })
  },
  en: {
    subject: r => '✅ Request received — ' + r,
    html:    (r, f, m) => _wHtml(r, f, m, { sub:'Digital menus &amp; Orders', gr:'Hello,', p1:'We have received your request for', p2:'Selected plan:', box:'⏳ Your space is being prepared.<br>You will receive an <strong>email with your login credentials</strong> within 24 hours.', contact:'Feel free to reply to this email if you have any questions.', ft:'GeNext · Digital menus for cafés and restaurants' })
  },
  el: {
    subject: r => '✅ Αίτημα παραλήφθηκε — ' + r,
    html:    (r, f, m) => _wHtml(r, f, m, { sub:'Ψηφιακά μενού &amp; Παραγγελίες', gr:'Γεια σας,', p1:'Λάβαμε το αίτημά σας για', p2:'Επιλεγμένο πλάνο:', box:'⏳ Ο χώρος σας προετοιμάζεται.<br>Θα λάβετε <strong>email με τα στοιχεία σύνδεσής σας</strong> εντός 24 ωρών.', contact:'Μη διστάσετε να απαντήσετε σε αυτό το email αν έχετε απορίες.', ft:'GeNext · Ψηφιακά μενού για καφέ και εστιατόρια' })
  },
  ar: {
    subject: r => '✅ تم استلام طلبك — ' + r,
    html:    (r, f, m) => _wHtml(r, f, m, { sub:'قوائم رقمية وطلبات', gr:'مرحباً،', p1:'تلقينا طلبك بخصوص', p2:'الخطة المختارة:', box:'⏳ يتم تحضير مساحتك الآن.<br>ستتلقى <strong>بريداً إلكترونياً ببيانات الدخول</strong> خلال 24 ساعة.', contact:'لا تتردد في الرد على هذا البريد إذا كان لديك أي سؤال.', ft:'GeNext · قوائم رقمية للمقاهي والمطاعم', rtl:true })
  },
  de: {
    subject: r => '✅ Anfrage erhalten — ' + r,
    html:    (r, f, m) => _wHtml(r, f, m, { sub:'Digitale Speisekarten &amp; Bestellungen', gr:'Hallo,', p1:'Wir haben Ihre Anfrage für', p2:'Gewählter Plan:', box:'⏳ Ihr Bereich wird vorbereitet.<br>Sie erhalten eine <strong>E-Mail mit Ihren Zugangsdaten</strong> innerhalb von 24 Stunden.', contact:'Antworten Sie auf diese E-Mail, wenn Sie Fragen haben.', ft:'GeNext · Digitale Speisekarten für Cafés und Restaurants' })
  }
};
function _wHtml(r, f, m, t) {
  const dir = t.rtl ? ' dir="rtl"' : '';
  return '<div' + dir + ' style="font-family:\'Segoe UI\',Arial,sans-serif;max-width:560px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;border:1px solid #e8e0d0">'
    + '<div style="background:linear-gradient(135deg,#1a1510,#2a2018);padding:28px 32px;text-align:center"><div style="font-size:1.7rem;font-weight:700;color:#c8a44e;letter-spacing:0.06em;font-family:Georgia,serif">GeNext</div><div style="font-size:0.8rem;color:rgba(200,164,78,0.6);margin-top:4px;letter-spacing:0.1em;text-transform:uppercase">' + t.sub + '</div></div>'
    + '<div style="padding:32px"><h2 style="margin:0 0 8px;font-size:1.25rem;color:#1a1510">' + t.gr + '</h2>'
    + '<p style="color:#444;line-height:1.7;margin-bottom:20px">' + t.p1 + ' <strong style="color:#1a1510">' + escHtml(r) + '</strong>.<br>' + t.p2 + ' <strong style="color:#c8a44e">' + escHtml(f) + '</strong> (' + escHtml(m) + ').</p>'
    + '<div style="background:#fdf9f0;border-left:3px solid #c8a44e;border-radius:0 8px 8px 0;padding:16px 20px;margin-bottom:24px"><p style="margin:0;color:#5a4a2a;font-size:0.92rem;line-height:1.6">' + t.box + '</p></div>'
    + '<p style="color:#888;font-size:0.85rem;line-height:1.6">' + t.contact + '</p></div>'
    + '<div style="background:#fafafa;border-top:1px solid #eee;padding:16px 32px;text-align:center"><span style="font-size:0.78rem;color:#aaa">' + t.ft + '</span></div></div>';
}

// ════════════════════════════════════════════════════════════════════════════
// TEMPLATES EMAIL LIVRAISON (5 langues)
// ════════════════════════════════════════════════════════════════════════════
const MODE_LABEL = {
  fr: { monthly:'Mensuel',   annual:'Annuel'    },
  en: { monthly:'Monthly',   annual:'Annual'    },
  el: { monthly:'Μηνιαία',   annual:'Ετήσια'    },
  ar: { monthly:'شهري',      annual:'سنوي'      },
  de: { monthly:'Monatlich', annual:'Jährlich'  }
};

function deliverySubject(name, lang) {
  const S = { fr:'🎉 ' + name + ' est prêt ! Voici vos accès GeNext', en:'🎉 ' + name + ' is ready! Here are your GeNext credentials', el:'🎉 ' + name + ' είναι έτοιμος! Οι κωδικοί σας', ar:'🎉 ' + name + ' جاهز! إليك بيانات دخول GeNext', de:'🎉 ' + name + ' ist bereit! Ihre GeNext Zugangsdaten' };
  return S[lang] || S.fr;
}

function deliveryHtml(name, rid, pwd, isCS, lang) {
  const safeName = escHtml(name);
  const T = {
    fr: { sub:'Menus digitaux &amp; Commandes', gr:'Bonjour,', intro:'Votre espace <strong style="color:#1a1510">' + safeName + '</strong> est prêt !', sub2:'Connectez-vous à votre tableau de bord pour personnaliser votre menu.', lid:'Identifiant (ID restaurant)', lpwd:'Mot de passe', btn:'🔑 Accéder au tableau de bord', apkT:'Application serveur', apkS:'Téléchargez cette application pour que votre personnel puisse recevoir les commandes.', apkBtn:'📱 Télécharger l\'application serveur', trial:'⏱ Vous bénéficiez de <strong>7 jours d\'essai gratuit</strong> à partir de votre première connexion.', contact:'N\'hésitez pas à nous répondre si vous avez des questions.', ft:'GeNext · Menus digitaux pour cafés et restaurants' },
    en: { sub:'Digital menus &amp; Orders', gr:'Hello,', intro:'Your space <strong style="color:#1a1510">' + safeName + '</strong> is ready!', sub2:'Log in to your dashboard to customize your menu.', lid:'Restaurant ID', lpwd:'Password', btn:'🔑 Access dashboard', apkT:'Server application', apkS:'Download this app so your staff can receive orders.', apkBtn:'📱 Download server app', trial:'⏱ You have a <strong>7-day free trial</strong> starting from your first login.', contact:'Feel free to reply if you have any questions.', ft:'GeNext · Digital menus for cafés and restaurants' },
    el: { sub:'Ψηφιακά μενού &amp; Παραγγελίες', gr:'Γεια σας,', intro:'Ο χώρος σας <strong style="color:#1a1510">' + safeName + '</strong> είναι έτοιμος!', sub2:'Συνδεθείτε στον πίνακα ελέγχου για να προσαρμόσετε το μενού σας.', lid:'Αναγνωριστικό εστιατορίου', lpwd:'Κωδικός', btn:'🔑 Πρόσβαση στον πίνακα ελέγχου', apkT:'Εφαρμογή σερβιτόρων', apkS:'Κατεβάστε αυτή την εφαρμογή για να λαμβάνει παραγγελίες το προσωπικό σας.', apkBtn:'📱 Λήψη εφαρμογής', trial:'⏱ Έχετε <strong>7 ημέρες δωρεάν δοκιμή</strong> από την πρώτη σύνδεσή σας.', contact:'Μη διστάσετε να μας απαντήσετε αν έχετε ερωτήσεις.', ft:'GeNext · Ψηφιακά μενού για καφέ και εστιατόρια' },
    ar: { sub:'قوائم رقمية وطلبات', gr:'مرحباً،', intro:'مساحتك <strong style="color:#1a1510">' + safeName + '</strong> جاهزة!', sub2:'سجّل الدخول إلى لوحة التحكم لتخصيص قائمتك.', lid:'معرّف المطعم', lpwd:'كلمة المرور', btn:'🔑 الوصول إلى لوحة التحكم', apkT:'تطبيق النادلين', apkS:'نزّل هذا التطبيق ليستقبل موظفوك الطلبات.', apkBtn:'📱 تنزيل التطبيق', trial:'⏱ لديك <strong>7 أيام تجريبية مجانية</strong> من أول تسجيل دخول.', contact:'لا تتردد في الرد على هذا البريد إذا كان لديك أي سؤال.', ft:'GeNext · قوائم رقمية للمقاهي والمطاعم', rtl:true },
    de: { sub:'Digitale Speisekarten &amp; Bestellungen', gr:'Hallo,', intro:'Ihr Bereich <strong style="color:#1a1510">' + safeName + '</strong> ist bereit!', sub2:'Melden Sie sich in Ihrem Dashboard an, um Ihre Speisekarte anzupassen.', lid:'Restaurant-ID', lpwd:'Passwort', btn:'🔑 Dashboard aufrufen', apkT:'Server-App', apkS:'Lassen Sie Ihr Personal diese App herunterladen, um Bestellungen zu erhalten.', apkBtn:'📱 Server-App herunterladen', trial:'⏱ Sie haben eine <strong>7-tägige kostenlose Testphase</strong> ab Ihrer ersten Anmeldung.', contact:'Antworten Sie auf diese E-Mail, wenn Sie Fragen haben.', ft:'GeNext · Digitale Speisekarten für Cafés und Restaurants' }
  };
  const t = T[lang] || T.fr;
  const dir = t.rtl ? ' dir="rtl"' : '';
  return '<div' + dir + ' style="font-family:\'Segoe UI\',Arial,sans-serif;max-width:580px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;border:1px solid #e8e0d0">'
    + '<div style="background:linear-gradient(135deg,#1a1510,#2a2018);padding:28px 32px;text-align:center"><div style="font-size:1.7rem;font-weight:700;color:#c8a44e;letter-spacing:0.06em;font-family:Georgia,serif">GeNext</div><div style="font-size:0.8rem;color:rgba(200,164,78,0.6);margin-top:4px;letter-spacing:0.1em;text-transform:uppercase">' + t.sub + '</div></div>'
    + '<div style="padding:32px">'
    + '<h2 style="margin:0 0 8px;font-size:1.25rem;color:#1a1510">' + t.gr + '</h2>'
    + '<p style="color:#444;line-height:1.7;margin-bottom:20px">' + t.intro + '<br>' + t.sub2 + '</p>'
    + '<div style="background:#fdf9f0;border:1px solid #e8d8a0;border-radius:10px;padding:20px 24px;margin-bottom:20px">'
    + '<div style="margin-bottom:12px"><span style="font-size:0.72rem;color:#888;text-transform:uppercase;letter-spacing:0.08em">' + t.lid + '</span><br><code style="font-size:1rem;color:#1a1510;font-weight:700;background:#fff;padding:4px 10px;border-radius:6px;border:1px solid #e0d0a0">' + rid + '</code></div>'
    + '<div><span style="font-size:0.72rem;color:#888;text-transform:uppercase;letter-spacing:0.08em">' + t.lpwd + '</span><br><code style="font-size:1rem;color:#1a1510;font-weight:700;background:#fff;padding:4px 10px;border-radius:6px;border:1px solid #e0d0a0">' + pwd + '</code></div>'
    + '</div>'
    + '<div style="text-align:center;margin-bottom:20px"><a href="' + ADMIN_URL + '?rid=' + rid + '" style="display:inline-block;background:linear-gradient(135deg,#e2c278,#c8a44e,#9a7a35);color:#1a1510;text-decoration:none;padding:13px 28px;border-radius:10px;font-weight:700;font-size:0.95rem">' + t.btn + '</a></div>'
    + (isCS ? '<div style="background:#f0f4ff;border:1px solid #c8d8f0;border-radius:10px;padding:16px 20px;margin-bottom:20px"><p style="margin:0 0 6px;font-weight:700;color:#1a1510">' + t.apkT + '</p><p style="margin:0 0 12px;color:#555;font-size:0.88rem">' + t.apkS + '</p><div style="text-align:center"><a href="' + APK_URL + '" style="display:inline-block;background:linear-gradient(135deg,#3a6fd8,#2456b8);color:#fff;text-decoration:none;padding:11px 24px;border-radius:10px;font-weight:700;font-size:0.9rem">' + t.apkBtn + '</a></div></div>' : '')
    + '<div style="background:#fdf9f0;border-left:3px solid #c8a44e;border-radius:0 8px 8px 0;padding:14px 18px;margin-bottom:20px"><p style="margin:0;color:#5a4a2a;font-size:0.9rem;line-height:1.6">' + t.trial + '</p></div>'
    + '<p style="color:#888;font-size:0.85rem;line-height:1.6">' + t.contact + '</p>'
    + '</div><div style="background:#fafafa;border-top:1px solid #eee;padding:16px 32px;text-align:center"><span style="font-size:0.78rem;color:#aaa">' + t.ft + '</span></div></div>';
}

// ── Auto-création restaurant ─────────────────────────────────────────────────
async function autoCreateRestaurant(restaurant, forfaitType, paymentMode, email, lang, commandeKey) {
  const mainSecret    = process.env.FIREBASE_MAIN_SECRET;
  const controlSecret = process.env.FIREBASE_CONTROL_SECRET;
  if (!mainSecret || !controlSecret) {
    console.log('⚠ Auto-création ignorée : secrets Firebase manquants');
    return null;
  }

  // Générer RID (avec anti-collision)
  let rid = buildRidTs(restaurant, 0);
  const existing = await fbGet(MAIN_DB, '/restaurants/' + rid, mainSecret);
  if (existing !== null) {
    rid = buildRidTs(restaurant, 1);
    const existing2 = await fbGet(MAIN_DB, '/restaurants/' + rid, mainSecret);
    if (existing2 !== null) {
      console.error('⚠ Collision RID — création ignorée pour:', restaurant);
      return null;
    }
  }

  const pwd  = buildPwdDefault(restaurant);
  const hash = sha256(pwd);
  const ts   = Date.now();
  const isCS = forfaitType === 'commandes-services';
  const price = paymentMode === 'annual'
    ? (isCS ? 990 : 490)
    : (isCS ? 99  : 49);

  // Créer restaurant dans Firebase principal
  await fbPut(MAIN_DB, '/restaurants/' + rid, mainSecret, {
    profile: { name: restaurant, createdAt: ts, langs: ['fr','en','el','de','ar'] },
    config: {
      adminHash: hash,
      adminPwd:  pwd,
      tableCount: 0,
      active: true,
      features: { callBtn: isCS, orderUI: isCS, photos: true, tableSystem: isCS, qrOrdering: isCS, eventOverlay: true },
      retention: { calls: 2592000000, orders: 2592000000 },
      subscription: { forfait: forfaitType, paymentMode, price, email: email || null }
    },
    menu: { menuTheme: 'carte-classique', menuStyle: 'simple' },
    firstOpen: false
  });
  console.log('✅ Restaurant créé:', rid);

  // Mettre à jour la commande avec clientCree
  if (commandeKey) {
    const clientCreeData = { rid, pwd, name: restaurant, forfait: isCS ? 'Commandes & Services' : 'Menu QR' };
    await fbPatch(CONTROL_DB, '/commandes/' + commandeKey, controlSecret, {
      statut: 'en_cours',
      lu: true,
      clientCree: clientCreeData,
      emailLivraisonSent: ts,
      emailData: { email, rid, pwd, name: restaurant, forfait: forfaitType, lang, paymentMode }
    });
  }

  return { rid, pwd, isCS };
}

// ── Handler principal ────────────────────────────────────────────────────────
module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Content-Type', 'application/json');

  if (req.method === 'OPTIONS') { res.status(200).end(); return; }
  if (req.method !== 'POST')    { res.status(405).json({ error: 'Method not allowed' }); return; }

  try {
    const { restaurant, forfait, forfaitType, paymentMode, langue, email, commandeKey, source } = req.body || {};
    if (!restaurant) { res.status(400).json({ error: 'Missing restaurant' }); return; }

    const rest        = String(restaurant).slice(0, 60);
    const safeKey     = commandeKey ? String(commandeKey).replace(/[^a-zA-Z0-9_-]/g, '').slice(0, 40) : null;
    const plan        = forfait ? String(forfait).slice(0, 60) : '';
    const lang        = (langue && WAITING_TPL[langue]) ? langue : 'fr';
    const modeStr     = paymentMode === 'annual' ? ' · Annuel' : ' · Mensuel';
    const bodyText    = plan ? rest + ' · ' + plan.split(' — ')[0] + modeStr : rest + modeStr;
    const isAdminSrc  = String(source || '') === 'admin';

    // ── 1. Notification FCM ─────────────────────────────────────────────────
    const fcmTitle   = isAdminSrc ? '👤 Nouveau client créé' : '🆕 Nouvelle commande';
    const fcmPayload = JSON.stringify({ title: fcmTitle, body: bodyText, type: 'commande' });
    const fcmResult  = await httpsRequest(
      'https://menu-saas-platform.vercel.app/api/notify-control',
      { method: 'POST', headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(fcmPayload) } },
      fcmPayload
    ).catch(e => { console.error('FCM error:', e.message); return { body: { sent: 0 } }; });
    console.log('FCM:', fcmResult.status, JSON.stringify(fcmResult.body));

    // ── 2. Email d'attente (skippé si création admin) ───────────────────────
    if (!isAdminSrc && email && process.env.GMAIL_USER && process.env.GMAIL_PASS) {
      try {
        const tpl       = WAITING_TPL[lang];
        const modes     = MODE_LABEL[lang] || MODE_LABEL.fr;
        const modeLabel = paymentMode === 'annual' ? modes.annual : modes.monthly;
        await createTransport().sendMail({
          from:    '"GeNext" <' + process.env.GMAIL_USER + '>',
          to:      email,
          subject: tpl.subject(rest),
          html:    tpl.html(rest, plan.split(' — ')[0] || 'GeNext', modeLabel)
        });
        console.log('✅ Email attente envoyé à:', email);
      } catch(e) {
        console.error('⚠ Email attente error:', e.message);
      }
    }

    // ── 3. Auto-création restaurant ─────────────────────────────────────────
    let created = null;
    try {
      created = await autoCreateRestaurant(rest, forfaitType || 'menu-qr', paymentMode || 'monthly', email, lang, safeKey);
    } catch(e) {
      console.error('⚠ Auto-création error:', e.message);
    }

    // ── 4. Email livraison immédiat ─────────────────────────────────────────
    if (created && email && process.env.GMAIL_USER && process.env.GMAIL_PASS) {
      try {
        await createTransport().sendMail({
          from:    '"GeNext" <' + process.env.GMAIL_USER + '>',
          to:      email,
          subject: deliverySubject(rest, lang),
          html:    deliveryHtml(rest, created.rid, created.pwd, created.isCS, lang)
        });
        console.log('✅ Email livraison envoyé à:', email, '— RID:', created.rid);
      } catch(e) {
        console.error('⚠ Email livraison error:', e.message);
      }
    }

    res.status(200).json({ ...(fcmResult.body || { sent: 0 }), created: created ? { rid: created.rid } : null });

  } catch(err) {
    console.error('Error:', err.message);
    res.status(500).json({ error: err.message });
  }
};
