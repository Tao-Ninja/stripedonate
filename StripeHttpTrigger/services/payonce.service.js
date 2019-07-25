const StripeSerivce = require('./stripe.service');

class PayOnceService {
  static async createPayment(data = {}) {
    return await StripeSerivce.paymentIntents.create(data);
  }

  static async confirmPayment(payment_id) {
    return await StripeSerivce.paymentIntents.confirm(payment_id);
  }

  static async toResponse(intent = {}) {
    if (intent.status === 'requires_action' && intent.next_action.type === 'use_stripe_sdk') {
      return {
        requires_action: true,
        payment_intent_client_secret: intent.client_secret,
      };
    }
    if (intent.status === 'succeeded') {
      return {
        success: true,
      };
    }
    return {
      error: 'Invalid PaymentIntent status',
    };
  }
}

module.exports = PayOnceService;
