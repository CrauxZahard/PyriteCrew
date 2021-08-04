module.exports = async (client, reaction, user) => {
  if (reaction.message.channel.id == '805023745977745448') {
    let member = await reaction.message.guild.members.fetch(user)
    await member.roles.add('805023874860187669')
  }
}
