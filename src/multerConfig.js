const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Product = require('./models/productModel'); // Modifique conforme sua estrutura de arquivos

// Criando o app Express
const app = express();

// Configuração de Body Parser para permitir o envio de JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Criação do diretório uploads se não existir
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Configuração do Multer para armazenar arquivos
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir); // Usando o diretório uploads
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Nome único para o arquivo
  }
});

const upload = multer({ storage: storage });

// Rota para criar um novo produto com upload de imagem
app.post("/products/create", upload.single("picture"), async (req, res) => {
  const { name, descricao, quantidade } = req.body;
  const picture = req.file ? `/uploads/${req.file.filename}` : null;

  if (!req.file) {
    return res.status(400).send('Nenhum arquivo foi enviado');
  }

  try {
    const product = new Product({ name, descricao, quantidade, picture });
    await product.save();
    res.status(201).json({ message: "Produto criado com sucesso!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro no servidor ao criar o produto' });
  }
});

// Inicia o servidor na porta 10000
app.listen(10000, () => {
  console.log('Servidor rodando na porta 10000');
});
