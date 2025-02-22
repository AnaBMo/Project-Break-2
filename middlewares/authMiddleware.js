// -------------------------------------------------------------
// -------  Middlewares para verificar la autenticación  -------
// -------------------------------------------------------------
const admin = require('firebase-admin');
const auth = admin.auth();

const authMiddleware = (req, res, next) => {
    try {
        const idToken = req.cookies.token;

        if (!idToken) {
            return res.redirect('/login');
        }

        auth.verifyIdToken(idToken)
            .then(decodedToken => {
            req.user = decodedToken;
            next();
            })
            .catch(error => {
            console.error('🔴 Error verifying token:', error);
            res.redirect('/login'); // redirige a login si no está autorizado
            });
    } catch (error) {
        console.error(' 🔴 Authentication error', error);
        res.status(500).json({ error: '☠️ Server error' });
    }
};

module.exports = authMiddleware;