let Util = require("../utils/utils.js");
const Channel = require("../models/Channel")

module.exports = {
    name: 'list',
    description: 'Lists all the elements of the list',
    execute: async (message, args) => {
        let channel = message.channel
            
        let fields = []

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
            let i = 0
            for (let item of foundChannel.items) {
                fields.push({ 
                    name: `${i} - ${item.author}`,
                    value: item.content
                })
                i++
            }
        })

        let embededMessage = Util.generateListEmbed(channel.name + " list", "0xffff00", fields, `Requested by ${message.author.username}`)
        channel.send(embededMessage);
    },
};