const express = require('express');
const app = express();
const path = require('path'); // requerir 'path' para unir de manera segura los archivos que vamos a usar

const admin = require('firebase-admin'); // interactuar con los servicios de Firebase desde el backend de la aplicación
const serviceAccount = require('./services/userService');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const dbConnection = require('./config/db');
const router = require("./routes/productRoutes");
const authRouter = require("./routes/authRoutes");

require('dotenv').config();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname, 'public'))); // para poder acceder a los archivos estáticos (html, css)                                                  

app.use('/', router);
app.use('/', authRouter);


dbConnection();

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));