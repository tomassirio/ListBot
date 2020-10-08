const Util = require("../utils/utils.js");
require("dotenv").config()

module.exports = {
    name: 'help',
    description: 'Gets the bot commands',
    execute(message, args){
        let channel = message.channel

        let msg = "**"+process.env.PREFIX+"add {element}** - to add an element to the list\n"
        msg    += "**"+process.env.PREFIX+"multi-add {element} {element}** - to add multiple elements to the list\n"
        msg    += "**"+process.env.PREFIX+"remove {element}** - to remove an element from the list\n"
        msg    += "**"+process.env.PREFIX+"multi-remove {element} {element}** - to remove multiple elements from the list\n"
        msg    += "**"+process.env.PREFIX+"list** - to list every element on the list\n"
        msg    += "**"+process.env.PREFIX+"random** - gets a random element from the list\n"
        msg    += "**"+process.env.PREFIX+"poll {active_time_in_minutes}** - creates a poll on the channel for 5 random elements. WIP\n"
        msg    += "**"+process.env.PREFIX+"clear** - Removes all the elements of the list\n"
        msg    += "**"+process.env.PREFIX+"log** - gets the bot's log\n"
        msg    += "**"+process.env.PREFIX+"remind {time_in_minutes} {element}** - to add an item and be reminded in n minutes\n"
        msg    += "**"+process.env.PREFIX+"help** - to see this message\n"

        let embededMessage = Util.embedMessage("List Bot Help Message", message.author.tag , "0xffff00", msg)
        channel.send(embededMessage);
    },
};
