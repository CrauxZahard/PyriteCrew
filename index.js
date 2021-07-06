const Discord = require('discord.js');
const client = new Discord.Client({ partials: ['REACTION', 'MESSAGE', 'CHANNEL'] });
const { Database } = require('dbdjs.db');
const fs = require('fs');
const token = require('./configuration/token.json');

require('./handler/database.js')(client, Database); //load database handler
require('./handler/events.js')(client); //load event file handler
require('./handler/file.js')(client); //load file handler
require('./handler/util.js')(client); //load util function

client.on('error', console.log)

/* logging in the bot to discord */
client.login(token.token)
