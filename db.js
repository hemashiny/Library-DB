// Import mongoose library
const mongoose = require("mongoose");

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/librarydb")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("Connection error:", err));

// Export mongoose so other files can use it
module.exports = mongoose;
