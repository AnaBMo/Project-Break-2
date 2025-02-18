// --------------------------------------------------------------
// ------------- Creando el modelo de producto ------------------
// --------------------------------------------------------------
const { kMaxLength } = require("buffer");
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'El nombre del producto es obligatorio'],
    },
    description: {
      type: String,
      maxLength: [200, 'La descripción tiene un máximo de 200 caracteres'],
    },
    img: {
      type: String, // URL de la imagen
      required: true,
    },
    category: {
      type: String,
      enum: ["caja", "cesta", "cono", "corazón"],
      required: true,
    },
    size: {
      type: String,
      enum: ["XS", "S", "M", "L", "XL"],
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: [0, 'El precio no puede ser negativo'],
    },
  },
  { timestamps: true }
);

const productModel = mongoose.model('products', productSchema);
module.exports = productModel;