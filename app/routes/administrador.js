const express = require("express");
const router = express.Router();
const {
  getAdministrador,
  getAdministradores,
  createAdministrador,
  deleteAdministrador,
  updateAdministrador,
} = require("../controlles/administrador");

router.get("/", getAdministradores);
router.get("/:id", getAdministrador);
router.post("/", createAdministrador);
router.patch("/:id", updateAdministrador);
router.delete("/:id", deleteAdministrador);

module.exports = router;
