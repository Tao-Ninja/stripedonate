module.exports = function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');
const axios = require('axios');
var stripe = require('stripe')(process.env.StripeSecret);

var qs = require('querystring');
var post = qs.parse(req.body);


    //create and subscribe customer to plan
    stripe.customers.create(
        {
        email: req.body.token.email,
        source: req.body.token.id,
        plan: req.body.stripePlan,
        description: req.body.stripeDescription,
        },
    function(err, customer) {
        err; // null if no error occurred
        customer; // the created customer object        	
    }
    );


axios({
  url: 'https://prod-00.centralus.logic.azure.com:443/workflows/67d4a258e38844879e1806744f28b077/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=7V7ua_1lbKByOMV9H8Rz8pMapaKl622w5lnJ0AEXyPQ',
  method: 'POST',
  data: req.body
});



//Useful for debugging the actual body content sent from the Stripe Checkout form
        context.res = {
         status: 200, /* Defaults to 200 */
           //  body: "Body: " + JSON.stringify(req.body)
        };

    context.done();
    };