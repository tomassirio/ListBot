var Util = require("../utils/utils.js");
const Channel = require("../models/Channel")

module.exports = {
    name: 'list',
    description: 'Lists all the elements of the list',
    execute: async (message, args) => {
        var channel = message.channel
            
        let msg = ""

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
            var i = 0
            for (let item of foundChannel.items) {
                msg += "[" + i + "]\t" + item.content + "\t\t" + item.author + "\n"
                i++
            }
        })

        console.log(msg)
        var embededMessage = Util.embedMessage(channel.name + " list", "0xffff00", msg)
        channel.send(embededMessage);
    },
};