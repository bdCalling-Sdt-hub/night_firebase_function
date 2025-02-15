import nodemailer from "nodemailer";
import { config } from "./config.golobal.js";
import { defaultHtmlTemplate } from "./defaultHtmlTemplate.js";

export const mailSender = async (
  email,
  verificationLink,
  title,
  type,
  template
) => {
  // Validate input
  if (!email || !verificationLink) {
    return {
      message: "Email and verification link are required.",
      success: false,
      status: 400,
    };
  }

  // Configure Nodemailer transporter
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: config.userEmail, // Email from environment variable
      pass: config.userPassword, // App password from environment variable
    },
  });

  // Verify transporter connection
  transporter.verify((error) => {
    if (error) {
      console.error("Transporter verification failed:", error.message);
      throw new Error("Transporter configuration error.");
    } else {
      console.log("Transporter is ready to send emails.");
    }
  });

  // Prepare email content
  const htmlTemplate = template || defaultHtmlTemplate(verificationLink, type);

  const mailOptions = {
    from: config.userEmail,
    to: email,
    subject: title || "Nite App email verification",
    html: htmlTemplate,
  };

  // Send the email
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`Email sent successfully: ${info.messageId}`);
    return info;
  } catch (error) {
    console.error("Error sending email:", error?.message);
    throw new Error("Failed to send email.");
  }
};
