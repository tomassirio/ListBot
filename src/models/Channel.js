const mongoose = require('mongoose')

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

module.exports = mongoose.model('Channel', channelSchema, 'listBot')
