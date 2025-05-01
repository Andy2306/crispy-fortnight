const { createEmbed } = require("../utils/embed");

module.exports = {
  name: "ping",
  description: "Menampilkan latency bot",
  execute: async (message) => {
    const sent = await message.reply({ content: "Pinging..." });
    const latency = sent.createdTimestamp - message.createdTimestamp;

    const embed = createEmbed(
      "🏓 Pong!",
      `Latency: ${latency}ms\nAPI Latency: ${message.client.ws.ping}ms`
    );

    sent.edit({ content: "", embeds: [embed] });
  },
};
