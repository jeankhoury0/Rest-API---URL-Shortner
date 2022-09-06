const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../model/userModel');

const register = async(req, res)=>{
    try{
        const { 
            firstName, 
            lastName,
            email, 
            password 
        } = req.body;

        //user input validatiom
        if (!(email && password && firstName && lastName)){
          return res.status(400).send("all input required");
        }
        //is user existant?
        const oldUser = await User.findOne({email: email.toLowerCase()});
        if (await oldUser){
          return res.status(409).send("User Already Exist. Please Login"); 
        }
    
        encryptedPassword = await bcrypt.hash(password, 10);
    
        //create newUser
        const user = await User.create({
            firstName,
            lastName,
            email: email.toLowerCase(), // sanitize: convert email to lowercase
            password: encryptedPassword,
          });
        
        //token creation
        const token = jwt.sign(
            { user_id: user._id, email },
            process.env.TOKEN_KEY,
            {
              expiresIn: "12h",
            }
          );
    
        user.token = token;
    
        res.status(201).json(user);
      }catch(err){
        res.status(500).json(err)
      }
}

module.exports = register;