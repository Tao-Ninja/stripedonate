module.exports = {
    // foo: function () {
    //   // whatever
    // },
    // bar: function () {
    //   // whatever
    // }
 

foo: (async () => {
  const customer = await stripe.customers.create({
    email: 'jenny.rosen@example.com',
    source: 'src_18eYalAHEMiOZZp1l9ZTjSU0',
  });
})(),


bar: (async () => {
    const subscription = await stripe.subscriptions.create({
      customer: 'cus_4fdAW5ftNQow1a',
      items: [{plan: 'plan_CBXbz9i7AIOTzr'}]
    });
  })(),



};
  