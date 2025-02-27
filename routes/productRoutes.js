// ---------------------------------------------------------------
// --------- Definición de rutas CRUD para los productos ---------
// ---------------------------------------------------------------

const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const authController = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");

router.get("/", productController.showProducts);
router.get('/products', productController.showProducts); 
router.get('/products/:productId', productController.showProductById);
router.get('/products/category/:category', productController.filterProductsByCategory);

// Rutas protegidas para el dashboard 
router.get('/dashboard', authMiddleware, productController.showProducts); 
router.get('/dashboard/new', authMiddleware, productController.showNewProduct); 
router.post('/dashboard', authMiddleware, productController.createProduct);           
router.get('/dashboard/:productId', authMiddleware, productController.showProductById); 
router.get('/dashboard/:productId/edit', authMiddleware, productController.showEditProduct);  
router.post('/dashboard/:productId', authMiddleware, productController.updateProduct);       
router.delete('/dashboard/:productId/delete', authMiddleware, productController.deleteProduct);


module.exports = router;