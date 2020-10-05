const Util = require("../utils/utils.js");
require("dotenv").config()

module.exports = {
    name: 'help',
    description: 'Gets the bot commands',
    execute(message, args){
        let channel = message.channel

        let msg = "**"+process.env.PREFIX+"add {element}** - to add an element to the list\n"
        msg    += "**"+process.env.PREFIX+"addmany {element} {element}** - to add multiple elements to the list\n"
        msg    += "**"+process.env.PREFIX+"remove {element}** - to remove an element from the list\n"
        msg    += "**"+process.env.PREFIX+"removemany {element} {element}** - to remove multiple elements from the list\n"
        msg    += "**"+process.env.PREFIX+"list** - to list every element on the list\n"
        msg    += "**"+process.env.PREFIX+"random** - gets a random element from the list\n"
        msg    += "**"+process.env.PREFIX+"poll** - creates a poll on the channel for 5 random elements. WIP\n"
        msg    += "**"+process.env.PREFIX+"log** - gets the bot's log\n"
        msg    += "**"+process.env.PREFIX+"help** - to see this message\n"

        let embededMessage = Util.embedMessage("List Bot Help Message", "0xffff00", msg)
        channel.send(embededMessage);
    },
};