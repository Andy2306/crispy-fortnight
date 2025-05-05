# 🤖 crispy-fortnight

**crispy-fortnight** adalah sebuah bot Discord berbasis **JavaScript** yang udah terintegrasi sama **AI** (menggunakan model Qwen 3.14B dari OpenRouter). Proyek ini cocok buat eksperimen, hiburan, atau cuma sebagai dasar pengembangan bot AI-mu sendiri! 🚀

---

## 🛠️ Fitur Utama

- 🔗 Terhubung dengan model AI gratis dari OpenRouter
- 💬 Interaksi cerdas melalui chat
- ⚙️ Mudah dikonfigurasi menggunakan file `.env`
- 🧠 Menggunakan model AI **qwen3-14b:free**

---

## 📥 Cara Menggunakan

1. 🧾 Clone repository ini:
   ```bash
   git clone https://github.com/username/crispy-fortnight.git
   cd crispy-fortnight
   ```

2. 📦 Install dependencies:
   ```bash
   npm install
   ```

3. 🧪 Buat file `.env` dan masukkan token-token yang dibutuhin (lihat langkah berikutnya).

---

## 🤖 Cara Bikin Bot Discord

1. Masuk ke [Discord Developer Portal](https://discord.com/developers/applications).
2. Klik **New Application** dan beri nama sesuai keinginan atau kalau udah punya tinggal lanjut aja.
3. Pergi ke tab **Bot**, lalu klik **Reset Token** dan salin token bot-nya.
4. Buat file `.env` dan tambahkan baris berikut:
   ```ini
   TOKEN=masukkan_token_bot_disini
   ```

---

## 🧠 Cara Dapatin Token AI

1. Kunjungi [OpenRouter.ai](https://openrouter.ai).
2. Login atau daftar akun.
3. Cari dan pilih model **qwen3-14b:free**.
4. Masuk ke bagian **API**, lalu buat dan salin API Key.
5. Tambahkan ke file `.env` seperti ini:
   ```ini
   AI_TOKEN=masukkan_token_AI_disini
   ```

---

## 🧪 Contoh `.env`

Berikut adalah contoh isi file `.env` kamu:
```ini
TOKEN=your_discord_bot_token
AI_TOKEN=your_openrouter_api_token
```

---

## 💡 Catatan

- Bot ini dibuat hanya untuk keperluan eksperimen atau edukasi.
- **Jangan membagikan file `.env` ke publik** atau meng-upload-nya ke repository GitHub.
- Kalo mau edit karakternya, silahkan buka `commands/chatbot.js`, semuanya ada disitu.

---

## 📜 Lisensi

Proyek ini berada di bawah lisensi **MIT**. Silakan otak-atik sesuka hati! ❤️

---

## ✨ Kontribusi

Pull request sangat terbuka! Jika kamu punya ide fitur baru atau menemukan bug, silakan buat issue atau PR ya! 😉

---