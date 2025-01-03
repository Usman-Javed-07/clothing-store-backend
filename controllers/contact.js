const nodemailer = require("nodemailer");

const sendContactEmail = async (req, res) => {
  const { name, email, message } = req.body;

  try {
 
    if (!name || !email || !message) {
      return res.status(400).json({ message: "Name, email, and message are required." });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail", 
      auth: {
        user: "usmanjaved0816@gmail.com", 
        pass: "usmanjaved", 
      },
    });

    const mailOptions = {
      from: email, 
      to: "usmanjaved0816@gmail.com", 
      subject: "New Contact Us Query",
      text: `You have received a new query with the following details:\n\nName: ${name}\nEmail: ${email}\nMessage: ${message}`,
    };

    await transporter.sendMail(mailOptions);

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
