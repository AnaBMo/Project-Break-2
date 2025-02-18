const express = require('express');
const app = express();

const dbConnection = require('./config/db');
const router = require("./routes/productRoutes");

require('dotenv').config();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/products', router);

dbConnection();

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));