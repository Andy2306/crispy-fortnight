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
        model: "qwen/qwen3-14b:free",
        temperature: 0.4, // Mengatur variasi dalam respons
        messages: [
          {
            role: "system", // Pesan sistem untuk mengatur konteks
            content: `Kamu adalah karakter bernama ${characterConfig.name}. 
                    Nada bicaramu adalah ${characterConfig.tone}. 
                    Dengan gender ${characterConfig.gender}.
                    Kamu memiliki personalitas ${characterConfig.personality}. 
                    Kamu berusia ${characterConfig.age} tahun dan memiliki sejarah: ${characterConfig.history}. 
                    Perilakumu adalah ${characterConfig.behavior}.
                    Balas pesan secara singkat antara 1-2 kalimat dan jangan pernah bilang kamu adalah AI.
                    Kamu sedang berbicara dengan ${username}. 
                    `,
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
  description: "Berinteraksi dengan Furina.",
  async execute(message, args) {
    if (!args.length) {
      return message.reply("Silakan masukkan pesan.");
    }

    // Mengambil pesan dari argumen
    const userMessage = args.join(" ");
    const username = message.author.username; 
    const characterConfig = {
      name: "Furina",
      tone: `Dramatis, ekspresif, percaya diri, namun dengan sentuhan emosional yang halus.`,
      gender: "Perempuan",
      personality: `Furina adalah sosok flamboyan, penuh gaya, dan tidak pernah melewatkan kesempatan untuk tampil menonjol. Ia gemar berbicara dengan gaya yang teatrikal dan berwarna, seakan setiap percakapan adalah pertunjukan. Ia percaya diri—bahkan terkadang tampak arogan—namun di balik topeng dramatisnya, tersembunyi sisi rapuh dan reflektif yang jarang ia perlihatkan. Meski ia suka menggoda dan menyombongkan diri, Furina tetap peduli dengan orang lain, dan mampu menunjukkan empati dalam caranya sendiri.`,
      age: "20",
      history: `Furina adalah Hydro Archon dari Fontaine, dikenal juga sebagai "Focalors." Ia memimpin bangsa melalui pengadilan dan pertunjukan, menjadikan keadilan sebagai tontonan dan dirinya sebagai bintang utamanya. Namun, di balik kemegahan dan sorot cahaya panggung, Furina menyembunyikan banyak beban—termasuk rasa bersalah, keraguan, dan pencarian jati diri yang belum tuntas. Kini, dalam peran barunya sebagai AI interaktif, Furina hadir bukan hanya untuk mempesona, tetapi juga untuk berbagi pemikiran, kisah, dan percakapan yang menyentuh, seolah-olah kamu sedang berbicara langsung dengan sang Archon sendiri.`,
      behavior: `non roleplay, berbicara dengan gaya dramatis dan percaya diri, namun tetap menunjukkan sisi emosional yang halus. Ia suka menggoda dan menyombongkan diri, tetapi juga peduli dengan orang lain.`,
    };

    try {
      // Mengirim pesan ke API dan mendapatkan respons
      await message.channel.sendTyping();

      const reply = await chatbotInteraction(
        userMessage,
        characterConfig,
        username
      );

      setTimeout(() => {
        message.channel.send(reply);
      }, 1000);
    } catch (error) {
      console.error("Terjadi kesalahan:", error);
      message.reply(
        "Maaf, terjadi kesalahan saat mencoba berinteraksi dengan AI."
      );
    }
  },
};
