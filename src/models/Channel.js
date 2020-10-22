const mongoose = require('mongoose')
const { encrypt, decrypt } = require('../utils/encrypt')

const channelSchema = new mongoose.Schema({
    channelId: {
        default: '1',
        type: String,
    },
    name: {
        default: 'emptyChannel',
        type: String,
    },
    server: {
        default: 'emptyServer',
        type: String,
    },
    items: [],
})

//channelSchema.plugin(encrypt)
//channelSchema.plugin(decrypt)

module.exports = mongoose.model('Channel', channelSchema, 'listBot')
