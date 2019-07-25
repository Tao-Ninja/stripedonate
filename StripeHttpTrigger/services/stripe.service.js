// singleton module
module.exports = require('stripe')(process.env.StripeSecret);