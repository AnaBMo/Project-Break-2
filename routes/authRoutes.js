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