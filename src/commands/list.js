let Util = require('../utils/utils.js')
const Style = require('../utils/messageStyle.js')
const ChannelRepository = require('../repositories/channel-repository')

const MAX_EMBED_SIZE = 1900

module.exports = {
    name: 'list',
    description: 'Lists all the elements of the list',
    execute: async (message) => {
        let { channel } = message
        let channelName = channel.name

        let dbChannel = await ChannelRepository.findOrCreate(channel)

        if (!dbChannel.items || dbChannel.items.length === 0) {
            const emptyMessage = Util.embedMessage(
                `List empty for \`${channelName}\``,
                message.author,
                '0xffff00',
                message.author.tag,
                Style.error(
                    "No items found, please use the 'add {element}' command to put your first item."
                )
            )
            channel.send(emptyMessage)
            return
        }

        let fields = []
        let size = 0

        function send() {
            let embeddedMessage = Util.embedMessage(
                `List for \`${channelName}\``,
                message.author,
                '0xffff00',
                Style.markDown(fields.join('\n'))
            )
            channel.send(embeddedMessage)
        }

        dbChannel.items.forEach((item, i) => {
            let line = `${i + 1}. < ${item.content} >\n${item.author}\n---`
            let len = line.length
            if (size + len >= MAX_EMBED_SIZE) {
                size = 0

                send()
                fields = []
            }

            fields.push(line)
            size += len
        })

        send()
    },
}
