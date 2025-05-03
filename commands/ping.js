const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'ping',
  description: 'Menampilkan latensi bot.',
  execute(message) {
    const embed = new EmbedBuilder()
      .setTitle('🏓 Pong!')
      .setDescription(`Latensi: ${Date.now() - message.createdTimestamp}ms\nAPI: ${Math.round(message.client.ws.ping)}ms`)
      .setColor('Random')
      .setTimestamp();

    message.reply({ embeds: [embed] });
  },
};
