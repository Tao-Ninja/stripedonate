module.exports = async function (context, req, generate_payment_response) {
  const log = context.log;
  
  const express = require('express');
  const app = express();
  const stripe = require('stripe')(process.env.StripeSecret);
  // const subscription = req.body.subscription;

  app.use(express.json());


  const generate_payment_response = (intent) => {
    if (
      intent.status === 'requires_action' &&
      intent.next_action.type === 'use_stripe_sdk'
    ) {
      log("Payment Response 1 - Tell the client to handle the action");
      return {
        requires_action: true,
        payment_intent_client_secret: intent.client_secret
      };
    } else if (intent.status === 'succeeded') {
      log("Payment Response 2 - The payment didn’t need any additional actions and completed!");
      return {
        success: true
      };
    } else {
      log("Payment Response 3 - Invalid status");
      return {
        error: 'Invalid PaymentIntent status'
      }
    }
  };


  try {
    let intent;
    if (req.body.payment_method_id) {
      log("Create the Payment Intent");
      intent = await stripe.paymentIntents.create({
        payment_method: req.body.payment_method_id,
        receipt_email: req.body.email,
        amount: req.body.totalamount,
        currency: 'usd',
        confirmation_method: 'manual',
        confirm: true
      });
      log("Payment Method ID");
    } else if (req.body.payment_intent_id) {
      intent = await stripe.paymentIntents.confirm(
        req.body.payment_intent_id
      );
      log("Payment Intent ID");
    }
    
    var payresponse = generate_payment_response(intent);
    log("Send the Response: " + payresponse);
    context.res = 
    {
      status: 200,
      body: payresponse
    };
  } catch (e) {
    log("Error Message: " + e.message);
    return {
      error: e.message
    };
  }

};
