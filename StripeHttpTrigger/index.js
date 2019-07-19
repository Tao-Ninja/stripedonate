module.exports = async function (context, req) {
    // Using Express
const express = require('express');
const app = express();
app.use(express.json());


const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

(async () => {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 100,
    currency: 'usd',
  });
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