const { EmbedBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
  name: 'kick',
  description: 'Mengeluarkan anggota (perlu izin Kick Members).',
  async execute(message, args) {
    if (!message.member.permissions.has(PermissionsBitField.Flags.KickMembers))
      return message.reply('Kamu tidak punya izin untuk menggunakan perintah ini.');

    const user = message.mentions.members.first();
    const reason = args.slice(1).join(' ') || 'Tidak ada alasan';

    if (!user) return message.reply('Tandai anggota yang ingin dikeluarkan.');

    try {
      await user.kick(reason);
      const embed = new EmbedBuilder()
        .setTitle('🔨 Member Kicked')
        .addFields(
          { name: 'User', value: user.user.tag },
          { name: 'Moderator', value: message.author.tag },
          { name: 'Alasan', value: reason }
        )
        .setColor('Random')
        .setTimestamp();

      message.reply({ embeds: [embed] });
    } catch (error) {
      message.reply('Gagal mengeluarkan anggota ini.');
      console.error(error);
    }
  },
};
