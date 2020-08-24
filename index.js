require("dotenv").config()

const { Client, MessageEmbed } = require("discord.js")
const client = new Client()

const ADD_COMMAND = "!add"
const LIST_COMMAND = "!list"
const REMOVE_COMMAND = "!remove"
const HELP_COMMAND = "!help"

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
    if (msg.content.startsWith(HELP_COMMAND)){
        helpMessage(msg.channel)
    }
})

// client.on("message", msg => {
//     if (msg.content.startsWith("-p")) {
//         var printableList = map.get(msg.channel)
//         const embed = new MessageEmbed()
//             .setTitle(msg.channel.name + " list")
//             .setColor(0xff0000)
//             .setDescription(printableList);

//         msg.channel.send(embed);
//     }
// })

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

    var printableList = map.get(channel)
    console.log(printableList)
}

function listMap(channel){
    var set = map.get(channel)
    var message = ""
    var i = 0
    for (let listling of set) {
        message += "[" + i + "] " + listling + "\n"
        i++
      }
    const embed = new MessageEmbed()
        .setTitle(channel.name + " list")
        .setColor(0xff0000)
        .setDescription(message);
    channel.send(embed);
}

function removeFromMap(channel, listling){
    var list = map.get(channel)
    list.delete(listling)
    console.log(list)
}

function helpMessage(channel){
    var message = "**!add {element}** - to add an element to the list\n"
    message     += "**!remove {element}** - to remove an element from the list\n"
    message     += "**!list** - to list every element on the list\n"
    message     += "**!help** - to see this message"

    const embed = new MessageEmbed()
        .setTitle("List Bot Help Message")
        .setColor(0xff0000)
        .setDescription(message);

    channel.send(embed);
}