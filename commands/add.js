const Util = require("../utils/utils.js");
const Item = require("../models/Item.js")
const Channel = require("../models/Channel")

module.exports = {
    name: 'add',
    description: 'Add an element to the list',
    execute: async (message, args) => {
        var item = ""
        for(var i = 0; i < args.length; i++){
            item += args[i] + " "
        }
        var channel = message.channel

        const newItem = new Item({
            content: item,
            author: message.author.username,
        })

        const settings = await Channel.findOne({
            channelId: channel.id
        }, (err, foundChannel) => {
            if(foundChannel){
                foundChannel.items.push(newItem)
                foundChannel.save()
                .then(result => console.log(result))
                .catch(err => console.error(err))
            }
            else{
                const newChannel = new Channel({
                    channelId: channel.id,
                    server: channel.guild.name,
                    name: channel.name,
                    items: []
                })
                newChannel.items.push(newItem)
                newChannel.save()
                .then(result => console.log(result))
                .catch(err => console.error(err))
            }
        })

        var embededMessage = Util.embedMessage("Succesfully added", "0xffff00", item)
        channel.send(embededMessage);
    
    },
};