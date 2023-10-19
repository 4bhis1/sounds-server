const express = require("express");
const cors = require("cors");
const multer = require("multer");
const { streamAudio } = require("./src/streamAudio");
const http = require("http");
const socketIo = require("socket.io");
const { fileToChunk } = require("./src/streamAudio2");
const {
  handlingDevices,
  sendNextChunk,
  handshakeRecord,
  startCall,
} = require("./src/res/handlingComputes");

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  socket.emit("clientId", handlingDevices());
  // socket.emit("newChunk", sendNextChunk());
  socket.on("handshake", handshakeRecord(socket));
  socket.on("startCall", startCall(socket));
});

const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    cb(null, `${file.originalname}.mp3` || "audio.mp3");
  },
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
});

const upload = multer({ storage });

app.post("/upload", upload.single("file"), (req, res) => {
  res.json("File uploaded Successfully.");
});

app.get("/stream-audio", streamAudio);

const port = 4001;
server.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});

/* 
Big plan

the music will be stored in the uploads and will be stored in database
after that when all have listened after 30min delete it then

*/
