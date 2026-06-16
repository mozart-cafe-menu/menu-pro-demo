/* ============================================================
   Vercel Function — FCM + Email attente + Auto-création client
   B1 : email d'attente immédiat
   Auto : création compte restaurant + emailLivraisonProgramme (now+2h)
   → Email livraison envoyé par cron-auto.js après 2h (B2)
============================================================ */

const https      = require('https');
const nodemailer = require('nodemailer');
const crypto     = require('crypto');

const MAIN_DB    = 'https://menu-saas-platform-default-rtdb.europe-west1.firebasedatabase.app';
const CONTROL_DB = 'https://menu-pro-control-default-rtdb.europe-west1.firebasedatabase.app';
const ADMIN_URL  = 'https://menu-saas-platform.vercel.app/admin.html';
const APK_URL    = 'https://github.com/Cafe-elysee/menu-saas-platform/releases/download/apk-serveur-v1/MenuProServeur-SaaS-v1.0.apk';

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
    const timer = setTimeout(() => { req.destroy(); reject(new Error('firebase timeout')); }, 7000);
    req.on('close', () => clearTimeout(timer));
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
    const timer = setTimeout(() => { req.destroy(); reject(new Error('timeout')); }, 6000);
    req.on('close', () => clearTimeout(timer));
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
  return '<table' + dir + ' width="100%" cellpadding="0" cellspacing="0" bgcolor="#f2ece0" background="https://menu-saas-platform.vercel.app/assets/gn-bg-light.jpg" style="background-color:#f2ece0;background-image:url(\'https://menu-saas-platform.vercel.app/assets/gn-bg-light.jpg\');background-size:cover;background-position:center;background-repeat:no-repeat">'
    + '<tr><td align="center" background="https://menu-saas-platform.vercel.app/assets/gn-bg-light.jpg" style="padding:16px 8px;background-image:url(\'https://menu-saas-platform.vercel.app/assets/gn-bg-light.jpg\');background-size:cover;background-position:center">'
    + '<table width="580" cellpadding="0" cellspacing="0" bgcolor="#ffffff" style="max-width:580px;width:100%;background-color:#ffffff;font-family:\'Segoe UI\',Arial,sans-serif">'
    + '<tr><td bgcolor="#ffffff" align="center" style="background-color:#ffffff;padding:26px 32px;border-bottom:1px solid #ead9b8">'
    + '<img src="https://menu-saas-platform.vercel.app/assets/gn-logo-light.png" alt="GeNext" width="140" height="147" style="display:block;margin:0 auto;max-width:140px;border:0">'
    + '<div style="font-size:0.72rem;color:#9a8060;letter-spacing:0.12em;text-transform:uppercase;margin-top:8px">' + t.sub + '</div>'
    + '</td></tr>'
    + '<tr><td bgcolor="#ffffff" style="background-color:#ffffff;padding:28px 32px">'
    + '<h2 style="margin:0 0 12px;font-size:1.15rem;color:#c8a44e">' + t.gr + '</h2>'
    + '<p style="color:#2a1f10;line-height:1.7;margin-bottom:20px;font-size:0.92rem">' + t.p1 + ' <strong style="color:#c8a44e">' + escHtml(r) + '</strong>.<br>' + t.p2 + ' <strong style="color:#c8a44e">' + escHtml(f) + '</strong> (' + escHtml(m) + ').</p>'
    + '<table width="100%" cellpadding="0" cellspacing="0" bgcolor="#fdf9f2" style="background-color:#fdf9f2;border:1px solid #e8dfc8;border-left:3px solid #c8a44e;border-radius:0 8px 8px 0;margin-bottom:20px"><tr><td style="padding:14px 18px;font-size:0.88rem;color:#2a1f10;line-height:1.6">' + t.box + '</td></tr></table>'
    + '<p style="color:#9a8060;font-size:0.83rem;line-height:1.6;margin:0">' + t.contact + '</p>'
    + '</td></tr>'
    + '<tr><td bgcolor="#f2ece0" align="center" style="background-color:#f2ece0;padding:14px 32px;border-top:1px solid #ead9b8">'
    + '<span style="font-size:0.75rem;color:#9a8060">' + t.ft + '</span>'
    + '</td></tr>'
    + '</table>'
    + '</td></tr>'
    + '</table>';
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
    fr: { sub:'Menus digitaux &amp; Commandes', gr:'Bonjour,', intro:'Votre espace <strong style="color:#c8a44e">' + safeName + '</strong> est prêt !', sub2:'Connectez-vous à votre tableau de bord pour personnaliser votre menu.', lid:'Identifiant (ID restaurant)', lpwd:'Mot de passe', btn:'🔑 Accéder au tableau de bord', apkT:'Application serveur', apkS:'Téléchargez cette application pour que votre personnel puisse recevoir les commandes.', apkBtn:'📱 Télécharger l\'application serveur', trial:'⏱ Vous bénéficiez de <strong style="color:#c8a44e">7 jours d\'essai gratuit</strong> à partir de votre première connexion.', contact:'N\'hésitez pas à nous répondre si vous avez des questions.', ft:'GeNext · Menus digitaux pour cafés et restaurants' },
    en: { sub:'Digital menus &amp; Orders', gr:'Hello,', intro:'Your space <strong style="color:#c8a44e">' + safeName + '</strong> is ready!', sub2:'Log in to your dashboard to customize your menu.', lid:'Restaurant ID', lpwd:'Password', btn:'🔑 Access dashboard', apkT:'Server application', apkS:'Download this app so your staff can receive orders.', apkBtn:'📱 Download server app', trial:'⏱ You have a <strong style="color:#c8a44e">7-day free trial</strong> starting from your first login.', contact:'Feel free to reply if you have any questions.', ft:'GeNext · Digital menus for cafés and restaurants' },
    el: { sub:'Ψηφιακά μενού &amp; Παραγγελίες', gr:'Γεια σας,', intro:'Ο χώρος σας <strong style="color:#c8a44e">' + safeName + '</strong> είναι έτοιμος!', sub2:'Συνδεθείτε στον πίνακα ελέγχου για να προσαρμόσετε το μενού σας.', lid:'Αναγνωριστικό εστιατορίου', lpwd:'Κωδικός', btn:'🔑 Πρόσβαση στον πίνακα ελέγχου', apkT:'Εφαρμογή σερβιτόρων', apkS:'Κατεβάστε αυτή την εφαρμογή για να λαμβάνει παραγγελίες το προσωπικό σας.', apkBtn:'📱 Λήψη εφαρμογής', trial:'⏱ Έχετε <strong style="color:#c8a44e">7 ημέρες δωρεάν δοκιμή</strong> από την πρώτη σύνδεσή σας.', contact:'Μη διστάσετε να μας απαντήσετε αν έχετε ερωτήσεις.', ft:'GeNext · Ψηφιακά μενού για καφέ και εστιατόρια' },
    ar: { sub:'قوائم رقمية وطلبات', gr:'مرحباً،', intro:'مساحتك <strong style="color:#c8a44e">' + safeName + '</strong> جاهزة!', sub2:'سجّل الدخول إلى لوحة التحكم لتخصيص قائمتك.', lid:'معرّف المطعم', lpwd:'كلمة المرور', btn:'🔑 الوصول إلى لوحة التحكم', apkT:'تطبيق النادلين', apkS:'نزّل هذا التطبيق ليستقبل موظفوك الطلبات.', apkBtn:'📱 تنزيل التطبيق', trial:'⏱ لديك <strong style="color:#c8a44e">7 أيام تجريبية مجانية</strong> من أول تسجيل دخول.', contact:'لا تتردد في الرد على هذا البريد إذا كان لديك أي سؤال.', ft:'GeNext · قوائم رقمية للمقاهي والمطاعم', rtl:true },
    de: { sub:'Digitale Speisekarten &amp; Bestellungen', gr:'Hallo,', intro:'Ihr Bereich <strong style="color:#c8a44e">' + safeName + '</strong> ist bereit!', sub2:'Melden Sie sich in Ihrem Dashboard an, um Ihre Speisekarte anzupassen.', lid:'Restaurant-ID', lpwd:'Passwort', btn:'🔑 Dashboard aufrufen', apkT:'Server-App', apkS:'Lassen Sie Ihr Personal diese App herunterladen, um Bestellungen zu erhalten.', apkBtn:'📱 Server-App herunterladen', trial:'⏱ Sie haben eine <strong style="color:#c8a44e">7-tägige kostenlose Testphase</strong> ab Ihrer ersten Anmeldung.', contact:'Antworten Sie auf diese E-Mail, wenn Sie Fragen haben.', ft:'GeNext · Digitale Speisekarten für Cafés und Restaurants' }
  };
  const t = T[lang] || T.fr;
  const dir = t.rtl ? ' dir="rtl"' : '';
  return '<table' + dir + ' width="100%" cellpadding="0" cellspacing="0" bgcolor="#f2ece0" background="https://menu-saas-platform.vercel.app/assets/gn-bg-light.jpg" style="background-color:#f2ece0;background-image:url(\'https://menu-saas-platform.vercel.app/assets/gn-bg-light.jpg\');background-size:cover;background-position:center;background-repeat:no-repeat">'
    + '<tr><td align="center" background="https://menu-saas-platform.vercel.app/assets/gn-bg-light.jpg" style="padding:16px 8px;background-image:url(\'https://menu-saas-platform.vercel.app/assets/gn-bg-light.jpg\');background-size:cover;background-position:center">'
    + '<table width="580" cellpadding="0" cellspacing="0" bgcolor="#ffffff" style="max-width:580px;width:100%;background-color:#ffffff;font-family:\'Segoe UI\',Arial,sans-serif">'
    + '<tr><td bgcolor="#ffffff" align="center" style="background-color:#ffffff;padding:26px 32px;border-bottom:1px solid #ead9b8">'
    + '<img src="https://menu-saas-platform.vercel.app/assets/gn-logo-light.png" alt="GeNext" width="140" height="147" style="display:block;margin:0 auto;max-width:140px;border:0">'
    + '<div style="font-size:0.72rem;color:#9a8060;letter-spacing:0.12em;text-transform:uppercase;margin-top:8px">' + t.sub + '</div>'
    + '</td></tr>'
    + '<tr><td bgcolor="#ffffff" style="background-color:#ffffff;padding:28px 32px">'
    + '<h2 style="margin:0 0 8px;font-size:1.15rem;color:#c8a44e">' + t.gr + '</h2>'
    + '<p style="color:#2a1f10;line-height:1.7;margin-bottom:20px;font-size:0.92rem">' + t.intro + '<br>' + t.sub2 + '</p>'
    + '<table width="100%" cellpadding="0" cellspacing="0" bgcolor="#f8f4ec" style="background-color:#f8f4ec;border:1px solid #e8dfc8;border-radius:10px;margin-bottom:20px">'
    + '<tr><td bgcolor="#f8f4ec" style="background-color:#f8f4ec;padding:16px 20px 10px">'
    + '<span style="display:block;font-size:0.65rem;color:#9a8060;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:6px">' + t.lid + '</span>'
    + '<span style="display:block;font-family:Courier,monospace;font-size:1rem;color:#c8a44e;font-weight:700;background-color:#ffffff;border:1px solid #e0d4b8;padding:6px 12px;border-radius:6px;letter-spacing:0.06em">' + escHtml(rid) + '</span>'
    + '</td></tr>'
    + '<tr><td bgcolor="#f8f4ec" style="background-color:#f8f4ec;padding:10px 20px 16px;border-top:1px solid #e8dfc8">'
    + '<span style="display:block;font-size:0.65rem;color:#9a8060;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:6px">' + t.lpwd + '</span>'
    + '<span style="display:block;font-family:Courier,monospace;font-size:1rem;color:#2a1f10;font-weight:700;background-color:#ffffff;border:1px solid #e0d4b8;padding:6px 12px;border-radius:6px;letter-spacing:0.06em">' + escHtml(pwd) + '</span>'
    + '</td></tr></table>'
    + '<table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:20px"><tr><td align="center" style="text-align:center">'
    + '<a href="' + ADMIN_URL + '" style="display:inline-block;background-color:#c8a44e;color:#0c0a08;text-decoration:none;padding:13px 28px;border-radius:10px;font-weight:700;font-size:0.95rem">' + t.btn + '</a>'
    + '</td></tr></table>'
    + (isCS ? '<table width="100%" cellpadding="0" cellspacing="0" bgcolor="#f8f4ec" style="background-color:#f8f4ec;border:1px solid #e8dfc8;border-radius:10px;margin-bottom:20px">'
    + '<tr><td bgcolor="#f8f4ec" style="background-color:#f8f4ec;padding:16px 20px">'
    + '<p style="margin:0 0 4px;font-weight:700;color:#2a1f10;font-size:0.92rem">' + t.apkT + '</p>'
    + '<p style="margin:0 0 12px;color:#6b5a3a;font-size:0.85rem">' + t.apkS + '</p>'
    + '<table width="100%" cellpadding="0" cellspacing="0"><tr><td align="center"><a href="' + APK_URL + '" style="display:inline-block;background-color:#2a5ab8;color:#fff;text-decoration:none;padding:11px 22px;border-radius:10px;font-weight:700;font-size:0.88rem">' + t.apkBtn + '</a></td></tr></table>'
    + '</td></tr></table>' : '')
    + '<table width="100%" cellpadding="0" cellspacing="0" bgcolor="#fdf9f2" style="background-color:#fdf9f2;border:1px solid #e8dfc8;border-left:3px solid #c8a44e;border-radius:0 8px 8px 0;margin-bottom:20px">'
    + '<tr><td bgcolor="#fdf9f2" style="background-color:#fdf9f2;padding:12px 16px;font-size:0.88rem;color:#2a1f10;line-height:1.6">' + t.trial + '</td></tr></table>'
    + '<p style="color:#9a8060;font-size:0.83rem;line-height:1.6;margin:0">' + t.contact + '</p>'
    + '</td></tr>'
    + '<tr><td bgcolor="#f2ece0" align="center" style="background-color:#f2ece0;padding:14px 32px;border-top:1px solid #ead9b8">'
    + '<span style="font-size:0.75rem;color:#9a8060">' + t.ft + '</span>'
    + '</td></tr>'
    + '</table>'
    + '</td></tr>'
    + '</table>';
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
      emailLivraisonProgramme: ts + 2 * 60 * 60 * 1000,
      emailData: { email, rid, pwd, name: restaurant, forfait: forfaitType, lang, paymentMode }
    });
  }

  return { rid, pwd, isCS };
}

// ── Handler principal ────────────────────────────────────────────────────────
module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
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
          replyTo: process.env.GMAIL_USER,
          to:      email,
          subject: tpl.subject(rest),
          html:    tpl.html(rest, plan.split(' — ')[0] || 'GeNext', modeLabel),
          text:    rest + ' — Demande reçue\n\nNous avons bien reçu votre demande.\nForfait : ' + (plan.split(' — ')[0] || '') + ' (' + modeLabel + ')\n\nVous recevrez vos identifiants dans les 24 heures.\n\nGeNext — gennextcontact@gmail.com',
          headers: { 'List-Unsubscribe': '<mailto:' + process.env.GMAIL_USER + '?subject=unsubscribe>' }
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

    res.status(200).json({ ...(fcmResult.body || { sent: 0 }), created: created ? { rid: created.rid } : null });

  } catch(err) {
    console.error('Error:', err.message);
    res.status(500).json({ error: err.message });
  }
};
