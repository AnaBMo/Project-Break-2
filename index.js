const express = require('express');
const app = express();

require('dotenv').config();
const PORT = process.env.PORT || 3000;

const { dbConnection } = require('./config/db');
//!const routes = require('./routes');


app.use(express.json());
app.use(express.urlencoded({extended: true}));

//!app.use('/', routes);


dbConnection();

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));