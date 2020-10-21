const config = require('../config')

module.exports = async (client, message) => {
    if (!message.content.startsWith(config.prefix) || message.author.bot) return

    let args = message.content.slice(config.prefix.length).trim().split(/ +/)
    const command = args.shift().toLowerCase()

    if (!client.commands.has(command)) return

    try {
        client.commands.get(command).execute(message, args)
    } catch (error) {
        console.error(error)
        message.reply('There was an error trying to execute that command!')
    }
}
