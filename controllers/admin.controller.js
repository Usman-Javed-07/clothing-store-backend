const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Admin = require("../models/admin.model");

// Signup
const signup = async (req, res) => {
  const { username, email, password, firstname, lastname } = req.body;

  try {
    if (!username || !email || !password || !firstname || !lastname) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await Admin.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await Admin.create({
      username,
      email,
      password: hashedPassword,
      FirstName: firstname,
      LastName: lastname,
    });

    const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(201).json({
      message: "User registered successfully",
      user: { username: newUser.username, email: newUser.email },
      token,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error processing request", error: err.message });
  }
};

// Login
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await Admin.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({
      message: "Login successful",
      user: { username: user.username, email: user.email },
      token,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error processing request", error: err.message });
  }
};

module.exports = { signup, login };
