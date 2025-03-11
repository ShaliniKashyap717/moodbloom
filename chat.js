const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");

const chatController = require("./controllers/chatController");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = process.env.PORT || 7001;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", chatController.renderWelcomePage);
app.get("/chat", chatController.renderChatPage);

chatController.handleSocketConnection(io);

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
