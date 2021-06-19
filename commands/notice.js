module.exports = {
name: 'notice',
  run: async (client, message, args) => {
    await message.delete();
    const targetChannel = message.mentions.channels ? message.mentions.channels.first() : message.channel;
    const content = targetChannel == message.channel ? args.join(' ') : args.slice(2).join(' ');
    targetChannel.send(content);
  }
}
