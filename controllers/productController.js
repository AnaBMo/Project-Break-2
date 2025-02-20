// ---------------------------------------------------------------------------
// -------  Lógica para manejar las solicitudes CRUD de los productos  -------
// ---------------------------------------------------------------------------
const productModel = require("../models/Product");

const productController = {

    // ----- 1 -----
    // showProducts: Devuelve la vista con todos los productos.
    async getAllProducts (req, res) {
        try {
            const product = await productModel.find();
            res.status(200).json({ mensaje: '✅ All products list:', product })
        } catch (error) {
            console.error('❌ There was a problem showing the product list', error);
        }
    },


    // ----- 2 -----
    // showProductById: Devuelve la vista con el detalle de un producto.
    async getProductById (req, res) {
        try {
            const productId = await productModel.findById(req.params._id)
            res.status(200).json({ mensaje: '✅ Product found', productId })
        } catch (error) {
            console.error('❌ There was a problem showing the product', error);
        }
    },


    // ----- 3 -----
    // showNewProduct: Devuelve la vista con el formulario para subir un artículo nuevo.


    // ----- 4 -----
    // showEditProduct: Devuelve la vista con el formulario para editar un producto.



    // ----- 5 -----
    // createProduct: Crea un nuevo producto. 
    async createProduct (req, res) {
        try {
            const product = await productModel.create(req.body);
            res.status(201).json({ mensaje: ' ✅ New product created: ', product })
        } catch (error) {
            console.error('❌ There was a problem creating the product', error);
        }
    },


    // ----- 6 -----
    // updateProduct: Actualiza un producto. 
    async updateProduct (req, res) {
        try {
            const productId = req.params._id
            const { name, description, img, category, size, price } = req.body
    
            const productUpdated = await productModel.findByIdAndUpdate(
                productId,
                {
                name : name , 
                description : description,
                img : img,
                category : category,
                size : size,
                price : price,
                new : true 
                }
            );
    
            res.status(200).json({ mensaje: '✅ Updated product data', productUpdated })
        } catch (error) {
            console.error('❌ There was a problem updating the product', error);
        }
    },


    // ----- 7 -----
    //deleteProduct: Elimina un producto.

    async deleteProduct (req, res) {
        try {
            const productId = await productModel.findByIdAndDelete(req.params._id)
            res.status(200).json({ mensaje: '✅ The product has been removed', productId })
        } catch (error) {
            console.error('❌ There was a problem deleting the product', error);
        }
    }
};

module.exports = productController;