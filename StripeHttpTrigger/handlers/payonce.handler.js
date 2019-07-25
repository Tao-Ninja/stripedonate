const PayOnceService = require('../services/payonce.service');

const payonceHandler = async (context, req, ...args) => {
  const log = context.log;
  let intent = null;

  switch (true) {
    case Boolean(req.body.payment_method_id): {
      log('Create the Payment Intent');
      intent = await PayOnceService.createPayment({
        payment_method: req.body.payment_method_id,
        receipt_email: req.body.email,
        amount: req.body.totalamount,
        currency: 'usd',
        confirmation_method: 'manual',
        confirm: true,
      });
      log('Payment Method ID');
      break;
    }
    case Boolean(req.body.payment_intent_id): {
      intent = await PayOnceService.confirmPayment(req.body.payment_intent_id);
      log('Payment Intent ID');
      break;
    }
    default:
      throw new Error('Invalid payment method');
  }

  const response = await PayOnceService.toResponse(intent);
  log('Send the Response: ', response);
  return (context.res = {
    status: 200,
    body: response,
  });
};

module.exports = payonceHandler;
