require('@babel/polyfill')
const { Client, Collection } = require('discord.js')
const { botToken } = require('./config')
const fs = require('fs')
const path = require('path')
const client = new Client()

client.commands = new Collection()
client.aliases = new Collection()
client.mongoose = require('./utils/mongoose')

client.categories = fs.readdirSync(path.resolve(__dirname, './commands/'))
;['command'].forEach((handler) => {
    require(`./handlers/${handler}`)(client)
})

const files = fs.readdirSync(path.join(__dirname, '/events')) // Read the content files in the directory before starting the bot.

files.forEach((fileName) => {
    if (fileName.endsWith('.js')) {
        // Looking for .js files only.
        const event = require(`./events/${fileName}`)
        const eventName = fileName.split('.')[0] // Get the event name of the file.

        console.log(`Successfully loaded the ${eventName} event.`)
        client.on(eventName, event.bind(null, client))
    }
})

client.login(botToken)
