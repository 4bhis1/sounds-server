const fs = require("fs");

const streamAudio = (req, res) => {
  const audioFile = "./src/channahVe.mp3";

  const stat = fs.statSync(audioFile);
  const fileSize = stat.size;
  const range = req.headers.range;

  if (range) {
    const parts = range.replace(/bytes=/, "").split("-");
    console.log("\n@@@  file: streamAudio.js:12  parts:", parts);
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

    const chunksize = end - start + 1;
    const file = fs.createReadStream(audioFile, { start, end });
    console.log("\n@@@  file: streamAudio.js:18  file:", file);
    const head = {
      "Content-Range": `bytes ${start}-${end}/${fileSize}`,
      "Accept-Ranges": "bytes",
      "Content-Length": chunksize,
      "Content-Type": "audio/mpeg",
    };

    res.writeHead(206, head);
    file.pipe(res);
  } else {
    const head = {
      "Content-Length": fileSize,
      "Content-Type": "audio/mpeg",
    };
    res.writeHead(200, head);
    fs.createReadStream(audioFile).pipe(res);
  }
};

module.exports = {
  streamAudio,
};
