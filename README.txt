HENDAR VOICE SPEECH

Struktur:
- index.html (di root, bukan di folder public)
- server.js
- package.json
- .env.example

Deploy Railway:
1. Upload isi ZIP ini ke repository GitHub.
2. Buat project Railway dari repository tersebut.
3. Tambahkan Variable:
   DATABYTE_API_KEY = API key DataByte lengkap milik Anda
4. Railway akan menjalankan `npm start`.

Catatan:
- API key tidak disimpan di index.html.
- Jangan upload file .env berisi API key asli ke GitHub.
- Endpoint Chat Completions tidak dipakai; website ini memakai endpoint Text-to-Speech.
- Pilihan voice yang tampil perlu cocok dengan voice yang didukung provider.
