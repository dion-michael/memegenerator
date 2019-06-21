const axios = require('axios')

module.exports = axios.create({
    baseURL: "https://api.imgflip.com/"
})