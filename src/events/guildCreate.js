const mongoose = require('mongoose')
const Guild = require('../models/guild')

module.exports = async (client, guild) => {
    let newGuild = new Guild({
        _id: mongoose.Types.ObjectId(),
        guildID: guild.id,
        guildName: guild.name,
        guildAdminsId: [guild.ownerID],
    })

    newGuild
        .save()
        .then((result) => console.log(result))
        .catch((err) => console.err(err))

    console.log('I have joined a new server!')
}
