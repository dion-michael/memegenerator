const router = require('express').Router()
const gcs = require('../helpers/google-cloud-storage')
const userController = require('../controllers/userController')
const memeController = require('../controllers/memeController')

router.use('/users', require('./userRoutes.js'))
router.post('/register', userController.register)
router.post('/login', userController.login)
router.get('/memes', memeController.getMemes)
router.get('/analyze', userController.analyze)
// ROUTE TO UPLOAD IMAGE
router.post('/upload', gcs.multer.single('image'), gcs.sendUploadToGCS,
    (req, res, next) => {
        if (!req.file) {
            res.status(404).json({
                code: 404,
                message: "no image selected"
            })
        }
        res.json({
            message: "image upload success",
            link: req.file.cloudStoragePublicUrl
        })
    })

module.exports = router