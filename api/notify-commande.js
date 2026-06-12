/* ============================================================
   Vercel Function — Notification FCM + Email d'attente auto
   Phase B1 : email d'attente envoyé automatiquement dès
              réception d'une commande (nodemailer + Gmail SMTP)
============================================================ */

const https      = require('https');
const nodemailer = require('nodemailer');

// ── Transport Gmail SMTP ─────────────────────────────────────────────────────
function createTransport() {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS
    }
  });
}

// ── Templates email d'attente (5 langues) ───────────────────────────────────
const WAITING_TPL = {
  fr: {
    subject: (r) => `✅ Demande reçue — ${r}`,
    html: (r, forfait, mode) => `
<div style="font-family:'Segoe UI',Arial,sans-serif;max-width:560px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;border:1px solid #e8e0d0">
  <div style="background:linear-gradient(135deg,#1a1510,#2a2018);padding:28px 32px;text-align:center">
    <div style="font-size:1.7rem;font-weight:700;color:#c8a44e;letter-spacing:0.06em;font-family:Georgia,serif">Menu Pro</div>
    <div style="font-size:0.8rem;color:rgba(200,164,78,0.6);margin-top:4px;letter-spacing:0.1em;text-transform:uppercase">Menus digitaux &amp; Commandes</div>
  </div>
  <div style="padding:32px">
    <h2 style="margin:0 0 8px;font-size:1.25rem;color:#1a1510">Bonjour,</h2>
    <p style="color:#444;line-height:1.7;margin-bottom:20px">
      Nous avons bien reçu votre demande pour <strong style="color:#1a1510">${r}</strong>.<br>
      Forfait sélectionné : <strong style="color:#c8a44e">${forfait}</strong> (${mode}).
    </p>
    <div style="background:#fdf9f0;border-left:3px solid #c8a44e;border-radius:0 8px 8px 0;padding:16px 20px;margin-bottom:24px">
      <p style="margin:0;color:#5a4a2a;font-size:0.92rem;line-height:1.6">
        ⏳ Votre espace est en cours de préparation.<br>
        Vous recevrez un <strong>email avec vos identifiants de connexion</strong> dans les 24 heures.
      </p>
    </div>
    <p style="color:#888;font-size:0.85rem;line-height:1.6">
      N'hésitez pas à nous répondre à cet email si vous avez des questions.
    </p>
  </div>
  <div style="background:#fafafa;border-top:1px solid #eee;padding:16px 32px;text-align:center">
    <span style="font-size:0.78rem;color:#aaa">Menu Pro · Menus digitaux pour cafés et restaurants</span>
  </div>
</div>`
  },
  en: {
    subject: (r) => `✅ Request received — ${r}`,
    html: (r, forfait, mode) => `
<div style="font-family:'Segoe UI',Arial,sans-serif;max-width:560px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;border:1px solid #e8e0d0">
  <div style="background:linear-gradient(135deg,#1a1510,#2a2018);padding:28px 32px;text-align:center">
    <div style="font-size:1.7rem;font-weight:700;color:#c8a44e;letter-spacing:0.06em;font-family:Georgia,serif">Menu Pro</div>
    <div style="font-size:0.8rem;color:rgba(200,164,78,0.6);margin-top:4px;letter-spacing:0.1em;text-transform:uppercase">Digital menus &amp; Orders</div>
  </div>
  <div style="padding:32px">
    <h2 style="margin:0 0 8px;font-size:1.25rem;color:#1a1510">Hello,</h2>
    <p style="color:#444;line-height:1.7;margin-bottom:20px">
      We have received your request for <strong style="color:#1a1510">${r}</strong>.<br>
      Selected plan: <strong style="color:#c8a44e">${forfait}</strong> (${mode}).
    </p>
    <div style="background:#fdf9f0;border-left:3px solid #c8a44e;border-radius:0 8px 8px 0;padding:16px 20px;margin-bottom:24px">
      <p style="margin:0;color:#5a4a2a;font-size:0.92rem;line-height:1.6">
        ⏳ Your space is being prepared.<br>
        You will receive an <strong>email with your login credentials</strong> within 24 hours.
      </p>
    </div>
    <p style="color:#888;font-size:0.85rem;line-height:1.6">
      Feel free to reply to this email if you have any questions.
    </p>
  </div>
  <div style="background:#fafafa;border-top:1px solid #eee;padding:16px 32px;text-align:center">
    <span style="font-size:0.78rem;color:#aaa">Menu Pro · Digital menus for cafés and restaurants</span>
  </div>
</div>`
  },
  el: {
    subject: (r) => `✅ Αίτημα παραλήφθηκε — ${r}`,
    html: (r, forfait, mode) => `
<div style="font-family:'Segoe UI',Arial,sans-serif;max-width:560px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;border:1px solid #e8e0d0">
  <div style="background:linear-gradient(135deg,#1a1510,#2a2018);padding:28px 32px;text-align:center">
    <div style="font-size:1.7rem;font-weight:700;color:#c8a44e;letter-spacing:0.06em;font-family:Georgia,serif">Menu Pro</div>
    <div style="font-size:0.8rem;color:rgba(200,164,78,0.6);margin-top:4px;letter-spacing:0.1em;text-transform:uppercase">Ψηφιακά μενού &amp; Παραγγελίες</div>
  </div>
  <div style="padding:32px">
    <h2 style="margin:0 0 8px;font-size:1.25rem;color:#1a1510">Γεια σας,</h2>
    <p style="color:#444;line-height:1.7;margin-bottom:20px">
      Λάβαμε το αίτημά σας για <strong style="color:#1a1510">${r}</strong>.<br>
      Επιλεγμένο πλάνο: <strong style="color:#c8a44e">${forfait}</strong> (${mode}).
    </p>
    <div style="background:#fdf9f0;border-left:3px solid #c8a44e;border-radius:0 8px 8px 0;padding:16px 20px;margin-bottom:24px">
      <p style="margin:0;color:#5a4a2a;font-size:0.92rem;line-height:1.6">
        ⏳ Ο χώρος σας προετοιμάζεται.<br>
        Θα λάβετε <strong>email με τα στοιχεία σύνδεσής σας</strong> εντός 24 ωρών.
      </p>
    </div>
    <p style="color:#888;font-size:0.85rem;line-height:1.6">
      Μη διστάσετε να απαντήσετε σε αυτό το email αν έχετε απορίες.
    </p>
  </div>
  <div style="background:#fafafa;border-top:1px solid #eee;padding:16px 32px;text-align:center">
    <span style="font-size:0.78rem;color:#aaa">Menu Pro · Ψηφιακά μενού για καφέ και εστιατόρια</span>
  </div>
</div>`
  },
  ar: {
    subject: (r) => `✅ تم استلام طلبك — ${r}`,
    html: (r, forfait, mode) => `
<div dir="rtl" style="font-family:'Segoe UI',Arial,sans-serif;max-width:560px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;border:1px solid #e8e0d0">
  <div style="background:linear-gradient(135deg,#1a1510,#2a2018);padding:28px 32px;text-align:center">
    <div style="font-size:1.7rem;font-weight:700;color:#c8a44e;letter-spacing:0.06em;font-family:Georgia,serif">Menu Pro</div>
    <div style="font-size:0.8rem;color:rgba(200,164,78,0.6);margin-top:4px;letter-spacing:0.1em;text-transform:uppercase">قوائم رقمية وطلبات</div>
  </div>
  <div style="padding:32px">
    <h2 style="margin:0 0 8px;font-size:1.25rem;color:#1a1510">مرحباً،</h2>
    <p style="color:#444;line-height:1.7;margin-bottom:20px">
      تلقينا طلبك بخصوص <strong style="color:#1a1510">${r}</strong>.<br>
      الخطة المختارة: <strong style="color:#c8a44e">${forfait}</strong> (${mode}).
    </p>
    <div style="background:#fdf9f0;border-right:3px solid #c8a44e;border-radius:8px 0 0 8px;padding:16px 20px;margin-bottom:24px">
      <p style="margin:0;color:#5a4a2a;font-size:0.92rem;line-height:1.6">
        ⏳ يتم تحضير مساحتك الآن.<br>
        ستتلقى <strong>بريداً إلكترونياً ببيانات الدخول</strong> خلال 24 ساعة.
      </p>
    </div>
    <p style="color:#888;font-size:0.85rem;line-height:1.6">
      لا تتردد في الرد على هذا البريد إذا كان لديك أي سؤال.
    </p>
  </div>
  <div style="background:#fafafa;border-top:1px solid #eee;padding:16px 32px;text-align:center">
    <span style="font-size:0.78rem;color:#aaa">Menu Pro · قوائم رقمية للمقاهي والمطاعم</span>
  </div>
</div>`
  },
  de: {
    subject: (r) => `✅ Anfrage erhalten — ${r}`,
    html: (r, forfait, mode) => `
<div style="font-family:'Segoe UI',Arial,sans-serif;max-width:560px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;border:1px solid #e8e0d0">
  <div style="background:linear-gradient(135deg,#1a1510,#2a2018);padding:28px 32px;text-align:center">
    <div style="font-size:1.7rem;font-weight:700;color:#c8a44e;letter-spacing:0.06em;font-family:Georgia,serif">Menu Pro</div>
    <div style="font-size:0.8rem;color:rgba(200,164,78,0.6);margin-top:4px;letter-spacing:0.1em;text-transform:uppercase">Digitale Speisekarten &amp; Bestellungen</div>
  </div>
  <div style="padding:32px">
    <h2 style="margin:0 0 8px;font-size:1.25rem;color:#1a1510">Hallo,</h2>
    <p style="color:#444;line-height:1.7;margin-bottom:20px">
      Wir haben Ihre Anfrage für <strong style="color:#1a1510">${r}</strong> erhalten.<br>
      Gewählter Plan: <strong style="color:#c8a44e">${forfait}</strong> (${mode}).
    </p>
    <div style="background:#fdf9f0;border-left:3px solid #c8a44e;border-radius:0 8px 8px 0;padding:16px 20px;margin-bottom:24px">
      <p style="margin:0;color:#5a4a2a;font-size:0.92rem;line-height:1.6">
        ⏳ Ihr Bereich wird vorbereitet.<br>
        Sie erhalten eine <strong>E-Mail mit Ihren Zugangsdaten</strong> innerhalb von 24 Stunden.
      </p>
    </div>
    <p style="color:#888;font-size:0.85rem;line-height:1.6">
      Antworten Sie auf diese E-Mail, wenn Sie Fragen haben.
    </p>
  </div>
  <div style="background:#fafafa;border-top:1px solid #eee;padding:16px 32px;text-align:center">
    <span style="font-size:0.78rem;color:#aaa">Menu Pro · Digitale Speisekarten für Cafés und Restaurants</span>
  </div>
</div>`
  }
};

// ── Libellés mode paiement (5 langues) ──────────────────────────────────────
const MODE_LABEL = {
  fr: { monthly: 'Mensuel',   annual: 'Annuel'    },
  en: { monthly: 'Monthly',   annual: 'Annual'    },
  el: { monthly: 'Μηνιαία',   annual: 'Ετήσια'    },
  ar: { monthly: 'شهري',      annual: 'سنوي'      },
  de: { monthly: 'Monatlich', annual: 'Jährlich'  }
};

// ── Helper HTTPS request ─────────────────────────────────────────────────────
function httpsRequest(url, options, body) {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url);
    const opts = {
      hostname: urlObj.hostname,
      path:     urlObj.pathname + urlObj.search,
      method:   options.method || 'POST',
      headers:  options.headers || {}
    };
    const req = https.request(opts, res => {
      let data = '';
      res.on('data', d => data += d);
      res.on('end', () => {
        try { resolve({ status: res.statusCode, body: JSON.parse(data) }); }
        catch(e) { resolve({ status: res.statusCode, body: data }); }
      });
    });
    req.on('error', reject);
    if (body) req.write(body);
    req.end();
  });
}

// ── Handler principal ────────────────────────────────────────────────────────
module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Content-Type', 'application/json');

  if (req.method === 'OPTIONS') { res.status(200).end(); return; }
  if (req.method !== 'POST')    { res.status(405).json({ error: 'Method not allowed' }); return; }

  try {
    const { restaurant, forfait, paymentMode, langue, email } = req.body || {};
    if (!restaurant) { res.status(400).json({ error: 'Missing restaurant' }); return; }

    const rest     = String(restaurant).slice(0, 60);
    const plan     = forfait ? String(forfait).slice(0, 40) : '';
    const lang     = (langue && WAITING_TPL[langue]) ? langue : 'fr';
    const modeStr  = paymentMode === 'annual' ? ' · Annuel' : ' · Mensuel';
    const bodyText = plan ? `${rest} · ${plan}${modeStr}` : `${rest}${modeStr}`;

    // ── 1. Notification FCM (comportement existant) ─────────────────────────
    const fcmPayload = JSON.stringify({ title: '🆕 Nouveau Client', body: bodyText, type: 'commande' });
    const fcmResult  = await httpsRequest(
      'https://menu-saas-platform.vercel.app/api/notify-control',
      { method: 'POST', headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(fcmPayload) } },
      fcmPayload
    );
    console.log('FCM response:', fcmResult.status, JSON.stringify(fcmResult.body));

    // ── 2. Email d'attente automatique ──────────────────────────────────────
    if (email && process.env.GMAIL_USER && process.env.GMAIL_PASS) {
      try {
        const tpl       = WAITING_TPL[lang];
        const modes     = MODE_LABEL[lang];
        const modeLabel = paymentMode === 'annual' ? modes.annual : modes.monthly;
        await createTransport().sendMail({
          from:    `"Menu Pro" <${process.env.GMAIL_USER}>`,
          to:      email,
          subject: tpl.subject(rest),
          html:    tpl.html(rest, plan || 'Menu Pro', modeLabel)
        });
        console.log('✅ Email d\'attente envoyé à:', email);
      } catch (mailErr) {
        console.error('⚠ Email error (non-blocking):', mailErr.message);
      }
    }

    res.status(200).json(fcmResult.body || { sent: 0 });

  } catch (err) {
    console.error('Error:', err.message);
    res.status(500).json({ error: err.message });
  }
};
