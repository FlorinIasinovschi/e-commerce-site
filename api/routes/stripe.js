
const router = require('express').Router();
const { stripeSecKey, url } = require('../stripeKey');

const Stripe = require('stripe');
const stripe = Stripe(stripeSecKey);



router.post('/create-checkout-session', async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      line_items: req.body.items,

      mode: 'payment',
      success_url: `${url}success`,
      cancel_url: `${url}cart`,
    });
    res.json({ url: session.url });

  } catch (err) {
    res.status(500).json(err);
  }

});

module.exports = router;