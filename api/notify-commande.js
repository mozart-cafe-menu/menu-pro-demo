/* ================================================
   Vercel Function — Notification FCM Nouveau Client
   Délègue à menu-saas-platform/api/notify-control
================================================ */

const https = require('https');

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

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Content-Type', 'application/json');

  if (req.method === 'OPTIONS') { res.status(200).end(); return; }
  if (req.method !== 'POST')    { res.status(405).json({ error: 'Method not allowed' }); return; }

  try {
    const { restaurant, forfait, paymentMode, langue } = req.body || {};
    if (!restaurant) { res.status(400).json({ error: 'Missing restaurant' }); return; }

    const rest     = String(restaurant).slice(0, 60);
    const plan     = forfait ? String(forfait).slice(0, 40) : '';
    const modeStr  = paymentMode === 'annual' ? ' · Annuel' : ' · Mensuel';

    const bodyText = plan ? `${rest} · ${plan}${modeStr}` : `${rest}${modeStr}`;

    const payload = JSON.stringify({
      title: '🆕 Nouveau Client',
      body:  bodyText,
      type:  'commande'
    });

    const result = await httpsRequest(
      'https://menu-saas-platform.vercel.app/api/notify-control',
      {
        method:  'POST',
        headers: {
          'Content-Type':   'application/json',
          'Content-Length': Buffer.byteLength(payload)
        }
      },
      payload
    );

    console.log('notify-control response:', result.status, JSON.stringify(result.body));
    res.status(200).json(result.body || { sent: 0 });

  } catch (err) {
    console.error('Error:', err.message);
    res.status(500).json({ error: err.message });
  }
};
