const mongoose = require("mongoose");

const publishSchema = new mongoose.Schema({
  category_names: [],
  writer: String,
  book_title: String,
  book_description: String,
  image: String, // Store the image path or filename
});

module.exports = mongoose.model("Publish", publishSchema);
