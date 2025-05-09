const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'help',
    description: 'Menampilkan daftar perintah yang tersedia.',
    execute(message, args) {
        const commands = message.client.commands.map(cmd => `**${cmd.name}**:\n ${cmd.description}`).join('\n');
        const embed = new EmbedBuilder()
            .setTitle('📖Daftar Perintah')
            .setDescription(commands || 'Tidak ada perintah yang tersedia.')
            .setColor(0x3498db)
            .setFooter({ text: 'Gunakan +<command> untuk menggunakan perintah.' });
            

        message.reply({ embeds: [embed] });
    },
}