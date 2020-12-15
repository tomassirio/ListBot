const fs = require('fs')
const config = require('../config')
const Util = require('../utils/utils.js')
const Style = require('../utils/messageStyle.js')

const COMMANDS_FOLDER = './src/commands'

module.exports = {
    name: 'help',
    description: 'Gets the bot commands',
    execute(message) {
        let { channel } = message

        // [syntax, description]
        let commands = []

        fs.readdirSync(COMMANDS_FOLDER).forEach((file) => {
            // eslint-disable-next-line import/no-dynamic-require,global-require
            const command = require(`./${file}`)
            if (
                !Object.prototype.hasOwnProperty.call(command, 'name') ||
                !Object.prototype.hasOwnProperty.call(command, 'description')
            )
                return

            const usage = command.usage != null ? ` ${command.usage}` : ''
            commands.push([`${command.name}${usage}`, command.description])
        })

        let msg = commands
            .map(
                ([syntax, description]) =>
                    `${config.prefix}${syntax} = "${description}"`
            )
            .join('\n')
        let embeddedMessage = Util.embedMessage(
            "List Bot's Help Message",
            message.author,
            '0xffff00',
            Style.bash(msg)
        )
        channel.send(embeddedMessage)
    },
}
