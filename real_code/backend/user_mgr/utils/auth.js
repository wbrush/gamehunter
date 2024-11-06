const jwt = require('jsonwebtoken')

const secret = process.env.jwtSecret
const expiration = '2h'

module.exports = {
    signToken: function (user) {
        return jwt.sign({ user }, secret, { expiresIn: expiration });
    }
}