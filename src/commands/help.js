const config = require('../config')
const Util = require('../utils/utils.js')
const Style = require('../utils/messageStyle.js')

module.exports = {
    name: 'help',
    description: 'Gets the bot commands',
    execute(message) {
        let { channel } = message

        // [syntax, description]
        let commands = [
            ['add {element}', 'to add an element to the list'],
            [
                'multi-add {element} {element}',
                'to add multiple elements to the list',
            ],
            ['remove {element}', 'to remove an element from the list'],
            [
                'multi-remove {element} {element}',
                'to remove multiple elements from the list',
            ],
            ['list', 'to list every element on the list'],
            ['random', 'gets a random element from the list'],
            [
                'poll {active_time_in_minutes} [{number_of_items}]',
                'creates a poll on the channel for 2 to 9 random elements. ' +
                    'Uses 5 elements by default. If you want a poll with custom number of elements ' +
                    'with no poll time limit, set the time as 0.',
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
