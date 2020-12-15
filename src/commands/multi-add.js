const Util = require('../utils/utils.js')
const Item = require('../models/Item.js')
const Style = require('../utils/messageStyle.js')
const ChannelRepository = require('../repositories/channel-repository')

module.exports = {
    name: 'multi-add',
    min_args: 1,
    usage: '<element_1>;<element_2>;...;<element_n>',
    delimiter: ';',
    description: 'Add multiple elements to the list',
    execute: async (message, args) => {
        let item = [...args]

        let { channel } = message

        const dbChannel = await ChannelRepository.findOrCreate(channel)

        for (const instance of item) {
            let newItem = new Item({
                content: instance.trim(),
                author: message.author.tag,
            })

            dbChannel.items.push(newItem)
        }

        dbChannel.save()

        const description = item
            .map((msg, i) => `${i + 1}. ${msg.trim()}`)
            .join('\n')

        let embeddedMessage = Util.embedMessage(
            `Added ${item.length} item(s) to \`${channel.name}\`'s List`,
            message.author,
            '0xffff00',
            Style.markDown(description)
        )
        channel.send(embeddedMessage)
    },
}
