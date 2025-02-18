const express = require("express");
const router = express.Router();
const productModel = require('../models/Product')
const productController = require("../controllers/productController");


router.get('/', productController.getAllProducts); // GET /products
router.get('/id/:_id', productController.getProductById); // GET /products/:productId
router.post('/create', productController.createProduct);
router.put('/id/:_id', productController.updateProduct);
router.delete('/id/:_id', productController.deleteProduct);

module.exports = router;