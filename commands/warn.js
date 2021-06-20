module.exports = {
  name: 'warn',
  run: async (client, message, args) => {
    if(!message.member.permissions.has('MANAGE_MESSAGES')) return message.channel.send(':x: not enough permission! required permission: `MANAGE_MESSAGES`');
    const targetUser = message.mentions.members.first();
    if(!targetUser) return message.channel.send('mention an user!');
    
    const prevWarn = await client.db.get('main', `warn-${targetUser.id}`);
    
    if(!prevWarn) {
      await client.db.set('main', `warn-${targetUser.id}`, {number: 1,  reason: [ args[1] ? args.slice(1).join(' ') : 'no reason provided']} );
    }
    else {
      prevWarn.reason.push(args[1] ? args.slice(1).join(' ') : 'no reason provided')
      await client.db.set('main',  `warn-${targetUser.id}`, {number: prevWarn.number + 1, reason: prevWarn.reason});
    }
    
    const currentWarn = await client.db.get('main', `warn-${targetUser.id}`);  
    const penalty = currentWarn.number  == 1 ? 'muted them for an hour' : currentWarn == 2 ? 'muted them for a day' : 'kicked them from the server';
    message.channel.send(`Warned ${message.mentions.users.first().toString()} and ${penalty}. Total warn: ${currentWarn.number}`);
    
    if(currentWarn.number == 1) {
      const mutedRole = message.guild.roles.cache.find(x => x.name.toLowerCase() == 'muted');
      targetUser.roles.add(mutedRole.id)
      setTimeout(() => {
      targetUser.roles.remove(mutedRole.id)
      }, 1000 * 3600)
    }
    else if(currentWarn.number == 2) {
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
}
