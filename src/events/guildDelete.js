/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */
const mongoose = require('mongoose')
const Guild = require('../models/guild')

module.exports = async (_client, guild) => {
    Guild.findOneAndDelete(
        {
            guildID: guild.id,
        },
        (err, _res) => {
            if (err) console.error(err)
            console.log(`I have been removed from a server`)
        }
    )
}
