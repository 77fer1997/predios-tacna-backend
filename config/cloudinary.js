const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: "dxgh1api3",
  api_key: "866512533594536",
  api_secret: "GYcJbyWsEZPp9BwPDQeZi2ZMH2Y",
});
const options = {
  use_filename: true,
  unique_filename: false,
  overwrite: true,
};

module.exports = { cloudinary, options };
