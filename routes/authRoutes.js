// ---------------------------------------------------------------
// -------  Definición de las rutas para la autenticación  -------
// ---------------------------------------------------------------
const express = require("express");
const router = express.Router();
const path = require('path');
const admin = require('firebase-admin');
//const checkAuth = require('../middlewares/checkAuth'); // middleware para verificar la autenticación
const auth = admin.auth(); // método de autenticación del paquete 'firebase-admin'
const authController = require("../controllers/authController");

router.get('/register', (req, res) => {
    //res.json({msg: 'funciona ✅'}); // para comprobar que devuelve correctamente la respuesta.
    res.sendFile(path.join(__dirname, '../public/views/auth/register.html')); // pintar el formulario
});

// enviar datos del formulario
// función asíncrona porque los datos van a un tercero --> Firebase
router.post('/register', async(req, res) => {
    const {email, password } = req.body;
    try {
        await auth.createUser({
            email, 
            password
        });
        res.redirect('/login');
    } catch(error) {
        console.log(`There was an internal error: ${error}`);
        res.redirect('/register');
    }
});

router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/views/auth/login.html'));
});

router.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/views/auth/dashboard.html'));
});

router.post('/logout', (req, res) => {

});




module.exports = router;

