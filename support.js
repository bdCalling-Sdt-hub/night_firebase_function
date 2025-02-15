import * as logger from "firebase-functions/logger";

import admin from "firebase-admin";
import { onRequest } from "firebase-functions/v2/https";
import { config } from "./utils/config.golobal.js";
import { mailSender } from "./utils/mailSender.js";

// Initialize Firebase Admin SDK (if not already initialized)
if (!admin.apps.length) {
  admin.initializeApp();
}

const support = onRequest(async (request, response) => {
  logger.info("Send email request received", { structuredData: true });

  const { email, content } = await request.body;

  if (!email || !content) {
    response.status(400).send({
      message: "Email and content are required.",
      code: 400,
      success: false,
    });
    return;
  }

  try {
    console.log(email);
    const userDoc = await admin.auth().getUserByEmail(email);
    if (userDoc?.uid) {
      //  send email on user
      mailSender(
        email,
        content,
        "Your Support Message send successfully",
        "support",
        `<!DOCTYPE html>
<html>
<head>
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #071115;
        margin: 0;
        padding: 0;
        color: #ffffff;
      }
      .email-container {
        max-width: 600px;
        margin: 20px auto;
        background-color: #11161A;
        border-radius: 8px;
        padding: 20px;
        border: 2px solid #55AACA;
      }
      .header {
        text-align: center;
        background-color: #55AACA;
        color: #ffffff;
        padding: 15px;
        border-radius: 5px;
      }
      .header h1 {
        margin: 0;
        font-size: 22px;
      }
      .content {
        margin-top: 20px;
      }
      .content p {
        font-size: 16px;
        color: #cccccc;
        line-height: 1.5;
      }
      .content ul {
        padding-left: 20px;
      }
      .content ul li {
        margin: 5px 0;
        color: #ffffff;
      }
      .footer {
        margin-top: 20px;
        text-align: center;
        font-size: 14px;
        color: #777777;
        border-top: 1px solid #55AACA;
        padding-top: 10px;
      }
      .footer a {
        color: #55AACA;
        text-decoration: none;
      }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <h1>Support Request Submitted</h1>
        </div>
        <div class="content">
            <p>Hi ${userDoc?.displayName},</p>
            <p>Thank you for contacting <strong>Nigh Club</strong>. We’ve received your support request and our team is reviewing it. We’ll get back to you as soon as possible, usually within <strong>${new Date().toLocaleDateString()}</strong>.</p>
            <p>Here are the details of your request:</p>
            <ul>
                <li><strong>Request ID:</strong> ${Math.floor(
                  Math.random() * 1000000
                )}</li>
                <li><strong>Submitted On:</strong> ${new Date().toLocaleDateString()}</li>
                <li><strong>Issue:</strong> ${content}</li>
            </ul>
            <p>If you need to update your request or have additional information to share, feel free to reply to this email.</p>
            <p>Thank you for your patience.</p>
            <p>Best regards,</p>
            <p>The <strong>Nigh Club</strong> Support Team</p>
        </div>
        <div class="footer">
            <p>&copy; ${new Date().getFullYear()} Nite App. All rights reserved.</p>
        </div>
    </div>
</body>
</html>

`
      );
      //  informa on admin
      mailSender(
        config.userEmail,
        content,
        `Support from ${email}`,
        "support",
        `<!DOCTYPE html>
<html>
<head>
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #071115;
        margin: 0;
        padding: 0;
        color: #ffffff;
      }
      .email-container {
        max-width: 600px;
        margin: 20px auto;
        background-color: #11161A;
        border-radius: 8px;
        padding: 20px;
        border: 2px solid #55AACA;
      }
      .header {
        text-align: center;
        color: #55AACA;
        margin-bottom: 20px;
      }
      .content p {
        font-size: 16px;
        color: #cccccc;
        margin: 10px 0;
        line-height: 1.5;
      }
      .footer {
        margin-top: 20px;
        text-align: center;
        font-size: 14px;
        color: #777777;
      }
      .footer a {
        color: #55AACA;
        text-decoration: none;
      }
    </style>
</head>
<body>
    <div class="email-container">
        <h1 class="header">New Support Request</h1>
        <div class="content">
            <p>Dear Admin,</p>
            <p>A new support request has been submitted. Please find the details below:</p>
            <p><strong>User Name:</strong> ${userDoc?.displayName}</p>
            <p><strong>User Email:</strong> ${userDoc?.email}</p>
            <p><strong>Request ID:</strong> ${Math.floor(
              Math.random() * 1000000
            )}</p>
            <p><strong>Submitted On:</strong> ${new Date().toLocaleDateString()}</p>
            <p><strong>Issue:</strong> ${content}</p>
            <p>Please address this request promptly. Thank you!</p>
        </div>
       <div class="footer">
           © ${new Date().getFullYear()} Nite App | All rights reserved
        </div>
    </div>
</body>
</html>
`
      );
    }

    response.status(200).send({
      message: "Email sent successfully.",
      success: true,
      status: 200,
    });
  } catch (error) {
    response.status(200).send({
      message: "Invalid email.",
      code: 400,
      success: false,
      error: error.message,
    });
  }

  // console.log(userDoc);
});

export default support;
