/**
 * Controller for redirections
 * Possible messages
 * 
 */
const Url = require('../model/userModel');

/**
 * 
 * @param {String} short code  
 */

const redirects = async(req, res) => {
    try {
        const url = await Url.findOne({
            urlCode: req.params.code,
        })
        if (url) {
            return res.json({"url":url.longUrl})
        } else {
            // res.status(404).json('No Url Found');
            return res.json({"url":"https://short.001.lat/"})
        }
    }
    catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
}

module.exports = redirects;