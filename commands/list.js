let Util = require("../utils/utils.js");
const Channel = require("../models/Channel")

module.exports = {
    name: 'list',
    description: 'Lists all the elements of the list',
    execute: async (message, args) => {
        let channel = message.channel

        let msg = ""

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

        console.log(msg)
        let embededMessage = Util.embedMessage(channel.name + " list", "0xffff00", msg)
        channel.send(embededMessage);
    },
};
