const PaySubService = require('../services/paysub.service');

const paysubHandler = async (context, req, ...args) => {
  const response = PaySubService.createSubscription(req.body);
  return (context.res = {
    status: 200,
    body: response,
  });
};

module.exports = paysubHandler;
