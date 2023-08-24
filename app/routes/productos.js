const express = require("express");
const uploadMiddleware = require("../utils/handleStorage");
const router = express.Router();
const {
  getProducto,
  getProductos,
  createProducto,
  deleteProducto,
  updateProducto,
  getProductsByPredio,
} = require("../controlles/productos");

router.get("/", getProductos);
router.get("/:id", getProducto);
router.get("/productsbypredio/:id", getProductsByPredio);
router.post("/", uploadMiddleware.single("myfile"), createProducto);
router.patch("/:id", uploadMiddleware.single("myfile"), updateProducto);
router.delete("/:id", deleteProducto);

module.exports = router;
