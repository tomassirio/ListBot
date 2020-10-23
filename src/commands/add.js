const Util = require('../utils/utils.js')
const Item = require('../models/Item.js')
const ChannelRepository = require('../repositories/channel-repository')
const easterEggCheck = require('./add-eggs').check

module.exports = {
    name: 'add',
    description: 'Add an element to the list',
    execute: async (message, args) => {
        let item = args.join(' ')
        let { channel } = message

        if (easterEggCheck(item, message)) {
            return
        }

        const newItem = new Item({
            content: item,
            author: message.author.tag,
        })

        const dbChannel = await ChannelRepository.findOrCreate(channel)
        dbChannel.items.push(newItem)
        dbChannel.save()

        let embeddedMessage = Util.embedMessage(
            "I've successfully added your element to the list.",
            message.author,
            '0xffff00',
            item
        )
        channel.send(embeddedMessage)
    },
}
