module.exports = async (client, message) => {
  if (message.author.bot || message.channel.type == 'dm') return;
  let prefix = '-';
  
  if(message.content.toLowerCase().startsWith(prefix)) {
    let args = message.content.slice(prefix.length).trim().split(/ +/g);
    let commandName = args.shift().toLowerCase();
    let cmd = client.commands.get(commandName) || client.commands.get(client.aliases.get(commandName));
    let cooldown = await client.db.get('cooldown', `${message.author.id}-${cmd.name}`)
    
    if(cmd) {
      
      if (!cooldown) {
        await client.db.set('cooldown', `${message.author.id}-${cmd.name}`, Date.now())
        }
      
      let time = Date.now();
      cooldown = await client.db.get('cooldown', `${message.author.id}-${cmd.name}`)
      if (time <= cooldown.value) {
        let cooldownTime = cmd.cooldown * 1000 || 3 * 1000;
        await cmd.code(client, message, args);
        client.db.set('cooldown', `${message.author.id}-${cmd.name}`, time + cooldownTime)
      }
      else {
        cooldown = await client.db.get('cooldown', `${message.author.id}-${cmd.name}`)
        let math = (cooldown.value - Date.now()) / 1000
        message.reply(`please wait ${math.toFixed(1)} second(s) before using this command again.`)
      }
    }
  }
}
