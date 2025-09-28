const jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports = (req, res, next) => {
    console.log('Authorize JWT')
    try {
        const authHeader = req.headers['authorization']
        const token = authHeader.split(" ")[1]

        const user = jwt.verify(token, process.env.JWT_SECRET)
        req.authUser = user
        
        next()
    } catch (error) {
        console.log(error)
        res.status(401).json({
            msg: "Authorization failed.",
            error: error.message
        })
    }
}