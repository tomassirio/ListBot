const Util = require('../utils/utils.js')
const Item = require('../models/Item.js')
const ChannelRepository = require('../repositories/channel-repository')

module.exports = {
    name: 'multi-add',
    description: 'Add multiple elements to the list',

    execute: async (message, args) => {
        let item = [...args]

        let { channel } = message

        const dbChannel = await ChannelRepository.findOrCreate(channel)

        for (const instance of item) {
            let newItem = new Item({
                content: instance,
                author: message.author.tag,
            })

            dbChannel.items.push(newItem)
        }

        dbChannel.save()

        let listItems = item.map(
            (listItem) => `"${listItem}"    -    ${message.author.tag}`
        )

        let embeddedMessage = Util.embedMessage(
            `Added ${item.length} item(s) to \`${channel.name}\`'s List`,
            message.author,
            '0xffff00',
            `\`\`\`nim\n${listItems.join('\n')}\`\`\``
        )
        channel.send(embeddedMessage)
    },
}
