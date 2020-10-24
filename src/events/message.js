const config = require('../config');
const Util = require('../utils/utils');

module.exports = async (client, message) => {
    if (!message.content.startsWith(config.prefix) || message.author.bot) return

    let args = message.content.slice(config.prefix.length).trim().split(/ +/)
    const commandName = args.shift().toLowerCase()

    if (!client.commands.has(commandName)) return

    const command = client.commands.get(commandName);

    if (command.min_args > args.length) {
        let embeddedMessage = Util.embedMessage(
            'You didn\'t provide enough arguments!',
            message.author.tag,
            '0xffff00',
            `The correct usage would be: ${config.prefix}${commandName} ${command.usage}`
        )
        return message.channel.send(embeddedMessage)
    }

    try {
        command.execute(message, args)
    } catch (error) {
        console.error(error)
        message.reply('There was an error trying to execute that command!')
    }
}
