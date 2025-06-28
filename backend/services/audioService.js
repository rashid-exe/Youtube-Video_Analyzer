const ytdl = require('@distube/ytdl-core');

const ffmpeg = require('fluent-ffmpeg');
const fs = require('fs');

exports.downloadAndConvertAudio = async (url, id) => {
  const mp3Path = `uploads/${id}.mp3`;
  const wavPath = `uploads/${id}.wav`;

  // Step 1: Download the MP3 first
  return new Promise((resolve, reject) => {
    const writeStream = fs.createWriteStream(mp3Path);

    ytdl(url, {
      quality: 'highestaudio',
      filter: 'audioonly',
      highWaterMark: 1 << 25, // buffer size
    })
      .pipe(writeStream)
      .on('finish', () => {
        // Step 2: Convert MP3 to WAV
        ffmpeg(mp3Path)
          .audioFrequency(16000)
          .audioChannels(1)
          .audioCodec('pcm_s16le')
          .format('wav')
          .save(wavPath)
          .on('end', () => {
            fs.unlinkSync(mp3Path); // cleanup
            resolve(wavPath);
          })
          .on('error', (err) => {
            console.error('FFmpeg conversion error:', err.message);
            reject(new Error('Audio conversion failed'));
          });
      })
      .on('error', (err) => {
        console.error('Download error:', err.message);
        reject(new Error('Audio download failed'));
      });
  });
};
