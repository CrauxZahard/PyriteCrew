const ms = require('ms');
module.exports = async (client, message) => {
  if (message.author.bot || message.channel.type == 'dm') return;
  let prefix = '-';
  
  if(message.content.toLowerCase().startsWith(prefix)) {
    let args = message.content.slice(prefix.length).trim().split(/ +/g);
    let commandName = args.shift().toLowerCase();
    let cmd = client.commands.get(commandName) || client.commands.get(client.aliases.get(commandName));
    
    /* if args[0] is a commmand name/alias, execute it */
    if(cmd) {
      let cooldown = client.db.get(`${message.author.id}-${cmd.name}.timestamp`)
      
      /*if user's cooldown is not in the database, set it*/
      if(!cooldown) {
        client.db.add(`${message.author.id}-${cmd.name}.timestamp`, Date.now())
        cooldown = client.db.get(`${message.author.id}-${cmd.name}.timestamp`)
      }
      
      /*if cooldown time (in ms) is smaller than current date (in ms), execute the command*/
      if(cooldown <= Date.now()) {
        let cooldownAmount = cmd.cooldown * 1000 || 3 * 1000
        try {
          cmd.code(client, message, args)
        }
        catch (e) {
          console.log(e)
        }
        finally {
          client.db.add(`${message.author.id}-${cmd.name}.timestamp`, cooldownAmount)
        }
      }
      
      /*else if user is on cooldown, give a message*/
      else {
        const math = ms(cooldown - Date.now())
        message.reply(`please wait ${math} before using this command again.`)
      }
      
    }
    
  }
}
