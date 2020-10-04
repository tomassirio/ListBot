const Util = require("../utils/utils.js");
const Channel = require("../models/Channel")
const ChannelRepository = require("../repositories/channel-repository")

module.exports = {
    name: 'remove',
    description: 'Removes an element from the list',
    execute: async (message, args) => {
        let channel = message.channel
        let itemToRemove = args[0]

        await ChannelRepository.findOrCreate(channel)
        Channel.updateOne( {channelId: channel.id}, { $pullAll: {content: [itemToRemove] } } )

        let embededMessage = Util.embedMessage("There was no such an item", "0xff0000", "The solicited item: " + itemToRemove + " was not on the list")
        channel.send(embededMessage);
    },
};
