const express = require("express");
const app = express();
const data = require("./pokemon");
const { get } = require("./utils");

const PORT = 3000;

app.get("/  ", function (req, res) {
  res.json({ message: "Hello World" });
});

app.get("/cache", async (req, res) => {
    res.json(data.getCache());
  });

app.get("/:id", async function (req, res) {
    try{
        const infoPokemon = await data.setCache(req.params.id);
        res.json({infoPokemon});

    } catch (error){
        res.json({message: "Pokemon no encontrado"});
    }
});

app.listen(PORT, () => {
    console.log(`Servidor iniciado en el puerto ${PORT}`);
  });