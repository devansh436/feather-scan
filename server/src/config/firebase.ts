/*
  - configure firebase auth
  - initialise admin and export
*/

import admin from 'firebase-admin';
import fs from 'fs';
let initialized = false;

export const initFirebase = async () => {
  if (initialized || process.env.NODE_ENV === 'test') return;

  const serviceAccountPath =
    process.env.RENDER === "true"
      ? "/etc/secrets/serviceAccountKey.json"
      : "serviceAccountKey.json"; // local fallback  // Initialise firebase app

  let serviceAccountKey;
  if (admin.apps.length === 0) {
    serviceAccountKey = JSON.parse(
      fs.readFileSync(serviceAccountPath, "utf8")
    );
  }

  admin.initializeApp({
    credential: admin.credential.cert(
      serviceAccountKey as admin.ServiceAccount
    ),
  });

  initialized = true;
}

export default admin;