const express = require("express");
const router = express.Router();
const {
  createOrder,
  getAllOrders,
  updateOrderStatus,
  deleteOrder,
} = require("../controllers/orders.controller");

router.post("/create", createOrder);
router.get("/all", getAllOrders);

router.patch("/:orderId/status", updateOrderStatus);
router.delete("/:orderId", deleteOrder);

module.exports = router;
