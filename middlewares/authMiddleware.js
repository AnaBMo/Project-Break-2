// -------------------------------------------------------------
// -------  Middlewares para verificar la autenticación  -------
// -------------------------------------------------------------
const admin = require('../config/firebase'); 
const auth = admin.auth();

const authMiddleware = async (req, res, next) => {
    // extrae el token de la cookie y lo verifica adecuadamente antes 
    // de permitir el acceso a rutas protegidas 
    const idToken = req.cookies.token;
    console.log(req.cookies.token);
  
    if (!idToken) {
        console.error('🔴 No token found in cookie');
        return res.redirect('/login');
    }
  
    try {
        const decodedToken = await auth.verifyIdToken(idToken);
        req.user = decodedToken;
        next();
    } catch (error) {
        console.error('🔴 Error verifying token:', error);
        return res.redirect('/login');
    }
};

module.exports = authMiddleware;