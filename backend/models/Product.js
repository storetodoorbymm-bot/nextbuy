const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  price: Number,
  ourPrice: Number,
  category: String,
  image: String
});

module.exports = mongoose.model("Product", productSchema);
