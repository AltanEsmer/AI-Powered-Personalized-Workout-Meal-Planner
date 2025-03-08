// Firebase Admin SDK
const admin = require('../utils/firebase-admin');
const db = admin.firestore();

// Controller methods
const userController = {
  // Get user profile
  getUserProfile: async (req, res, next) => {
    try {
      // Get authenticated user ID from middleware
      const { uid } = req.user;
      
      // Get user data from Firestore
      const userDoc = await db.collection('users').doc(uid).get();
      
      if (!userDoc.exists) {
        return res.status(404).json({
          success: false,
          message: 'User profile not found'
        });
      }
      
      res.json({
        success: true,
        data: {
          id: userDoc.id,
          ...userDoc.data()
        }
      });
    } catch (error) {
      next(error);
    }
  },

  // Update user profile
  updateUserProfile: async (req, res, next) => {
    try {
      // Get authenticated user ID from middleware
      const { uid } = req.user;
      const userData = req.body;
      
      // Update user in Firestore
      await db.collection('users').doc(uid).update({
        ...userData,
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
      });
      
      res.json({
        success: true,
        data: {
          id: uid,
          ...userData,
          updatedAt: new Date()
        }
      });
    } catch (error) {
      next(error);
    }
  },

  // Get user preferences
  getUserPreferences: async (req, res, next) => {
    try {
      // Get authenticated user ID from middleware
      const { uid } = req.user;
      
      // Get user preferences from Firestore
      const userDoc = await db.collection('users').doc(uid).get();
      
      if (!userDoc.exists) {
        return res.status(404).json({
          success: false,
          message: 'User profile not found'
        });
      }
      
      const userData = userDoc.data();
      
      // Extract preferences
      const preferences = {
        fitnessGoals: userData.fitnessGoals || [],
        workoutPreferences: userData.workoutPreferences || {},
        dietaryPreferences: userData.dietaryPreferences || {}
      };
      
      res.json({
        success: true,
        data: preferences
      });
    } catch (error) {
      next(error);
    }
  },

  // Update user preferences
  updateUserPreferences: async (req, res, next) => {
    try {
      // Get authenticated user ID from middleware
      const { uid } = req.user;
      const preferencesData = req.body;
      
      // Update user preferences in Firestore
      await db.collection('users').doc(uid).update({
        ...preferencesData,
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
      });
      
      res.json({
        success: true,
        data: {
          ...preferencesData,
          updatedAt: new Date()
        }
      });
    } catch (error) {
      next(error);
    }
  },

  // Get user progress
  getUserProgress: async (req, res, next) => {
    try {
      // Get authenticated user ID from middleware
      const { uid } = req.user;
      
      // Get user progress from Firestore
      const progressSnapshot = await db.collection('userProgress')
        .where('userId', '==', uid)
        .orderBy('date', 'desc')
        .limit(30)
        .get();
      
      const progressData = [];
      progressSnapshot.forEach(doc => {
        progressData.push({
          id: doc.id,
          ...doc.data()
        });
      });
      
      res.json({
        success: true,
        data: progressData
      });
    } catch (error) {
      next(error);
    }
  },

  // Update user progress
  updateUserProgress: async (req, res, next) => {
    try {
      // Get authenticated user ID from middleware
      const { uid } = req.user;
      const progressData = req.body;
      
      // Add user progress to Firestore
      const progressRef = await db.collection('userProgress').add({
        userId: uid,
        ...progressData,
        date: admin.firestore.FieldValue.serverTimestamp()
      });
      
      // Get the newly created document
      const newProgressDoc = await progressRef.get();
      
      res.json({
        success: true,
        data: {
          id: progressRef.id,
          ...newProgressDoc.data()
        }
      });
    } catch (error) {
      next(error);
    }
  }
};

module.exports = userController; 