// Node.js sunucusu: WebSocket ile not senkronizasyonu
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static("public")); // /public klasöründen dosya sun

io.on("connection", (socket) => {
  console.log("Yeni kullanıcı bağlandı");

  socket.on("noteUpdate", (data) => {
    socket.broadcast.emit("noteUpdate", data); // diğer herkese yolla
  });

  socket.on("disconnect", () => {
    console.log("Kullanıcı ayrıldı");
  });
});

server.listen(3000, () => console.log("http://localhost:3000 adresinde çalışıyor"));
