const multer = require("multer");
const fs = require("fs");
const path = require("path");

const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Configuração do Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir); // Usando o diretório uploads
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Nome único para o arquivo
  },
});

const upload = multer({ storage: storage });

// Seu código de rota POST
app.post("/products/create", upload.single("picture"), async (req, res) => {
  const { name, descricao, quantidade } = req.body;
  const picture = req.file ? `/uploads/${req.file.filename}` : null;

  if (!req.file) {
    return res.status(400).send("Nenhum arquivo foi enviado");
  }

  try {
    const product = new Product({ name, descricao, quantidade, picture });
    await product.save();
    res.status(201).json({ message: "Produto criado com sucesso!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro no servidor ao criar o produto" });
  }
});
