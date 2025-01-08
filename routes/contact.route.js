const express = require("express");
const router = express.Router();
const { sendContactEmail } = require("../controllers/contact.controller");

router.post("/submit-contact", sendContactEmail);

module.exports = router;
