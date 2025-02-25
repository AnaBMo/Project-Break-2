// ---------------------------------------------------------------
// -------  Definición de las rutas para la autenticación  -------
// ---------------------------------------------------------------
const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");

// Registro
router.get('/register', authController.showRegisterForm); 
router.post('/register', authController.register); 

// Login
router.get('/login', authController.showLoginForm); 
router.post('/login', authController.login); 

// Logout
router.post('/logout', authController.logout); 

module.exports = router;

/*
---------------------------Capturar el Token en el Backend---------------------------
En la ruta POST /login, se recibe el token enviado en el body de la solicitud.
Luego, se usa Firebase Admin para verificar ese token.
Si la verificación es exitosa, se puede guardar el token en una cookie para que en 
futuras solicitudes (como a /dashboard) el middleware de autenticación lo lea desde 
req.cookies.token.
--------------------------------------------------------------------------------------
*/