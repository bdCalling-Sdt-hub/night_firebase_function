import cors from "cors";
import admin from "firebase-admin";
import { onRequest } from "firebase-functions/v2/https";
import { mailSender } from "./utils/mailSender.js";

// Initialize Firebase Admin SDK

const corsHandler = cors({ origin: true });

const matchRole = ["super-owner", "owner", "manager", "promoters", "guard"];

const send_email_verification = onRequest((request, response) => {
  corsHandler(request, response, async () => {
    const { email, role, company, phoneNumber } = request.body;

    if (!email) {
      response.status(400).send("Email is required.");
      return;
    }

    // console.log(request.body);

    try {
      const user = await admin.auth().getUserByEmail(email);
      // role must me much

      // console.log(role);
      if (!matchRole.includes(role)) {
        response.status(200).send({
          message: "Invalid role.",
          success: false,
          status: 400,
        });
        return;
      }
      user.customClaims = {
        role: role,
        company: company,
        phoneNumber: phoneNumber,
      };
      const claims = await admin
        .auth()
        .setCustomUserClaims(user.uid, user.customClaims);

      // console.log(claims);

      if (!user.emailVerified) {
        const actionCodeSettings = {
          url: `https://pushnotifiation-d1bcb.web.app/email-verified?uid=${user.uid}`,
          handleCodeInApp: true,
        };

        const verificationLink = await admin
          .auth()
          .generateEmailVerificationLink(email, actionCodeSettings);

        await mailSender(email, verificationLink);

        response.status(200).send({
          message: "Verification email sent successfully.",
          success: true,
          // verificationLink,
          claims,
          // user,
          status: 200,
        });
      } else {
        response.status(200).send({
          message: "User is already verified.",
          success: true,
          status: 200,
        });
      }
    } catch (error) {
      if (error?.code === "auth/user-not-found") {
        response.status(404).send({
          message: "User not found.",
          success: false,
          status: 404,
        });
      } else {
        console.error("Error sending verification email:", error);
        response.status(200).send({
          message: "Failed to send verification email. Please try again later.",
          error: error?.message || "Unknown error occurred.",
          details: error?.response?.data || null, // Include raw error details if available
          success: false,
          status: 500,
        });
      }
    }
  });
});

export default send_email_verification;
