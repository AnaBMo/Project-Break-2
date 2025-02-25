// ---------------------------------------------------------------------------
//! -------------  Funciones necesarias para mostrar las vistas  -------------
// ---------------------------------------------------------------------------
const productModel = require("../models/Product");
const path = require("path"); // necesario para acceder a las views y mostrar contenido html

function baseHtml() {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>Dulces detalles</title>
      <link rel="stylesheet" href="/styles.css">
    </head>
    <body>
    `;
};

function getNavBar() {
  return `
    <nav>
      <a href="/products">Inicio</a>
      <a href="/products/category/cesta">Cestas</a>
      <a href="/products/category/caja">Cajas</a>
      <a href="/products/category/cono">Conos</a>
      <a href="/products/category/corazón">Corazones</a>
    </nav>
  `;
};

function getProductCards(products) {
  let html = '<div class="products">';
  products.forEach(product => {
    html += `
        <div class="product-card">
          <img src="${product.img}" alt="${product.name}">
          <h2>${product.name}</h2>
          <p>${product.description}</p>
          <p>${product.price}€</p>
          <a href="/products/${product._id}">Ver detalle</a>
        </div>
      `;
  });
  html += '</div>';
  return html;
};

// ---------------------------------------------------------------------------
//!-------  Lógica para manejar las solicitudes CRUD de los productos  -------
// ---------------------------------------------------------------------------

const productController = {
  // ----- 0 -----
  // Página de bienvenida.
  async index(req, res) {
    res.sendFile(path.join(__dirname, "../public/views/index.html"));
  },

  // ----- 1 -----
  // showProducts: Devuelve la vista con todos los productos.
  async showProducts(req, res) {
    try {
      const products = await productModel.find();
      const html = baseHtml() + getNavBar() + getProductCards(products) + '</body></html>';

      res.send(html);
    } catch (error) {
      console.error('❌ There was a problem showing the product list', error);
      res.status(500).send('❌ There was a problem showing the product list');
    }
  },

  // ----- 2 -----
  // showProductById: Devuelve la vista con el detalle de un producto.
  async showProductById(req, res) {
    try {
      const product = await productModel.findById(req.params._id);
      if (!product) return res.status(404).send('❌ Product not found');

      // Vista dinámica para el detalle del producto
      const productDetail = `
            <div class="product-detail">
              <img src="${product.img}" alt="${product.name}">
              <h1>${product.name}</h1>
              <p>${product.description}</p>
              <p>Precio: ${product.price}€</p>
            </div>
          `;
      const html = baseHtml() + getNavBar() + productDetail + '</body></html>';
      res.send(html);
    } catch (error) {
      console.error('❌ There was a problem showing the product', error);
      res.status(500).send('❌ There was a problem showing the product');
    }
  },

  // ----- 3 -----
  // showNewProduct: Devuelve la vista con el formulario para subir un artículo nuevo.
  async showNewProduct(req, res) {
    try {
      res.sendFile(path.join(__dirname, "../public/views/dashboard/newProduct.html"));
    } catch (error) {
      console.error('❌ There was a problem loading the new product', error);
      res.status(500).send('❌ There was a problem showing the product');
    }
  },

  // ----- 4 -----
  // showEditProduct: Devuelve la vista con el formulario para editar un producto.
  async showEditProduct(req, res) {
    try {
      res.sendFile(path.join(__dirname, "../public/views/dashboard/editProduct.html"));
    } catch (error) {
      console.error('❌ There was a problem loading the edit product form', error);
      res.status(500).send('❌ There was a problem loading the edit product form');
    }
  },

  // ----- 5 -----
  // createProduct: Crea un nuevo producto. 
  async createProduct(req, res) {
    try {
      const product = await productModel.create(req.body);
      // // res.status(201).json({ mensaje: ' ✅ New product created: ', product });
      res.redirect('/dashboard');
    } catch (error) {
      console.error('❌ There was a problem creating the product', error);
      res.status(500).send('❌ There was a problem creating the product');
    }
  },

  // ----- 6 -----
  // updateProduct: Actualiza un producto. 
  async updateProduct(req, res) {
    try {
      const productId = req.params._id
      const { name, description, img, category, size, price } = req.body

      const productUpdated = await productModel.findByIdAndUpdate(
        productId,
        {
          name: name,
          description: description,
          img: img,
          category: category,
          size: size,
          price: price,
          new: true
        }
      );
      // // res.status(200).json({ mensaje: '✅ Updated product data', productUpdated });
      res.redirect('/dashboard');
    } catch (error) {
      console.error('❌ There was a problem updating the product', error);
      res.status(500).send('❌ There was a problem updating the product');
    }
  },

  // ----- 7 -----
  //deleteProduct: Elimina un producto.
  async deleteProduct(req, res) {
    try {
      const productId = await productModel.findByIdAndDelete(req.params._id)
      // // res.status(200).json({ mensaje: '✅ The product has been removed', productId })
      res.redirect('/dashboard');
    } catch (error) {
      console.error('❌ There was a problem deleting the product', error);
      res.status(500).send('❌ There was a problem deleting the product');
    }
  },

  // ----- 8 -----
  // Función extra para mostrar en las vistas los productos filtrados por categoría.
  async filterProductsByCategory(req, res) {
    const { category } = req.params;
    try {
      const products = await productModel.find({ category: category });
      const html = baseHtml() + getNavBar() + getProductCards(products) + '</body></html>';
      res.send(html);
    } catch (error) {
      console.error('❌ Error al filtrar los productos por categoría', error);
      res.status(500).send('❌ Error al filtrar los productos');
    }
  }
};

module.exports = productController;