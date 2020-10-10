const Util = require('../utils/utils.js')
require('dotenv').config()

module.exports = {
    name: 'help',
    description: 'Gets the bot commands',
    execute(message, args) {
        let channel = message.channel

        // [syntax, description]
        let commands = [
            ['add {element}', 'to add an element to the list'],
            [
                'multi-add {element} {element}',
                'to add multiple elements to the list',
            ],
            [('remove {element}', 'to remove an element from the list')],
            [
                'multi-remove {element} {element}',
                'to remove multiple elements from the list',
            ],
            [('list', 'to list every element on the list')],
            ['random', 'gets a random element from the list'],
            [
                'poll {active_time_in_minutes}',
                'creates a poll on the channel for 5 random elements. WIP',
            ],
            ['log', "gets the bot's log"],
            [
                'remind {time_in_minutes} {element}',
                'to add an item and be reminded in n minutes',
            ],
            ['help', 'to see this message'],
        ]

        let msg = commands
            .map(
                ([syntax, description]) =>
                    `**${process.env.PREFIX}${syntax}** - ${description}`
            )
            .join('\n')
        let embededMessage = Util.embedMessage(
            'List Bot Help Message',
            message.author.tag,
            '0xffff00',
            msg
        )
        channel.send(embededMessage)
    },
}
