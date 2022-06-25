const express = require("express");
const config = require("./config");
const route = require("./routes");
const cors = require("cors");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const { ref, onValue } = require("firebase/database");
const db = require("./db");

const dbRef = ref(db);
var val = {};

const bodyParser = require("body-parser");

io.on("connection", (socket) => {
  onValue(dbRef, (snapshot) => {
    const data = snapshot.val();
    val = data;
    socket.emit('all data', val)
  });
});

app.use(bodyParser.json({ limit: "100mb" }));
app.use(express.json());
app.use(cors());

app.use("/api", route.routes);

server.listen(config.port, () => {
  console.log("App is listening on url http://localhost:", config.port);
});
