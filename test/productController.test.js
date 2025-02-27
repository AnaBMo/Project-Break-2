// ---------------------------------------------------------------------------
//! ----- Realización de test para verificar funcionamiento del código.------
// ---------------------------------------------------------------------------
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../index');
require('dotenv').config();
const Product = require('../models/Product'); 

//!----------------------------------------------------------------------------

// Conecta a la base de datos antes de ejecutar los tests
beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
});

// Limpiar colección para evitar duplicados
beforeEach(async () => {
    await Product.deleteMany();
});

// Cierra la conexión con la base de datos después de las pruebas
afterAll(async () => {
    await mongoose.connection.close();
});

//!----------------------------------------------------------------------------

// Test para obtener todos los productos
describe('GET /products', () => {
    it('Should return all the products', async () => {
        await Product.create({
            name: 'Product 1',
            description: 'Description 1',
            img: 'https://example.com/img1.jpg',
            category: 'cesta',
            size: 'M',
            price: 19.99
        });
        await Product.create({
            name: 'Product 2',
            description: 'Description 2',
            img: 'https://example.com/img2.jpg',
            category: 'caja',
            size: 'L',
            price: 24.99
        });

        const response = await request(app).get('/products');

        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body).toHaveLength(2);
        expect(response.body[0].name).toBe('Product 1');
        expect(response.body[1].name).toBe('Product 2');
    });
});

// Test para crear un nuevo producto
describe('POST /dashboard', () => {
    it('Should create a new product', async () => {
        const newProduct = {
            name: 'New product',
            description: 'Testing product creation',
            img: 'https://example.com/img.jpg',
            category: 'cesta',
            size: 'M',
            price: 19.99
        };

        const response = await request(app).post('/dashboard').send(newProduct);

        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty('_id');
        expect(response.body.name).toBe(newProduct.name);
        expect(response.body.description).toBe(newProduct.description);
        expect(response.body.price).toBe(newProduct.price);
    });

    it('Should return an error if any required fields are missing', async () => {
        const invalidProduct = {
            name: 'Invalid product'
        };

        const response = await request(app).post('/dashboard').send(invalidProduct);

        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty('error', 'All fields are required');
    });
});