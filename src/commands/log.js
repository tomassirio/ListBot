const Util = require("../utils/utils.js");

module.exports = {
    name: 'log',
    description: 'Gets info from the bot',
    execute(message, args, map){
        let channel = message.channel

        let msg = ""
        msg += "1.0.0 - First version - Add, Remove, List, Help functions added\n"
        msg += "1.0.1 - Added a random function. Added a confirmation on the Add and Remove Function\n"
        msg += "1.1.0 - Added the Poll function. WIP\n"
        msg += "2.0   - Bot was completely revamped. Database now functioning\n"

        let embededMessage = Util.embedMessage("Log version", "0xff0000", msg)
        channel.send(embededMessage)
    },
};
