const chatMessages = [];

module.exports = {
    addMessage(user, message) {
        chatMessages.push({ user, message, timestamp: new Date() });
    },
    getMessages() {
        return chatMessages;
    },
};
