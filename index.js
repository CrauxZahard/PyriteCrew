const Discord = require('discord.js');
const client = new Discord.Client();
client.on('ready', () => { console.log('ready') });
client.on('message', message => {
//do something with message
})
client.login('ODA3NjY1ODUzODIxNjE2MTc5.YB7TcQ.el_uD6LDVJ43QGEDQpdmCE03dv4');
