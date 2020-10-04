const Util = require("../utils/utils.js");
const ChannelRepository = require("../repositories/channel-repository")

module.exports = {
    name: 'random',
    description: 'Gets a random element from the list',
    execute: async (message, args) => {
        let channel = message.channel

        let randomItem

        const { items } = await ChannelRepository.findOrCreate(channel)
        randomItem = items[Math.floor(Math.random()*items.length)];
        console.log(randomItem.content)


        let embededMessage = Util.embedMessage("The random entry of the list is", "0xff0000", randomItem.content)
        channel.send(embededMessage)
    },
};
