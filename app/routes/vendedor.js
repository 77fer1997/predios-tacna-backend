const express = require("express");
const router = express.Router();
const {
  getVendedor,
  getVendedores,
  createVendedor,
  deleteVendedor,
  updateVendedor,
} = require("../controlles/vendedor");

router.get("/", getVendedores);
router.get("/:id", getVendedor);
router.post("/", createVendedor);
router.patch("/:id", updateVendedor);
router.delete("/:id", deleteVendedor);

module.exports = router;
