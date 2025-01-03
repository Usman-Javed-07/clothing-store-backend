const { sendContactUsEmail } = require("../utils/email");
const sendContactEmail = async (req, res) => {
  const { name, email, message } = req.body;

  try {
    if (!name || !email || !message) {
      return res
        .status(400)
        .json({ message: "Name, email, and message are required." });
    }

    await sendContactUsEmail(process.env.ADMIN_EMAIL, { name, email, message });

    res.status(200).json({
      message: "Your message has been sent successfully!",
    });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({
      message: "Error sending email.",
      error: error.message || error,
    });
  }
};

module.exports = {
  sendContactEmail,
};
