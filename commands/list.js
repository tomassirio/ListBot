let Util = require("../utils/utils.js");
const Channel = require("../models/Channel")

module.exports = {
    name: 'list',
    description: 'Lists all the elements of the list',
    execute: async (message, args) => {
        let channel = message.channel
            
        let fields = []


        try {
            let foundChannel = await Channel.findOne({
                channelId: channel.id
            });

            if(!foundChannel) {
                const foundChannel = new Channel({
                    channelId: channel.id,
                    server: channel.guild.name,
                    name: channel.name,
                    items: []
                })

                foundChannel.save()
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
            if (! foundChannel.items || foundChannel.items.length === 0) {
                msg = "No items found, please use the 'add {element}' command to put your first item."
            } else {
                let i = 0
                for (let item of foundChannel.items) {
                    msg += "[" + i + "]\t" + item.content + "\t\t" + item.author + "\n"
                    i++
                }
            }
        } catch (e) {
            console.log(e)
            msg = "Unable to generate the list, please try again."
        }

        let embededMessage = Util.generateListEmbed(channel.name + " list", "0xffff00", fields, `Requested by ${message.author.username}`)
        channel.send(embededMessage);
    },
};
