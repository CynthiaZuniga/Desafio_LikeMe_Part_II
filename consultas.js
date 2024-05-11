const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  allowExitOnIdle: true,
});

const getInfo = async () => {
  const consulta = "SELECT * FROM posts;";
  const { rows } = await pool.query(consulta);
  return rows;
};

const posting = async (titulo, url, descripcion) => {
  const id = Math.floor(Math.random() * 9999);
  const query =
    "INSERT INTO posts (id, titulo, img, descripcion, likes) VALUES ($1, $2, $3, $4, $5);";
  const values = [id, titulo, url, descripcion, 0];
  const { rows } = await pool.query(query, values);
  return rows;
};

const putLike = async (id) => {
  const query = "UPDATE posts SET likes = likes + 1 WHERE id =$1";
  const values = [id];
  const addLike = await pool.query(query, values);
  return addLike;
};

const erasePost = async (id) => {
  const query = "DELETE FROM posts WHERE id = $1;";
  const values = [id];
  const erasePost = await pool.query(query, values);
  return erasePost;
};
module.exports = { getInfo, posting, putLike, erasePost };
