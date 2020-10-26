const Util = require('../utils/utils.js')

module.exports = {
    name: 'ping',
    description: 'Check the bot latency',
    execute: async (message) => {
        const m = await message.channel.send('Please wait...')
        let embeddedMessage = Util.embedMessage(
            'Stats',
            message.author,
            'RANDOM',
            ''
        )
            .addField(
                '⌛ Latency',
                `**${m.createdTimestamp - message.createdTimestamp}ms**`
            )
            .addField('💓 API', `**${Math.floor(message.client.ws.ping)}ms**`)

        return m.edit(`🏓 Poong!`, embeddedMessage)
    },
}
