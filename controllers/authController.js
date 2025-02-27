// --------------------------------------------------------------------------
// ------------  Lógica para los controladores de autenticación  ------------
// --------------------------------------------------------------------------
const admin = require('firebase-admin');
const auth = admin.auth(); 
const path = require('path'); 

// 1. ----> aparece el formulario de registro
const showRegisterForm = (req, res) => {
    res.sendFile(path.join(__dirname, '../public/views/auth/register.html')); 
};

// 1.1. ----> lógica para el registro
const register = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        console.error('🔴 You must enter the email and password');
        return res.redirect('/register');
    }
    try {
        await auth.createUser({ 
            email, 
            password 
        });
        console.log(" 🟢 User created successfully. Redirecting to /login...");
        res.redirect('/login');
    } catch (error) {
        console.error(`🔴 There was an internal error: ${error.message}`);
        res.redirect('/register');  
    }
};

// 2. ----> aparece el formulario de login
const showLoginForm = (req, res) => {
    res.sendFile(path.join(__dirname, '../public/views/auth/login.html')); 
};

// 2.1. ----> lógica para el login  
// Se espera recibir el token de Firebase (idToken) en el body
const login = async (req, res) => {
    console.log("Body recibido en login:", req.body);
    const { idToken } = req.body;
    if (!idToken) {
        console.error('🔴 No token provided');
        return res.status(400).json({ success: false, error: 'No token provided' });
    }
    try {
        // Verifica el token recibido con Firebase Admin
        const decodedToken = await auth.verifyIdToken(idToken);
        console.log(`🟢 User ${decodedToken.email} successfully authenticated`);
        
        // Almacena el token en una cookie httpOnly para seguridad (protocolo para que nadie pueda acceder a la cookie)
        // necesario cookie-parser en el inicio de nuestra app (index.js)
        res.cookie('token', idToken, { httpOnly: true, secure: false }); // Usa 'secure: true' en producción. 
        
        // Con este true, está validada la cookie y se accede a dashboard
        res.json({ success: true });
    } catch (error) {
        console.error(`🔴 Login error: ${error.message}`);
        res.status(401).json({ success: false, error: 'Token verification failed' });
    }
};

// 3. ----> lógica para mostrar dashboard al confirmarse el login con Firebase
const showDashboard = (req, res) => {
    try {
        const dashboardPath = path.join(__dirname, '../public/views/dashboard/dashboard.html');
        console.log('Dashboard path:', dashboardPath);
        res.sendFile(dashboardPath);
    } catch (error) {
        console.error('There was an error showing the dashboard:', error);
        res.status(500).send('☠️ Server error');
    }
};


// 4. ----> lógica para el logout
const logout = (req, res) => {
    res.clearCookie('token'); // borrado de cookie
    res.redirect('/');
}; //faltaría borrar la cookie

module.exports = {
    register,
    login,
    showLoginForm,
    showRegisterForm,
    showDashboard,
    logout
};