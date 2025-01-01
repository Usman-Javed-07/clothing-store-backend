const mysql = require("mysql2");
const fs = require("fs");

const products = JSON.parse(fs.readFileSync("./cart-products.json", "utf8"));

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "yourpassword",
  database: "cart_db",
});

connection.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err.stack);
    return;
  }
  console.log("Connected to the database.");
});

const insertProduct = (product) => {
  return new Promise((resolve, reject) => {
    const query =
      "INSERT INTO products (name, price, rating, image) VALUES (?, ?, ?, ?)";
    connection.query(
      query,
      [product.name, product.price, product.rating, product.image],
      (err, results) => {
        if (err) return reject(err);
        resolve(results);
      }
    );
  });
};

const seedDatabase = async () => {
  try {
    for (const product of products) {
      await insertProduct(product);
    }
    console.log("Products successfully inserted into the database.");
  } catch (error) {
    console.error("Error inserting products:", error);
  } finally {
    connection.end();
  }
};

seedDatabase();
