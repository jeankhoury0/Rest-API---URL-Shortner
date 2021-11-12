const { config } = require("dotenv");
const jwt = require("jsonwebtoken");

  /**
   * Give back the userID. It is used to query DB
   * @param {String} Token created by JWT
   * @author Jean Khoury 
   * @returns {String} The decoded user_id
   */
function decryptUserId(token){
    const decoded = jwt.verify(token, process.env.TOKEN_KEY);
    return decoded.userId
  }


module.exports = {decryptUserId};
