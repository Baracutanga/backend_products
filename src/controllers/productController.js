const Product = require("../models/productModel");
const upload = require("../multerConfig"); // Importando o multerConfig

exports.createProduct = async (req, res) => {
  const { name, descricao, quantidade } = req.body;

  try {
    const picture = req.file ? `/uploads/${req.file.filename}` : null;

    console.log('Imagem recebida:', picture);

    const product = new Product({
      name,
      descricao,
      quantidade,
      picture,
    });

    await product.save();
    res.status(200).json({ message: "Produto criado com sucesso!" });
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
};

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
};

// Rota para atualizar um produto
exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, descricao, quantidade } = req.body;

    const picture = req.file ? `/uploads/${req.file.filename}` : undefined;

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { 
        name, 
        descricao, 
        quantidade, 
        ...(picture && { picture }) // Atualiza o campo "picture" apenas se a nova imagem for enviada
      },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ error: "Produto não encontrado" });
    }

    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json({ error: "Erro ao atualizar produto" });
  }
};

// Rota para deletar um produto
exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ error: "Produto não encontrado" });
    }

    res.status(200).json({ message: "Produto deletado com sucesso!" });
  } catch (err) {
    res.status(500).json({ error: "Erro ao tentar excluir produto" });
  }
};
