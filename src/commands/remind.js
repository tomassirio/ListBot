const Util = require("../utils/utils.js");
const Item = require("../models/Item.js")
const ChannelRepository = require("../repositories/channel-repository")

module.exports = {
    name: 'remind',
    description: 'Bot reminds of an item in channel after specific time',
    execute: async (message, args) => {
        let item = ""
        let time = args[0]
        for(let i = 1; i < args.length; i++){
            item += args[i] + " "
        }
        let channel = message.channel

        const newItem = new Item({
            content: item,
            author: message.author.tag
        })

        const dbChannel = await ChannelRepository.findOrCreate(channel)
        dbChannel.items.push(newItem)
        dbChannel.save()

        let embededMessage = Util.embedMessage(`I've succesfully added your element to the list and will remind you in ${time} minutes.` , message.author.tag, "0xffff00", item)
        channel.send(embededMessage);

        setTimeout(() => {
          let remindMessage = Util.embedMessage(`REMINDER!` , message.author.tag, "0xffff00", item)
          channel.send(remindMessage);
        }, time * 60000);

    },
};
