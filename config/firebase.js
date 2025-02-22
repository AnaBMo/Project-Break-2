// -----------------------------------------------------
// ------------- Configuración de firebase -------------
//!        Para el Firebase Web SDK (frontend)
// -----------------------------------------------------

// Importa las funciones necesarias desde Firebase SDK
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.1.0/firebase-app.js';
import { getAuth, signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.1.0/firebase-auth.js';

// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAfO9VADMDHZ6iWl1xYwhTfA4_5Ui0njCc",
  authDomain: "fir-auth-dc25a.firebaseapp.com",
  projectId: "fir-auth-dc25a",
  storageBucket: "fir-auth-dc25a.firebasestorage.app",
  messagingSenderId: "566227986207",
  appId: "1:566227986207:web:009f12a365a9ecc7a2722a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };

console.log("✅ Firebase inicializado correctamente");