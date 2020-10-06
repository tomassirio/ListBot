let Util = require("../utils/utils.js");
const ChannelRepository = require("../repositories/channel-repository")

module.exports = {
    name: 'list',
    description: 'Lists all the elements of the list',
    execute: async (message) => {
        let channel = message.channel
        let fields = []
        let dbChannel = await ChannelRepository.findOrCreate(channel)

        if (! dbChannel.items || dbChannel.items.length === 0) {
            const emptyMessage = Util.embedMessage('Warning', '0xffff00', "No items found, please use the 'add {element}' command to put your first item.")
            channel.send(emptyMessage)

            return
        }

        let i = 1
        for (let item of dbChannel.items) {
            fields.push({
                name: `${i} - ${item.author}`,
                value: item.content
            })
            i++
        }

        let embededMessage = Util.generateListEmbed(channel.name + " list", "0xffff00", fields, `Requested by ${message.author.username}`)
        channel.send(embededMessage);
    },
};
