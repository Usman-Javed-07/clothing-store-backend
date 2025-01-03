const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { connectDB } = require("./config/database");
const productRoutes = require("./routes/productRoutes");
const orderRouter = require("./routes/orderRoutes");
const contactRoutes = require("./routes/contact");

const path = require("path");

const app = express();
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());
connectDB();

app.use("/api/orders", orderRouter);
app.use("/api/products", productRoutes);
app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/api", productRoutes);
app.use("/api/contact", contactRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
