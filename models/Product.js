// ---------------------------------------------------------------
// ------------- Definición del esquema del producto -------------
// ---------------------------------------------------------------
const { kMaxLength } = require("buffer");
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Product name is required'],
    },
    description: {
      type: String,
      maxLength: [200, 'The description must have a maximum of 200 characters'],
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
      min: [0, 'The price cannot be negative'],
    },
  },
  { timestamps: true }
);

const productModel = mongoose.model('products', productSchema);
module.exports = productModel;