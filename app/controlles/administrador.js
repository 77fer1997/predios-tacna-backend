const pool = require("../../config/mysql");
const emailer = require("../../config/emailer");
const { encrypt } = require("../helpers/handleBcrypt");
const getAdministradores = async (req, res) => {
  const [rows] = await pool.query(`SELECT * FROM administrador`);
  res.status(200);
  res.send(rows);
};
const getAdministrador = async (req, res) => {
  try {
    const id = req.params.id;
    const [rows] = await pool.query(
      `SELECT * FROM administrador WHERE id = ?`,
      [id]
    );
    res.status(200);
    res.send(rows[0]);
  } catch (error) {
    res.status(404);
    res.send({
      msg: "Ocurrio un error inesperado.",
    });
  }
};
const createAdministrador = async (req, res) => {
  const { name, lastnames, email, user, password } = req.body;
  try {
    const passwordHash = await encrypt(password);
    const [rows] = await pool.query(
      `INSERT INTO administrador (name, lastnames, email, user, password) VALUES (?, ?, ?, ?, ?)`,
      [name, lastnames, email, user, passwordHash]
    );
    console.log(user, password, name);
    await emailer.sendMail(email, user, password, name);
    res.status(201);
    res.send({
      id: rows.insertId,
      name,
      lastnames,
      email,
      user,
      password: passwordHash,
      msg: "El usuario se creo correctamente.",
    });
  } catch (error) {
    res.status(404);
    res.send({
      msg: "Ocurrio un error al crear al usuario.",
      error,
    });
  }
};
const updateAdministrador = async (req, res) => {
  try {
    const id = req.params.id;
    const { name, lastnames, email } = req.body;
    console.log(name, lastnames, email);
    const [rows] = await pool.query(
      `UPDATE administrador SET name = ?, lastnames = ?, email = ? WHERE id = ?`,
      [name, lastnames, email, id]
    );
    res.status(201);
    res.send({
      id,
      name,
      lastnames,
      email,
      msg: "El usuarios se actualizo correctamente",
    });
  } catch (error) {
    res.status(404);
    res.send({
      msg: "Ocurrio un error",
      error: error,
    });
  }
};
const deleteAdministrador = async (req, res) => {
  try {
    const id = req.params.id;
    const [rows] = await pool.query(`DELETE FROM administrador WHERE id=?`, [
      id,
    ]);
    res.status(200);
    res.send({
      id,
      msg: "Se elimino el usuario correctamente",
    });
  } catch (error) {
    res.status(404);
    res.send({
      msg: "Ocurrio un error",
    });
  }
};

module.exports = {
  getAdministrador,
  getAdministradores,
  createAdministrador,
  updateAdministrador,
  deleteAdministrador,
};
