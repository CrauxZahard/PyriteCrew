module.exports.name = 'warn'
module.exports.code = async (client, message, args) => {
    if(!message.member.permissions.has('MANAGE_MESSAGES')) return message.channel.send(':x: not enough permission! required permission: `MANAGE_MESSAGES`');
    const targetUser = client.getMember(args[0], message.guild);
    if(!targetUser) return message.channel.send('mention someone to warn!');
    
    let db = await client.db.get('main', `warn-${targetUser.id}`);
    
    if (!db) {
      targetUser.number = 1
      targetUser.reason = [args[1] ? args.slice(1) : 'no reason provided']
      await client.db.set('main', `warn-${targetUser.id}`, {number: 1, reason: targetUser.reason})
    }
    else {
    targetUser.number = db.number + 1
    targetUser.reason = db.reason.push(args[1] ? args.slice(1) : 'no reason provided')
      await client.db.set('main', `warn-${targetUser.id}`, {number: targetUser.number, reason: targetUser.reason})
    }
   
    /* warn action */ 
    if(targetUser.number == 1) {
      const mutedRole = message.guild.roles.cache.find(x => x.name.toLowerCase() == 'muted');
      targetUser.roles.add(mutedRole.id)
      setTimeout(() => {
      targetUser.roles.remove(mutedRole.id)
      }, 1000 * 3600)
    }
    else if(targetUser.number == 2) {
      const mutedRole = message.guild.roles.cache.find(x => x.name.toLowerCase() == 'muted');
      targetUser.roles.add(mutedRole.id)
      setTimeout(() => {
      targetUser.roles.remove(mutedRole.id)
      }, 1000 * 3600 * 24)
    }
    else {
      await targetUser.kick()
      await client.db.delete('main', `warn-${targetUser.id}`)
    }
  }
