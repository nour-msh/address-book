const { Router, application } = require("express");
const router = Router();
require("dotenv").config();
const { User } = require("../../model/User");


router.post("/register", async(req,res)=>{
  try{
    const{name,email,password}=req.body;
    if(!(name && email && password)){
      res.status(400).send("All input is required");
    }
    encryptedPassword= await bcrypt.hash(password,10);
    const user= await User.create({
      name,
      email,
      password: encryptedPassword,
    });
    const token= jwt.sign(
      { user_id: user._id, email},
      process.env.TOKEN_KEY,
      {
        expiresIn:"2h",
      });
      user.token=token;

      res.status(201).json(user);
    }catch(err){
      console.log(err);
    }
  });

module.exports = router;
