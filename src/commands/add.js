const Util = require('../utils/utils.js')
const Item = require('../models/Item.js')
const ChannelRepository = require('../repositories/channel-repository')

module.exports = {
    name: 'add',
    description: 'Add an element to the list',
    execute: async (message, args) => {
        let item = args.join(' ')
        let { channel } = message


        const newItem = new Item({
            content: item,
            author: message.author.tag,
        })

        const dbChannel = await ChannelRepository.findOrCreate(channel)
        dbChannel.items.push(newItem)
        dbChannel.save()

        let embededMessage = Util.embedMessage(
            "I've succesfully added your element to the list.",
            message.author.tag,
            '0xffff00',
            item
        )
        channel.send(embededMessage)
    },
}
