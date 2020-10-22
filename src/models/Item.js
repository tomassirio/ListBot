const mongoose = require('mongoose')

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

module.exports = mongoose.model('Item', itemSchema, 'listTest')
