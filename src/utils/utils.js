const Discord = require('discord.js')

const Utils = {
    embedMessage(title, author, color, description) {
        console.log(author)
        return new Discord.MessageEmbed()
            .setTitle(title)
            .setColor(color)
            .setDescription(description)
            .setFooter(author.username, author.displayAvatarURL())
            .setTimestamp()
    },
}

module.exports = Utils
