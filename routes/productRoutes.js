// ---------------------------------------------------------------
// --------- Definición de rutas CRUD para los productos ---------
// ---------------------------------------------------------------

const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const authController = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");

router.get("/", productController.index);
router.get('/products', productController.showProducts); 
router.get('/products/:_id', productController.showProductById);

// Rutas protegidas para el dashboard (requiere autenticación)
/* router.get('/dashboard', authMiddleware, authController.showDashboard); 
router.get('/dashboard/new', authMiddleware, productController.showNewProduct); 
router.post('/dashboard', authMiddleware, productController.createProduct);           
router.get('/dashboard/:productId', authMiddleware, productController.showProductById); 
router.get('/dashboard/:productId/edit', authMiddleware, productController.showEditProduct);  
router.put('/dashboard/:productId', authMiddleware, productController.updateProduct);       
router.delete('/dashboard/:productId/delete', authMiddleware, productController.deleteProduct);
*/

//! le quito el middleware para hacer pruebas
router.get('/dashboard', authController.showDashboard); 
router.get('/dashboard/new', productController.showNewProduct); 
router.post('/dashboard', productController.createProduct);           
router.get('/dashboard/:productId', productController.showProductById); 
router.get('/dashboard/:productId/edit', productController.showEditProduct);  
router.put('/dashboard/:productId', productController.updateProduct);       
router.delete('/dashboard/:productId/delete', productController.deleteProduct);

router.get('/products/category/:category', productController.filterProductsByCategory);



module.exports = router;