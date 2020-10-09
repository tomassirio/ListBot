const { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'ping',
    description: 'Check the bot latency',
    execute: async (message, args) => {
        try {
            const eM = await message.channel.send('Please wait...')

            let embed = new Discord.MessageEmbed()

                .addField(
                    '⌛ Latency',
                    `**${m.createdTimestamp - message.createdTimestamp}ms**`
                )
                .addField('💓 API', `**${Math.floor(client.ws.ping)}ms**`)
                .setAuthor(
                    message.author.username,
                    message.author.displayAvatarURL
                )
                .setColor('RANDOM')
                .setTimestamp()
            return eM.edit(`🏓 Pong!`, embed)
        } catch (error) {
            return message.channel.send(
                `Something went wrong: ${error.message}`
            )
        }
    },
}
