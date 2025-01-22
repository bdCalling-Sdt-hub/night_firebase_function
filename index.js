import * as functions from "firebase-functions";

import { dirname, resolve } from "path";

import admin from "firebase-admin";
import { fileURLToPath } from "url";
import fs from "fs";
// Import other modules
import landing_page from "./landing_page.js";
import send_email_verification from "./send_email_verification.js";
import support from "./support.js";
import users from "./users.js";

// Equivalent of __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Dynamically read firebase.json
const firebaseConfigPath = resolve(__dirname, "../firebase.json");
const firebaseConfig = JSON.parse(fs.readFileSync(firebaseConfigPath, "utf8"));

// Dynamically set host and port
firebaseConfig.emulators = firebaseConfig.emulators || {};
firebaseConfig.emulators.functions = {
  host: process.env.FUNCTIONS_HOST || "10.0.80.14",
  port: parseInt(process.env.FUNCTIONS_PORT || "5001", 10),
};

// Write the updated config to firebase.json
fs.writeFileSync(firebaseConfigPath, JSON.stringify(firebaseConfig, null, 2));
console.log(
  `Updated firebase.json with host: ${firebaseConfig.emulators.functions.host}, port: ${firebaseConfig.emulators.functions.port}`
);

// Export Firebase Functions
export { landing_page, send_email_verification, support, users };
