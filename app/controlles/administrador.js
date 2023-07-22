const pool = require("../../config/mysql");
const getAdministradores = async (req, res) => {
  const [rows] = await pool.query(`SELECT * FROM productos`);
  res.status(200).send(rows);
};
const getAdministrador = async (req, res) => {
  const id = req.params.id;
  const [rows] = await pool.query(`SELECT * FROM administrador WHERE id = ?`, [
    id,
  ]);
  res.status(200).send(rows[0]);
};
const createAdministrador = async (req, res) => {
  const { name, lastnames, email, user, password } = req.body;
  const [rows] = await pool.query(
    `INSERT INTO administrador (name, lastnames, email, user, password) VALUES (?, ?, ?, ?, ?)`,
    [name, lastnames, email, user, password]
  );
  console.log(rows);
  res.sendStatus(201).send(rows.insertId);
};
const updateAdministrador = async (req, res) => {
  const id = req.params.id;
  const { name, lastnames, email } = req.body;
  const [rows] = await pool.query(
    `UPDATE administrador SET name=?, lastnames=?, email=? WHERE id=?`,
    [name, lastnames, email, id]
  );
  res.status(201);
};
const deleteAdministrador = async (req, res) => {
  const id = req.params.id;
  const [rows] = pool.query(`DELETE FROM administrador WHERE id=?`, [id]);
  res.status(200).send(rows[0]);
};

module.exports = {
  getAdministrador,
  getAdministradores,
  createAdministrador,
  updateAdministrador,
  deleteAdministrador,
};
