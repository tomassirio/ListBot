const Util = require("../utils/utils.js");
const Channel = require("../models/Channel")
const Item = require("../models/Item.js")

module.exports = {
    name: 'random',
    description: 'Gets a random element from the list',
    execute: async (message, args) => {
        var channel = message.channel
    
        var randomItem

        const settings = await Channel.findOne({
            channelId: channel.id
        }, (err, foundChannel) => {
            if(!foundChannel){
                const newChannel = new Channel({
                    channelId: channel.id,
                    server: channel.guild.name,
                    name: channel.name,
                    items: []
                })
                newChannel.save()
                .then(result => console.log(result))
                .catch(err => console.error(err))
            }
            var items = foundChannel.items
            randomItem = items[Math.floor(Math.random()*items.length)];
            console.log(randomItem.content)
        })


        var embededMessage = Util.embedMessage("The random entry of the list is", "0xff0000", randomItem.content)
        channel.send(embededMessage)
    },
};