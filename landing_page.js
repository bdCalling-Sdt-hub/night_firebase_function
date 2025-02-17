import cors from "cors";
import admin from "firebase-admin";
import { onRequest } from "firebase-functions/v2/https";
import { mailSender } from "./utils/mailSender.js";

// Initialize Firebase Admin SDK
if (!admin.apps.length) {
  admin.initializeApp();
}

// Enable CORS
const corsHandler = cors({ origin: true });

/**
 * Cloud Function to retrieve user details by UID (super_owner_id).
 */
const landing_page = onRequest((request, response) => {
  corsHandler(request, response, async () => {
    if (request.method === "GET") {
      try {
        // console.log(request.query);
        // Get super_owner_id from query parameters
        const { user_id, event } = request.query;

        if (!user_id) {
          return response.status(400).json({
            message: "User ID is required.",
            success: false,
            status: 400,
          });
        }

        if (!event) {
          return response.status(400).json({
            message: "Event is required.",
            success: false,
            status: 400,
          });
        }

        //   console.log(super_owner_id, event);

        // Fetch user details from Firebase Authentication;
        const userRecord = (await admin.auth().getUser(user_id)).toJSON();

        if (userRecord?.uid) {
          const snapshot = await admin
            .firestore()
            .collection("Events")
            .doc(event)
            .get();

          const data = snapshot.data();

          if (data) {
            return response.status(200).json({
              message: "Success",
              data: data,
              success: true,
              status: 200,
            });
          } else {
            return response.status(404).json({
              message: "Event not found.",
              success: false,
              status: 404,
            });
          }
        } else {
          return response.status(404).json({
            message: "User not found.",
            success: false,
            status: 404,
          });
        }
      } catch (error) {
        // Handle Firebase Authentication errors
        if (error.code === "auth/user-not-found") {
          return response.status(404).json({
            message: "User not found.",
            success: false,
            status: 404,
          });
        }

        // Internal server error
        return response.status(500).json({
          message: "Internal server error.",
          success: false,
          status: 500,
          error: error.message,
        });
      }
    } else if (request.method === "POST") {
      try {
        const { user_id, data } = request.body;

        if (!user_id) {
          return response.status(400).json({
            message: "User ID is required.",
            success: false,
            status: 400,
          });
        }

        if (!data) {
          return response.status(400).json({
            message: "Data is required.",
            success: false,
            status: 400,
          });
        }
        // find user by user_id
        const userRecord = await admin.auth().getUser(user_id);

        // console.log(userRecord);

        if (userRecord?.uid) {
          data.super_owner_id =
            userRecord?.customClaims?.role == "super-owner"
              ? userRecord.uid
              : userRecord.customClaims?.super_owner_id;
          data.owner_id =
            userRecord?.customClaims?.role == "owner"
              ? userRecord.uid
              : userRecord.customClaims?.owner_id || null;
          data.manager_id =
            userRecord?.customClaims?.role == "manager"
              ? userRecord.uid
              : userRecord.customClaims?.manager_id || null;

          data.added_by = userRecord?.displayName;

          // console.log(data);

          //   add new Guest

          // console.log(data);
          const refDoc = admin.firestore().collection("Guests").doc();
          await refDoc.set({
            id: refDoc.id,
            ...data,
            created_at: admin.firestore.FieldValue.serverTimestamp(),
            updated_at: admin.firestore.FieldValue.serverTimestamp(),
          });

          const Event = await admin
            .firestore()
            .collection("Events")
            .doc(data.event)
            .get();
          const eventData = Event.data();

          await mailSender(
            data.email,
            null,
            `${eventData?.name} book successfully`,
            null,
            `
            <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Event Booking Confirmation</title>
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
    .content ul li {
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
    <div class="header">
      <h1>${eventData?.name} Booked Successfully!</h1>
    </div>
    <div class="content">
      <p>Dear ${data?.name || "User"},</p>
      <p>
        We are excited to inform you that your booking for the event <strong>${
          eventData?.name
        }</strong> has been successfully confirmed. Here are the event details:
      </p>
      <ul >
        <li><strong>Event Name:</strong> ${eventData?.name}</li>
        <li><strong>Date:</strong> ${
          eventData?.date ? new Date(eventData?.date).toString() : "N/A"
        }</li>
     
      </ul>
      <p>
        Please mark your calendar and get ready for an amazing experience!
      </p>
  
    </div>
    <div class="footer">
      <p>© ${new Date().getFullYear()} Nite App | All rights reserved.</p>
    </div>
  </div>
</body>
</html>
`
          );

          return response.status(200).json({
            message: "Guest added successfully.",
            success: true,
            status: 200,
          });
        } else {
          return response.status(404).json({
            message: "User not found.",
            success: false,
            status: 404,
          });
        }
      } catch (error) {
        response.status(500).json({
          message: "Internal server error.",
          success: false,
          status: 500,
          error: error.message,
        });
      }
    }
  });
});

export default landing_page;
