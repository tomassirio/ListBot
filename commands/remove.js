const Util = require("../utils/utils.js");
const Channel = require("../models/Channel")

module.exports = {
    name: 'remove',
    description: 'Removes an element from the list',
    execute: async (message, args) => {
        var channel = message.channel
        var itemToRemove = args[0]    

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
            Channel.updateOne( {channelId: channel.id}, { $pullAll: {content: [itemToRemove] } } )
        })

        var embededMessage = Util.embedMessage("There was no such an item", "0xff0000", "The solicited item: " + itemToRemove + " was not on the list")
        channel.send(embededMessage);
    },
};