const pool = require("../../config/mysql");
const getVendedores = async (req, res) => {
  const [rows] = await pool.query(`SELECT * FROM vendedor`);
  res.status(200).send(rows);
};
const getVendedor = async (req, res) => {
  const id = req.params.id;
  const [rows] = await pool.query(`SELECT * FROM vendedor WHERE id = ?`, [id]);
  res.status(200).send(rows[0]);
};
const createVendedor = async (req, res) => {
  const {
    name,
    lastname,
    email,
    telefono,
    user,
    password,
    fecha_inicio,
    fecha_end,
    predio_id,
  } = req.body;
  const [rows] = await pool.query(
    `INSERT INTO vendedor (name, lastname, email, telefono, user, password, fecha_inicio, fecha_end, predio_id) VALUES (?, ?, ?, ?)`,
    [
      name,
      lastname,
      email,
      telefono,
      user,
      password,
      fecha_inicio,
      fecha_end,
      predio_id,
    ]
  );
  console.log(rows);
  res.sendStatus(201).send(rows.insertId);
};
const updateVendedor = async (req, res) => {
  const id = req.params.id;
  const {
    name,
    lastname,
    email,
    telefono,
    user,
    password,
    fecha_inicio,
    fecha_end,
    predio_id,
  } = req.body;
  const [rows] = await pool.query(
    `UPDATE vendedor SET name=?, lastname=?, email=?, telefono=?, user=?, password=?, fecha_inicio=?, fecha_end=?, predio_id=? WHERE id=?`,
    [
      name,
      lastname,
      email,
      telefono,
      user,
      password,
      fecha_inicio,
      fecha_end,
      predio_id,
      id,
    ]
  );
  res.sendStatus(201);
};
const deleteVendedor = async (req, res) => {
  const id = req.params.id;
  const [rows] = pool.query(`DELETE FROM vendedor WHERE id=?`, [id]);
  res.status(200).send(rows[0]);
};

module.exports = {
  getVendedor,
  getVendedores,
  updateVendedor,
  deleteVendedor,
  createVendedor,
};
