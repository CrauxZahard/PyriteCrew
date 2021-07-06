module.exports.name = 'userinfo';
module.exports.aliases = ['ui', 'user', 'info'];
module.exports.code = async (client, message, args) => {
      const target = args ? args[0] : message.author
      const user = await client.users.fetch(target);
      message.channel.send({embed: {description: `User: ${user.tag}\nCreation date: ${user.createdAt}`, color: 'RANDOM'}})
  }
