require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const connectDB = require("./config/database");
const productRoutes = require("./routes/productRoutes");
const upload = require("./multerConfig");
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(cors());
app.use(bodyParser.json());

app.use("/products", productRoutes);

app.use("/uploads", express.static(path.join(__dirname, "upload")));

app.post("/upload", upload.single("photo"), (req, res) => {
  // 'photo' é o nome do campo no formulário que contém o arquivo

  if (!req.file) {
    return res.status(400).send("Nenhum arquivo foi enviado.");
  }

  res.status(200).send({
    message: "Arquivo enviado com sucesso!",
    file: req.file, // Retorna os detalhes do arquivo enviado
  });
});

app.listen(PORT, () => console.log(`Servidor conectado na porta ${PORT}`));
