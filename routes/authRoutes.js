// ---------------------------------------------------------------
// -------  Definición de las rutas para la autenticación  -------
// ---------------------------------------------------------------
const express = require("express");
const router = express.Router();
const path = require('path');
const authController = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");

// Registro
router.get('/register', authController.showRegisterForm); 
router.post('/register', authController.register); 

// Login
router.get('/login', authController.showLoginForm); 
router.post('/login', authController.login); 

// Acceso autorizado dashboard
router.get('/dashboard', authMiddleware, authController.showDashboard); // pasa por el middleware de autenticación

// Logout
router.post('/logout', authController.logout); 

module.exports = router;

/*

router.post('/dashboard/create', authMiddleware, productController.createProduct);            // POST /dashboard: Crea un nuevo producto.
router.get('/dashboard/get/:_id', authMiddleware, productController.showProductById);          //GET /dashboard/:productId: Devuelve el detalle de un producto en el dashboard.
router.get('/dashboard/edit/:_id', authMiddleware, productController.showEditProductForm);  // GET /dashboard/:productId/edit: Devuelve el formulario para editar un producto.
router.put('/dashboard/update/:_id', authMiddleware, productController.updateProduct);        // PUT /dashboard/:productId: Actualiza un producto.
router.delete('/dashboard/delete/:_id', authMiddleware, productController.deleteProduct);     // DELETE /dashboard/:productId/delete: Elimina un producto.
*/


/*
---------------------------Capturar el Token en el Backend---------------------------
En la ruta POST /login, se recibe el token enviado en el body de la solicitud.
Luego, se usa Firebase Admin para verificar ese token.
Si la verificación es exitosa, se puede guardar el token en una cookie para que en 
futuras solicitudes (como a /dashboard) el middleware de autenticación lo lea desde 
req.cookies.token.
--------------------------------------------------------------------------------------
*/