const Product = require('../models/productModel');

exports.createProduct = async (req, res) => {
    const { name, descricao, quantidade, picture } = req.body;

    try { 
        const product = new Product({ name, descricao, quantidade, picture });

        if (!req.file) {
            return res.status(400).send('Nenhum arquivo foi enviado');
          }
      
          const picture = `/uploads/${req.file.filename}`; // Caminho da imagem
        await product.save();
        res.status().json({ message: "Produto criado com sucesso!" });
    } catch (err) {
        res.status(400).json({ err: err.message });
    }
}

exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (err) {
        res.status(400).json({ err: err.message });
    }
}

exports.updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, descricao, quantidade, picture } = req.body;
        const updatedProduct = await Product.findByIdAndUpdate(
            id,

            { name, descricao, quantidade, picture },
            { new: true }
        );

        if (!updatedProduct) {
            res.status(404).json({ error: 'Produto não encontrado' });
        }

        res.status(200).json(updatedProduct);
    } catch (err) {
        res.status(500),json({ error: "Erro ao atualizar produto" })
    }
}

exports.deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedProduct = await Product.findByIdAndDelete(id);

        if(!deletedProduct) {
            return res.status(404).json({ error: 'Produto não encontrado' })
        }

        res.status(200).json({ message: 'Produto deletado com sucesso!' });
    } catch (err) {
        res.statu(500).json({ error: 'Error ao tentar excluir produto' });
    }
}