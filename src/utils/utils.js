// eslint-disable-next-line import/no-unresolved
const Discord = require('discord.js')

const Utils = {
    embedMessage(message, author, color, item) {
        const embed = new Discord.MessageEmbed()
            .setTitle(message)
            .setColor(color)
            .setDescription(item)
            .setFooter(author)
            .setTimestamp()
        return embed
    },
    generateListEmbed(title, color, fields, footer) {
        const embed = new Discord.MessageEmbed({
            title,
            color,
            timestamp: new Date(),
            fields,
        })

        if (footer) {
            embed.setFooter(footer)
        }

        return embed
    },
    createSet(channel, map) {
        const set = new Set()
        map.set(channel, set)
    },
}

module.exports = Utils
