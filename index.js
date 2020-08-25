require("dotenv").config()

const { Client, MessageEmbed } = require("discord.js")
const client = new Client()
const ADD_COMMAND = "!add"
const LIST_COMMAND = "!list"
const REMOVE_COMMAND = "!remove"
const HELP_COMMAND = "!help"
const RANDOM_COMMAND = "!random"
const POLL_COMMAND = "!poll"
const LOG_COMMAND = "!log"

var map = new Map()

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`)
})

client.on("message", msg => {
    if (msg.content.startsWith(ADD_COMMAND)) {
        addToMap(msg.channel, msg.content.substring(4))
    }
    if (msg.content.startsWith(LIST_COMMAND)){
        listMap(msg.channel)
    }
    if (msg.content.startsWith(REMOVE_COMMAND)){
        removeFromMap(msg.channel, msg.content.substring(7))
    }
    if (msg.content.startsWith(RANDOM_COMMAND)){
        randomEntry(msg.channel)
    }
    if (msg.content.startsWith(HELP_COMMAND)){
        helpMessage(msg.channel)
    }
    if (msg.content.startsWith(LOG_COMMAND)){
        logFunction(msg.channel)
    }
    if (msg.content.startsWith(POLL_COMMAND)){
        poll(msg.channel, msg, 1)
    }
})

client.login(process.env.BOT_TOKEN)

function addToMap(channel, listling){
    if(map.get(channel) != null){
        var set = map.get(channel)
        set.add(listling)
        map.set(channel, set)
    }else{
        var set = new Set()
        set.add(listling)
        map.set(channel, set)
    }
    const embed = new MessageEmbed()
        .setTitle("Succesfully added")
        .setColor(0xff0000)
        .setDescription(listling);
    channel.send(embed);

    var printableList = map.get(channel)
    console.log(printableList)
}

function listMap(channel){
    if(map.get(channel) == null){
        var set = new Set()
        map.set(channel, set)
    }

    var set = map.get(channel)
    var message = ""
    var i = 0

    for (let item of set.values()) {
        message += "[" + i + "] " + item + "\n"
        i++
    }
    console.log(message)
    const embed = new MessageEmbed()
        .setTitle(channel.name + " list")
        .setColor(0xff0000)
        .setDescription(message);
    channel.send(embed);
}

function removeFromMap(channel, listling){
    if(map.get(channel) == null){
        var set = new Set()
        map.set(channel, set)
    }

    var list = map.get(channel)
    list.delete(listling)
    console.log(list)
    const embed = new MessageEmbed()
        .setTitle("Succesfully removed")
        .setColor(0xff0000)
        .setDescription(listling);
    channel.send(embed);
}

function helpMessage(channel){
    var message = "**!add {element}** - to add an element to the list\n"
    message     += "**!remove {element}** - to remove an element from the list\n"
    message     += "**!list** - to list every element on the list\n"
    message     += "**!random** - gets a random element from the list\n"
    message     += "**!poll** - creates a poll on the channel for 5 random elements. WIP"
    message     += "**!log** - gets the bot's log\n"
    message     += "**!help** - to see this message"

    const embed = new MessageEmbed()
        .setTitle("List Bot Help Message")
        .setColor(0xff0000)
        .setDescription(message);

    channel.send(embed);
}

function randomEntry(channel){
    if(map.get(channel) == null){
        var set = new Set()
        map.set(channel, set)
    }

    var set = map.get(channel)
    var setValues = Array.from(set)
    var randomItem = setValues[Math.floor(Math.random()*setValues.length)];
    const embed = new MessageEmbed()
        .setTitle("The random entry of the list is")
        .setColor(0xff0000)
        .setDescription(randomItem);
    console.log(randomItem)
    channel.send(embed)
}

function logFunction(channel){
    var message = ""
    message += "1.0.0 - First version - Add, Remove, List, Help functions added\n"
    message += "1.0.1 - Added a random function. Added a confirmation on the Add and Remove Function\n"
    message += "1.1.0 - Added the Poll function. WIP\n"
    const embed = new MessageEmbed()
        .setTitle("Log version")
        .setColor(0xff0000)
        .setDescription(message);
    channel.send(embed)
}

function poll(channel, msg, time){
    var emojiList = ['1⃣','2⃣','3⃣','4⃣','5⃣'];

    var set = map.get(channel, msg)
    // Shuffle array
    var shuffled = Array.from(set).sort(() => 0.5 - Math.random());

    // Get sub-array of first n elements after shuffled
    let selected = shuffled.slice(0, 5);    

    var optionsText = "";
    for (var i = 0; i < selected.length; i++) { 
        optionsText += emojiList[i] + " " + selected[i] + "\n";
    }
    
    var embed = new MessageEmbed()
        .setTitle("Poll for " + channel.name)
        .setDescription(optionsText)
        .setAuthor(msg.author.username, msg.author.displayAvatarURL)
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
}