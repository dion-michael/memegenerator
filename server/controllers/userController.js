const User = require("../models/User")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

class userController {

    static getAll(req, res) {
        res.status(200).json({
            msg: 'masuk'
        })
    }

    static async register(req, res, next) {
        let newUser = new User({
            email: req.body.email,
            password: req.body.password
        })
        try {
            res.json(await newUser.save())
        } catch (error) {
            next(error)
        }
    }

    static async login(req, res, next) {
        try {
            let user = await User.findOne({
                email: req.body.email
            })
            if (user) {
                let isValid = bcrypt.compareSync(req.body.password, user.password)
                if (isValid) {
                    let token = jwt.sign({
                        username: user.username,
                        email: user.email,
                        id: user._id
                    }, process.env.JWT_SECRET)
                    res.json({
                        token,
                        email: user.email,
                        id: user._id
                    })
                } else {
                    throw ({
                        code: 401,
                        message: "wrong email/password"
                    })
                }
            } else {
                throw ({
                    code: 404,
                    message: "wrong email/password"
                })
            }
        } catch (error) {
            next(error)
        }
    }

}

module.exports = userController