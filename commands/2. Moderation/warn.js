module.exports.name = 'warn'
module.exports.code = async (client, message, args) => {
    if(!message.member.permissions.has('MANAGE_MESSAGES')) return message.channel.send(':x: not enough permission! required permission: `MANAGE_MESSAGES`');
    const targetUser = await client.getUser(args[0]);
    const member = message.guild.members.cache.get(targetUser.id);

    if(!targetUser) return message.channel.send('mention someone to warn!');
    
    let db = await client.db.get('main', `warn-${targetUser.id}`);
    
    if (!db) {
      targetUser.number = 1
      targetUser.reason = []
  
      let reason = args[1] ? args.slice(1) : 'no reason provided'
      targetUser.reason.push(reason)
      await client.db.set('main', `warn-${targetUser.id}`, {number: 1, reason: targetUser.reason})
    }
    else {
    targetUser.number = db.value.number + 1;
    db.value.reason.push(args[1] ? args.slice(1) : 'no reason provided')
    targetUser.reason = db.value.reason
      await client.db.set('main', `warn-${targetUser.id}`, {number: targetUser.number, reason: targetUser.reason})
    }
    /* testing things */
    console.log(targetUser)
 
    
    message.channel.send(`**${targetUser.tag}** has been warned by **${message.author.tag}**. Reason: ${args[1] ? args.slice(1) : 'no reason provided'}`)
   
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
      await client.db.delete('main', `warn-${targetUser.id}`)
    }
  }
