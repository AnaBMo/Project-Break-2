// ---------------------------------------------------------------
// --------- Definición de rutas CRUD para los productos ---------
// ---------------------------------------------------------------

const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const authMiddleware = require("../middlewares/authMiddleware");


router.get("/", productController.home);
router.get('/products', productController.showProducts); // GET /products: Devuelve todos los productos. Cada producto tendrá un enlace a su página de detalle.
router.get('/products/:_id', productController.showProductById); // GET /products/:productId: Devuelve el detalle de un producto.


module.exports = router;