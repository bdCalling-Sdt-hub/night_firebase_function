import cors from "cors";
import admin from "firebase-admin";
import { onRequest } from "firebase-functions/v2/https";

// Initialize Firebase Admin SDK

const corsHandler = cors({ origin: true });

const send_reset_pass = onRequest((request, response) => {
  corsHandler(request, response, async () => {
    const { email } = request.body;

    if (!email) {
      response.status(400).send("Email is required.");
      return;
    }

    try {
      const user = await admin.auth().getUserByEmail(email);

      const actionCodeSettings = {
        url: `https://pushnotifiation-d1bcb.web.app/email-verified?uid=${user.uid}`,
        handleCodeInApp: true,
      };

      const verificationLink = await admin
        .auth()
        .generatePasswordResetLink(email, actionCodeSettings);

      // await mailSender(email, verificationLink);

      response.status(200).send({
        message: "Verification email sent successfully.",
        success: true,
        // verificationLink,
        status: 200,
      });
    } catch (error) {
      if (error?.code === "auth/user-not-found") {
        response.status(404).send({
          message: "User not found.",
          success: false,
          status: 404,
        });
      } else {
        console.error("Error sending verification email:", error);
        response.status(500).send({
          message: "Failed to send verification email.",
          error: error?.message,
          success: false,
          status: 500,
        });
      }
    }
  });
});

export default send_reset_pass;
