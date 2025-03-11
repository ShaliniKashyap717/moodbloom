const journalModel = require('../models/journalModel');

module.exports = {
    showJournal(req, res) {
        const entries = journalModel.getEntries();
        res.render('journal', { entries });
    },
    addJournalEntry(req, res) {
        const { title, content } = req.body;

        if (title && content) {
            journalModel.addEntry(title, content);
        }

        res.redirect('/');
    },
};
