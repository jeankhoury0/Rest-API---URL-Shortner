/**
 * Controller for login flow
 * Possible error message
 * 400 - Please enter an email and a password
 * 401 - Invalid Credentials. If you dont have an account please register
 * 200 - Success - return token + userinfo
 * 500 - Server Error - Return error
 */
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../model/userModel');

const register = async(req,res) =>{
    try {
        const { email, password } = req.body;

        if (!(email && password)) {
            return res.status(400).send("Please enter an email and a password");
            
        }
        const user = await User.findOne({ email: email.toLowerCase() });
        if (user && (await bcrypt.compare(password, user.password))) {
            // Create token
            const token = jwt.sign(
                { userId: user._id, email },
                process.env.TOKEN_KEY,
                {
                    expiresIn: "12h",
                }
            );
            user.token = token;
            return res.status(200).json(user);
        }
        return res.status(401).send("Invalid Credentials. If you dont have an account please register");
        
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
}

module.exports = register;