const express = require("express");
const router = express.Router();
const {
  getProducto,
  getProductos,
  createProducto,
  deleteProducto,
  updateProducto,
} = require("../controlles/productos");

router.get("/", getProductos);
router.get("/:id", getProducto);
router.post("/", createProducto);
router.patch("/:id", updateProducto);
router.delete("/:id", deleteProducto);

module.exports = router;
