const Util = require('../utils/utils.js')
const ChannelRepository = require('../repositories/channel-repository')

module.exports = {
    name: 'clear',
    description: 'Remove all element in the list for the specific channel.',
    execute: async (message) => {
        const { channel } = message

        const dbChannel = await ChannelRepository.findOrCreate(channel)
        dbChannel.items = []
        dbChannel.save()

        const embedMessage = Util.embedMessage(
            `Cleared \`${channel.name}\`'s List`,
            message.author,
            '0xffff00',
            'The list is now empty.'
        )
        channel.send(embedMessage)
    },
}
