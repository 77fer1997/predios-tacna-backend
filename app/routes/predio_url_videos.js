const express = require("express");
const router = express.Router();
const {
  getPredioVideos,
  getPredioVideo,
  createPredioVideo,
  deletePredioVideo,
} = require("../controlles/predio_url_videos");

router.get("/:predio_id", getPredioVideos);
router.get("/:predio_id/:id", getPredioVideo);
router.post("/", createPredioVideo);
router.delete("/:id", deletePredioVideo);

module.exports = router;
