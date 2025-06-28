const { exec } = require("child_process");
const path = require("path");

exports.downloadAndConvertAudio = async (url, id) => {
  const outputPath = path.resolve(`uploads/${id}.wav`);
  const command = `yt-dlp -f bestaudio -o - "${url}" | ffmpeg -i pipe:0 -ar 16000 -ac 1 -acodec pcm_s16le -f wav "${outputPath}"`;

  return new Promise((resolve, reject) => {
    exec(command, { shell: "/bin/bash" }, (error, stdout, stderr) => {
      if (error) {
        console.error("Audio conversion error:", stderr);
        return reject(new Error("Audio conversion failed"));
      }
      resolve(outputPath);
    });
  });
};
