const Util = require('../utils/utils.js')
const path = require('path')
const fs = require('fs').promises

module.exports = {
    name: 'log',
    description: 'Gets info from the bot',
    execute: async (message, args) => {
        let channel = message.channel
        const log = await fs.readFile(path.join(__dirname, '../../CHANGELOG'))

        let embededMessage = Util.embedMessage(
            'Log version',
            message.author.tag,
            '0xff0000',
            log
        )
        channel.send(embededMessage)
    },
}
