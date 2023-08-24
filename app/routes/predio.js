const express = require("express");
const uploadMiddleware = require("../utils/handleStorage");
const router = express.Router();
const {
  getPredio,
  getPredios,
  getPrediosWithImages,
  getPredioWithImages,
  createPredio,
  deletePredio,
  updatePredio,
} = require("../controlles/predio");

router.get("/", getPredios);
router.get("/prediowithimages", getPrediosWithImages);
router.get("/prediowithimages/:id", getPredioWithImages);
router.get("/:id", getPredio);
router.post("/", uploadMiddleware.single("myfile"), createPredio);
router.patch("/:id", uploadMiddleware.single("myfile"), updatePredio);
router.delete("/:id", deletePredio);

module.exports = router;
