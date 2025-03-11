const mongoose = require("mongoose");

const suggestionSchema = new mongoose.Schema({
  happy: Number,
  calm: Number,
  sad: Number,
  angry: Number,
  stressed: Number,
  prompt: String, 
});

const Suggestion = mongoose.model("Suggestion", suggestionSchema);
module.exports = Suggestion;

mongoose
  .connect("mongodb://localhost:27017/mood-tracker", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

Suggestion.insertMany(suggestions)
  .then(() => {
    console.log("Data added successfully!");
  })
  .catch((err) => console.error("Error adding data:", err));
  module.exports = Suggestion;