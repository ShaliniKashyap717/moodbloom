require('dotenv').config();
const express = require('express');
const bodyParser = require("body-parser");
const session = require('express-session');
const moodController = require('./controllers/moodController');

const app = express();
const PORT = process.env.PORT || 5001;

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: process.env.SESSION_SECRET || 'default_secret',
    resave: false,
    saveUninitialized: true,
}));

app.get("/", moodController.renderHomePage);
app.post("/", moodController.processMoodData);

app.listen(PORT, () => console.log(`Server running at port http://localhost:${PORT}`));
