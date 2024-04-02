const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;

function signToken(value) {
    return jwt.sign(value, secret);
}

function verifyToken(value) {
    return jwt.verify(value, secret);
}
module.exports = { signToken, verifyToken };