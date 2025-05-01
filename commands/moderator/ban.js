const { createEmbed } = require("../../utils/embed");

module.exports = {
  name: "ban",
  description: "Memblokir member dari server",
  permissions: ["BAN_MEMBERS"],
  execute: async (message, args) => {
    const member = message.mentions.members.first();

    if (!member) {
      return message.reply("Tag member yang ingin diban!");
    }

    if (!member.bannable) {
      return message.reply("Saya tidak bisa membanned member ini!");
    }

    const reason = args.slice(1).join(" ") || "Tidak ada alasan";

    await member.ban({ reason });
    const embed = createEmbed(
      "🔨 Member Dibanned",
      `${member.user.tag} telah dibanned oleh ${message.author.tag}\nAlasan: ${reason}`
    ).setColor("#ff0000");

    message.channel.send({ embeds: [embed] });
  },
};
