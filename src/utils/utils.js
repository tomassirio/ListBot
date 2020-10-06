const Discord = require("discord.js")

let Utils = {
    embedMessage: function (message, color, item) {
        const embed = new Discord.MessageEmbed()
        .setTitle(message)
        .setColor(color)
        .setDescription(item);
        return embed
    },
    generateListEmbed: function (title, color, fields, footer){
        const embed =  new Discord.MessageEmbed({
            title,
            color,
            timestamp: new Date(),
            fields,
        });

        if (footer) {
            embed.setFooter(footer)
        }

        return embed;
    },
    createSet: function (channel, map){
        let set = new Set()
        map.set(channel, set)
    }
}

module.exports = Utils;