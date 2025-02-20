// ---------------------------------------------------------------
// --------- Definición de rutas CRUD para los productos ---------
// ---------------------------------------------------------------

const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

router.get('/products', productController.getAllProducts);                    // GET /products: Devuelve todos los productos. Cada producto tendrá un enlace a su página de detalle.
router.get('/products/:_id', productController.getProductById);               // GET /products/:productId: Devuelve el detalle de un producto.

//! En las siguientes rutas debe ir el middleware de autenticación para permitir acceso:

//router.get('/dashboard', productController.getDashboardProducts);           // GET /dashboard: Devuelve el dashboard del administrador. En el dashboard aparecerán todos los artículos que se hayan subido. Si clickamos en uno de ellos nos llevará a su página para poder actualizarlo o eliminarlo.
//router.get('/dashboard/new', productController.showNewProductForm);         // GET /dashboard/new: Devuelve el formulario para subir un artículo nuevo.
router.post('/dashboard/create', productController.createProduct);            // POST /dashboard: Crea un nuevo producto.
router.get('/dashboard/get/:_id', productController.getProductById);          //GET /dashboard/:productId: Devuelve el detalle de un producto en el dashboard.
//router.get('/dashboard/edit/:_id', productController.showEditProductForm);  // GET /dashboard/:productId/edit: Devuelve el formulario para editar un producto.
router.put('/dashboard/update/:_id', productController.updateProduct);        // PUT /dashboard/:productId: Actualiza un producto.
router.delete('/dashboard/delete/:_id', productController.deleteProduct);     // DELETE /dashboard/:productId/delete: Elimina un producto.

module.exports = router;