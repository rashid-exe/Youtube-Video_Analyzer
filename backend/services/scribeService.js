const fs = require("fs");
const axios = require("axios");
const FormData = require("form-data");
require("dotenv").config();

const API_KEY = process.env.ASSEMBLYAI_API_KEY;

const assembly = axios.create({
  baseURL: "https://api.assemblyai.com/v2",
  headers: { authorization: API_KEY },
});

async function uploadAudio(audioPath) {
  const data = fs.createReadStream(audioPath);
  const res = await assembly.post("/upload", data);
  return res.data.upload_url;
}

async function startTranscription(audioUrl) {
  const res = await assembly.post("/transcript", {
    audio_url: audioUrl,
    speaker_labels: true,
    iab_categories: false,
  });
  return res.data.id;
}

async function pollTranscription(id) {
  while (true) {
    const res = await assembly.get(`/transcript/${id}`);
    if (res.data.status === "completed") return res.data;
    if (res.data.status === "error") throw new Error(res.data.error);
    await new Promise((resolve) => setTimeout(resolve, 3000)); // Wait 3 sec
  }
}

exports.transcribe = async (audioPath) => {
  const audioUrl = await uploadAudio(audioPath);
  const transcriptId = await startTranscription(audioUrl);
  const fullResult = await pollTranscription(transcriptId);

  // Map it to the format your frontend expects
  return fullResult.words.map((word) => ({
    text: word.text,
    start: word.start / 1000,
    end: word.end / 1000,
    speaker: word.speaker || "Speaker",
  }));
};
