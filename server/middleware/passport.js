const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const mongoose = require('mongoose')
const {SECRET_KEY} = require("../utils/consts");
const User = mongoose.model("users");

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken('jwt'),
    secretOrKey: SECRET_KEY
}

module.exports = passport => {
    passport.use(
        new JwtStrategy(options, async function(playload, done) {
            const user = await User.findById(playload.userId).select("email id");
            try {
                if(user) {
                    done(null, user)
                } else {
                    done(null, false)
                }
            } catch (e) {
                console.log(e)
            }

        })
    )
}