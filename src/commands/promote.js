const Guild = require('../models/guild')
const Util = require('../utils/utils.js')

module.exports = {
    name: 'promote',
    description: 'Promote a user into an admin of ListBot',
    execute: async (message) => {
        // check if user promoting is admin
        const guildID = message.guild.id
        const authorId = message.author.id

        const guild = await Guild.findOne({ guildID })

        const authorIsAdmin = guild.guildAdminsId.some(
            (adminId) => adminId === authorId
        )

        if (!authorIsAdmin) return
        // get mentioned user id
        const mentionedUserId = message.mentions.users.first().id

        // add id into mongo guild schema
        guild.guildAdminsId.push(mentionedUserId)
        guild.save()
        let embeddedMessage = Util.embedMessage(
            'Successfully added user as admin',
            message.author,
            '0xffff00',
            'Hooray'
        )
        message.channel.send(embeddedMessage)
    },
}
