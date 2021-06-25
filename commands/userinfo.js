module.exports = {
  name: 'userinfo',
  run: async (client, message, args) => {
      const target = args ? args[0] : message.author
      const user = await client.users.fetch(target);
      message.channel.send('a', {embed: {description: `User: ${user.tag}\nCreation date: ${user.createdAt}`, color: 'RANDOM'}})
  }
}
