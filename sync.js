const { sequelize } = require("./config/database");
const Product = require("./models/Product");

const syncDatabase = async () => {
  try {
    await sequelize.sync({ force: true });
    console.log("Database synchronized successfully.");
  } catch (error) {
    console.error("Error synchronizing the database:", error);
  }
};

syncDatabase();
