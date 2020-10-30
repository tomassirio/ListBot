const Util = require('../utils/utils.js')
const Style = require('../utils/messageStyle.js')

module.exports = {
    name: 'remind',
    description: 'Bot reminds of an item in channel after specific time',
    execute: async (message, [minutes, ...elements]) => {
        let { channel } = message

        if (minutes === undefined) {
            let embeddedMessage = Util.embedMessage(
                `Please specify time for the reminder`,
                message.author,
                '0xffff00',
                Style.error("I.e. '$remind 5 Hello World!'")
            )
            channel.send(embeddedMessage)
            return
        }

        if (isNaN(minutes)) {
            let embeddedMessage = Util.embedMessage(
                `Time given is not valid`,
                message.author,
                '0xffff00',
                Style.error("I.e. '$remind 5 Hello World!'")
            )
            channel.send(embeddedMessage)
            return
        }

        let item = elements.map((curItem) => `${curItem} `) // TODO should this be a join?

        if (item === '') {
            let embeddedMessage = Util.embedMessage(
                `Please enter a non-blank item`,
                message.author,
                '0xffff00',
                ''
            )
            channel.send(embeddedMessage)
            return
        }

        let embeddedMessage = Util.embedMessage(
            `I've successfully added your element to the list and will remind you in ${minutes} minutes.`,
            message.author,
            '0xffff00',
            Style.green(item)
        )
        channel.send(embeddedMessage)

        setTimeout(() => {
            let remindMessage = Util.embedMessage(
                `REMINDER!`,
                message.author,
                '0xffff00',
                Style.warn(item)
            )
            channel.send(remindMessage)
        }, minutes * 60000)
    },
}
