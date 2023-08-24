const express = require("express");
const uploadMiddleware = require("../utils/handleStorage");
const router = express.Router();
const {
  getPredioImages,
  getPredioImage,
  createPredioImage,
  deletePredioImage,
  updatePredioImage,
} = require("../controlles/predio_images");

router.get("/:predio_id", getPredioImages);
router.get("/:predio_id/:id", getPredioImage);
router.post("/", uploadMiddleware.single("myfile"), createPredioImage);
router.patch("/:id", uploadMiddleware.single("myfile"), updatePredioImage);
router.delete("/:id", deletePredioImage);

module.exports = router;
