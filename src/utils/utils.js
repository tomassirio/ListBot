const Discord = require('discord.js')

const Utils = {
    embedMessage(title, author, color, description) {
        return new Discord.MessageEmbed()
            .setTitle(title)
            .setColor(color)
            .setDescription(description)
            .setFooter(author)
            .setTimestamp()
    },
}

module.exports = Utils
