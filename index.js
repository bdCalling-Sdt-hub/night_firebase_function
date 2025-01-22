import fs from "fs";
import firebaseConfig from "../firebase.json" assert { type: "json" };

import landing_page from "./landing_page.js";
import send_email_verification from "./send_email_verification.js";
import support from "./support.js";
import users from "./users.js";

// Dynamically set host and port
firebaseConfig.emulators.functions = {
  host: process.env.FUNCTIONS_HOST || "10.0.80.14",
  port: process.env.FUNCTIONS_PORT || 5001,
};

fs.writeFileSync("../firebase.json", JSON.stringify(firebaseConfig, null, 2));
console.log(
  `Updated firebase.json with host: ${firebaseConfig.emulators.functions.host}, port: ${firebaseConfig.emulators.functions.port}`
);

export {
  landing_page,
  send_email_verification,
  // send_reset_pass,
  support,
  users,
};
