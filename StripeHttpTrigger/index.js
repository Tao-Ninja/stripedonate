const paysubHandler = require('./handlers/paysub.handler');
const payonceHandler = require('./handlers/payonce.handler');

module.exports = async (context, req, ...args) => {
  const log = context.log;
  const { subscription = null, totalamount = null } = req.body || {};

  log('Req.body is', req.body);
  log(`Req.body.totalamount is ${totalamount}`);
  log(`Payment Subscriptions is ${subscription}`);

  try {
    // check a pay method
    return (subscription && (await paysubHandler(context, req, ...args))) || (await payonceHandler(context, req, ...args));
  } catch (e) {
    return (context.res = {
      status: 200,
      body: { error: e.message },
    });
  }
};
