const mysql = require("mysql2");
require("dotenv").config();
console.log(process.env.DB_USER);
const pool = mysql
  .createPool({
    host: process.env.DB_HOST || "127.0.0.1",
    user: process.env.DB_USER || "luis",
    password: process.env.DB_PASSWORD || "Minecraft958493106",
    database: process.env.DB_NAME || "predios_tacna",
    port: process.env.DB_PORT,
    connectTimeout: 60000,
  })
  .promise();
module.exports = pool;
