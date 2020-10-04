const Channel = require("../models/Channel")

const ChannelRepository = {
  find: async (id) => {
    try {
      return await Channel.findOne({
        channelId: id
      })
    } catch (e) {
      console.log(e)
      return null
    }
  },

  create: async (channelData) => {
    const channel = new Channel({
      channelId: channelData.id,
      server: channelData.guild.name,
      name: channelData.name,
      items: []
    })

    try {
      channel.save()
      console.log('Stored', channel)
    } catch (e) {
      console.error(e)
    }

    return channel
  },

  findOrCreate: async (channelData) => {
    const channel = await ChannelRepository.find(channelData.id)

    if (channel) {
      return channel
    }

    return ChannelRepository.create(channelData)
  },
}

module.exports = ChannelRepository
