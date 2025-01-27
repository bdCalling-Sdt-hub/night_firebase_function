// Import function files
import { onUserCreated, onUserDeleted } from "./authWithFirestore.mjs";

import landing_page from "./landing_page.js";
import send_email_verification from "./send_email_verification.js";
import support from "./support.js";
import users from "./users.js";

// Expose the Firebase functions by assigning them to `exports`
export {
  landing_page,
  onUserCreated,
  onUserDeleted,
  send_email_verification,
  support,
  users,
};
