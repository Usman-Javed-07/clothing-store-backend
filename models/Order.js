// models/Order.js
const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../config/database"); // Import sequelize instance

class Order extends Model {}

Order.init(
  {

    totalAmount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    orderItems: {
      type: DataTypes.JSON, 
      allowNull: false,
    },
  },
  {
    sequelize, 
    modelName: "Order",
    tableName: "orders", 
    timestamps: true, 
  }
);

module.exports = Order;