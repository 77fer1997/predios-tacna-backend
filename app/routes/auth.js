const express = require("express");
const router = express.Router();
const login = require("../controlles/auth");

router.post("/login", login);

module.exports = router;
