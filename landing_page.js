import admin from "firebase-admin";
import cors from "cors";
import { onRequest } from "firebase-functions/v2/https";

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
        const userRecord = await admin.auth().getUser(user_id);

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
        const userRecord = (await admin.auth().getUser(user_id)).toJSON();

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
          const refDoc = admin.firestore().collection("Guests").doc();
          await refDoc.set({
            id: refDoc.id,
            ...data,
            created_at: admin.firestore.FieldValue.serverTimestamp(),
            updated_at: admin.firestore.FieldValue.serverTimestamp(),
          });
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
