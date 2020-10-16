module.exports = async (client) => {
    await client.mongoose.init() // Wait for the default connection to be established and returned.

    console.log(`Logged in as ${client.user.tag}!`)
    // Creates a list for every text channel
    // for(channel in client.channels.cache.each(element =>
    //     element.type === 'text' ? console.log(element.guild.name) : null)){
    // }
}
