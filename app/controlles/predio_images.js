const pool = require("../../config/mysql");
const { cloudinary, options } = require("../../config/cloudinary");

const getPredioImages = async (req, res) => {
  try {
    const { predio_id } = req.params;
    const [rows] = await pool.query(
      `SELECT * FROM predio_images WHERE predio_id = ?`,
      [predio_id]
    );
    res.status(200);
    res.send(rows);
  } catch (error) {
    res.status(404);
    res.send({
      msg: "Oops, algo salió mal. Por favor, inténtalo de nuevo más tarde.",
      error,
    });
  }
};
const getPredioImage = async (req, res) => {
  try {
    const { predio_id, id } = req.params;
    const [rows] = await pool.query(
      `SELECT * FROM predio_images WHERE id = ? AND predio_id = ? `,
      [id, predio_id]
    );
    res.status(200);
    res.send(rows[0]);
  } catch (error) {
    res.status(404);
    res.send({
      msg: "Oops, algo salió mal. Por favor, inténtalo de nuevo más tarde.",
      error,
    });
  }
};
const createPredioImage = async (req, res) => {
  const { descripcion, predio_id } = req.body;
  const { filename } = req.file;
  const image = `${__dirname}/../storage/${filename}`;

  try {
    const result = await cloudinary.uploader.upload(image, options);
    const { secure_url: url } = result;
    const [rows] = await pool.query(
      `INSERT INTO predio_images (url, descripcion, predio_id) VALUES (?, ?, ?)`,
      [url, descripcion, predio_id]
    );
    res.send({
      id: rows.insertId,
      url,
      descripcion,
      predio_id,
      msg: "¡Genial! se ha creado la imagen.",
    });
  } catch (error) {
    res.status(404);
    res.send({
      msg: "Oops, algo salió mal. Por favor, inténtalo de nuevo más tarde.",
      error,
    });
  }
};
const updatePredioImage = async (req, res) => {
  const { id } = req.params;
  const { descripcion, old_url } = req.body;
  let url;
  try {
    if (req.file) {
      const { filename } = req.file;
      const image = `${__dirname}/../storage/${filename}`;
      const result = await cloudinary.uploader.upload(image, options);
      const { secure_url } = result;
      url = secure_url;
    } else {
      url = old_url;
    }
    await pool.query(
      `UPDATE predio_images SET url=?, descripcion=? WHERE id=?`,
      [url, descripcion, id]
    );
    res.status(201);
    res.send({
      id,
      url,
      descripcion,
      msg: "¡Genial! se ha actualizado la imagen.",
    });
  } catch (error) {
    res.status(404);
    res.send({
      msg: "Oops, algo salió mal. Por favor, inténtalo de nuevo más tarde.",
      error,
    });
  }
};
const deletePredioImage = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query(`DELETE FROM predio_images WHERE id=?`, [
      id,
    ]);
    res.status(200);
    res.send({
      id,
      msg: "Se elimino el predio correctamente.",
    });
  } catch (error) {
    res.send({
      msg: "Ocurrio un error en la eliminación.",
      error,
    });
  }
};

const uploadVideos = async (req, res) => {
  const { id } = req.params;
  const { url } = req.body;
  const [rows] = await pool.query(
    `INSERT INTO predio_url_videos (url, predio_id) VALUES ( ?, ?)`,
    [url, id]
  );
  res.send(rows);
};

module.exports = {
  getPredioImage,
  getPredioImages,
  createPredioImage,
  updatePredioImage,
  deletePredioImage,
};
