require('@babel/polyfill')
const { Client, Collection } = require('discord.js');
const { botToken } = require('./config');
const fs = require('fs');
const path = require('path')
const client = new Client();

client.commands = new Collection();
client.aliases = new Collection();
client.mongoose = require('./utils/mongoose');

client.categories = fs.readdirSync(path.resolve(__dirname, './commands/'));


['command'].forEach(handler => {
    require(`./handlers/${handler}`)(client);
});

fs.readdir(path.resolve(__dirname, './events/'), (err, files) => {
    if (err) return console.error;
    files.forEach(file => {
        if (!file.endsWith('.js')) return;
        const evt = require(`./events/${file}`);
        let evtName = file.split('.')[0];

        console.log(`Loaded event '${evtName}.'`);
        
        client.on(evtName, evt.bind(null, client));
    });
});


client.login(botToken);
