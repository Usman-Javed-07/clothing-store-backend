const express = require("express");
const { signup, login } = require("../controllers/admin.controller");
const Admin = require("../models/admin.model");

const router = express.Router();

// Signup and login routes
router.post("/signup", signup);
router.post("/login", login);

router.get("/", async (req, res) => {
  try {
    const users = await Admin.findAll(); 
    res.json(users);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ error: "Unable to fetch users" });
  }
});

module.exports = router;
