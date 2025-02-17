// added html template
export const defaultHtmlTemplate = (verificationLink, type) => {
  return type === "login"
    ? `
          <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Verification</title>
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
        <h1 style="color: #55AACA; font-size: 28px; margin-bottom: 20px;">Welcome to Nite App</h1>
        <p style="font-size: 16px; color: #cccccc; margin-bottom: 20px;">
          Please verify your email and login to your account by clicking the button below.
        </p>
        <a href="${verificationLink}" style="font-size: 18px; color: #55AACA; text-decoration: none; background-color: #ffffff; padding: 10px 20px; border-radius: 4px; display: inline-block; margin-top: 10px; font-weight: bold;">Verify & Login</a>
       
        <p style="font-size: 14px; color: #888888; margin-top: 20px;">
          If you did not request this, please ignore this email.
        </p>
        <footer style="margin-top: 30px; font-size: 12px; color: #666666;">
        © ${new Date().getFullYear()} Nite App | All rights reserved
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
        <h1 style="color: #55AACA; font-size: 28px; margin-bottom: 20px;">Welcome to Nite App</h1>
        <p style="font-size: 16px; color: #cccccc; margin-bottom: 20px;">
        Please verify your email and login to your account by clicking the button below
        </p>
        <a href="${verificationLink}" style="font-size: 18px; color: #55AACA; text-decoration: none; background-color: #ffffff; padding: 10px 20px; border-radius: 4px; display: inline-block; margin-top: 10px; font-weight: bold;">Verify & Login</a>
        <p style="font-size: 14px; color: #888888; margin-top: 20px;">
          If you did not request this, please ignore this email.
        </p>
        <footer style="margin-top: 30px; font-size: 12px; color: #666666;">
          © ${new Date().getFullYear()} Nite App | All rights reserved
        </footer>
      </div>
    </div>
  </body>
  </html>
  `;
};
