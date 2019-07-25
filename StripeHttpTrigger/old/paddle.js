
// console.log("Successfully Started by Krashnik");
// console.log(req.body);
// console.log(req.body.totalamount);

module.exports = async function (context, req) {

    const appInsights = require("applicationinsights");
    appInsights.start();
    
    // Using Express
    const express = require('express');
    const app = express();
    app.use(express.json());
    
    var cors = require('cors');
    
    // use it before all route definitions
    app.use(cors({origin: 'http://127.0.0.1:5500/'}));
    
      
     app.post('/ajax/confirm_payment', async (req, res) => {
     
       try {
         let intent;
         if (req.body.payment_method_id) {
           // Create the PaymentIntent
           intent = await stripe.paymentIntents.create({
             payment_method: req.body.payment_method_id,
             amount: req.body.totalamount,
             currency: 'usd',
             confirmation_method: 'manual',
             confirm: true
           });
           context.log("Payment Method ID");
         } else if (req.body.payment_intent_id) {
           intent = await stripe.paymentIntents.confirm(
             req.body.payment_intent_id
           );
           context.log("Payment Intent ID");
         }
         // Send the response to the client
         context.log("Send the Response");
         res.send(generate_payment_response(intent));
       } catch (e) {
        context.log(e.message);
         // Display error on client
         return res.send({ error: e.message });
       }
     });
     
     const generate_payment_response = (intent) => {
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
     

    // Create a Response.
	if (req.body.totalamount > 0) { // Simple authentication for the purpose of demo.
        log('Success 200');
            // Respond with 200.
            context.res = {
                status: 200,
                body: "Thank You for the payment! " // + (req.query.totalamount || req.body.totalamount)
            };
        } else {
        log('No Success 400');
            context.res = {
                status: 400,
                body: "Please Enter a Donation Amount"
            };
        }
    
     
    };