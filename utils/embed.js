const { EmbedBuilder } = require('discord.js');

const createEmbed = (title, description, color = '#0099ff') => {
  return new EmbedBuilder()
    .setTitle(title)
    .setDescription(description)
    .setColor(color)
    .setTimestamp();
};

module.exports = { createEmbed };