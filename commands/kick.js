const { createEmbed } = require("../utils/embed");

module.exports = {
  name: "kick",
  description: "Mengeluarkan member dari server",
  permissions: ["KICK_MEMBERS"],
  execute: async (message, args) => {
    const member = message.mentions.members.first();

    if (!member) {
      return message.reply("Tag member yang ingin dikick!");
    }

    if (!member.kickable) {
      return message.reply("Saya tidak bisa mengkick member ini!");
    }

    const reason = args.slice(1).join(" ") || "Tidak ada alasan";

    await member.kick(reason);
    const embed = createEmbed(
      "👢 Member Dikick",
      `${member.user.tag} telah dikick oleh ${message.author.tag}\nAlasan: ${reason}`
    ).setColor("#ff0000");

    message.channel.send({ embeds: [embed] });
  },
};
