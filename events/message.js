module.exports = async (client, message) => {
  if (message.author.bot || message.channel.type == 'dm') return;
  let prefix = '-';
  
  if(message.content.toLowerCase().startsWith(prefix)) {
    let args = message.content.slice(prefix.length).trim().split(/ +/g);
    let commandName = args.shift().toLowerCase();
    let cmd = client.commands.get(commandName) || client.commands.get(client.aliases.get(commandName));
    let cooldown = await client.db.get('cooldown', `${message.author.id}-${cmd.name}`)
    
    if(!cooldown && cmd) {
      await client.db.set('cooldown', `${message.author.id}-${cmd.name}`, 1)
      }
    
    if(cmd) {
      let time = Date.now();
      if (cooldown < time) {
        let cooldownTime = cmd.cooldown * 1000 || 3 * 1000;
        await cmd.code(client, message, args);
        client.db.set('cooldown', `${message.author.id}-${cmd.name}`, time + cooldownTime)
      }
      else {
        let cooldown = await client.db.get('cooldown', `${message.author.id}-${cmd.name}`)
        let math = (cooldown - Date.now()) / 1000
        message.reply(`please wait ${math.toFixed(1)} second(s) before using this command again.`)
      }
    }
  }
}
