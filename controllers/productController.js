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

// Barra de navegación distinta para usuario regular y usuario administrador
function getNavBar(isAdmin = false) {
  return `
    <nav>
      <a href="/products">Products</a>
      <a href="/products/category/cesta">Cestas</a>
      <a href="/products/category/caja">Cajas</a>
      <a href="/products/category/cono">Conos</a>
      <a href="/products/category/corazón">Corazones</a>
      ${isAdmin 
        ? `<a class="btn" href="/dashboard/new">New Product</a>
           <form action="/logout" method="post">
             <button type="submit" class="btn">Logout</button>
           </form>`
        : `<a class="btn" href="/login">Login</a>
           <a class="btn" href="/register">Register</a>`}
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

  // ----- 1 -----
  // showProducts: Devuelve la vista con todos los productos.
  // Incluye diferencias en la vista si el usuario está autenticado o no lo está.
  async showProducts(req, res) {
    try {
      const products = await productModel.find();

      // Se verifica autenticación
      const isAdmin = req.cookies.token ? true : false; 

      const html = baseHtml() + getNavBar(isAdmin) + getProductCards(products) + '</body></html>';

      res.send(html);
    } catch (error) {
      console.error('❌ There was a problem showing the product list', error);
      res.status(500).send('❌ There was a problem showing the product list');
    }
  },

  // ----- 2 -----
  // showProductById: Devuelve la vista con el detalle de un producto.
  // Incluye diferencias en la vista si el usuario está autenticado o no lo está.
  async showProductById(req, res) {
    try {
      const product = await productModel.findById(req.params.productId); 
      if (!product) return res.status(404).send('❌ Product not found');
  
      // Si el ususario es administrador, mostrará botones Edit y Delete
      const isAdmin = req.cookies.token ? true : false; 
  
      let adminButtons = "";
      if (isAdmin) {
        adminButtons = `
          <div class="admin-buttons">
            <a href="/dashboard/${product._id}/edit" class="btn">Edit</a>
            <form action="/dashboard/${product._id}/delete" method="POST" onsubmit="return confirm('The product will be permanently removed.');">
              <button type="submit" class="btn">Delete</button>
            </form>
          </div>
        `;
      };
  
      // Vista del detalle del producto
      const productDetail = `
        <div class="product-detail">
          <img src="${product.img}" alt="${product.name}">
          <div class="product-detail-text">
            <h1>${product.name}</h1>
            <p>${product.description}</p>
            <p>Precio: ${product.price}€</p>
            <div class="admin-buttons">
              ${adminButtons} 
            </div>
          </div>
        </div>
      `;
  
      const html = baseHtml() + getNavBar(isAdmin) + productDetail + '</body></html>';
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
      res.sendFile(path.join(__dirname, "../public/views/admin/newProduct.html"));
    } catch (error) {
      console.error('❌ There was a problem loading the new product', error);
      res.status(500).send('❌ There was a problem showing the product');
    }
  },

  // ----- 4 -----
  // showEditProduct: Devuelve la vista con el formulario para editar un producto.
  async showEditProduct(req, res) {
    try {
      res.sendFile(path.join(__dirname, "../public/views/admin/editProduct.html"));
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
      const productId = req.params.productId; 
      const { name, description, img, category, size, price } = req.body;

      const productUpdated = await productModel.findByIdAndUpdate(
        productId,
        {
          name: name,
          description: description,
          img: img,
          category: category,
          size: size,
          price: price,
        },
        { new: true }
      );
      // // res.status(200).json({ mensaje: '✅ Updated product data', productUpdated });
      res.redirect('/products');
    } catch (error) {
      console.error('❌ There was a problem updating the product', error);
      res.status(500).send('❌ There was a problem updating the product');
    }
  },

  // ----- 7 -----
  //deleteProduct: Elimina un producto.
  async deleteProduct(req, res) {
    try {
      const productId = req.params.productId; 
      const deletedProduct = await productModel.findByIdAndDelete(productId);
  
      if (!deletedProduct) {
        console.error(`❌ Product with ID ${productId} not found.`);
        return res.status(404).send('❌ Product not found.');
      }
  
      console.log(`✅ Product with ID ${productId} deleted successfully.`);
      res.redirect('/products');
    } catch (error) {
      console.error('❌ There was a problem deleting the product:', error);
      res.status(500).send('❌ There was a problem deleting the product.');
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