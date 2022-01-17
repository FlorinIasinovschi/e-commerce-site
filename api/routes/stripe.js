
const router = require('express').Router();
const KEY = process.env.STRIPE_KEY;
const stripe = require('stripe')(KEY);


// name: el.title,
// price: el.price,
// quantity: el.quantity,
// currency: "usd",

// [
//   {
//     price_data: {
//       currency: 'usd',
//       product_data: {
//         name: "whatever",
//       },
//       unit_amount: 2000,
//     },
//     quantity: 2,
//   },
// ],


router.post('/create-checkout-session', async (req, res) => {
  console.log(req.body.items);
  try {
    const session = await stripe.checkout.sessions.create({
      line_items: req.body.items,

      mode: 'payment',
      success_url: `http://localhost:3000/success`,
      cancel_url: `http://localhost:3000/cancel`,
    });
    res.json({ url: session.url });

  } catch (err) {
    res.status(500).json(err);
  }

});







//LEGACY

// router.post('/payment', (req, res) => {
//   stripe.charges.create({
//     source: req.body.tokenId,
//     amount: req.body.amount,
//     currency: "usd"
//   }, (stripeErr, stripeRes) => {
//     if (stripeErr) {
//       res.status(500).json(stripeErr)
//     } else {
//       res.status(200).json(stripeRes)
//     }
//   })
// })


module.exports = router;