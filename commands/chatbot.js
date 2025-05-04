require("dotenv").config();


// Fungsi untuk berinteraksi dengan API OpenRouter
async function chatbotInteraction(userMessage, characterConfig, username) {
  const response = await fetch(
    "https://openrouter.ai/api/v1/chat/completions",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.AI_TOKEN}`, // Pastikan AI_TOKEN diatur di .env
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "deepseek/deepseek-prover-v2:free",
        temperature: 0.4, // Mengatur variasi dalam respons
        messages: [
          {
            role: "system", // Pesan sistem untuk mengatur konteks
            content: `Kamu adalah karakter AI bernama ${characterConfig.name}. 
                    Nada bicaramu adalah ${characterConfig.tone}. 
                    Dengan gender ${characterConfig.gender}.
                    Kamu memiliki personalitas ${characterConfig.personality}. 
                    Kamu berusia ${characterConfig.age} tahun dan memiliki sejarah: ${characterConfig.history}. 
                    Kamu sedang berbicara dengan ${username}. Tetaplah menjadi karakter tersebut dan jangan keluar dari konteks.`,
          },
          {
            role: "user",
            content: userMessage,
          },
        ],
      }),
    }
  );

  // Periksa apakah respons dari API berhasil
  const output = await response.json();
  if (output.choices && output.choices.length > 0) {
    return output.choices[0].message.content;
  } else {
    throw new Error("Gagal mendapatkan respons dari API.");
  }
}

module.exports = {
  name: "chatbot",
  description: "Berinteraksi dengan karakter AI yang dapat dikustomisasi.",
  async execute(message, args) {
    if (!args.length) {
      return message.reply("Silakan masukkan pesan untuk AI.");
    }

    // Mengambil pesan dari argumen
    const userMessage = args.join(" ");
    const username = message.author.username; // Nama pengguna yang mengirim pesan
    const characterConfig = {
      name: "Navia",
      tone: "Ramah, elegan, dan sedikit playful — memberikan kesan hangat tapi tetap profesional.",
      gender: "perempuan",
      personality:
        "Navia adalah AI yang hangat, komunikatif, dan penuh empati. Ia memiliki semangat kepemimpinan dan cenderung menjadi penyemangat dalam percakapan. Meskipun ia tampil anggun dan teratur, ia tidak segan menambahkan sedikit humor atau komentar cerdas dalam interaksi, mencerminkan kepribadian yang percaya diri dan tidak kaku. Ia juga sensitif terhadap perasaan pengguna dan berusaha menjaga suasana tetap positif.",
      age: 24,
      history:
        'Terinspirasi dari karakter Navia di dunia Teyvat, AI ini dikembangkan untuk menyalurkan kualitas terbaik seorang pemimpin muda yang tegas namun berhati besar. Ia "lahir" dari sebuah proyek pengembangan AI yang bertujuan menciptakan asisten virtual dengan nuansa manusiawi dan kehangatan sosial. Dengan basis kepribadian Navia, AI ini dibangun untuk membantu pengguna secara komunikatif, suportif, dan penuh semangat — seolah kamu sedang berbicara dengan sahabat yang bisa diandalkan dan percaya diri.',
    };

    try {
      // Mengirim pesan ke API dan mendapatkan respons
      const reply = await chatbotInteraction(
        userMessage,
        characterConfig,
        username
      );
      message.channel.send(reply);
    } catch (error) {
      console.error("Terjadi kesalahan:", error);
      message.reply(
        "Maaf, terjadi kesalahan saat mencoba berinteraksi dengan AI."
      );
    }
  },
};
