const Util = require('../utils/utils.js')
const ChannelRepository = require('../repositories/channel-repository')

module.exports = {
    name: 'random',
    description: 'Gets a random element from the list',
    execute: async (message) => {
        let { channel } = message

        let randomItem

        const { items } = await ChannelRepository.findOrCreate(channel)
        randomItem = items[Math.floor(Math.random() * items.length)]

        console.log(`Randomly selected ${randomItem.content}`)

        let embeddedMessage = Util.embedMessage(
            `Random entry from \`${channel.name}\`'s List `,
            message.author,
            '0xff0000',
            `\`\`\`nim\n${randomItem.content}    -    '${randomItem.author}'\`\`\``
        )
        channel.send(embeddedMessage)
    },
}
