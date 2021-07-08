module.exports = client => {
  client.getChannel = async (channel, guild) => {
         if (!channel || !guild) return;
         if (channel.startsWith('<#') && channel.endsWith('>')) {
      channel = channel.slice(2, -1)
      let result = guild.channels.cache.get(channel);
	 if (!result) {
		await guild.channels.fetch(channel)
		result = guild.channels.cache.get(channel)
	}
		 return result
    }
  },
  client.getUser = async user => {
	  if (!user) return;
	  if (user.startsWith('<@') && user.endsWith('>')) {
		user = user.slice(2, -1);

		if (user.startsWith('!')) {
			user = user.slice(1);
		}

		let result = client.users.cache.get(user);
		if (!result) {
			await client.users.fetch(user)
			result = client.users.cache.get(user);
		}
		  return result
	 }
  },
  client.getMember = async (member, guild) => {
	  if (!member || !guild) return;
	  if (member.startsWith('<@') && member.endsWith('>')) {
		  member = member.slice(2, -1)
		  
		  if (member.startsWith('!')) {
		      member = member.slice(1)
		      }
		      
		      let result = guild.members.cache.get(member);
		if (!result) {
			await guild.members.fetch(member)
			result = guild.members.cache.get(member);
		}
		  return result
	  }
  }
}
