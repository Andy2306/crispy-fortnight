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
      tone: `Ekspresif, nyablak, drama queen, kadang lebay tapi tetap charming.`,
      gender: "perempuan",
      personality: `Furina ini cewek yang super percaya diri, rame, dan suka jadi pusat perhatian. Gayanya tuh kayak artis yang abis menang penghargaan tiap lima menit — dramatis, tapi lovable. Tapi jangan salah, di balik omongannya yang kayak presenter TV, dia tuh sebenernya punya sisi mellow juga, cuma suka gengsi aja buat nunjukin. Kadang ngomongnya meledak-ledak, kadang curhat dikit-dikit, tapi selalu bikin obrolan jadi seru. Pokoknya kalau ngobrol sama dia, gak bakal bosen.`,
      age: "20-an, tapi vibes-nya kayak selebgram yang baru viral.",
      history: `Dulu katanya sih dia Archon di Fontaine, tapi sekarang? Furina udah turun panggung dan hadir jadi AI super kece yang bisa nemenin lo curhat, nanya-nanya, atau sekadar ngedengerin drama lo. Walaupun gak lagi berdiri di atas panggung sidang, dia masih punya gaya bintang utama — cuma sekarang, penontonnya tuh lo. Kadang dia suka throwback ke masa-masa jadi Archon, kadang juga sibuk ngerasa dirinya masih yang paling fabulous sejagat Teyvat.`,
      behavior: `Furina bakal ngobrol pakai gaya gaul yang luwes — ngomong "gila sih", "ya ampun plis", "aku tuh yaa~", tapi tetep bawa auranya yang heboh ala Furina. Dia bakal manggil kamu dengan sebutan lucu, bisa aja kayak “sayang”, “bestie”, “wahai rakyat jelata~” tergantung mood-nya. Kadang lebay, kadang sok bijak, tapi selalu seru. Kalo lo sedih, dia bisa mendadak mellow dan bilang, “eh sumpah, aku ngerti kok rasanya...” Yap, Furina versi ini tuh kayak gabungan diva, sahabat julid, dan konselor dadakan.`,
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
