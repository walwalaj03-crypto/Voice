const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: "1mb" }));
// index.html is in the project root (outside any public folder).
app.use(express.static(__dirname));

app.post("/api/speech", async (req, res) => {
  try {
    const { input, voice } = req.body || {};

    if (typeof input !== "string" || !input.trim()) {
      return res.status(400).json({ error: "Masukkan teks terlebih dahulu!" });
    }

    const apiKey = process.env.DATABYTE_API_KEY;
    if (!apiKey) {
      return res.status(500).json({
        error: "API Key belum dipasang di Railway Variables."
      });
    }

    const response = await fetch(
      "https://ai.databyte.co.id/gateway/v1/audio/speech",
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "elevenlabs/eleven-v3-conversational",
          input: input.trim(),
          voice: voice || "george"
        })
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      return res.status(response.status).json({
        error: errorText || "Gagal membuat audio."
      });
    }

    const audio = Buffer.from(await response.arrayBuffer());
    res.set({
      "Content-Type": response.headers.get("content-type") || "audio/mpeg",
      "Content-Length": audio.length,
      "Cache-Control": "no-store"
    });
    return res.send(audio);
  } catch (error) {
    console.error("Speech Error:", error);
    return res.status(500).json({ error: "Terjadi kesalahan pada server." });
  }
});

app.get("/health", (req, res) => res.json({ status: "online" }));

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Hendar Voice Speech running on port ${PORT}`);
});
