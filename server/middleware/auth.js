const jwt = require('jsonwebtoken')

function Authenticate(req, res, next) {
    try {
        if (req.headers.hasOwnProperty('token')) {
            const decode = jwt.verify(req.headers.token, process.env.JWT_SECRET)
            req.loggedUser = decode
            next()
        } else {
            throw ({
                code: 401,
                message: "you have to login first"
            })
        }
    } catch (error) {
        next(error)
    }
}

// async function Authorize(req, res, next) {
//     try {
//         let result = await Article.findById(req.params.articleId)
//         if (result) {
//             if (result._id === req.loggedUser._id) {
//                 next()
//             } else {
//                 throw ({
//                     code: 401,
//                     message: "not authorized"
//                 })
//             }
//         } else {
//             throw ({
//                 code: 404,
//                 message: "project not found"
//             })
//         }
//     } catch (error) {
//         next(error)
//     }
// }

module.exports = {
    Authenticate,
    // Authorize
}