let Util = require('../utils/utils.js')
const ChannelRepository = require('../repositories/channel-repository')

module.exports = {
    name: 'list',
    description: 'Lists all the elements of the list',
    execute: async (message) => {
        let { channel } = message

        let dbChannel = await ChannelRepository.findOrCreate(channel)

        if (!dbChannel.items || dbChannel.items.length === 0) {
            const emptyMessage = Util.embedMessage(
                'Warning',
                '0xffff00',
                message.author.tag,
                "No items found, please use the 'add {element}' command to put your first item."
            )
            channel.send(emptyMessage)
            return
        }

        let fields = dbChannel.items.map((item, i) => ({
            name: `${i} - ${item.content}`,
            value: item.author,
        }))

        let channelName = channel.name
        channelName = channelName.charAt(0).toUpperCase() + channelName.slice(1) // Capitalize the first letter in the channel name.

        let embededMessage = Util.generateListEmbed(
            `${channelName} List`,
            '0xffff00',
            fields,
            `Requested by ${message.author.tag}`
        )
        channel.send(embededMessage)
    },
}
