console.log("here");
module.exports = async function (context, req) {
  const appInsights = require("applicationinsights");
  appInsights.start();
  const log = context.log;
  
  const express = require('express');
  const app = express();
  const stripe = require('stripe')(process.env.StripeSecret);
  const subscription = req.body.subscription;
  log('Payment Subscriptions is' + subscription);
  app.use(express.json());

  if(subscription == true){
  let response = await ('./paysub');
  log('Payment Once');
  }else{
  const payonce = require('./payonce');
  log('Payment Subscriptions');
  }
  
  log('Req.body', req.body);
  log('Req.body.totalamount', req.body.totalamount);
  
	context.done();
};
