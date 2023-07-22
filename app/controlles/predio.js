require("dotenv").config();
const pool = require("../../config/mysql");
const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: "dxgh1api3",
  api_key: "866512533594536",
  api_secret: "GYcJbyWsEZPp9BwPDQeZi2ZMH2Y",
});

const getItems = async (req, res) => {
  try {
    const [rows] = await pool.query(`SELECT * FROM predio`);
    res.send(rows);
  } catch (error) {
    console.log(error);
  }
};
const getItem = async (req, res) => {
  const id = req.params.id;
  const [rows] = await pool.query(`SELECT * FROM predio WHERE id = ?`, [id]);
  res.status(200).send(rows[0]);
};
const createItem = async (req, res) => {
  const { name, lat, lon, administrador_id } = req.body;
  const [rows] = await pool.query(
    `INSERT INTO predio (name, lat, lon, administrador_id) VALUES (?, ?, ?, ?)`,
    [name, lat, lon, administrador_id]
  );
  console.log(rows);
  res.sendStatus(201).send(rows.insertId);
};
const updateItem = async (req, res) => {
  const id = req.params.id;
  const { name, lat, lon } = req.body;
  const [rows] = await pool.query(
    `UPDATE predio SET name=?, lat=?, lon=? WHERE id=?`,
    [name, lat, lon, id]
  );
  res.sendStatus(201);
};
const deleteItem = async (req, res) => {
  const id = req.params.id;
  const [rows] = await pool.query(`DELETE FROM predio WHERE id=?`, [id]);
  res.status(200).send(rows[0]);
};
const options = {
  use_filename: true,
  unique_filename: false,
  overwrite: true,
};

const uploadImage = async (req, res) => {
  const { id } = req.params;
  const { descripcion } = req.body;
  const { filename } = req.file;
  const image = `${__dirname}/../storage/${filename}`;
  console.log(req.body);
  try {
    const result = await cloudinary.uploader.upload(image, options);
    const { secure_url } = result;
    const [rows] = await pool.query(
      `INSERT INTO predio_images (url, descripcion, predio_id) VALUES (?, ?, ?)`,
      [secure_url, descripcion, id]
    );
    res.send(rows);
  } catch (error) {
    console.log(error);
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
  getItem,
  getItems,
  deleteItem,
  createItem,
  updateItem,
  uploadImage,
  uploadVideos,
};
