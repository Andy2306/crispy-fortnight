const { EmbedBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
  name: 'ban',
  description: 'Mem-ban anggota (perlu izin Ban Members).',
  async execute(message, args) {
    if (!message.member.permissions.has(PermissionsBitField.Flags.BanMembers))
      return message.reply('Kamu tidak punya izin untuk menggunakan perintah ini.');

    const user = message.mentions.members.first();
    const reason = args.slice(1).join(' ') || 'Tidak ada alasan';

    if (!user) return message.reply('Tandai anggota yang ingin di-ban.');

    try {
      await user.ban({ reason });
      const embed = new EmbedBuilder()
        .setTitle('⛔ Member Banned')
        .addFields(
          { name: 'User', value: user.user.tag },
          { name: 'Moderator', value: message.author.tag },
          { name: 'Alasan', value: reason }
        )
        .setColor('Random')
        .setTimestamp();

      message.reply({ embeds: [embed] });
    } catch (error) {
      message.reply('Gagal mem-ban anggota ini.');
      console.error(error);
    }
  },
};
