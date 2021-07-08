module.exports = client => {
  client.getChannel = (channel, guild) => {
         if (!channel || !guild) return;
         if (channel.startsWith('<#') && channel.endsWith('>')) {
      channel = channel.slice(2, -1)
      return guild.channels.cache.get(channel)
    }
  },
  client.getUser = user => {
	  if (!user) return;
	  if (user.startsWith('<@') && user.endsWith('>')) {
		user = user.slice(2, -1);

		if (user.startsWith('!')) {
			user = user.slice(1);
		}

		return client.users.cache.get(user);
	 }
  },
  client.getMember = (member, guild) => {
	  if (!member || !guild) return;
	  if (member.startsWith('<@') && member.endsWith('>')) {
		  member = member.slice(2, -1)
		  
		  if (member.startsWith('!')) {
		      member = member.slice(1)
		      }
		      
		      return guild.members.cache.get(member);
	  }
  }
}
