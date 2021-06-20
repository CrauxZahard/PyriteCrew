const Discord = require('discord.js');
const client = new Discord.Client();
const database = require('dbdjs.db');
const fs = require('fs');
process.env['NODE_CONFIG_DIR'] = './configuration/';
const config = require('config');

///database setup
const db = new database.Database({
  path: './database/',
  tables: [{name: 'main'}]
})

db.on('ready', () => {
  console.log('database ready')
})

db.connect()
client.db = db
//end of database setup

//making a command handler
client.commands = new Discord.Collection();
const commandFile = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for(const file of commandFile) {
  const command = require(`./commands/${file}`)
  client.commands.set(command.name, command)
}
//end of command handler

client.on('ready', () => { console.log('ready') });

client.on('message', msg => {
if(msg.author.bot || !msg.content.startsWith('-')) return;
  const args = msg.content.slice('-'.length).trim().split(/ +/);
  const cmd = args.shift().toLowerCase();
  if(!client.commands.has(cmd)) return;
  
  try {
    //run the command
    client.commands.get(cmd).run(client, msg, args);
  }
  catch (error) {
    //log an error to a channel
    msg.channel.send(':x: an error hass occured!');
    client.channels.cache.get('855660429069647873').send(`command name: ${cmd}\nError message: \`\`\`\n ${error}\`\`\``);
  }
  
})

client.login(config.get('token'));
