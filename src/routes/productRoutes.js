const upload = require("../multerConfig")
const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

router.get('/', productController.getProducts);

router.post('/create', upload.single('photo'), productController.createProduct);

router.put('/update', productController.updateProduct);

router.delete('/delete', productController.deleteProduct);

module.exports = router;