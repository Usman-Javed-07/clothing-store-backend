const Order = require("../models/order.model");
const Product = require("../models/product.model");

const createOrder = async (req, res) => {
  const { userDetails, orderItems, totalAmount } = req.body;

  try {
    if (!userDetails || !orderItems || !totalAmount) {
      return res
        .status(400)
        .json({
          message: "User details, order items, and total amount are required.",
        });
    }

    const newOrder = await Order.create({
      userDetails,
      orderItems,
      totalAmount,
    });

    for (const item of orderItems) {
      const product = await Product.findOne({ where: { name: item.name } });

      if (!product) {
        return res
          .status(404)
          .json({ error: `Product ${item.name} not found.` });
      }

      if (product.quantity < item.quantity) {
        return res.status(400).json({
          error: `Not enough stock for product ${item.name}. Available: ${product.quantity}`,
        });
      }
      product.quantity -= item.quantity;
      await product.save();
    }

    res.status(201).json({
      message: "Order placed successfully!",
      orderId: newOrder.id,
      order: newOrder,
    });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({
      message: "Error creating order.",
      error: error.message || error,
    });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.findAll();
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({
      message: "Error fetching orders.",
      error: error.message || error,
    });
  }
};

const updateOrderStatus = async (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body; 

  try {
    const order = await Order.findByPk(orderId); 
    if (!order) {
      return res.status(404).json({ message: "Order not found." });
    }

    order.status = status; 
    await order.save();

    res.json(order); 
  } catch (error) {
    console.error("Error updating order status:", error);
    res.status(500).json({ message: "Failed to update order status." });
  }
};

const deleteOrder = async (req, res) => {
  const { orderId } = req.params;

  try {
    const order = await Order.findByPk(orderId); 
    if (!order) {
      return res.status(404).json({ message: "Order not found." });
    }

    await order.destroy(); 
    res.status(204).send(); 
  } catch (error) {
    console.error("Error deleting order:", error);
    res.status(500).json({ message: "Failed to delete order." });
  }
};


module.exports = {
  createOrder,
  getAllOrders,
  updateOrderStatus,
  deleteOrder,
};
