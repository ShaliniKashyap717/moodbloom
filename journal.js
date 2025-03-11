const express = require('express');
const bodyParser = require('body-parser');
const journalController = require('./controllers/journalController');

const app = express();
const PORT = 4000;

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', journalController.showJournal);
app.post('/add-entry', journalController.addJournalEntry);

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
