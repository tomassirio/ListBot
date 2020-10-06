const Util = require("../utils/utils.js");
const Item = require("../models/Item.js")
const ChannelRepository = require("../repositories/channel-repository");
const Channel = require("../models/Channel.js");

module.exports = {
    name: 'addmany',
    description: 'Add multiple elements to the list',
    execute: async (message, args) => {
        let items = args;
        let channel = message.channel;

        
        for (let i = 0; i < items.length; i++) {
            const newItem = new Item({
                content: items[i],
                author: message.author.username,
            })

            const dbChannel = await ChannelRepository.findOrCreate(channel)
            dbChannel.items.push(newItem)
            dbChannel.save();
        }



        let embededMessage = Util.embedMessage("Succesfully added items", "0xffff00", items)
        channel.send(embededMessage);

    },
};