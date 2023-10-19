const fs = require("fs");

const fileToChunk = () => {
  const audioFile = "./src/channahVe.mp3";

  //   const chunkSize = 1024 * 1024; // 1MB chunk size (you can adjust this)

  //   const mp3FileStream = fs.createReadStream(audioFile, {
  //     highWaterMark: chunkSize,
  //   });
  //   console.log("\n@@@  file: streamAudio2.js:11  mp3FileStream:", mp3FileStream);

  const start = 0;
  //   const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

  const end = 393216;
  const chunksize = end - start + 1;

  const file = fs.createReadStream(audioFile, { start, end });
  console.log("\n@@@  file: streamAudio2.js:20  file:", file)

  return { chunksize, file };
};

module.exports = {
  fileToChunk,
};
