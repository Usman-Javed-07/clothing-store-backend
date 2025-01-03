const nodemailer = require("nodemailer");
const fs = require("fs").promises;
const path = require("path");

// Function to read the HTML template
async function getTemplate(templateName, replacements) {
  const templatePath = path.join(
    __dirname,
    "email_templates",
    `${templateName}.html`
  );

  try {
    let template = await fs.readFile(templatePath, "utf8");

    // Replace placeholders in the template
    for (const key in replacements) {
      const placeholder = `{{${key}}}`;
      template = template.replace(
        new RegExp(placeholder, "g"),
        replacements[key]
      );
    }

    return template;
  } catch (error) {
    throw new Error("Error reading the email template");
  }
}

// Function to send the email
async function sendEmail(to, subject, templateName, replacements) {
  try {
    // Create a transporter with SMTP details
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: process.env.SMTP_SECURE === "true", // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER, // SMTP username
        pass: process.env.SMTP_PASS, // SMTP password
      },
    });

    // Get the email content with placeholders replaced
    const htmlContent = await getTemplate(templateName, replacements);

    // Set up email data
    const mailOptions = {
      from: process.env.EMAIL_FROM, // sender address
      to, // list of receivers
      subject, // Subject line
      html: htmlContent, // HTML body
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: %s", info.messageId);
  } catch (error) {
    console.error("Error sending email:", error.message);
    throw new Error("Failed to send email");
  }
}

module.exports = { sendEmail };
