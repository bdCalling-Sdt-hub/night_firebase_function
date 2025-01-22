import dotenv from "dotenv";

dotenv.config();

export const config = {
  port: process.env.PORT || 3000,
  userEmail: process.env.EMAIL_USER,
  userPassword: process.env.EMAIL_PASS,
};
