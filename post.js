const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const storyController = require('./controllers/storyController');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = process.env.PORT || 5555;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', storyController.renderPostPage);

storyController.handleSocketConnection(io);

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
