require("dotenv").config()

const { Client, MessageEmbed } = require("discord.js")
const client = new Client()

const ADD_COMMAND = "!add"
const LIST_COMMAND = "!list"
const REMOVE_COMMAND = "!remove"
const HELP_COMMAND = "!help"
const RANDOM_COMMAND = "!random"
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
        logFunction()
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

function logFunction(){
    var message = ""
    message += "1.0.0 - First version - Add, Remove, List, Help functions added\n"
    message += "1.0.1 - Added a random function. Added a confirmation on the Add and Remove Function\n"
    const embed = new MessageEmbed()
        .setTitle("Log version")
        .setColor(0xff0000)
        .setDescription(message);
    channel.send(embed)
}