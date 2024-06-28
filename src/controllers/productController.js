const productModel = require('../models/productModel');

exports.getAllProducts = (req, res) => {
  // Implementar lógica para obtener todos los productos
  res.json(productModel.getAll());
};

exports.addProduct = (req, res) => {
  // Implementar lógica para agregar un nuevo producto
  const newProduct = req.body;
  productModel.add(newProduct);
  res.status(201).json(newProduct);
};
