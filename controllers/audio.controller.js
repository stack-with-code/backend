const Audio = require("../model/audio.model");

// Create a new audio entry
const postAudio = async (req, res) => {
  try {
    const { category_name, title, episode } = req.body;

    if (!category_name || !title) {
      return res
        .status(400)
        .json({ message: "Category name and title are required" });
    }

    // Handle only audio files
    const audioFiles = req.files["audio"]
      ? req.files["audio"].map((file) => file.path)
      : [];

    const newAudio = new Audio({
      category_name,
      title,
      episode,
      audio: audioFiles,
    });

    await newAudio.save();

    res.status(201).json({
      message: "Audio entry created successfully",
      audio: newAudio,
    });
  } catch (error) {
    console.error("Error creating audio entry:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
};

// Get all audio entries
const getAudios = async (req, res) => {
  try {
    const audios = await Audio.find();
    res.status(200).json(audios);
  } catch (error) {
    console.error("Error fetching audio entries:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
};

// Get a single audio entry by ID
const getAudioById = async (req, res) => {
  try {
    const audio = await Audio.findById(req.params.id);
    if (!audio) {
      return res.status(404).json({ message: "Audio entry not found" });
    }
    res.status(200).json(audio);
  } catch (error) {
    console.error("Error fetching audio:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
};

// Update an audio entry by ID
const updateAudio = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Audio ID is required" });
    }

    // Find existing audio entry
    const audio = await Audio.findById(id);
    if (!audio) {
      return res.status(404).json({ message: "Audio entry not found" });
    }

    // Handle new audio files
    if (req.files["audio"]) {
      audio.audio.push(...req.files["audio"].map((file) => file.path));
    }

    // Update fields if provided
    const { category_name, title, episode } = req.body;
    if (category_name) audio.category_name = category_name;
    if (title) audio.title = title;
    if (episode) audio.episode = episode;

    const updatedAudio = await audio.save();

    res.status(200).json({
      message: "Audio entry updated successfully",
      audio: updatedAudio,
    });
  } catch (error) {
    console.error("Error updating audio entry:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

// Delete an audio entry by ID
const deleteAudio = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedAudio = await Audio.findByIdAndDelete(id);

    if (!deletedAudio) {
      return res.status(404).json({ message: "Audio entry not found" });
    }

    res.status(200).json({
      message: "Audio entry deleted successfully",
      audio: deletedAudio,
    });
  } catch (error) {
    console.error("Error deleting audio entry:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
};

module.exports = {
  postAudio,
  getAudios,
  getAudioById,
  updateAudio,
  deleteAudio,
};
