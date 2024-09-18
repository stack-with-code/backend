const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const categoryController = require("../controllers/category.controller");
// const subCategoryController = require("../controllers/subcategory.controller");
const publishController = require("../controllers/publish.controller");
const audioController = require("../controllers/audio.controller");

// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

// const upload = multer({ storage: storage });

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10 MB limit
  },
});

// Category Routes
router.post("/categories", categoryController.postCategory);
router.get("/categories", categoryController.getCategories);
router.get("/categories/:id", categoryController.getCategoryById);
router.put("/categories/:id", categoryController.updateCategory);
router.delete("/categories/:id", categoryController.deleteCategory);

// Sub-Category Routes
// router.post("/subcategories", subCategoryController.postSubCategory);
// router.get("/subcategories", subCategoryController.getSubCategories);

// router.get(
//   "/subcategories/:category_name",
//   subCategoryController.getSubCategoriesByCategory
// );

// router.get("/subcategories/:id", subCategoryController.getSubCategoryById);
// router.put("/subcategories/:id", subCategoryController.updateSubCategory);
// router.delete("/subcategories/:id", subCategoryController.deleteSubCategory);

// Publish Routes
// router.post("/publishes", publishController.createPublish);
// router.get("/publishes", publishController.getPublishes);
// router.get("/publishes/:id", publishController.getPublishById);
// router.put("/publishes/:id", publishController.updatePublish);

// router.delete("/publishes/:id", publishController.deletePublish);

router.post(
  "/publishes",
  upload.single("image"),
  publishController.createPublish
); // Use multer middleware
router.get("/publishes", publishController.getPublishes);
router.get("/publishes/:id", publishController.getPublishById);
router.put("/publishes/:id", publishController.updatePublish);
router.delete("/publishes/:id", publishController.deletePublish);

// Audio Routes
router.post(
  "/audios",
  upload.fields([
    { name: "audio", maxCount: 10 },
    { name: "audio_image", maxCount: 1 },
  ]),
  audioController.postAudio
);
router.get("/audios", audioController.getAudios);
router.get("/audios/:id", audioController.getAudioById);
// router.put("/audios/:id", audioController.updateAudio);
router.put(
  "/audios/:id",
  upload.fields([
    { name: "audio_image", maxCount: 10 },
    { name: "audio", maxCount: 10 },
  ]),
  audioController.updateAudio
);

router.delete("/audios/:id", audioController.deleteAudio);

module.exports = router;
