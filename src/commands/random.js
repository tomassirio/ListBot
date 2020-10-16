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

        let embededMessage = Util.embedMessage(
            'The random entry of the list is',
            message.author.tag,
            '0xff0000',
            `${randomItem.content}.\n\n Element was added by : ${randomItem.author}`
        )
        channel.send(embededMessage)
    },
}
