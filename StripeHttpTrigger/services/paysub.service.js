const StripeSerivce = require('./stripe.service');

class PaySubService {
  static async createCustomer(data = {}) {
    return await StripeSerivce.customers.create(data);
  }

  static async createSubscription(data = {}) {
    return await StripeSerivce.subscriptions.create(data);
  }
}

module.exports = PaySubService;
