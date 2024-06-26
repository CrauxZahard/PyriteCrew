const Discord = require('discord.js');
const client = new Discord.Client({ partials: ['REACTION', 'MESSAGE', 'CHANNEL'] });
const { token } = require('./configuration/token.json');

require('./handler/database.js')(client);
require('./handler/events.js')(client); 
require('./handler/file.js')(client);
require('./handler/util.js')(client); 

client.on('error', console.log)

/* logging in the bot to discord */
client.login(token)
