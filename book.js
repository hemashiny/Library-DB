const mongoose = require("../db");

// Define schema
const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  publishedYear: {
    type: Number,
    min: 0
  },
  availableCopies: {
    type: Number,
    min: 0
  }
});

// Create model
module.exports = mongoose.model("Book", bookSchema);
