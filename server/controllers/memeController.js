let Meme = require('../helpers/memes')

class memeController {

    static async getMemes(req, res, next) {
        try {
            let {
                data
            } = await Meme({
                url: '/get_memes',
                method: 'GET'
            })
            console.log(data.data.memes.length);
            res.json(data.data.memes)
        } catch (error) {
            next(error)
        }
    }

}

module.exports = memeController