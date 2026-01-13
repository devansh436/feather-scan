/*
  - configure firebase auth
  - initialise admin and export
*/

import serviceAccount from '../../serviceAccountKey.json';
import admin from 'firebase-admin';

// Initialise firebase app
if (admin.apps.length === 0) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount)
  });
}

export default admin;