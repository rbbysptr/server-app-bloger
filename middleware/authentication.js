const { verifyToken } = require("../helpers/jwt");
const { User } = require("../models");

async function authentication(req, res, next) {
    try {
        let token = req.headers.authorization;
        if (!token) {
            throw { name: "Unauthenticated" };
        }
        let [type, kode] = token.split(" ");
        if (type !== "Bearer") {
            throw { name: "Unauthenticated" };
        }

        let payload = verifyToken(kode);
        let user = await User.findByPk(payload.id);
        if (!user) {
            throw { name: "Unauthenticated" };
        }
        req.user = {
            id: user.id,
            role: user.role,
        };
        next();
    } catch (error) {
        next(error);
    }
}
module.exports = authentication;
