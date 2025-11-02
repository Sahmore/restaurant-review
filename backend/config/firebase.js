const admin = require('firebase-admin');
const path = require('path');

let db;

try {
  // Load from JSON file
  const serviceAccount = require('./serviceAccountKey.json');
  
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: `https://${serviceAccount.project_id}.firebaseio.com`
    });
  }
  
  db = admin.firestore();
  console.log('✅ Firebase Admin initialized successfully!');
  
} catch (error) {
  console.error('❌ Firebase initialization failed:', error.message);
  process.exit(1);
}

module.exports = { admin, db };