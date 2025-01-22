import cors from "cors";
import admin from "firebase-admin";
import { onRequest } from "firebase-functions/v2/https";
import { db } from "./utils/firebase.config.js";
import { mailSender } from "./utils/mailSender.js";

// Initialize Firebase Admin SDK (if not already initialized)
if (!admin.apps.length) {
  admin.initializeApp();
}

const corsHandler = cors({ origin: true });
const matchRole = ["super-owner", "owner", "manager", "promoters", "guard"];
const users = onRequest((request, response) => {
  corsHandler(request, response, async () => {
    const data = request.body;
    const queryData = request.query;

    try {
      // Ensure request data is present
      if (data?.role && data?.email && !queryData?.user_id) {
        if (!matchRole.includes(data.role)) {
          return response.status(200).json({
            message: "Invalid role.",
            success: false,
            status: 400,
          });
        }
        // Create a new user
        const newUser = await admin.auth().createUser({
          email: data.email,
          // password: data.password || "defaultPassword123", // Default password if not provided
          password: data.password || "password123", // Default password if not provided
          displayName: data.displayName || "",
          emailVerified: true, // Automatically verify the email
        });

        // Set custom user claims
        await admin.auth().setCustomUserClaims(newUser.uid, {
          role: data.role, // Default role is 'user'
          company: data.company || null,
          phoneNumber: data.phoneNumber || null,
          super_owner_id: data.super_owner_id || null,
        });
        db.collection("Users")
          .doc(newUser.uid)
          .set({
            uid: newUser.uid,
            email: data.email,
            displayName: data.displayName || null,
            role: data.role, // Default role is 'user'
            company: data.company || null,
            phoneNumber: data.phoneNumber || null,
            super_owner_id: data.super_owner_id,
            photoURL: data.photoURL || null,
            emailVerified: true, // Automatically verify the email
            disabled: false, // Enable the user
            providerData: data.providerData || null,
            customClaims: data.customClaims || null,
            tokensValidAfterTime: data.tokensValidAfterTime || null,
            lastLoginAt: data.lastLoginAt || null,
            createdAt: data.createdAt || null,
          });
        if (data?.password) {
          return response.status(200).json({
            message: "User created successfully.",
            uid: newUser.uid,
            loginType: "password",
            success: true,
          });
        }
        // Generate a login link
        const actionCodeSettings = {
          url: `${config.redirectUrl}/login?uid=${newUser.uid}`,
          handleCodeInApp: true,
        };
        const loginLink = await admin
          .auth()
          .generateSignInWithEmailLink(data.email, actionCodeSettings);

        // Optionally, you can send this link via email using an email service
        // For example, using a third-party email service like SendGrid, SES, etc.

        const res = await mailSender(
          data?.email,
          loginLink,
          "Welcome to NightClub",
          "login"
        );
        // console.log("Email", res);
        if (res.messageId) {
          return response.status(200).json({
            message: "User created successfully.",
            uid: newUser.uid,
            loginType: "email",
            loginLink: loginLink, // Return the login link to the client
            success: true,
          });
        } else {
          admin.auth().deleteUser(newUser.uid);

          return response.status(200).json({
            message: "Email sent not success.",
            success: false,
            status: 400,
          });
          //   delet user
        }
      } else if (queryData?.user_id) {
        // Update user by user ID
        try {
          const userRecord = await admin.auth().getUser(queryData.user_id);

          if (!userRecord) {
            return response.status(404).json({
              error: "User not found.",
            });
          }

          // console.log(data);

          // Proceed with updating the user (if needed)
          await admin.auth().updateUser(queryData.user_id, {
            // email: queryData.email, // Example of updating the email
            displayName: data?.displayName, // Example of updating the display name
          });

          const updatedUser = await admin
            .auth()
            .setCustomUserClaims(queryData.user_id, {
              role: data.role, // Default role is 'user'
              company: data.company,
              phoneNumber: data.phoneNumber,
              super_owner_id: data.super_owner_id,
            });
          db.collection("Users").doc(queryData.user_id).update({
            displayName: data?.displayName,
            role: data.role, // Default role is 'user'
            company: data.company,
            phoneNumber: data.phoneNumber,
            super_owner_id: data.super_owner_id,
          });

          return response.status(200).json({
            message: "User updated successfully.",
            user: updatedUser,
          });
        } catch (error) {
          console.error("Error fetching/updating user:", error);

          if (error.code === "auth/user-not-found") {
            return response.status(404).json({
              error: "User not found.",
            });
          }

          return response.status(500).json({
            error: "An error occurred while updating the user.",
            details: error.message,
          });
        }
      } else if (queryData?.super_owner_id) {
        try {
          // Retrieve all users from Firebase Authentication
          const listUsersResult = await admin.auth().listUsers();

          // Filter users based on `super_owner_id` in their custom claims
          const filteredUsers = listUsersResult.users.filter((userRecord) => {
            const customClaims = userRecord.customClaims || {};
            // console.log(customClaims);
            return customClaims.super_owner_id === queryData.super_owner_id;
          });

          // Return the filtered users
          return response.status(200).json({
            message: "Users retrieved successfully.",
            // alluser: listUsersResult,
            users: filteredUsers.map((user) => ({
              uid: user.uid,
              email: user.email,
              displayName: user.displayName,
              role: user.customClaims?.role,
              company: user.customClaims?.company,
              phoneNumber: user.phoneNumber,
              photoURL: user.photoURL,
            })),
          });
        } catch (error) {
          // dele create user

          console.error("Error retrieving users:", error);
          return response.status(500).json({
            error: "Failed to retrieve users.",
            details: error.message,
          });
        }
      } else {
        return response.status(400).json({
          error: "data [email , passsword] / [owner id] is required.",
        });
      }
    } catch (error) {
      console.error("Error handling request:", error);
      return response.status(500).json({
        error: "An error occurred while processing the request.",
        details: error.message,
      });
    }
  });
});

export default users;
