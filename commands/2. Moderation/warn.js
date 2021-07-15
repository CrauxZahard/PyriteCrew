module.exports.name = 'warn'
module.exports.code = async (client, message, args) => {
    if(!message.member.permissions.has('MANAGE_MESSAGES')) return message.channel.send(':x: not enough permission! required permission: `MANAGE_MESSAGES`');
    const targetUser = await client.getUser(args[0]);
    const member = message.guild.members.cache.get(targetUser.id);

    if(!targetUser) return message.channel.send('mention someone to warn!');
    
    let db = client.db.get(`warn-${targetUser.id}`);
   
    client.db.add(`warn-${targetUser.id}.number`, 1);
    client.db.push(`warn-${targetUser.id}.reason`, args[1] ? args.slice(1).join(' ') : 'no reason provided');
    
    targetUser.number = client.db.get(`warn-${targetUser.id}.number`);
    
    message.channel.send(`**${targetUser.tag}** has been warned by **${message.author.tag}**. Reason: ${args[1] ? args.slice(1).join(' ') : 'no reason provided'}`)
   
    console.log(client.db.get(`warn-${targetUser.id}`))
       
    /* penalty */ 
    if(targetUser.number == 1) {
      const mutedRole = message.guild.roles.cache.find(x => x.name.toLowerCase() == 'muted');
      member.roles.add(mutedRole.id)
      setTimeout(() => {
      member.roles.remove(mutedRole.id)
      }, 1000 * 3600)
    }
    else if(targetUser.number == 2) {
      const mutedRole = message.guild.roles.cache.find(x => x.name.toLowerCase() == 'muted');
      member.roles.add(mutedRole.id)
      setTimeout(() => {
      member.roles.remove(mutedRole.id)
      }, 1000 * 3600 * 24)
    }
    else {
      await member.kick()
      client.db.delete(`warn-${targetUser.id}`)
    }
  }
