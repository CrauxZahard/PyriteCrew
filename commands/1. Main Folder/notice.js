module.exports.name = 'notice';
module.exports.aliases = ['n', 'send']
module.exports.cooldown = 5
module.exports.code = async (client, message, args) => {
    await message.delete();
    const channel = await client.getChannel(args[0], message.guild)
    const targetChannel = channel || message.channel ;
    const webhook = await targetChannel.createWebhook(client.user.username, { avatar: client.user.displayAvatarURL() });
    const content = channel ? args.slice(1).join(' ') : args.join(' ');
    webhook.send(content);
  }
