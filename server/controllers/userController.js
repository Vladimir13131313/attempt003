const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {SECRET_KEY} = require("../utils/consts");

const salt = bcrypt.genSaltSync(10);

const JWTtranslation =(email, userId) => {
    return jwt.sign({
        email,
        userId
    }, SECRET_KEY, {expiresIn: 3600})
}

class userController {

    async registration(req, res) {
        const checkUser = await User.findOne({email: req.body.email});

        if(checkUser) {
            return res.json({
                nonAuth: true,
                message: "This user already exists"
            })
        } else {
            const user = new User ({
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, salt)
            });

            try {
                await user.save();
                const token = JWTtranslation(user.email, user._id);
                return res.status(200).json({
                    token: `Bearer ${token}`
                });
            } catch(e) {
                // error handler
            }
        }
    }

    async login(req, res) {
        const user = await User.findOne({email: req.body.email});

        if(user) {
            const comparePasswords = bcrypt.compareSync(req.body.password, user.password)
            if (comparePasswords) {
                const token = JWTtranslation(user.email, user._id);
                return res.status(200).json({
                    token: `Bearer ${token}`
                })
            } else {
                return res.json({
                    nonAuth: true,
                    message: "Passwords don't match"
                })
            }
        } else {
            return res.json({
                nonAuth: true,
                message: "This user has not been found"
            })
        }
    }

}

module.exports = new userController()