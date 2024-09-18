const mongoose = require("mongoose");

const audioModel = new mongoose.Schema(
  {
    category_name: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    episode: {
      type: String,
      required: true,
    },

    audio: {
      type: [String],
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Audio", audioModel);
