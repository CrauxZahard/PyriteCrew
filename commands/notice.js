module.exports = {
  name: 'notice',
  run: async (client, message, args) => {
    await message.delete();
    const targetChannel = client.getChannel(args[0]) ? message.mentions.channels.first() : message.channel;
    const webhook = await targetChannel.createWebhook(client.user.username, { avatar: client.user.displayAvatarURL() });
    const content = client.getChannel(args[0]) ? args.slice(1).join(' ') : args.join(' ');
    webhook.send(content);
  }
}
