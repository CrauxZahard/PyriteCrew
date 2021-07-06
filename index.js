const Discord = require('discord.js');
const client = new Discord.Client({ partials: ['REACTION', 'MESSAGE', 'CHANNEL'] });
const { Database } = require('dbdjs.db');
const fs = require('fs');
const token = require('./configuration/token.json');

client.on('error', console.log)

/* event handler */
const events = fs.readdirSync('./events/')
for (let event of events) {
	let eventFile = require(`./events/${event}`)
	client.on(event.split('.')[0], (...args) => eventFile(client, ...args))
}

/* database setup */
const db = new Database({
        path: './databases/',
	tables: [{name: 'cooldown'}, {name: 'main'}]
})

db.on('ready', () => { console.log('database is ready') })
db.connect()
client.db = db

/* logging in the bot to discord */
client.login(token.token)
