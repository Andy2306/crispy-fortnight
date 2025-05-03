const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'help',
  description: 'Menampilkan daftar perintah.',
  execute(message) {
    const embed = new EmbedBuilder()
      .setTitle('📜 Daftar Perintah')
      .setColor('Random')
      .setTimestamp();

    message.client.commands.forEach(cmd => {
      embed.addFields({ name: `+${cmd.name}`, value: cmd.description });
    });

    message.reply({ embeds: [embed] });
  },
};
