// The Cloud Functions for Firebase SDK to create Cloud Functions and set up triggers.
import * as functions from "firebase-functions/v1";

import { db } from "./utils/firebase.config.js";

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

export const onUserCreated = functions.auth.user().onCreate(async (user) => {
  // console.info(user);

  db.collection("Users")
    .doc(user.uid)
    .set({
      uid: user.uid,
      email: user?.email,
      displayName: user?.displayName || null,
      role: (await user.customClaims?.role) || "super-owner",
      company: (await user.customClaims?.company) || null,
      phoneNumber: user.phoneNumber || null,
      photoURL: user.photoURL || null,
      emailVerified: user.emailVerified || false,
      disabled: user.disabled || false,
      providerData: user?.providerData || null,
      customClaims: user?.customClaims || null,
      tokensValidAfterTime: user.tokensValidAfterTime || null,
      lastLoginAt: user.lastLoginAt || null,
      createdAt: user.createdAt || null,
    });
});

export const onUserDeleted = functions.auth.user().onDelete((user) => {
  db.collection("Users").doc(user.uid).delete();
});
