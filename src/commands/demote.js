const Guild = require('../models/guild')
const Util = require('../utils/utils.js')

module.exports = {
    name: 'demote',
    description: 'Remove a user from admin of ListBot',
    usage: '<@user>',
    execute: async (message) => {
        // check if user promoting is admin
        const guildID = message.guild.id
        const authorId = message.author.id

        const guild = await Guild.findOne({ guildID })

        const authorIsAdmin = guild.guildAdminsId.some(
            (adminId) => adminId === authorId
        )

        if (!authorIsAdmin) return
        // get mentioned user
        const mentionedUser = message.mentions.users.first()

        // check if user is really an admin
        const userId = guild.guildAdminsId.findIndex(
            (adminId) => adminId === mentionedUser.id
        )

        if (userId !== -1) {
            // remove the user id from user admin
            guild.guildAdminsId.splice(userId, 1)
            guild.save()
            let embeddedMessage = Util.embedMessage(
                `Removed admin permissions for \`${mentionedUser.tag}\``,
                message.author,
                '0xffff00',
                'Hooray!'
            )
            await message.channel.send(embeddedMessage)
        } else {
            // user is not an admin
            let embeddedMessage = Util.embedMessage(
                `\`${mentionedUser.tag}\` is not an admin`,
                message.author,
                '0xffff00',
                'Oof..'
            )
            await message.channel.send(embeddedMessage)
        }
    },
}
