const Util = require('../utils/utils.js')
const Style = require('../utils/messageStyle.js')
const ChannelRepository = require('../repositories/channel-repository')

module.exports = {
    name: 'remove',
    description: 'Removes an element from the list',
    execute: async (message, args) => {
        let { channel } = message
        let itemIndex = Number(args[0]) - 1
        let embedMessage
        let embedColor
        let embedTitle

        const dbChannel = await ChannelRepository.findOrCreate(channel)

        // Check if item exists
        if (itemIndex + 1 > dbChannel.items.length || itemIndex < 0) {
            // give error
            embedMessage = Style.error(
                `Could not find item of index ${itemIndex + 1}`
            )
            embedTitle = 'Unable To Remove'
            embedColor = '0xff0000'
        } else {
            // remove item
            dbChannel.items.splice(itemIndex, 1)
            dbChannel.save()
            embedMessage = Style.green(
                `Successfully deleted item of index ${itemIndex + 1}`
            )
            embedTitle = 'Removed Successfully'
            embedColor = '0xffff00'
        }

        // send embedded message
        let embeddedMessage = Util.embedMessage(
            embedTitle,
            message.author,
            embedColor,
            embedMessage
        )
        channel.send(embeddedMessage)
    },
}
