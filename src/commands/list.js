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
            const emptyMessage = Util.embedMessage('Warning', '0xffff00' , message.author.tag , "No items found, please use the 'add {element}' command to put your first item.")
            return channel.send(emptyMessage)
        }

        let i = 1
        for (let item of dbChannel.items) {
            fields.push({
                name: `${i} - ${item.content}`,
                value: item.author
            })
            i++
        }

        let channelName = channel.name;
        channelName = channelName.charAt(0).toUpperCase() + channelName.slice(1) // Capitalize the first letter in the channel name.

        let embededMessage = Util.generateListEmbed(channelName + " List", "0xffff00", fields, `Requested by ${message.author.tag}`)
        channel.send(embededMessage);
    },
};
