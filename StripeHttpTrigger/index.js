module.exports = async function (context, req) {
    // Using Express
const express = require('express');
const app = express();
const stripe = require('stripe')('sk_test_308o9TyRPYOeaQqSI3GIwmDA');
app.use(express.json());

    // STEP 1 - Create a PaymentIntent on the server
    (async () => {
    const paymentIntent = await stripe.paymentIntents.create({
        amount: 75,
        currency: 'usd',
    });
    })();

    // Step 5: Asynchronously fulfill the customer’s order
    (async () => {
    const intent = await stripe.paymentIntents.retrieve('pi_Aabcxyz01aDfoo');
    const charges = intent.charges.data;
    })();


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