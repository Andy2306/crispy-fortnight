const { description, execute } = require("./help");

module.exports = {
    name: 'say',
    description: 'Mengulangi pesan yang diberikan.',
    execute(message, args) {
        if (!args.length) {
            return message.reply('Silakan berikan pesan yang ingin diulang.');
        }

        const response = args.join(' ');
        message.delete(); // Menghapus pesan perintah
        message.channel.send(response);
    }
}