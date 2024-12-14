const upload = require("../multerConfig")
const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

router.get('/', productController.getProducts);

router.post('/create', upload.single('picture'), productController.createProduct);

router.put('/update/:id', productController.updateProduct);

router.delete('/delete/:id', productController.deleteProduct);

module.exports = router;