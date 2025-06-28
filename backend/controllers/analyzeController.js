const { runPuppeteer } = require('../services/puppeteerService');
const { downloadAndConvertAudio } = require('../services/audioService');

const { transcribe } = require('../services/scribeService');
const { detectAI } = require('../services/gptZeroService');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

exports.analyzeVideo = async (req, res) => {
  const { url } = req.body;
  const id = uuidv4();
  try {
    const screenshotPath = await runPuppeteer(url, id);
    const audioPath = await downloadAndConvertAudio(url, id);

    const transcript = await transcribe(audioPath);
    const enriched = await detectAI(transcript);

    const resultPath = `results/${id}.json`;
    fs.writeFileSync(resultPath, JSON.stringify({ id, screenshotPath, transcript: enriched }, null, 2));

    res.json({ id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getResult = (req, res) => {
  const file = path.join(__dirname, `../results/${req.params.id}.json`);
  if (fs.existsSync(file)) res.sendFile(file);
  else res.status(404).json({ error: 'Result not found' });
};