const { Router, application } = require("express");
const router = Router();
require("dotenv").config();
const  User  = require("../../model/User");
const bcrypt=require("bcrypt")
const jwt = require('jsonwebtoken');
const TOKEN_KEY = process.env.TOKEN_KEY || "";



async function addUser(body, hashPassword) {
  const {
    name,
    email,
  } = body;

  const user = new User({
    name,
    email,
    password: hashPassword
  });

  return await user.save();
}

router.post("/register", async(req,res)=>{

  try {
    console.log(req.body);

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    const addUserResult = await addUser(req.body, hashPassword);
    console.log('addUserResult =>', addUserResult);
    
    return res.send({ user: addUserResult._id });
  } catch (error) {
    console.log(error);
  }
})

async function getByEmail(email) {
  return await User.findOne({
    email
  });
}

router.post("/login", async(req,res)=>{
  try {
    const user = await getByEmail(req.body.email);
    if (!user) return res.status(400).send('invalid credentials');

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send('invalid credentials');

    const token = jwt.sign(
      {_id: user._id, name: user.name, email: user.email},
      TOKEN_KEY
    );

    return res.header('auth-token', token).send(token);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }})


module.exports = router;
