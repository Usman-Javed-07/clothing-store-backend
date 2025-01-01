
const express = require("express");
const {
  getProducts,
  loadProducts,
  updateQuantity,
  createProduct,
  deleteProduct,
} = require("../controllers/productController");

const router = express.Router();

router.post("/update-quantity", updateQuantity);
router.post("/load-products", loadProducts);
router.get("/products", getProducts);
router.post("/create", createProduct);
router.delete("/delete/:id", deleteProduct);

module.exports = router;
