/* ============================================================
   Vercel Cron — Email livraison + Rappels paiement
   Déclenché 1x/jour à 08:00 UTC (10h France)
   B2 : email livraison dès que emailLivraisonProgramme <= now
   B3 : rappel paiement 4 jours avant nextReminderAt
   B4 : suspension automatique si nextReminderAt dépassé 3 jours
   B5 : firstOpenAt détecté sans nextReminderAt → initialiser
   BP : appliquer pendingForfaitChange en fin de période
============================================================ */

const nodemailer = require('nodemailer');
const https      = require('https');

function escHtml(s) {
  return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

const CONTROL_DB   = 'https://menu-pro-control-default-rtdb.europe-west1.firebasedatabase.app';
const MAIN_DB      = 'https://menu-saas-platform-default-rtdb.europe-west1.firebasedatabase.app';
const ADMIN_URL    = 'https://menu-saas-platform.vercel.app/admin.html';
const APK_URL      = 'https://menu-saas-platform.vercel.app/MenuProServeur-SaaS-v1.0.apk';
const FOUR_DAYS_MS = 4  * 24 * 60 * 60 * 1000;
const FIVE_DAYS_MS = 5  * 24 * 60 * 60 * 1000;

// ── Transport Gmail ─────────────────────────────────────────────────────────
function createTransport() {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: { user: process.env.GMAIL_USER, pass: process.env.GMAIL_PASS }
  });
}

// ── Firebase REST ───────────────────────────────────────────────────────────
function fbRequest(db, path, method, secret, body) {
  return new Promise((resolve, reject) => {
    const url     = new URL(db + path + '.json?auth=' + secret);
    const bodyStr = body ? JSON.stringify(body) : null;
    const opts    = {
      hostname: url.hostname,
      path:     url.pathname + url.search,
      method,
      headers: {}
    };
    if (bodyStr) {
      opts.headers['Content-Type']   = 'application/json';
      opts.headers['Content-Length'] = Buffer.byteLength(bodyStr);
    }
    const req = https.request(opts, res => {
      let data = '';
      res.on('data', d => data += d);
      res.on('end', () => {
        try { resolve(JSON.parse(data)); } catch(e) { resolve(null); }
      });
    });
    req.on('error', reject);
    if (bodyStr) req.write(bodyStr);
    req.end();
  });
}

const fbGet   = (db, path, secret)       => fbRequest(db, path, 'GET',   secret, null);
const fbPatch = (db, path, secret, body) => fbRequest(db, path, 'PATCH', secret, body);

// ── Prix par défaut ─────────────────────────────────────────────────────────
const PM_MONTHLY = { 'menu-qr': 49, 'commandes-services': 99 };
const PM_ANNUAL  = { 'menu-qr': 490, 'commandes-services': 990 };

// ── Libellés mode paiement ──────────────────────────────────────────────────
const MODE_LABEL = {
  fr: { monthly: 'Mensuel',   annual: 'Annuel'    },
  en: { monthly: 'Monthly',   annual: 'Annual'    },
  el: { monthly: 'Μηνιαία',   annual: 'Ετήσια'    },
  ar: { monthly: 'شهري',      annual: 'سنوي'      },
  de: { monthly: 'Monatlich', annual: 'Jährlich'  }
};

// ── Locale date ─────────────────────────────────────────────────────────────
const DATE_LOCALE = { fr: 'fr-FR', en: 'en-GB', el: 'el-GR', ar: 'ar-MA', de: 'de-DE' };

function fmtDate(ts, lang) {
  return new Date(ts).toLocaleDateString(DATE_LOCALE[lang] || 'fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
}

// ════════════════════════════════════════════════════════════════════════════
// TEMPLATES EMAIL LIVRAISON (5 langues)
// ════════════════════════════════════════════════════════════════════════════

function _headerHtml(subtitle) {
  return '<tr><td bgcolor="#0a0804" align="center" style="background-color:#0a0804;padding:26px 32px;border-bottom:1px solid #2e1e0a">'
    + '<img src="https://menu-saas-platform.vercel.app/assets/gn-logo-dark.png" alt="GeNext" width="160" style="display:block;margin:0 auto;max-width:160px;border:0">'
    + '<div style="font-size:0.7rem;color:#7a6040;letter-spacing:0.12em;text-transform:uppercase;margin-top:10px">' + subtitle + '</div>'
    + '</td></tr>';
}

function _footerHtml(text) {
  return '<tr><td bgcolor="#080604" align="center" style="background-color:#080604;padding:14px 32px;border-top:1px solid #2e1e0a">'
    + '<span style="font-size:0.75rem;color:#5a4a2a">' + text + '</span>'
    + '</td></tr>';
}

function _credentialsCard(labelId, rid, labelPwd, pwd) {
  return '<table width="100%" cellpadding="0" cellspacing="0" bgcolor="#150f08" style="background-color:#150f08;border:1px solid #2e1e0a;border-radius:10px;margin-bottom:20px">'
    + '<tr><td style="padding:16px 20px 10px">'
    + '<span style="display:block;font-size:0.65rem;color:#7a6040;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:6px">' + escHtml(labelId) + '</span>'
    + '<span style="display:block;font-family:Courier,monospace;font-size:1rem;color:#c8a44e;font-weight:700;background-color:#0d0903;padding:6px 12px;border-radius:6px;letter-spacing:0.06em">' + escHtml(rid) + '</span>'
    + '</td></tr>'
    + '<tr><td style="padding:10px 20px 16px;border-top:1px solid #2e1e0a">'
    + '<span style="display:block;font-size:0.65rem;color:#7a6040;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:6px">' + escHtml(labelPwd) + '</span>'
    + '<span style="display:block;font-family:Courier,monospace;font-size:1rem;color:#c8a44e;font-weight:700;background-color:#0d0903;padding:6px 12px;border-radius:6px;letter-spacing:0.06em">' + escHtml(pwd) + '</span>'
    + '</td></tr>'
    + '</table>';
}

function _btnHtml(url, label, color) {
  const bg = color || 'linear-gradient(135deg,#e2c278,#c8a44e,#9a7a35)';
  const fg = color ? '#fff' : '#0a0804';
  return '<a href="' + url + '" style="display:inline-block;background:' + bg + ';color:' + fg + ';text-decoration:none;padding:13px 28px;border-radius:10px;font-weight:700;font-size:0.95rem">' + label + '</a>';
}

function deliveryHtml(rawName, rid, pwd, isCS, lang) {
  const name = escHtml(rawName || '');
  const T = {
    fr: {
      subtitle: 'Menus digitaux &amp; Commandes',
      greeting: 'Bonjour,',
      intro: 'Votre espace <strong style="color:#f0e8c0">' + name + '</strong> est prêt !',
      sub: 'Connectez-vous dès maintenant à votre tableau de bord pour personnaliser votre menu.',
      labelId: 'Identifiant (ID restaurant)',
      labelPwd: 'Mot de passe',
      btnAdmin: '🔑 Accéder au tableau de bord',
      apkTitle: 'Application serveur',
      apkSub: 'Faites télécharger cette application à votre personnel pour recevoir les commandes.',
      btnApk: '📱 Télécharger l\'application serveur',
      trial: '⏱ Vous bénéficiez de <strong style="color:#c8a44e">7 jours d\'essai gratuit</strong> à partir de votre première connexion.',
      contact: 'N\'hésitez pas à nous répondre si vous avez des questions.',
      footer: 'GeNext · Menus digitaux pour cafés et restaurants'
    },
    en: {
      subtitle: 'Digital menus &amp; Orders',
      greeting: 'Hello,',
      intro: 'Your space <strong style="color:#f0e8c0">' + name + '</strong> is ready!',
      sub: 'Log in to your dashboard now to customize your menu.',
      labelId: 'Restaurant ID',
      labelPwd: 'Password',
      btnAdmin: '🔑 Access dashboard',
      apkTitle: 'Server application',
      apkSub: 'Have your staff download this app to receive orders.',
      btnApk: '📱 Download server app',
      trial: '⏱ You have a <strong style="color:#c8a44e">7-day free trial</strong> starting from your first login.',
      contact: 'Feel free to reply to this email if you have any questions.',
      footer: 'GeNext · Digital menus for cafés and restaurants'
    },
    el: {
      subtitle: 'Ψηφιακά μενού &amp; Παραγγελίες',
      greeting: 'Γεια σας,',
      intro: 'Ο χώρος σας <strong style="color:#f0e8c0">' + name + '</strong> είναι έτοιμος!',
      sub: 'Συνδεθείτε στον πίνακα ελέγχου για να προσαρμόσετε το μενού σας.',
      labelId: 'Αναγνωριστικό εστιατορίου',
      labelPwd: 'Κωδικός πρόσβασης',
      btnAdmin: '🔑 Πρόσβαση στον πίνακα ελέγχου',
      apkTitle: 'Εφαρμογή σερβιτόρων',
      apkSub: 'Κάντε το προσωπικό σας να κατεβάσει αυτή την εφαρμογή για να λαμβάνουν παραγγελίες.',
      btnApk: '📱 Λήψη εφαρμογής σερβιτόρων',
      trial: '⏱ Έχετε <strong style="color:#c8a44e">7 ημέρες δωρεάν δοκιμή</strong> από την πρώτη σύνδεσή σας.',
      contact: 'Μη διστάσετε να μας απαντήσετε αν έχετε ερωτήσεις.',
      footer: 'GeNext · Ψηφιακά μενού για καφέ και εστιατόρια'
    },
    ar: {
      subtitle: 'قوائم رقمية وطلبات',
      greeting: 'مرحباً،',
      intro: 'مساحتك <strong style="color:#f0e8c0">' + name + '</strong> جاهزة!',
      sub: 'سجّل الدخول إلى لوحة التحكم لتخصيص قائمتك.',
      labelId: 'معرّف المطعم',
      labelPwd: 'كلمة المرور',
      btnAdmin: '🔑 الوصول إلى لوحة التحكم',
      apkTitle: 'تطبيق النادلين',
      apkSub: 'اطلب من موظفيك تنزيل هذا التطبيق لاستقبال الطلبات.',
      btnApk: '📱 تنزيل تطبيق النادلين',
      trial: '⏱ لديك <strong style="color:#c8a44e">7 أيام تجريبية مجانية</strong> من أول تسجيل دخول.',
      contact: 'لا تتردد في الرد على هذا البريد إذا كان لديك أي سؤال.',
      footer: 'GeNext · قوائم رقمية للمقاهي والمطاعم'
    },
    de: {
      subtitle: 'Digitale Speisekarten &amp; Bestellungen',
      greeting: 'Hallo,',
      intro: 'Ihr Bereich <strong style="color:#f0e8c0">' + name + '</strong> ist bereit!',
      sub: 'Melden Sie sich jetzt in Ihrem Dashboard an, um Ihre Speisekarte anzupassen.',
      labelId: 'Restaurant-ID',
      labelPwd: 'Passwort',
      btnAdmin: '🔑 Dashboard aufrufen',
      apkTitle: 'Server-App',
      apkSub: 'Lassen Sie Ihr Personal diese App herunterladen, um Bestellungen zu erhalten.',
      btnApk: '📱 Server-App herunterladen',
      trial: '⏱ Sie haben eine <strong style="color:#c8a44e">7-tägige kostenlose Testphase</strong> ab Ihrer ersten Anmeldung.',
      contact: 'Antworten Sie auf diese E-Mail, wenn Sie Fragen haben.',
      footer: 'GeNext · Digitale Speisekarten für Cafés und Restaurants'
    }
  };
  const t   = T[lang] || T.fr;
  const dir = lang === 'ar' ? ' dir="rtl"' : '';
  return '<table' + dir + ' width="100%" cellpadding="0" cellspacing="0" bgcolor="#080604" style="background-color:#080604">'
    + '<tr><td align="center" style="padding:16px 8px">'
    + '<table width="580" cellpadding="0" cellspacing="0" bgcolor="#0a0804" style="max-width:580px;width:100%;background-color:#0a0804;font-family:\'Segoe UI\',Arial,sans-serif">'
    + _headerHtml(t.subtitle)
    + '<tr><td bgcolor="#0a0804" style="background-color:#0a0804;padding:28px 32px">'
    + '<h2 style="margin:0 0 12px;font-size:1.15rem;color:#c8a44e">' + t.greeting + '</h2>'
    + '<p style="color:#c8b890;line-height:1.7;margin-bottom:20px;font-size:0.92rem">' + t.intro + '<br>' + t.sub + '</p>'
    + _credentialsCard(t.labelId, rid, t.labelPwd, pwd)
    + '<table width="100%" cellpadding="0" cellspacing="0"><tr><td align="center" style="padding-bottom:20px">'
    + _btnHtml(ADMIN_URL, t.btnAdmin, null)
    + '</td></tr></table>'
    + (isCS
      ? '<table width="100%" cellpadding="0" cellspacing="0" bgcolor="#150f08" style="background-color:#150f08;border:1px solid #2e1e0a;border-radius:10px;margin-bottom:20px"><tr><td style="padding:16px 20px">'
        + '<p style="margin:0 0 6px;font-weight:700;color:#f0e8c0;font-size:0.92rem">' + t.apkTitle + '</p>'
        + '<p style="margin:0 0 14px;color:#c8b890;font-size:0.85rem">' + t.apkSub + '</p>'
        + '<table width="100%" cellpadding="0" cellspacing="0"><tr><td align="center">'
        + _btnHtml(APK_URL, t.btnApk, 'linear-gradient(135deg,#3a6fd8,#2456b8)')
        + '</td></tr></table>'
        + '</td></tr></table>'
      : '')
    + '<table width="100%" cellpadding="0" cellspacing="0" bgcolor="#150f08" style="background-color:#150f08;border:1px solid #2e1e0a;border-left:3px solid #c8a44e;border-radius:0 8px 8px 0;margin-bottom:20px"><tr><td style="padding:12px 16px;font-size:0.88rem;color:#c8b890;line-height:1.6">' + t.trial + '</td></tr></table>'
    + '<p style="color:#7a6040;font-size:0.83rem;line-height:1.6;margin:0">' + t.contact + '</p>'
    + '</td></tr>'
    + _footerHtml(t.footer)
    + '</table>'
    + '</td></tr>'
    + '</table>';
}

// ════════════════════════════════════════════════════════════════════════════
// TEMPLATES EMAIL RAPPEL PAIEMENT (5 langues)
// ════════════════════════════════════════════════════════════════════════════

function reminderHtml(rawName, amount, mode, dateStr, lang) {
  const name = escHtml(rawName || '');
  const T = {
    fr: {
      subtitle: 'Rappel paiement',
      greeting: 'Bonjour,',
      intro: 'Votre abonnement GeNext pour <strong style="color:#f0e8c0">' + name + '</strong> arrive à échéance le <strong style="color:#c8a44e">' + escHtml(dateStr) + '</strong>.',
      amountLabel: 'Montant dû',
      modeLabel: 'Fréquence',
      instructions: 'Pour maintenir votre accès sans interruption, effectuez votre règlement avant cette date.',
      payMethods: 'Virement bancaire ou espèces — nous vous contacterons pour les coordonnées.',
      contact: 'N\'hésitez pas à nous répondre si vous avez des questions.',
      footer: 'GeNext · Menus digitaux pour cafés et restaurants'
    },
    en: {
      subtitle: 'Payment reminder',
      greeting: 'Hello,',
      intro: 'Your GeNext subscription for <strong style="color:#f0e8c0">' + name + '</strong> expires on <strong style="color:#c8a44e">' + escHtml(dateStr) + '</strong>.',
      amountLabel: 'Amount due',
      modeLabel: 'Frequency',
      instructions: 'To maintain uninterrupted access, please make your payment before this date.',
      payMethods: 'Bank transfer or cash — we will contact you with payment details.',
      contact: 'Feel free to reply if you have any questions.',
      footer: 'GeNext · Digital menus for cafés and restaurants'
    },
    el: {
      subtitle: 'Υπενθύμιση πληρωμής',
      greeting: 'Γεια σας,',
      intro: 'Η συνδρομή GeNext για <strong style="color:#f0e8c0">' + name + '</strong> λήγει στις <strong style="color:#c8a44e">' + escHtml(dateStr) + '</strong>.',
      amountLabel: 'Οφειλόμενο ποσό',
      modeLabel: 'Συχνότητα',
      instructions: 'Για να διατηρήσετε αδιάλειπτη πρόσβαση, πραγματοποιήστε την πληρωμή σας πριν από αυτήν την ημερομηνία.',
      payMethods: 'Τραπεζικό έμβασμα ή μετρητά — θα επικοινωνήσουμε μαζί σας.',
      contact: 'Μη διστάσετε να μας απαντήσετε αν έχετε ερωτήσεις.',
      footer: 'GeNext · Ψηφιακά μενού για καφέ και εστιατόρια'
    },
    ar: {
      subtitle: 'تذكير بالدفع',
      greeting: 'مرحباً،',
      intro: 'اشتراكك في GeNext لـ <strong style="color:#f0e8c0">' + name + '</strong> ينتهي في <strong style="color:#c8a44e">' + escHtml(dateStr) + '</strong>.',
      amountLabel: 'المبلغ المستحق',
      modeLabel: 'الدورية',
      instructions: 'للحفاظ على وصولك دون انقطاع، يرجى إتمام الدفع قبل هذا التاريخ.',
      payMethods: 'تحويل بنكي أو نقداً — سنتواصل معك لتفاصيل الدفع.',
      contact: 'لا تتردد في الرد على هذا البريد إذا كان لديك أي سؤال.',
      footer: 'GeNext · قوائم رقمية للمقاهي والمطاعم'
    },
    de: {
      subtitle: 'Zahlungserinnerung',
      greeting: 'Hallo,',
      intro: 'Ihr GeNext Abonnement für <strong style="color:#f0e8c0">' + name + '</strong> läuft am <strong style="color:#c8a44e">' + escHtml(dateStr) + '</strong> ab.',
      amountLabel: 'Fälliger Betrag',
      modeLabel: 'Häufigkeit',
      instructions: 'Um Ihren Zugang ohne Unterbrechung zu erhalten, leisten Sie bitte Ihre Zahlung vor diesem Datum.',
      payMethods: 'Banküberweisung oder Bargeld — wir kontaktieren Sie mit den Zahlungsdaten.',
      contact: 'Antworten Sie auf diese E-Mail, wenn Sie Fragen haben.',
      footer: 'GeNext · Digitale Speisekarten für Cafés und Restaurants'
    }
  };
  const t   = T[lang] || T.fr;
  const dir = lang === 'ar' ? ' dir="rtl"' : '';
  return '<table' + dir + ' width="100%" cellpadding="0" cellspacing="0" bgcolor="#080604" style="background-color:#080604">'
    + '<tr><td align="center" style="padding:16px 8px">'
    + '<table width="580" cellpadding="0" cellspacing="0" bgcolor="#0a0804" style="max-width:580px;width:100%;background-color:#0a0804;font-family:\'Segoe UI\',Arial,sans-serif">'
    + _headerHtml(t.subtitle)
    + '<tr><td bgcolor="#0a0804" style="background-color:#0a0804;padding:28px 32px">'
    + '<h2 style="margin:0 0 12px;font-size:1.15rem;color:#c8a44e">' + t.greeting + '</h2>'
    + '<p style="color:#c8b890;line-height:1.7;margin-bottom:20px;font-size:0.92rem">' + t.intro + '</p>'
    + '<table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:20px"><tr>'
    + '<td bgcolor="#150f08" style="background-color:#150f08;border:1px solid #2e1e0a;border-radius:10px;padding:14px 18px;text-align:center;width:48%">'
    + '<div style="font-size:0.7rem;color:#7a6040;text-transform:uppercase;letter-spacing:0.08em;margin-bottom:4px">' + t.amountLabel + '</div>'
    + '<div style="font-size:1.5rem;font-weight:700;color:#c8a44e">' + escHtml(amount) + '</div>'
    + '</td><td width="12"></td>'
    + '<td bgcolor="#150f08" style="background-color:#150f08;border:1px solid #2e1e0a;border-radius:10px;padding:14px 18px;text-align:center;width:48%">'
    + '<div style="font-size:0.7rem;color:#7a6040;text-transform:uppercase;letter-spacing:0.08em;margin-bottom:4px">' + t.modeLabel + '</div>'
    + '<div style="font-size:1.1rem;font-weight:600;color:#f0e8c0">' + escHtml(mode) + '</div>'
    + '</td></tr></table>'
    + '<table width="100%" cellpadding="0" cellspacing="0" bgcolor="#150f08" style="background-color:#150f08;border:1px solid #2e1e0a;border-left:3px solid #c8a44e;border-radius:0 8px 8px 0;margin-bottom:20px"><tr><td style="padding:14px 18px">'
    + '<p style="margin:0 0 6px;color:#c8b890;font-size:0.9rem;line-height:1.6">' + t.instructions + '</p>'
    + '<p style="margin:0;color:#7a6040;font-size:0.85rem">' + t.payMethods + '</p>'
    + '</td></tr></table>'
    + '<p style="color:#7a6040;font-size:0.83rem;line-height:1.6;margin:0">' + t.contact + '</p>'
    + '</td></tr>'
    + _footerHtml(t.footer)
    + '</table>'
    + '</td></tr>'
    + '</table>';
}

function deliverySubject(name, lang) {
  const S = {
    fr: '🎉 ' + name + ' est prêt ! Voici vos accès GeNext',
    en: '🎉 ' + name + ' is ready! Here are your GeNext credentials',
    el: '🎉 ' + name + ' είναι έτοιμος! Οι κωδικοί σας',
    ar: '🎉 ' + name + ' جاهز! إليك بيانات دخول GeNext',
    de: '🎉 ' + name + ' ist bereit! Ihre GeNext Zugangsdaten'
  };
  return S[lang] || S.fr;
}

function reminderSubject(name, lang) {
  const S = {
    fr: '⏰ Rappel paiement GeNext — ' + name,
    en: '⏰ GeNext payment reminder — ' + name,
    el: '⏰ Υπενθύμιση πληρωμής GeNext — ' + name,
    ar: '⏰ تذكير بالدفع GeNext — ' + name,
    de: '⏰ GeNext Zahlungserinnerung — ' + name
  };
  return S[lang] || S.fr;
}

// ── Handler principal ────────────────────────────────────────────────────────
module.exports = async (req, res) => {
  res.setHeader('Content-Type', 'application/json');

  // Protection cron : Vercel auto-set CRON_SECRET en production
  const cronSecret = process.env.CRON_SECRET;
  if (cronSecret && req.headers.authorization !== `Bearer ${cronSecret}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const secret = process.env.FIREBASE_CONTROL_SECRET;
  if (!secret)                    return res.status(500).json({ error: 'FIREBASE_CONTROL_SECRET missing' });
  if (!process.env.GMAIL_USER)    return res.status(500).json({ error: 'GMAIL_USER missing' });
  if (!process.env.GMAIL_PASS)    return res.status(500).json({ error: 'GMAIL_PASS missing' });

  const now        = Date.now();
  const mainSecret = process.env.FIREBASE_MAIN_SECRET;
  const stats = { delivery: { sent: 0, errors: 0 }, reminders: { sent: 0, errors: 0 } };

  let commandes;
  try {
    commandes = await fbGet(CONTROL_DB, '/commandes', secret);
  } catch(e) {
    return res.status(500).json({ error: 'Firebase GET failed: ' + e.message });
  }

  if (!commandes || typeof commandes !== 'object') {
    return res.status(200).json({ message: 'No commandes', stats });
  }

  const transport = createTransport();

  for (const [key, d] of Object.entries(commandes)) {
    if (!d || typeof d !== 'object') continue;

    // ── B2 : Email livraison ─────────────────────────────────────────────────
    const dueDelivery = d.emailLivraisonProgramme && d.emailLivraisonProgramme <= now;
    const notSentDlv  = !d.emailLivraisonSent;
    const hasEmailDlv = d.emailData && d.emailData.email;

    if (dueDelivery && notSentDlv && hasEmailDlv) {
      try {
        const ed   = d.emailData;
        const lang = (ed.lang && ['fr','en','el','ar','de'].includes(ed.lang)) ? ed.lang : 'fr';
        const isCS = ed.forfait === 'commandes-services';
        await transport.sendMail({
          from:    '"GeNext" <' + process.env.GMAIL_USER + '>',
          replyTo: process.env.GMAIL_USER,
          to:      ed.email,
          headers: { 'List-Unsubscribe': '<mailto:' + process.env.GMAIL_USER + '?subject=unsubscribe>' },
          subject: deliverySubject(ed.name || d.restaurant || '', lang),
          html:    deliveryHtml(ed.name || d.restaurant || '', ed.rid, ed.pwd, isCS, lang),
          text:    (ed.name || d.restaurant || '') + ' — Accès GeNext\n\nVotre espace est prêt.\nIdentifiant : ' + ed.rid + '\nMot de passe : ' + ed.pwd + '\n\nAccéder : ' + ADMIN_URL + '\n\n7 jours d\'essai gratuit à partir de votre première connexion.\n\nGeNext — ' + process.env.GMAIL_USER
        });
        await fbPatch(CONTROL_DB, '/commandes/' + key, secret, { emailLivraisonSent: now });
        stats.delivery.sent++;
        console.log('✅ Livraison envoyée à ' + ed.email + ' pour ' + (ed.name || key));
      } catch(e) {
        stats.delivery.errors++;
        console.error('⚠ Livraison erreur ' + key + ':', e.message);
      }
    }

    // ── B3 : Rappel paiement ─────────────────────────────────────────────────
    const hasNextReminder  = d.nextReminderAt && (d.nextReminderAt - now) < FOUR_DAYS_MS && (d.nextReminderAt - now) > -FIVE_DAYS_MS;
    const notSentRecently  = !d.lastReminderSent || (now - d.lastReminderSent) > FIVE_DAYS_MS;
    const hasEmailRmd      = d.email;
    const notSuspended     = !d.suspendu;

    if (hasNextReminder && notSentRecently && hasEmailRmd && notSuspended) {
      try {
        const lang    = (d.langue && ['fr','en','el','ar','de'].includes(d.langue)) ? d.langue : 'fr';
        const forfait = d.forfait || 'menu-qr';
        const isAnn   = d.paymentMode === 'annual';
        const price   = d.price || (isAnn ? (PM_ANNUAL[forfait] || 490) : (PM_MONTHLY[forfait] || 49));
        const modes   = MODE_LABEL[lang] || MODE_LABEL.fr;
        const mode    = isAnn ? modes.annual : modes.monthly;
        const dateStr = fmtDate(d.nextReminderAt, lang);
        await transport.sendMail({
          from:    '"GeNext" <' + process.env.GMAIL_USER + '>',
          replyTo: process.env.GMAIL_USER,
          to:      d.email,
          headers: { 'List-Unsubscribe': '<mailto:' + process.env.GMAIL_USER + '?subject=unsubscribe>' },
          subject: reminderSubject(d.restaurant || '', lang),
          html:    reminderHtml(d.restaurant || '', price + ' €', mode, dateStr, lang),
          text:    'Rappel paiement GeNext\n\n' + (d.restaurant || '') + '\nMontant : ' + price + ' €\nÉchéance : ' + dateStr + '\n\nVirement bancaire ou espèces — contactez-nous.\n\nGeNext — ' + process.env.GMAIL_USER
        });
        await fbPatch(CONTROL_DB, '/commandes/' + key, secret, { lastReminderSent: now });
        stats.reminders.sent++;
        console.log('✅ Rappel envoyé à ' + d.email + ' pour ' + (d.restaurant || key));
      } catch(e) {
        stats.reminders.errors++;
        console.error('⚠ Rappel erreur ' + key + ':', e.message);
      }
    }
  }

  // ── B4 : Suspension automatique ─────────────────────────────────────────────
  // Si nextReminderAt est dépassé de plus de 3 jours et pas payé → suspendu
  stats.suspensions = 0;
  if (mainSecret) {
    for (const [key, d] of Object.entries(commandes)) {
      if (!d || typeof d !== 'object') continue;
      if (!d.nextReminderAt || d.suspendu) continue;
      const rid = (d.emailData && d.emailData.rid) || d.clientCree?.rid;
      if (!rid) continue;
      const overdue = now - d.nextReminderAt;
      if (overdue > 3 * 24 * 60 * 60 * 1000) {
        try {
          await fbPatch(MAIN_DB, '/restaurants/' + rid + '/config', mainSecret, { active: false, suspendu: true });
          await fbPatch(CONTROL_DB, '/commandes/' + key, secret, { suspendu: true });
          stats.suspensions++;
          console.log('⏸ Suspendu:', rid, '(commande ' + key + ')');
        } catch(e) {
          console.error('⚠ Suspension erreur ' + rid + ':', e.message);
        }
      }
    }
  }

  // ── B5 : firstOpenAt détecté sans nextReminderAt → initialiser ───────────────
  stats.firstOpenSet = 0;
  if (mainSecret) {
    for (const [key, d] of Object.entries(commandes)) {
      if (!d || typeof d !== 'object') continue;
      if (d.nextReminderAt) continue;
      if (!d.firstOpenAt)   continue;
      const rid5 = (d.emailData && d.emailData.rid) || d.clientCree?.rid;
      const nrt5 = d.firstOpenAt + 7 * 24 * 60 * 60 * 1000;
      try {
        await fbPatch(CONTROL_DB, '/commandes/' + key, secret, { nextReminderAt: nrt5 });
        if (rid5) await fbPatch(MAIN_DB, '/restaurants/' + rid5 + '/config/subscription', mainSecret, { endDate: nrt5 });
        stats.firstOpenSet++;
        console.log('✅ B5 nextReminderAt posé:', key, '→', new Date(nrt5).toISOString());
      } catch(e) {
        console.error('⚠ B5 erreur ' + key + ':', e.message);
      }
    }
  }

  // ── BP : Appliquer pendingForfaitChange en fin de période ────────────────────
  stats.pendingApplied = 0;
  if (mainSecret) {
    for (const [key, d] of Object.entries(commandes)) {
      if (!d || typeof d !== 'object') continue;
      if (!d.pendingForfaitChange || !d.nextReminderAt) continue;
      if (now < d.nextReminderAt - 24 * 60 * 60 * 1000) continue;
      const ridBP = (d.emailData && d.emailData.rid) || d.clientCree?.rid;
      if (!ridBP) continue;
      const pfc   = d.pendingForfaitChange;
      const isCS  = pfc.forfait === 'commandes-services';
      const feats = { callBtn: isCS, orderUI: isCS, photos: true, tableSystem: isCS, qrOrdering: isCS, eventOverlay: true };
      try {
        await fbPatch(MAIN_DB, '/restaurants/' + ridBP + '/config/features', mainSecret, feats);
        await fbPatch(MAIN_DB, '/restaurants/' + ridBP + '/config/subscription', mainSecret, {
          forfait: pfc.forfait, price: pfc.price, pendingChange: null, lastForfaitChange: now
        });
        await fbPatch(CONTROL_DB, '/commandes/' + key, secret, {
          forfait: pfc.forfait, price: pfc.price, pendingForfaitChange: null
        });
        stats.pendingApplied++;
        console.log('✅ BP forfait appliqué:', ridBP, '→', pfc.forfait);
      } catch(e) {
        console.error('⚠ BP erreur ' + ridBP + ':', e.message);
      }
    }
  }

  console.log('Cron done:', JSON.stringify(stats));
  res.status(200).json({ message: 'Done', stats });
};
