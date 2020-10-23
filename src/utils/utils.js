const Discord = require('discord.js')

const Utils = {
    embedMessage(title, author, color, description) {
        return new Discord.MessageEmbed()
            .setTitle(title)
            .setColor(color)
            .setDescription(description)
            .setFooter(author.username, author.displayAvatarURL())
            .setTimestamp()
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
