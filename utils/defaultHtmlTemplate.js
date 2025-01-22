// added html template
export const defaultHtmlTemplate = (verificationLink, type) => {
  return type === "login"
    ? `
          <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verification Email</title>
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
        background-color: #071115;
        border-radius: 10px;
        overflow: hidden;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
        border: 2px solid #55AACA;
      }
      .header {
        background-color: #55AACA;
        padding: 20px;
        text-align: center;
      }
      .header h1 {
        font-size: 28px;
        margin: 0;
        color: #ffffff;
      }
      .content {
        padding: 30px;
      }
      .content p {
        font-size: 16px;
        color: #cccccc;
        line-height: 1.6;
        margin: 10px 0;
      }
      .content a {
        display: inline-block;
        margin: 20px 0;
        padding: 14px 24px;
        background-color: #55AACA;
        color: #ffffff;
        text-decoration: none;
        font-size: 16px;
        border-radius: 5px;
        font-weight: bold;
      }
      .footer {
        background-color: #071115;
        padding: 20px;
        text-align: center;
        border-top: 1px solid #55AACA;
      }
      .footer p {
        font-size: 14px;
        color: #cccccc;
        margin: 5px 0;
      }
      .footer a {
        color: #55AACA;
        text-decoration: none;
      }
    </style>
  </head>
  <body>
    <div class="email-container">
      <div style="font-family: Arial, sans-serif; text-align: center; margin: 20px; background-color: #071115; color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); border: 2px solid #55AACA;">
        <h1 style="color: #55AACA; font-size: 28px; margin-bottom: 20px;">Welcome to Night Club</h1>
        <p style="font-size: 16px; color: #cccccc; margin-bottom: 20px;">
          Please click the link below to login to your account:
        </p>
        <a href="${verificationLink}" style="font-size: 18px; color: #55AACA; text-decoration: none; background-color: #ffffff; padding: 10px 20px; border-radius: 4px; display: inline-block; margin-top: 10px; font-weight: bold;">Login Link</a>
        <p style="font-size: 14px; color: #888888; margin-top: 20px;">
          If you did not request this, please ignore this email.
        </p>
        <footer style="margin-top: 30px; font-size: 12px; color: #666666;">
          © 2024 Night Club App | All rights reserved
        </footer>
      </div>
    </div>
  </body>
  </html>
          `
    : `
    <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verification Email</title>
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
        background-color: #071115;
        border-radius: 10px;
        overflow: hidden;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
        border: 2px solid #55AACA;
      }
      .header {
        background-color: #55AACA;
        padding: 20px;
        text-align: center;
      }
      .header h1 {
        font-size: 28px;
        margin: 0;
        color: #ffffff;
      }
      .content {
        padding: 30px;
      }
      .content p {
        font-size: 16px;
        color: #cccccc;
        line-height: 1.6;
        margin: 10px 0;
      }
      .content a {
        display: inline-block;
        margin: 20px 0;
        padding: 14px 24px;
        background-color: #55AACA;
        color: #ffffff;
        text-decoration: none;
        font-size: 16px;
        border-radius: 5px;
        font-weight: bold;
      }
      .footer {
        background-color: #071115;
        padding: 20px;
        text-align: center;
        border-top: 1px solid #55AACA;
      }
      .footer p {
        font-size: 14px;
        color: #cccccc;
        margin: 5px 0;
      }
      .footer a {
        color: #55AACA;
        text-decoration: none;
      }
    </style>
  </head>
  <body>
    <div class="email-container">
      <div style="font-family: Arial, sans-serif; text-align: center; margin: 20px; background-color: #071115; color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); border: 2px solid #55AACA;">
        <h1 style="color: #55AACA; font-size: 28px; margin-bottom: 20px;">Verify Your Email</h1>
        <p style="font-size: 16px; color: #cccccc; margin-bottom: 20px;">
          Please click the link below to verify your email address:
        </p>
        <a href="${verificationLink}" style="font-size: 18px; color: #55AACA; text-decoration: none; background-color: #ffffff; padding: 10px 20px; border-radius: 4px; display: inline-block; margin-top: 10px; font-weight: bold;">Verify Email</a>
        <p style="font-size: 14px; color: #888888; margin-top: 20px;">
          If you did not request this, please ignore this email.
        </p>
        <footer style="margin-top: 30px; font-size: 12px; color: #666666;">
          © 2024 Night Club App | All rights reserved
        </footer>
      </div>
    </div>
  </body>
  </html>
  `;
};

export const supportHtmlTemplate = (email, content) => {
  return `<!DOCTYPE html>
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
        background-color: #071115;
        border-radius: 10px;
        overflow: hidden;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
        border: 2px solid #55AACA;
      }
      .header {
        background-color: #55AACA;
        padding: 20px;
       margin:0;
        text-align: center;
      }
      .header h1 {
        font-size: 28px;
        margin:0;
        color: #ffffff;
        
      }
      .content {
        padding: 30px;
      }
      .content p {
        font-size: 16px;
        color: #cccccc;
        line-height: 1.6;
        margin: 10px 0;
      }
      .content a {
        display: inline-block;
        margin: 20px 0;
        padding: 14px 24px;
        background-color: #55AACA;
        color: #ffffff;
        text-decoration: none;
        font-size: 16px;
        border-radius: 5px;
        font-weight: bold;
      }
      .footer {
        background-color: #071115;
        padding: 20px;
        text-align: center;
        border-top: 1px solid #55AACA;
      }
      .footer p {
        font-size: 14px;
        color: #cccccc;
        margin: 5px 0;
      }
      .footer a {
        color: #55AACA;
        text-decoration: none;
      }
    </style>
</head>
<body>
    <div class="email-container">
        <h1 class="header">Support Request Submitted</h1>
        <div class="content">
            <p>Hi [User's Name],</p>
            <p>Thank you for contacting <strong>[Your Company Name]</strong>. We’ve received your support request and our team is reviewing it. We’ll get back to you as soon as possible, usually within <strong>[response time, e.g., 24-48 hours]</strong>.</p>
            <p>Here are the details of your request:</p>
            <ul>
                <li><strong>Request ID:</strong> #[Ticket ID]</li>
                <li><strong>Submitted On:</strong> [Date and Time]</li>
                <li><strong>Issue:</strong> [Brief Description of User's Issue]</li>
            </ul>
            <p>If you need to update your request or have additional information to share, feel free to reply to this email.</p>
         
            <p>Thank you for your patience.</p>
            <p>Best regards,</p>
            <p>The <strong>[Your Company Name]</strong> Support Team</p>
        </div>
        <div class="footer">
            <p>If you didn’t make this request, please contact us immediately at <a href="mailto:support@[yourdomain].com">support@[yourdomain].com</a>.</p>
            <p>&copy; [Year] [Your Company Name]. All rights reserved.</p>
        </div>
    </div>
</body>
</html>`;
};
