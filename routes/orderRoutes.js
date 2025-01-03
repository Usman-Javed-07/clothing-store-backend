
const express = require("express");
const router = express.Router();
const { createOrder , getAllOrders } = require("../controllers/orders");

router.post("/create", createOrder); 
router.get("/all", getAllOrders); 

module.exports = router;
