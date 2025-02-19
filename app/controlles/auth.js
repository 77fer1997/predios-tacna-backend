const pool = require("../../config/mysql");
const { tokenSign } = require("../helpers/generateToken");
const { compare } = require("../helpers/handleBcrypt");
const login = async (req, res) => {
  const { user, password, type_user } = req.body;
  try {
    if (type_user === "administrador") {
      const [rows] = await pool.query(
        `SELECT * FROM administrador WHERE user=?`,
        [user]
      );
      if (!rows[0]) {
        res.status(404);
        res.send({
          message: "Usuario no encontrado",
        });
      }
      const { id, name, lastnames, email, password: passwordRow } = rows[0];
      const checkPassword = await compare(password, passwordRow);
      if (checkPassword) {
        const token = tokenSign(id, name, lastnames, email, type_user);
        res.status(200);
        res.send({
          id,
          name,
          lastnames,
          email,
          msg: "El usuario se logueo correctamente.",
          token,
        });
      } else {
        res.status(404);
        res.send({
          msg: "Contraseña incorrecta.",
        });
      }
    } else {
      const [rows] = await pool.query(`SELECT * FROM vendedor WHERE user=?`, [
        user,
      ]);
      if (!rows[0]) {
        res.status(404);
        res.send({
          message: "Usuario no encontrado",
        });
      }
      const {
        id,
        name,
        lastname,
        email,
        telefono,
        fecha_inicio,
        password: passwordRow,
        fecha_end,
        predio_id,
      } = rows[0];
      const checkPassword = await compare(password, passwordRow);
      if (checkPassword) {
        const token = tokenSign(id, name, lastname, email, type_user);
        res.status(200);
        res.send({
          id,
          name,
          lastname,
          email,
          telefono,
          fecha_inicio,
          fecha_end,
          predio_id,
          msg: "El usuario se logueo correctamente.",
          token,
        });
      } else {
        res.status(404);
        res.send({
          msg: "Contraseña incorrecta.",
        });
      }
    }
  } catch (error) {
    console.log(error);
  }
};
module.exports = login;
