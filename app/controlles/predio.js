require("dotenv").config();
const { cloudinary, options } = require("../../config/cloudinary");
const pool = require("../../config/mysql");
const getPredios = async (req, res) => {
  try {
    const [rows] = await pool.query(`SELECT * FROM predio`);;
    res.status(200);
    res.send(rows);
  } catch (error) {
    res.status(404);
    res.send({
      error,
    });
  }
};
const getPrediosWithImages = async (req, res) => {
  try {
    const [rows] = await pool.query(`SELECT * FROM predio`);
    const [rows_predios_images] = await pool.query(
      `SELECT * FROM predio_images;`
    );
    /**
     * Traer las imagenes de predio_images y colocarlas en los predios
     */
    let array = [...rows];
    rows.forEach((predio, index) => {
      rows_predios_images.forEach((predioImage) => {
        if (predio.id === predioImage.predio_id) {
          if (array[index].imagen) {
            array[index].imagen = [...array[index].imagen, predioImage.url];
          } else {
            array[index].imagen = [predioImage.url];
          }
        }
      });
    });

    res.status(200);
    res.send(array);
  } catch (error) {
    res.status(404);
    res.send({
      error,
    });
  }
};
const getPredioWithImages = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await pool.query(`SELECT * FROM predio WHERE id= ?`, [id]);
    const [rows_predio_images] = await pool.query(
      `SELECT * FROM predio_images WHERE predio_id=?`,
      [id]
    );
    const predioWithImages = rows_predio_images.map((predioImage) => {
      return predioImage.url;
    });
    res.status(200);
    res.send({
      ...rows[0],
      images: predioWithImages,
    });
  } catch (error) {
    res.status(404);
    res.send({
      error,
    });
  }
};
const getPredio = async (req, res) => {
  try {
    const id = req.params.id;
    const [rows] = await pool.query(`SELECT * FROM predio WHERE id = ?`, [id]);
    res.status(200);
    res.send(rows[0]);
  } catch (error) {
    res.status(404);
    res.send({
      error,
    });
  }
};
const createPredio = async (req, res) => {
  const { name, description, lat, lon, administrador_id } = req.body;
  const { filename } = req.file;
  const video = `${__dirname}/../storage/${filename}`;

  try {
    const result = await cloudinary.uploader.upload(video, {
      resource_type: "video",
      folder: "video",
    });
    const { secure_url: url } = result;
    const [rows] = await pool.query(
      `INSERT INTO predio (name, description, url360, lat, lon, administrador_id) VALUES (?, ?, ?, ?, ?, ?)`,
      [name, description, url, lat, lon, administrador_id]
    );
    res.status(201);
    res.send({
      id: rows.insertId,
      name,
      description,
      url,
      lat,
      lon,
      administrador_id,
      msg: "El predio se creo correctamente.",
    });
  } catch (error) {
    console.log(error);
    res.status(404);
    res.send({
      error: error,
      msg: "Ocurrio un error en la creación del predio.",
    });
  }
};
const updatePredio = async (req, res) => {
  const id = req.params.id;
  const { name, lat, lon, description, old_url } = req.body;
  let url;
  try {
    if (req.file) {
      const { filename } = req.file;
      const image = `${__dirname}/../storage/${filename}`;
      const result = await cloudinary.uploader.upload(image, {
        resource_type: "video",
        folder: "video",
      });
      const { secure_url } = result;
      url = secure_url;
    } else {
      url = old_url;
    }
    const [rows] = await pool.query(
      `UPDATE predio SET name=?, url360=?, description=?, lat=?, lon=? WHERE id=?`,
      [name, url, description, lat, lon, id]
    );
    res.status(201);
    res.send({
      id,
      url,
      description,
      name,
      lat,
      lon,
    });
  } catch (error) {
    res.status(404);
    res.send({
      msg: "Ocurrio un error en la modificación.",
      error,
    });
  }
};
const deletePredio = async (req, res) => {
  try {
    const id = req.params.id;
    const [rows] = await pool.query(`DELETE FROM predio WHERE id=?`, [id]);
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

module.exports = {
  getPredios,
  getPrediosWithImages,
  getPredioWithImages,
  getPredio,
  deletePredio,
  createPredio,
  updatePredio,
};
