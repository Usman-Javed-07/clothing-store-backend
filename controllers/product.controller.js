const fs = require("fs");
const Product = require("../models/product.model");
const path = require("path");

const loadProducts = async (req, res) => {
  try {
    const data = JSON.parse(
      fs.readFileSync("./data/cart-products.json", "utf8")
    );
    await Product.bulkCreate(data, { ignoreDuplicates: true });
    res.status(200).json({ message: "Products loaded successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error loading products", error });
  }
};

const getProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products", error });
  }
};

const updateQuantity = async (req, res) => {
  const { cart } = req.body;

  try {
    for (const item of cart) {
      const product = await Product.findByPk(item.id);

      if (!product) {
        return res
          .status(404)
          .json({ error: `Product with ID ${item.id} not found.` });
      }

      if (product.quantity < item.quantity) {
        return res.status(400).json({
          error: `Insufficient stock for product ${product.name}. Available: ${product.quantity}`,
        });
      }

      product.quantity -= item.quantity;
      await product.save();
    }

    res
      .status(200)
      .json({ message: "Product quantities updated successfully!" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while updating product quantities." });
  }
};

const createProduct = async (req, res) => {
  const { name, price, rating, imageUrl, quantity } = req.body;

  try {
    if (!name || !price || quantity === undefined) {
      return res
        .status(400)
        .json({ message: "Name, price, and quantity are required." });
    }
    const product = await Product.create({
      name,
      price,
      rating,
      imageUrl,
      quantity,
    });
    const productsFilePath = path.join(__dirname, "../data/cart-products.json");
    let products = [];

    if (fs.existsSync(productsFilePath)) {
      const rawData = fs.readFileSync(productsFilePath, "utf8");
      products = JSON.parse(rawData);
    }
    products.push({
      id: product.id,
      name,
      price,
      rating,
      imageUrl,
      quantity,
    });

    fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));

    res.status(201).json({
      message: "Product created successfully!",
      product,
    });
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({
      message: "Error creating product.",
      error: error.message || error,
    });
  }
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findByPk(id);

    if (!product) {
      return res
        .status(404)
        .json({ message: `Product with ID ${id} not found.` });
    }

    await product.destroy();
    res.status(200).json({ message: "Product deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting product", error });
  }
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, price, rating, imageUrl, quantity } = req.body;

  try {
    const product = await Product.findByPk(id);

    if (!product) {
      return res
        .status(404)
        .json({ message: `Product with ID ${id} not found.` });
    }

    if (!name || !price || quantity === undefined) {
      return res
        .status(400)
        .json({ message: "Name, price, and quantity are required." });
    }

    product.name = name;
    product.price = price;
    product.rating = rating;
    product.imageUrl = imageUrl;
    product.quantity = quantity;

    await product.save();
    const productsFilePath = path.join(__dirname, "../data/cart-products.json");
    let products = [];

    if (fs.existsSync(productsFilePath)) {
      const rawData = fs.readFileSync(productsFilePath, "utf8");
      products = JSON.parse(rawData);
    }

    const productIndex = products.findIndex((p) => p.id === parseInt(id));
    if (productIndex !== -1) {
      products[productIndex] = {
        id: product.id,
        name,
        price,
        rating,
        imageUrl,
        quantity,
      };
      fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));
    }
    res.status(200).json({
      message: "Product updated successfully!",
      product,
    });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({
      message: "Error updating product.",
      error: error.message || error,
    });
  }
};

const getProductById = async (req, res) => {
  const productId = req.params.id;

  try {
    const product = await Product.findByPk(productId); // Fetch product by primary key (ID)

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching the product." });
  }
};

module.exports = {
  loadProducts,
  getProducts,
  updateQuantity,
  createProduct,
  deleteProduct,
  updateProduct,
  getProductById,
};
