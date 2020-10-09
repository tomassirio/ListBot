const Util = require('../utils/utils.js')
const Channel = require('../models/Channel')
const ChannelRepository = require('../repositories/channel-repository')

module.exports = {
    name: 'remove',
    description: 'Removes an element from the list',
    execute: async (message, args) => {
        let channel = message.channel
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
            embedMessage = `Successfully deleted item of index ${itemIndex + 1}`
            embedColor = '0xffff00'
        }

        // send embeded message
        let embededMessage = Util.embedMessage(
            embedMessage,
            message.author.id,
            embedColor,
            ''
        )
        channel.send(embededMessage)
    },
}
