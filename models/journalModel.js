const journalEntries = [];

module.exports = {
    getEntries() {
        return journalEntries;
    },
    addEntry(title, content) {
        journalEntries.push({ title, content, date: new Date() });
    },
};
