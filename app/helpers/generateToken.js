const jwt = require("jsonwebtoken");

const tokenSign = (id, name, lastname, email, type_user) => {
  return jwt.sign(
    { id, name, lastname, email, type_user },
    "secret" /* , {
    expiresIn: "2h",
  } */
  );
};

module.exports = {
  tokenSign,
};
