const router = require("express").Router();
const User = require('../models/User');
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

//REGISTER

router.post('/register', async (req, res) => {

  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SECRET).toString(),
  });

  try {
    const existingUser = await User.findOne({ username: newUser.username })
    const existingEmail = await User.findOne({ email: newUser.email })
    if (existingUser) {
      return res.status(303).json("Username")
    }
    if (existingEmail) {
      return res.status(303).json("Email")
    }
    else {
      const savedUser = await newUser.save();
      return res.status(201).json(savedUser);
    }

  } catch (err) {
    res.status(500).json(err);
  }

});


//LOGIN

router.post('/login', async (req, res) => {

  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      return res.status(401).json("Wrong Credentials!");
    }
    // !user &&  res.status(401).json("Wrong Credentials!"); this crashes

    const hashedPassword = CryptoJS.AES.decrypt(user.password, process.env.PASS_SECRET);
    const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

    originalPassword !== req.body.password && res.status(401).json("Wrong Credentials!");
    const accessToken = jwt.sign({
      id: user.id,
      isAdmin: user.isAdmin,
    }, process.env.JWT_SEC,
      { expiresIn: "3d" },
    );

    const { password, ...others } = user._doc;

    res.status(200).json({ ...others, accessToken });


  } catch (err) {
    res.status(500).json(err);
  }

});

module.exports = router;