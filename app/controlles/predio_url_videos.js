const pool = require("../../config/mysql");

const getPredioVideos = async (req, res) => {
  const { predio_id } = req.params;
  try {
    const [rows] = await pool.query(
      `SELECT * FROM predio_url_videos WHERE predio_id = ?`,
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
const getPredioVideo = async (req, res) => {
  const { predio_id, id } = req.params;
  try {
    const [rows] = await pool.query(
      `SELECT * FROM predio_url_videos WHERE id = ? AND predio_id = ? `,
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
const createPredioVideo = async (req, res) => {
  const { url, predio_id } = req.body;
  try {
    const [rows] = await pool.query(
      `INSERT INTO predio_url_videos (url, predio_id) VALUES (?, ?)`,
      [url, predio_id]
    );
    res.send({
      id: rows.insertId,
      url,
      predio_id,
      msg: "¡Genial! se ha guardado el video.",
    });
  } catch (error) {
    res.status(404);
    res.send({
      msg: "Oops, algo salió mal. Por favor, inténtalo de nuevo más tarde.",
      error,
    });
  }
};
const deletePredioVideo = async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query(`DELETE FROM predio_url_videos WHERE id=?`, [id]);
    res.status(200);
    res.send({
      id,
      msg: "¡Genial! se elimino el predio correctamente.",
    });
  } catch (error) {
    res.send({
      msg: "Oops, algo salió mal. Por favor, inténtalo de nuevo más tarde.",
      error,
    });
  }
};

module.exports = {
  getPredioVideo,
  getPredioVideos,
  createPredioVideo,
  deletePredioVideo,
};
