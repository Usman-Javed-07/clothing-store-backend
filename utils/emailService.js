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

async function sendEmail(to, subject, templateName, replacements) {
  try {
    
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: process.env.SMTP_SECURE === "true", 
      auth: {
        user: process.env.SMTP_USER, 
        pass: process.env.SMTP_PASS, 
      },
    });

    const htmlContent = await getTemplate(templateName, replacements);

    const mailOptions = {
      from: process.env.EMAIL_FROM, 
      to, 
      subject, 
      html: htmlContent,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: %s", info.messageId);
  } catch (error) {
    console.error("Error sending email:", error.message);
    throw new Error("Failed to send email");
  }
}

module.exports = { sendEmail };
