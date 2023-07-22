const pool = require("../../config/mysql");
const getProductos = async (req, res) => {
  const [rows] = await pool.query(`SELECT * FROM productos`);
  res.status(200).send(rows);
};
const getProducto = async (req, res) => {
  const id = req.params.id;
  const [rows] = await pool.query(`SELECT * FROM productos WHERE id = ?`, [id]);
  res.status(200).send(rows[0]);
};
const createProducto = async (req, res) => {
  const { name, price, vendedor_id } = req.body;
  const [rows] = await pool.query(
    `INSERT INTO productos (name, price, vendedor_id) VALUES (?, ?, ?)`,
    [name, price, vendedor_id]
  );
  console.log(rows);
  res.sendStatus(201).send(rows.insertId);
};
const updateProducto = async (req, res) => {
  const id = req.params.id;
  const { name, price, vendedor_id } = req.body;
  const [rows] = await pool.query(
    `UPDATE productos SET name=?, price=?, vendedor_id=? WHERE id=?`,
    [name, price, vendedor_id, id]
  );
  res.sendStatus(201);
};
const deleteProducto = async (req, res) => {
  const id = req.params.id;
  const [rows] = pool.query(`DELETE FROM productos WHERE id=?`, [id]);
  res.status(200).send(rows[0]);
};

module.exports = {
  getProducto,
  getProductos,
  createProducto,
  updateProducto,
  deleteProducto,
};
