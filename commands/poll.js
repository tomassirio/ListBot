const Discord = require("discord.js")
const Channel = require("../models/Channel")

module.exports = {
    name: 'poll',
    description: 'Generates a Poll from 5 random elements on the list',
    execute: async (message, args) => {
        var channel = message.channel
        var time = args[0]
        
        var emojiList = ['1⃣','2⃣','3⃣','4⃣','5⃣'];

        var shuffled

        const settings = await Channel.findOne({
            channelId: channel.id
        }, (err, foundChannel) => {
            if(!foundChannel){
                const newChannel = new Channel({
                    channelId: channel.id,
                    server: channel.guild.name,
                    name: channel.name,
                    items: []
                })
                newChannel.save()
                .then(result => console.log(result))
                .catch(err => console.error(err))
            }
            var items = foundChannel.items
            // Shuffle array
            shuffled = Array.from(items).sort(() => 0.5 - Math.random());
            console.log(shuffled)
        })
    
    
        // Get sub-array of first n elements after shuffled
        let selected = shuffled.slice(0, 5);    
    
        var optionsText = "";
        for (var i = 0; i < selected.length; i++) { 
            optionsText += emojiList[i] + " " + selected[i].content + "\n";
        }
        
        var embed = new Discord.MessageEmbed()
            .setTitle("Poll for " + channel.name)
            .setDescription(optionsText)
            .setAuthor(message.author.username, message.author.displayAvatarURL)
            .setColor(0xff0000)
            .setTimestamp();
            
        if (time) {
            embed.setFooter(`The poll has started and will last ${time} minute(s)`);
        } else {
            embed.setFooter(`The poll has started and has no end time`);
        }
            
        //msg.delete(); // Remove the user's command message
    
        channel.send(embed) // Definitely use a 2d array here..
            .then(async function (message) {
                var reactionArray = [];
                for (var i = 0; i < selected.length; i++) { 
                    reactionArray[i] = await message.react(emojiList[i]);
                }
                
                if (time) {
                    setTimeout(() => {
                        // Re-fetch the message and get reaction counts
                        message.channel.fetch(message.id)
                            .then(async function (message) {
                                var reactionCountsArray = [];
                                for (var i = 0; i < selected.length; i++) {
                                    reactionCountsArray[i] = message.reactions.resolve(emojiList[i]).count-1;
                                }
    
                                // Find winner(s)
                                var max = -Infinity, indexMax = [];
                                for(var i = 0; i < reactionCountsArray.length; ++i)
                                    if(reactionCountsArray[i] > max) max = reactionCountsArray[i], indexMax = [i];
                                    else if(reactionCountsArray[i] === max) indexMax.push(i);
                        
                                // Display winner(s)
                                console.log(reactionCountsArray); // Debugging votes
                                var winnersText = "";
                                if (reactionCountsArray[indexMax[0]] == 0) {
                                    winnersText = "No one voted!"
                                } else {
                                    for (var i = 0; i < indexMax.length; i++) {
                                        winnersText += 
                                            emojiList[indexMax[i]] + " " + selected[indexMax[i]] + 
                                            " (" + reactionCountsArray[indexMax[i]] + " vote(s))\n";
                                    }
                                }
                                
                                embed.addField("**Winner(s):**", winnersText);
                                embed.setFooter(`The poll is now closed! It lasted ${time} minute(s)`);
                                embed.setTimestamp();
                                
                                message.edit("", embed);
                            });
                    }, time * 60 * 1000);
                }
            }).catch(console.error);
    },
};