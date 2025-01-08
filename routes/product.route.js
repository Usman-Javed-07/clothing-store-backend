const express = require("express");
const {
  getProducts,
  loadProducts,
  updateQuantity,
  createProduct,
  deleteProduct,
  updateProduct,
  getProductById,
  getProductAverageRating,
  updateProductRating,
} = require("../controllers/product.controller");

const router = express.Router();

router.put("/update-product/:id", updateProduct);
router.post("/update-quantity", updateQuantity);
router.post("/load-products", loadProducts);
router.get("/products", getProducts);
router.post("/create", createProduct);
router.delete("/delete/:id", deleteProduct);
router.get("/:id", getProductById);
router.get("/:id/average-rating", getProductAverageRating);
router.post("/:id/update-rating", updateProductRating);

module.exports = router;
