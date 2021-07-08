const ms = require('ms');
module.exports = async (client, message) => {
  if (message.author.bot || message.channel.type == 'dm') return;
  let prefix = '-';
  
  if(message.content.toLowerCase().startsWith(prefix)) {
    let args = message.content.slice(prefix.length).trim().split(/ +/g);
    let commandName = args.shift().toLowerCase();
    let cmd = client.commands.get(commandName) || client.commands.get(client.aliases.get(commandName));
    
    /*if args[0] is a commmand name/alias, execute it*/
    if(cmd) {
      let cooldown = await client.db.get('cooldown', `${message.author.id}-${cmd.name}`)
      
      /*if user's cooldown is not in the database, set it*/
      if(!cooldown) {
        await client.db.set('cooldown', `${message.author.id}-${cmd.name}`, Date.now())
        cooldown = await client.db.get('cooldown', `${message.author.id}-${cmd.name}`)
      }
      
      /*if cooldown time (in ms) is smaller than current date (in ms), execute the command*/
      if(cooldown.value <= Date.now()) {
        let cooldownAmount = cmd.cooldown * 1000 || 3 * 1000
        try {
          cmd.code(client, message, args)
        }
        catch (e) {
          console.log(e)
        }
        finally {
          await client.db.set('cooldown', `${message.author.id}-${cmd.name}`, Date.now() + cooldownAmount)
        }
      }
      
      /*else if user is on cooldown, give a message*/
      else {
        const math = ms(cooldown.value - Date.now())
        message.reply(`please wait ${math} second(s) before using this command again.`)
      }
      
    }
    
  }
}
