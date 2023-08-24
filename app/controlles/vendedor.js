const pool = require("../../config/mysql");
const emailer = require("../../config/emailer");
const { encrypt } = require("../helpers/handleBcrypt");
const getVendedores = async (req, res) => {
  try {
    const [rows] = await pool.query(`SELECT 
    vendedor.id, 
    vendedor.name, 
    vendedor.lastname, 
    vendedor.email, 
    vendedor.telefono, 
    vendedor.fecha_inicio, 
    vendedor.fecha_end, 
    predio.name as predio_name,
    predio.id as predio_id
    FROM vendedor inner JOIN predio ON predio.id = vendedor.predio_id `);
    res.status(200);
    res.send(rows);
  } catch (error) {
    res.status(404);
    res.send({
      error,
      msg: "Oops, algo salió mal. Por favor, inténtalo de nuevo más tarde.",
    });
  }
};
const getVendedor = async (req, res) => {
  try {
    const id = req.params.id;
    const [rows] = await pool.query(
      `SELECT 
    vendedor.id, 
    vendedor.name, 
    vendedor.lastname, 
    vendedor.email, 
    vendedor.telefono, 
    vendedor.fecha_inicio, 
    vendedor.fecha_end, 
    predio.name as predio_name,
    predio.id as predio_id
    FROM vendedor inner JOIN predio ON predio.id = vendedor.predio_id WHERE vendedor.id = ?`,
      [id]
    );
    res.status(200);
    res.send(rows[0]);
  } catch (error) {
    res.status(404);
    res.send({
      error,
      msg: "Oops, algo salió mal. Por favor, inténtalo de nuevo más tarde.",
    });
  }
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
    predio_name,
  } = req.body;

  try {
    const passwordHash = await encrypt(password);
    const [rows] = await pool.query(
      `INSERT INTO vendedor (name, lastname, email, telefono, user, password, fecha_inicio, fecha_end, predio_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        name,
        lastname,
        email,
        telefono,
        user,
        passwordHash,
        fecha_inicio,
        fecha_end,
        predio_id,
      ]
    );
    await emailer.sendMail(email);
    res.status(201);
    res.send({
      id: rows.insertId,
      name,
      lastname,
      email,
      telefono,
      user,
      password: passwordHash,
      fecha_inicio,
      fecha_end,
      predio_id,
      predio_name,
      msg: "¡Genial! el vendedor fue creado correctamente.",
    });
  } catch (error) {
    res.status(404);
    res.send({
      msg: "Oops, algo salió mal. Por favor, inténtalo de nuevo más tarde..",
      error,
    });
  }
};
const updateVendedor = async (req, res) => {
  try {
    const id = req.params.id;
    const {
      name,
      lastname,
      email,
      telefono,
      fecha_inicio,
      fecha_end,
      predio_id,
      predio_name,
    } = req.body;
    const [rows] = await pool.query(
      `UPDATE vendedor SET name=?, lastname=?, email=?, telefono=?, fecha_inicio=?, fecha_end=?, predio_id=? WHERE id=?`,
      [name, lastname, email, telefono, fecha_inicio, fecha_end, predio_id, id]
    );
    res.status(201);
    res.send({
      id,
      name,
      lastname,
      email,
      telefono,
      fecha_inicio,
      fecha_end,
      predio_id,
      predio_name,
      msg: "¡Genial! el vendedor se actualizo correctamente",
    });
  } catch (error) {
    res.status(404);
    res.send({
      msg: "Oops, algo salió mal. Por favor, inténtalo de nuevo más tarde.",
      error,
    });
  }
};
const deleteVendedor = async (req, res) => {
  try {
    const id = req.params.id;
    const [rows] = await pool.query(`DELETE FROM vendedor WHERE id=?`, [id]);
    res.status(200);
    res.send({
      id,
      msg: "Se elimino al vendedor correctamente.",
    });
  } catch (error) {
    res.send({
      msg: "Ocurrio un error en la eliminación.",
      error,
    });
  }
};

module.exports = {
  getVendedor,
  getVendedores,
  updateVendedor,
  deleteVendedor,
  createVendedor,
};
