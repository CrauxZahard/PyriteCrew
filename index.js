const Discord = require('discord.js');
const client = new Discord.Client();
client.on('ready', () => { console.log('ready') });
client.on('message', message => {
//do something with message
})
client.login('token')
