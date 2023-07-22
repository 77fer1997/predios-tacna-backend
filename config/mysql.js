const mysql = require("mysql2");
require("dotenv").config();

const pool = mysql
  .createPool({
    host: process.env.DB_HOST || "127.0.0.1",
    user: process.env.DB_USER || "luis",
    password: process.env.DB_PASSWORD || "Minecraft958493106",
    database: process.env.DB_DATABASE || "predios_tacna",
  })
  .promise();
module.exports = pool;
