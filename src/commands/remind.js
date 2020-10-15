const Util = require('../utils/utils.js')

module.exports = {
    name: 'remind',
    description: 'Bot reminds of an item in channel after specific time',
    execute: async (message, [minutes, ...elements]) => {
        let { channel } = message

        if (minutes === undefined) {
            let embededMessage = Util.embedMessage(
                `Please specify time for the reminder`,
                message.author.tag,
                '0xffff00',
                "I.e. '$remind 5 Hello World!'"
            )
            channel.send(embededMessage)
            return
        }

        if (isNaN(minutes)) {
            let embededMessage = Util.embedMessage(
                `Time given is not a number`,
                message.author.tag,
                '0xffff00',
                "I.e. '$remind 5 Hello World!'"
            )
            channel.send(embededMessage)
            return
        }

        let item = elements.map((curItem) => `${curItem} `) // TODO should this be a join?

        if (item === '') {
            let embededMessage = Util.embedMessage(
                `Please enter a non-blank item`,
                message.author.tag,
                '0xffff00',
                ''
            )
            channel.send(embededMessage)
            return
        }

        let embededMessage = Util.embedMessage(
            `I've succesfully added your element to the list and will remind you in ${minutes} minutes.`,
            message.author.tag,
            '0xffff00',
            item
        )
        channel.send(embededMessage)

        setTimeout(() => {
            let remindMessage = Util.embedMessage(
                `REMINDER!`,
                message.author.tag,
                '0xffff00',
                item
            )
            channel.send(remindMessage)
        }, minutes * 60000)
    },
}
