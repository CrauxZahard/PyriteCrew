module.exports.name = 'notice';
module.exports.aliases = ['n', 'send']
module.exports.cooldown = 5
module.exports.code = async (client, message, args) => {
    await message.delete();
    const targetChannel = client.getChannel(args[0], message.guild) ? message.mentions.channels.first() : message.channel;
    const webhook = await targetChannel.createWebhook(client.user.username, { avatar: client.user.displayAvatarURL() });
    const content = client.getChannel(args[0], message.guild) ? args.slice(1).join(' ') : args.join(' ');
    webhook.send(content);
  }
