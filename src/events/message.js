const config = require('../config')
const Style = require('../utils/messageStyle')
const Util = require('../utils/utils')

module.exports = async (client, message) => {
    if (!message.content.startsWith(config.prefix) || message.author.bot) return

    const splitMessage = message.content
        .slice(config.prefix.length)
        .trim()
        .split(/ /)
    let [commandName, args] = [
        splitMessage.shift().toLowerCase(),
        splitMessage.join(' '),
    ]

    if (!client.commands.has(commandName)) return

    const command = client.commands.get(commandName)
    if (args != null) args = args.split(command.delimiter ?? / +/)

    if (
        Object.prototype.hasOwnProperty.call(command, 'min_args') &&
        command.min_args > args.length
    ) {
        let embeddedMessage = Util.embedMessage(
            "You didn't provide enough arguments!",
            message.author,
            '0xffff00',
            Style.warn(
                `The correct usage would be: \n${config.prefix}${commandName} ${command.usage}`
            )
        )
        message.channel.send(embeddedMessage)
        return
    }

    try {
        command.execute(message, args)
    } catch (error) {
        console.error(error)
        message.reply('There was an error trying to execute that command!')
    }
}
