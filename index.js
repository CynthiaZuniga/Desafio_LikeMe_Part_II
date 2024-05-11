const { getInfo, posting, putLike, erasePost } = require("./consultas");
const express = require("express");
const cors = require("cors");
const app = express();

app.listen(3000, () => console.log("Servidor encendido!"));

app.use(express.json());

app.use(cors());

app.get("/posts", async (req, res) => {
  try {
    const info = await getInfo();
    res.json(info);
  } catch (error) {
    res.status(error.code).json(error.message);
  }
});

app.post("/posts", async (req, res) => {
  try {
    const { titulo, url, descripcion } = req.body;
    const postPic = await posting(titulo, url, descripcion);
    res.json("Post agregado");
  } catch (error) {
    res.status(error.code).json(error.message);
  }
});

app.put("/posts/like/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const addLike = await putLike(id);
    if (addLike.rowCount === 0) {
      throw { code: 404, message: `id ${id} no encontrado` };
    }
    res.send("like agregado");
  } catch (error) {
    res.status(error.code).json(error.message);
  }
});

app.delete("/posts/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const erase = await erasePost(id);
    if (erase.rowCount === 0) {
      throw { code: 404, message: `No se encontro el ID:${id}` };
    }
    res.send("Registro eliminado con exito");
  } catch (error) {
    res.status(error.code).json(error.message);
  }
});
