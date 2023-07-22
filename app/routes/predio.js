const express = require("express");
const uploadMiddleware = require("../utils/handleStorage");
const router = express.Router();
const {
  getItem,
  getItems,
  createItem,
  deleteItem,
  updateItem,
  uploadImage,
  uploadVideos,
} = require("../controlles/predio");

router.get("/", getItems);
router.get("/:id", getItem);
router.post("/", createItem);
router.post("/:id/upload", uploadMiddleware.single("myfile"), uploadImage);
router.post("/:id/videos", uploadVideos);

router.patch("/:id", updateItem);
router.delete("/:id", deleteItem);

module.exports = router;
