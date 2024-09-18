const Publish = require("../model/publish.model");

// Create a new publish
exports.createPublish = async (req, res) => {
  try {
    // Extract image file from req.file (handled by Multer)
    const { category_names, writer, book_title, book_description } = req.body;
    const image = req.file ? req.file.filename : null; // Handle image file

    const newPublish = new Publish({
      category_names, // Save as an array
      writer,
      book_title,
      book_description,
      image, // Save image filename
    });

    await newPublish.save();
    res.status(201).json(newPublish);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all publishes
exports.getPublishes = async (req, res) => {
  try {
    const publishes = await Publish.find();
    res.status(200).json(publishes);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get a single publish by ID
exports.getPublishById = async (req, res) => {
  try {
    const publish = await Publish.findById(req.params.id);
    if (!publish) return res.status(404).json({ message: "Publish not found" });
    res.status(200).json(publish);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a publish
exports.updatePublish = async (req, res) => {
  try {
    const publish = await Publish.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!publish) return res.status(404).json({ message: "Publish not found" });
    res.status(200).json(publish);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a publish
exports.deletePublish = async (req, res) => {
  try {
    const publish = await Publish.findByIdAndDelete(req.params.id);
    if (!publish) return res.status(404).json({ message: "Publish not found" });
    res.status(200).json({ message: "Publish deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
