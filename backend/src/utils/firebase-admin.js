const admin = require('firebase-admin');
require('dotenv').config();

// Initialize Firebase Admin with environment variables
const initializeFirebaseAdmin = () => {
  // Check if app already initialized
  if (admin.apps.length === 0) {
    try {
      // For production, use environment variables
      if (process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
        const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);
        admin.initializeApp({
          credential: admin.credential.cert(serviceAccount),
          databaseURL: process.env.FIREBASE_DATABASE_URL,
        });
      } 
      // For local development, use a JSON file
      else {
        admin.initializeApp({
          credential: admin.credential.applicationDefault(),
          databaseURL: process.env.FIREBASE_DATABASE_URL,
        });
      }
      
      console.log('Firebase Admin SDK initialized successfully');
    } catch (error) {
      console.error('Error initializing Firebase Admin SDK:', error);
      throw error;
    }
  }
  
  return admin;
};

module.exports = initializeFirebaseAdmin(); 