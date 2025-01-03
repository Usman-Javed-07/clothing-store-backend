const emailService = require("./emailService");

async function sendContactUsEmail(to, data) {
  const subject = "Contact Us Query";
  const templateName = "contact";
  const replacements = {
    name: data.name,
    email: data.email,
    message: data.message,
    year: new Date().getFullYear(),
  };
  try {
    await emailService.sendEmail(to, subject, templateName, replacements);
    console.log("Contact Us sent successfully!");
  } catch (error) {
    console.error("Error sending Contact Us:", error.message);
  }
}

module.exports = { sendContactUsEmail };
