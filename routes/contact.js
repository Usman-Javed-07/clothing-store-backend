const express = require("express");
const router = express.Router();
const { sendContactEmail } = require("../controllers/contact");

// Route for handling contact form submissions
router.post("/submit-contact", sendContactEmail);

module.exports = router;
