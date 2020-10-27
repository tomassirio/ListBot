const Util = require('../utils/utils.js')
const Style = require('../utils/messageStyle.js')
const ChannelRepository = require('../repositories/channel-repository')

module.exports = {
    name: 'random',
    description: 'Gets a random element from the list',
    execute: async (message) => {
        let { channel } = message

        let randomItem

        const { items } = await ChannelRepository.findOrCreate(channel)
        randomItem = items[Math.floor(Math.random() * items.length)]

        const outputMessage = `< ${randomItem.content} >\n${randomItem.author}\n---`

        let embeddedMessage = Util.embedMessage(
            `Random entry from \`${channel.name}\`'s List `,
            message.author,
            '0xff0000',
            Style.markDown(outputMessage)
        )
        channel.send(embeddedMessage)
    },
}
