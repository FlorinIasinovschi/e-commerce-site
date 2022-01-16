const router = require("express").Router();
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('./verifyToken');
const Cart = require('../models/Cart');

//CREATE CART

router.post('/', verifyToken, async (req, res) => {
  try {
    const newCart = new Cart.save(req.body)
    res.status(200).json(newCart)
  } catch (err) {
    res.status(500).json(err)
  }
})

//UPDATE CART

router.put('/:id', verifyTokenAndAuthorization, async (req, res) => {
  try {
    const updatedCart = await Cart.findByIdAndUpdate(req.params.id, {
      $set: req.body
    }, { new: true })
    res.status(200).json(updatedCart);
  } catch (err) {
    res.status(500).json(err)
  }
})

//DELETE CART

router.delete('/:id', verifyTokenAndAuthorization, async (req, res) => {
  try {
    await Cart.findByIdAndDelete(rew.params.id)
    res.status(200).json("Cart has been deleted")
  } catch (err) {
    res.status(500).json(err)
  }
})

// GET USER CART

router.get('/:id', verifyTokenAndAuthorization, async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.id)
    res.status(200).json(cart)
  } catch (err) {
    res.status(500).json(err)
  }
})

//GET ALL CARTS

router.get('/', verifyTokenAndAdmin, async (req, res) => {
  try {
    const allCarts = await Cart.find()
    res.status(200).json(allCarts)
  } catch (err) {
    res.status(500).json(err)
  }
})





module.exports = router;