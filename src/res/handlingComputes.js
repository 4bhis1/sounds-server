const data = {
  devices: [],
  chunksRecords: {},
  currChunk: 0,
  status: "",
};

const handlingDevices = () => {
  const clientId = Math.ceil(Math.random() * 100000 - 1);
  data.devices.push(clientId);
  console.log(">>> newClient in the house", data.devices);
  return clientId;
};

const sendNextChunk = () => {
  data.chunksRecords[data.currChunk] = {};
  console.log(">>> new chunk here");
  return data.currChunk++;
};

// coming from client
const handshakeRecord =
  (socket) =>
  ({ clientId, chunkNumber }) => {
    console.log(
      "\n@@@  file: handlingComputes.js:23  chunkNumber:",
      chunkNumber,
      data,
      data.chunksRecords[chunkNumber]
    );

    data.chunksRecords[chunkNumber][clientId] = 1;
    if (
      Object.keys(data.chunksRecords[chunkNumber]).length ===
      data.devices.length
    ) {
      socket.emit("newChunk", sendNextChunk());
    }
  };

const startCall = (socket) => (status) => {
  if (status === "start") {
    socket.emit("newChunk", sendNextChunk());
  }
  data.status = status;
};

module.exports = {
  handlingDevices,
  handshakeRecord,
  sendNextChunk,
  startCall,
};
