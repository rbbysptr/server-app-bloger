const { User } = require('../models');
const bcryptjs = require("bcryptjs");
const { signToken } = require('../helpers/jwt');
class UserController {
    static async registerUser(req, res) {
        try {
            let { email, password, phoneNumber, address } = req.body;
            const role = req.body.role || 'staff';
            await User.create({ email, password, role, phoneNumber, address });
            res.status(201).json({
                message: 'User registered successfully'});
        } catch (error) {
            console.log(error)
        }
    }

    static async loginUser(req, res, next) {
        try {
            let { email, password } = req.body;

            if (!email || !password) {
                throw { name: "InvalidInput" }
            }

            const user = await User.findOne({
                where: { email }
            });

            if (!user) {
                throw { name: "InvalidUser" };
            }

            const compare = bcryptjs.compareSync(password, user.password);
            if (!compare) {
                throw { name: "InvalidUser" };
            }
            let token = signToken({
                id: user.id
            });

            res.status(200).json({
                access_token: token
            });
        } catch (error) {
            next(error);
        }
    }

}

module.exports = UserController;
