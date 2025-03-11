const storyModel = require('../models/storyModel');

module.exports = {
    renderPostPage(req, res) {
        res.render('post');
    },
    handleSocketConnection(io) {
        io.on('connection', (socket) => {
            console.log('A user connected');

            socket.emit('existingStories', storyModel.getAllStories());

            socket.on('newStory', (story) => {
                storyModel.addStory(story);
                io.emit('storyAdded', story); 
            });

            socket.on('disconnect', () => {
                console.log('A user disconnected');
            });
        });
    },
};
