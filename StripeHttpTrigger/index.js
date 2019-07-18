module.exports = async function (context, req) {
    // Using Express
const express = require('express');
const app = express();
app.use(express.json());

app.post('/ajax/confirm_payment', async (request, response) => {
  try {
    let intent;
    if (request.body.payment_method_id) {
      // Create the PaymentIntent
      intent = await stripe.paymentIntents.create({
        payment_method: request.body.payment_method_id,
        amount: 1099,
        currency: 'usd',
        confirmation_method: 'manual',
        confirm: true
      });
    } else if (request.body.payment_intent_id) {
      intent = await stripe.paymentIntents.confirm(
        request.body.payment_intent_id
      );
    }
    // Send the response to the client
    response.send(generate_payment_response(intent));
  } catch (e) {
    // Display error on client
    return response.send({ error: e.message });
  }
});

const generate_payment_response = (intent) => {
  // Note that if your API version is before 2019-02-11, 'requires_action'
  // appears as 'requires_source_action'.
  if (
    intent.status === 'requires_action' &&
    intent.next_action.type === 'use_stripe_sdk'
  ) {
    // Tell the client to handle the action
    return {
      requires_action: true,
      payment_intent_client_secret: intent.client_secret
    };
  } else if (intent.status === 'succeeded') {
    // The payment didn’t need any additional actions and completed!
    // Handle post-payment fulfillment
    return {
      success: true
    };
  } else {
    // Invalid status
    return {
      error: 'Invalid PaymentIntent status'
    }
  }
};

    if (req.query.name || (req.body && req.body.name)) {
        context.res = {
            status: 200 /* Defaults to 200 */
            // body: "Hello " + (req.query.name || req.body.name)
        };
    }
    else {
        context.res = {
            status: 400,
            body: "Please pass a name on the query string or in the request body"
        };
    }
};