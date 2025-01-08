const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { connectDB } = require("./config/database");
const productRoutes = require("./routes/product.route");
const orderRouter = require("./routes/order.route");
const contactRoutes = require("./routes/contact.route");
const admin = require('./routes/admin.route')
require("dotenv").config();

const path = require("path");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());
connectDB();

app.use("/api/orders", orderRouter);
app.use("/api/products", productRoutes);
app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/api/contact", contactRoutes);
app.use("/api", productRoutes);
app.use('/api/admin', admin)

app.get("/", (req, res) => {
  res.send("API is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
