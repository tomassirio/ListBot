const path = require('path')
const fs = require('fs').promises
const Util = require('../utils/utils.js')

module.exports = {
    name: 'log',
    description: 'Gets info from the bot',
    execute: async (message) => {
        let { channel } = message
        const log = await fs.readFile(path.join(__dirname, '../../CHANGELOG'))

        let embeddedMessage = Util.embedMessage(
            'Log version',
            message.author,
            '0xff0000',
            log
        )
        channel.send(embeddedMessage)
    },
}
