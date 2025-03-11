const chatModel = require("../models/chatModel");

module.exports = {
    renderWelcomePage(req, res) {
        res.render("welcome_chat");
    },
    renderChatPage(req, res) {
        const { username } = req.query;
        if (!username) {
            return res.redirect("/");
        }
        res.render("chat", { username });
    },
    handleSocketConnection(io) {
        io.on("connection", (socket) => {
            console.log("A user connected");

            socket.on("chat message", (data) => {
                chatModel.addMessage(data.user, data.message);

                io.emit("chat message", { user: data.user, message: data.message });
            });

            socket.on("disconnect", () => {
                console.log("A user disconnected");
            });
        });
    },
};
