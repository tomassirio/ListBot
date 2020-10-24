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
                message.author,
                "No items found, please use the 'add {element}' command to put your first item."
            )
            channel.send(emptyMessage)
            return
        }

        let listItems = dbChannel.items.map(
            (item, i) => `${i + 1}) ${item.content}    -    '${item.author}'`
        )

        let channelName = channel.name
        channelName = channelName.charAt(0).toUpperCase() + channelName.slice(1) // Capitalize the first letter in the channel name.

        let embeddedMessage = Util.embedMessage(
            `List for \`${channelName}\``,
            message.author,
            '0xffff00',
            `\`\`\`nim\n${listItems.join('\n')}\`\`\``
        )
        channel.send(embeddedMessage)
    },
}
