const router = require('express').Router();
const KEY = process.env.STRIPE_KEY;
const stripe = require('stripe')(KEY);


router.post('/create-checkout-session', async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
          price: 300,
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `http://localhost:3000/`,
      cancel_url: `http://localhost:3000/`,
    });
    res.redirect(303, session.url);

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