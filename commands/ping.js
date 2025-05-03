const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'ping',
    description: 'Membalas dengan Pong!',
    execute(message, args) {
        const embed = new EmbedBuilder()
            .setTitle('🏓 Pong!')
            .setDescription(`Latensi bot: ${Date.now() - message.createdTimestamp}ms`)
            .setColor(0x3498db);

        message.reply({ embeds: [embed] });
    },
};
