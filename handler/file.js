const fs = require('fs')
const { Collection } = require('discord.js')
module.exports = client => {
  client.commands = new Collection();
  client.aliases = new Collection();
  
  let mainFolder = fs.readdirSync('./commands/');
  for (const folder of mainFolder) {
    const files = fs.readdirSync(`./commands/${folder}/`)
    for (const file of files) {
      const command = require(`./commands/${folder}/${file}`)
      client.commands.set(command.name, command)
      client.aliases.set(command.aliases, command)
    }
  }
}
