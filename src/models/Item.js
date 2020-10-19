const mongoose = require('mongoose')
const { encrypt } = require('../utils/encrypt')

const itemSchema = new mongoose.Schema({
    content: {
        default: '',
        type: String,
    },
    author: {
        default: '',
        type: String,
    },
})

itemSchema.plugin(encrypt)

module.exports = mongoose.model('Item', itemSchema, 'listTest')
