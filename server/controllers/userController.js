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

    static async analyze(req, res, next) {
        const language = require('@google-cloud/language');

        // Creates a client
        const client = new language.LanguageServiceClient();

        /**
         * TODO(developer): Uncomment the following line to run this code.
         */
        const text = 'Your text to analyze, e.g. Hello, world!';

        // Prepares a document, representing the provided text
        const document = {
            content: text,
            type: 'PLAIN_TEXT',
        };

        // Detects entities in the document
        const [result] = await client.analyzeEntities({
            document
        });

        const entities = result.entities;

        console.log('Entities:');
        entities.forEach(entity => {
            console.log(entity.name);
            console.log(` - Type: ${entity.type}, Salience: ${entity.salience}`);
            if (entity.metadata && entity.metadata.wikipedia_url) {
                console.log(` - Wikipedia URL: ${entity.metadata.wikipedia_url}$`);
            }
        });
        res.json(entities)
    }

}

module.exports = userController