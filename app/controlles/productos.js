const pool = require("../../config/mysql");
const { cloudinary, options } = require("../../config/cloudinary");

const getProductos = async (req, res) => {
  try {
    const [rows] = await pool.query(`SELECT * FROM productos`);
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
const getProducto = async (req, res) => {
  try {
    const id = req.params.id;
    const [rows] = await pool.query(`SELECT * FROM productos WHERE id = ?`, [
      id,
    ]);
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
const getProductsByPredio = async (req, res) => {
  const id = req.params.id;
  try {
    const [rows] = await pool.query(
      `SELECT 
    productos.id,
    productos.name,
    productos.description,
    productos.price,
    productos.imagen,
    predio.id as predio_id
    FROM productos inner JOIN vendedor ON productos.vendedor_id = vendedor.id inner JOIN predio ON vendedor.predio_id = predio.id WHERE predio.id = ?;`,
      [id]
    );
    res.status(200);
    res.send(rows);
  } catch (error) {
    console.log(error);
    res.status(404);
    res.send({
      error,
      msg: "Oops, algo salió mal. Por favor, inténtalo de nuevo más tarde.",
    });
  }
};
const createProducto = async (req, res) => {
  const { name, price, description, vendedor_id } = req.body;
  const { filename } = req.file;
  const image = `${__dirname}/../storage/${filename}`;
  try {
    const result = await cloudinary.uploader.upload(image, options);
    const { secure_url: imagen } = result;
    const [rows] = await pool.query(
      `INSERT INTO productos (name, price, description,vendedor_id, imagen) VALUES (?, ?, ?, ?, ?)`,
      [name, price, description, vendedor_id, imagen]
    );
    res.status(201);
    res.send({
      id: rows.insertId,
      imagen,
      name,
      description,
      price,
      vendedor_id,
      imagen,
      msg: "¡Genial! el producto se creo correctamente.",
    });
  } catch (error) {
    res.status(404);
    res.send({
      error,
      msg: "Oops, algo salió mal. Por favor, inténtalo de nuevo más tarde.",
    });
  }
};
const updateProducto = async (req, res) => {
  const { id } = req.params;
  const { name, price, description, old_url } = req.body;
  let imagen;
  try {
    if (req.file) {
      const { filename } = req.file;
      const image = `${__dirname}/../storage/${filename}`;
      const result = await cloudinary.uploader.upload(image, options);
      const { secure_url } = result;
      imagen = secure_url;
    } else {
      imagen = old_url;
    }
    await pool.query(
      `UPDATE productos SET name=?, description=?, imagen=?, price=? WHERE id=?`,
      [name, description, imagen, price, id]
    );
    res.status(201);
    res.send({
      id,
      name,
      description,
      imagen,
      price,
      msg: "¡Genial! el producto fue actualizado.",
    });
  } catch (error) {
    res.status(404);
    res.send({
      error,
      msg: "Oops, algo salió mal. Por favor, inténtalo de nuevo más tarde.",
    });
  }
};
const deleteProducto = async (req, res) => {
  const id = req.params.id;
  try {
    await pool.query(`DELETE FROM productos WHERE id=?`, [id]);
    res.status(200);
    res.send({
      id,
      msg: "¡Genial! el producto fue eliminado.",
    });
  } catch (error) {
    res.status(404);
    res.send({
      error,
      msg: "Oops, algo salió mal. Por favor, inténtalo de nuevo más tarde.",
    });
  }
};

module.exports = {
  getProducto,
  getProductos,
  createProducto,
  updateProducto,
  deleteProducto,
  getProductsByPredio,
};
