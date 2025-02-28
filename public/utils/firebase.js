// -----------------------------------------------------
// ------------- Configuración de firebase -------------
//!        Para el Firebase Web SDK (frontend)
// -----------------------------------------------------

// Importa las funciones necesarias desde Firebase SDK
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.1.0/firebase-app.js';
import { getAuth, signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.1.0/firebase-auth.js';

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAfO9VADMDHZ6iWl1xYwhTfA4_5Ui0njCc",
  authDomain: "fir-auth-dc25a.firebaseapp.com",
  projectId: "fir-auth-dc25a",
  storageBucket: "fir-auth-dc25a.firebasestorage.app",
  messagingSenderId: "566227986207",
  appId: "1:566227986207:web:009f12a365a9ecc7a2722a"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Define la función login como una arrow function
const login = async () => {
  const mensajeDiv = document.getElementById('mensaje'); // Obtén el div para mostrar errores
  mensajeDiv.textContent = ''; // Limpia mensajes anteriores

  try {
    // Obtén los valores de email y password
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Validación de entrada
    if (!email || !password) {
      mensajeDiv.textContent = 'Email and password are required';
      return;
    }

    // Autentica al usuario con Firebase
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    
    // Obtén el ID token del usuario autenticado
    const idToken = await userCredential.user.getIdToken(); // usado por firebase. Esto es JWT 

    // Envía el ID token al servidor
    const response = await fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ idToken }),
    });

    const data = await response.json();

    // Redirige al dashboard si el login es exitoso
    if (data.success) {
      window.location.href = '/dashboard';
    } else {
      mensajeDiv.textContent = 'Login failed: ' + data.error;
    }
  } catch (error) {
    mensajeDiv.textContent = 'Error during login: ' + error.message;
  }
};

// Event listener para el botón de inicio de sesión
document.getElementById('loginButton').addEventListener('click', login);