const Discord = require('discord.js')
const ChannelRepository = require('../repositories/channel-repository')

module.exports = {
    name: 'poll',
    description: 'Generates a Poll from 5 random elements on the list',
    execute: async (message, args) => {
        let { channel } = message
        let time = args[0]

        let emojiList = ['1⃣', '2⃣', '3⃣', '4⃣', '5⃣']

        let shuffled

        const { items } = await ChannelRepository.findOrCreate(channel)
        // Shuffle array
        shuffled = Array.from(items).sort(() => 0.5 - Math.random())
        console.log(shuffled)

        // Get sub-array of first n elements after shuffled
        let selected = shuffled.slice(0, 5)

        let optionsText = ''
        for (let i = 0; i < selected.length; i++) {
            optionsText += `${emojiList[i]} ${selected[i].content}\n`
        }

        let embed = new Discord.MessageEmbed()
            .setTitle(`Poll for ${channel.name}`)
            .setDescription(optionsText)
            .setAuthor(message.author.username, message.author.displayAvatarURL)
            .setColor(0xff0000)
            .setTimestamp()

        if (time) {
            embed.setFooter(
                `The poll has started and will last ${time} minute(s)`
            )
        } else {
            embed.setFooter(`The poll has started and has no end time`)
        }

        // msg.delete(); // Remove the user's command message

        // Definitely use a 2d array here..
        let sentMessage = await channel.send(embed)

        let reactionArray = []
        for (let i = 0; i < selected.length; i++) {
            reactionArray.push(sentMessage.react(emojiList[i]))
        }

        await Promise.all(reactionArray)

        if (time) {
            setTimeout(async () => {
                // Re-fetch the message and get reaction counts
                let fetchedMessage = await sentMessage.channel.messages.fetch(
                    sentMessage.id
                )
                let reactionCountsArray = []
                for (let i = 0; i < selected.length; i++) {
                    reactionCountsArray[i] =
                        fetchedMessage.reactions.resolve(emojiList[i]).count - 1
                }

                // Find winner(s)
                let max = -Infinity
                let indexMax = []
                for (let i = 0; i < reactionCountsArray.length; ++i) {
                    if (reactionCountsArray[i] > max) {
                        max = reactionCountsArray[i]
                        indexMax = [i]
                    } else if (reactionCountsArray[i] === max) {
                        indexMax.push(i)
                    }
                }

                // Display winner(s)
                let winnersText = ''
                if (reactionCountsArray[indexMax[0]] === 0) {
                    winnersText = 'No one voted!'
                } else {
                    for (let i = 0; i < indexMax.length; i++) {
                        winnersText += `${emojiList[indexMax[i]]} ${
                            selected[indexMax[i]].content
                        } (${reactionCountsArray[indexMax[i]]} vote(s))\n`
                    }
                }

                embed.addField('**Winner(s):**', winnersText)
                embed.setFooter(
                    `The poll is now closed! It lasted ${time} minute(s)`
                )
                embed.setTimestamp()

                fetchedMessage.edit('', embed)
            }, time * 60 * 1000)
        }
    },
}
