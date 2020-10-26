const Util = require('../utils/utils.js')
const ChannelRepository = require('../repositories/channel-repository')

module.exports = {
    name: 'remove',
    min_args: 1,
    usage: '<index>',
    description: 'Removes an element from the list',
    execute: async (message, args) => {
        let { channel } = message
        let itemIndex = Number(args[0]) - 1
        let embedMessage = ''
        let embedColor = ''

        const dbChannel = await ChannelRepository.findOrCreate(channel)

        // Check if item exists
        if (itemIndex + 1 > dbChannel.items.length || itemIndex < 0) {
            // give error
            embedMessage = `Could not find item of index ${itemIndex + 1}`
            embedColor = '0xff0000'
        } else {
            // remove item
            dbChannel.items.splice(itemIndex, 1)
            dbChannel.save()
            embedMessage = `Removed one item with index ${
                itemIndex + 1
            } from \`${channel.name}\`'s List`
            embedColor = '0xffff00'
        }

        // send embedded message
        let embeddedMessage = Util.embedMessage(
            embedMessage,
            message.author,
            embedColor,
            ''
        )
        channel.send(embeddedMessage)
    },
}
