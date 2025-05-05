module.exports = {
  name: "invite",
  description: "Mengundang bot ke server Anda.",
  execute(message, args) {
    const inviteLink =
      "https://discord.com/oauth2/authorize?client_id=1362774760471400648";
    message.channel.send(
      `Klik [di sini](${inviteLink}) untuk mengundang bot ke server Anda!`
    );
  },
};
