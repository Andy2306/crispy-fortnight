require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { Client, GatewayIntentBits, Collection } = require('discord.js'); 
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

const TOKEN = process.env.BOT_TOKEN; // Ganti dengan token bot Anda
if (!TOKEN) {
    console.error('Token bot tidak ditemukan. Pastikan Anda sudah mengatur variabel lingkungan TOKEN.');
    process.exit(1);
}
const PREFIX = '+';

// Buat collection untuk perintah
client.commands = new Collection();

// Baca semua file di folder commands
function getAllCommandFiles(dirPath, arrayOfFiles = []) {
    const files = fs.readdirSync(dirPath);

    for (const file of files) {
        const fullPath = path.join(dirPath, file);
        if (fs.statSync(fullPath).isDirectory()) {
            getAllCommandFiles(fullPath, arrayOfFiles);
        } else if (file.endsWith('.js')) {
            arrayOfFiles.push(fullPath);
        }
    }

    return arrayOfFiles;
}

// Ambil semua file perintah
const commandFiles = getAllCommandFiles(path.resolve(__dirname, 'commands')); // Use absolute path
for (const file of commandFiles) {
    const command = require(file);
    client.commands.set(command.name, command);
}

client.on('ready', () => {
    console.log(`Bot aktif sebagai ${client.user.tag}`);
});


// Event ketika bot menerima pesan
client.on('messageCreate', message => {
    if (!message.content.startsWith(PREFIX) || message.author.bot) return;

    const args = message.content.slice(PREFIX.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName);
    if (!command) return;

    try {
        command.execute(message, args, client);
    } catch (error) {
        console.error(error);
        message.reply('Terjadi kesalahan saat mengeksekusi perintah.');
    }
});

client.on('messageCreate', message => {
    // Cek apakah bot disebutkan atau membalas pesan bot
    // Jika bot disebutkan atau membalas pesan bot
    const isMentioned = message.mentions.has(client.user);
    const isReplyToBot = message.reference && message.mentions.repliedUser?.id === client.user.id;

    if (( isMentioned || isReplyToBot)) {
        const sayCommand = client.commands.get('say');
        if (!sayCommand) return;

        const rawArgs = message.content.replace(`<@${client.user.id}>`, '').trim();

        const finalArgs = rawArgs.length ? rawArgs.split(/  +/) : [];
        try {
            sayCommand.execute(message, finalArgs, client);
        } catch (error) {
            console.error(error);
            message.reply('Terjadi kesalahan saat mengeksekusi perintah.');
        }
    }
} )


client.login(TOKEN);
