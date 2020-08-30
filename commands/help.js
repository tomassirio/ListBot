const Util = require("../utils/utils.js");
const { prefix } = require('../Config/config.json');

module.exports = {
    name: 'help',
    description: 'Gets the bot commands',
    execute(message, args){
        var channel = message.channel

        var msg = "**"+prefix+"add {element}** - to add an element to the list\n"
        msg    += "**"+prefix+"remove {element}** - to remove an element from the list\n"
        msg    += "**"+prefix+"list** - to list every element on the list\n"
        msg    += "**"+prefix+"random** - gets a random element from the list\n"
        msg    += "**"+prefix+"poll** - creates a poll on the channel for 5 random elements. WIP\n"
        msg    += "**"+prefix+"log** - gets the bot's log\n"
        msg    += "**"+prefix+"help** - to see this message\n"

        var embededMessage = Util.embedMessage("List Bot Help Message", "0xffff00", msg)
        channel.send(embededMessage);
    },
};