module.exports = client => {
  client.getChannel = (channel, guild) => {
    if (channel.startsWith('<#') && channel.endsWith('>')) {
      channel = channel.slice(2, -1)
      return guild.channels.cache.get(channel)
    }
  },
  client.getUser = user => {
	  if (user.startsWith('<@') && user.endsWith('>')) {
		user = user.slice(2, -1);

		if (user.startsWith('!')) {
			user = user.slice(1);
		}

		return client.users.cache.get(user);
	 }
  }
}
