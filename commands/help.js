const { createEmbed } = require('../utils/embed');

module.exports = {
  name: 'help',
  description: 'Menampilkan semua command yang tersedia',
  execute: async (message) => {
    const commands = message.client.commands;
    const fields = [];
    
    commands.forEach(command => {
      fields.push({
        name: `+${command.name}`,
        value: command.description || 'Tidak ada deskripsi',
        inline: false
      });
    });

    const embed = createEmbed('📚 Daftar Command', 'Berikut adalah semua command yang tersedia:')
      .addFields(fields);

    message.reply({ embeds: [embed] });
  }
};