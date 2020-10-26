const Util = require('../utils/utils.js')
const ChannelRepository = require('../repositories/channel-repository')

module.exports = {
    name: 'multi-remove',
    min_args: 2,
    usage: "<start_index> <end_index>",
    description: 'Removes multiple elements from the list',
    execute: async (message, args) => {
        let { channel } = message
        let indexFrom = args[0] - 1
        let indexTo = args[1] - 1
        let numOfItems = indexTo - indexFrom + 1
        let embedColor = ''
        let embedMessage = ';'

        const dbChannel = await ChannelRepository.findOrCreate(channel)

        if (indexTo > dbChannel.items.length || indexFrom < 0) {
            embedColor = '0xff0000'
            embedMessage =
                'Could not delete items specified! Check that there are items in the index range you entered!'
        } else {
            dbChannel.items.splice(indexFrom, numOfItems)
            dbChannel.save()
            embedColor = '0xffff00'
            embedMessage = `Successfully deleted items from index ${
                indexFrom + 1
            } to ${indexTo + 1}`
        }

        let embeddedMessage = Util.embedMessage(
            embedMessage,
            message.author.tag,
            embedColor,
            ''
        )
        channel.send(embeddedMessage)
    },
}
