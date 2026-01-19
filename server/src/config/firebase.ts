/*
  - configure firebase auth
  - initialise admin and export
*/

import admin from 'firebase-admin';

let initialized = false;

export const initFirebase = async () => {
  if (initialized || process.env.NODE_ENV === 'test') return;

  const serviceAccountKey = require('../../serviceAccountKey.json');
  // Initialise firebase app
  admin.initializeApp({
    credential: admin.credential.cert(
      serviceAccountKey as admin.ServiceAccount
    ),
  });

  initialized = true;
}

export default admin;