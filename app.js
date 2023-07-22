require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const app = express();
const PORT = process.env.PORT || 3001;
const cors = require("cors");
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

app.use("/", require("./app/routes"));
app.listen(PORT, () => {
  console.log("API lista por el puerto", PORT);
});
