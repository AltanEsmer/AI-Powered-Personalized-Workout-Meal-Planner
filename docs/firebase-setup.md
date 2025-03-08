# Firebase Setup Guide

This document outlines the steps to set up Firebase Authentication and Firestore for the AI-Powered Workout & Meal Planner application.

## Firebase Project Setup

1. Go to the [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" and follow the steps to create a new project
3. Give your project a name (e.g., "AI Workout Meal Planner")
4. Enable Google Analytics if desired
5. Click "Create project"

## Authentication Setup

1. In the Firebase Console, navigate to your project
2. Click on "Authentication" in the left sidebar
3. Click on "Get started"
4. Enable the following sign-in methods:
   - Email/Password
   - Google
5. Configure the OAuth consent screen for Google Sign-In

## Firestore Database Setup

1. In the Firebase Console, navigate to your project
2. Click on "Firestore Database" in the left sidebar
3. Click on "Create database"
4. Start in production mode or test mode (you can change this later)
5. Choose a database location close to your users

## Security Rules

Set up the following security rules for Firestore:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow authenticated users to read and write their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    match /workoutPlans/{planId} {
      allow read, write: if request.auth != null && request.auth.uid == resource.data.userId;
      allow create: if request.auth != null && request.auth.uid == request.resource.data.userId;
    }
    
    match /mealPlans/{planId} {
      allow read, write: if request.auth != null && request.auth.uid == resource.data.userId;
      allow create: if request.auth != null && request.auth.uid == request.resource.data.userId;
    }
    
    match /userProgress/{progressId} {
      allow read, write: if request.auth != null && request.auth.uid == resource.data.userId;
      allow create: if request.auth != null && request.auth.uid == request.resource.data.userId;
    }
  }
}
```

## Web App Configuration

1. In the Firebase Console, navigate to your project
2. Click on the gear icon (⚙️) next to "Project Overview" and select "Project settings"
3. Scroll down to "Your apps" section
4. Click on the web icon (</>) to add a web app
5. Register your app with a nickname (e.g., "AI Workout Meal Planner Web")
6. Copy the Firebase configuration object

## Environment Variables

### Frontend (.env.local)

Create a `.env.local` file in the frontend directory with the following variables:

```
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_API_URL=http://localhost:5000/api
```

### Backend (.env)

Create a `.env` file in the backend directory with the following variables:

```
PORT=5000
NODE_ENV=development
FIREBASE_DATABASE_URL=https://your_project_id.firebaseio.com
```

For the service account key:

1. In the Firebase Console, go to Project settings
2. Navigate to the "Service accounts" tab
3. Click "Generate new private key"
4. Save the JSON file securely
5. Either set the path to this file in your environment or convert it to a string for the `FIREBASE_SERVICE_ACCOUNT_KEY` variable

## Database Schema

### Collections

1. **users**
   - User profiles and preferences
   - Document ID: Firebase Auth UID

2. **workoutPlans**
   - Workout plans generated for users
   - Fields: userId, name, description, days (array), createdAt, updatedAt

3. **mealPlans**
   - Meal plans generated for users
   - Fields: userId, name, description, days (array), createdAt, updatedAt

4. **userProgress**
   - User progress tracking data
   - Fields: userId, date, weight, measurements, workoutCompleted, etc.

## Common Issues and Solutions

### CORS Issues
- Ensure your backend has CORS middleware properly configured
- Check that the origin in your CORS configuration matches your frontend URL

### Authentication Errors
- Verify that your Firebase configuration is correct
- Check that the user is properly signed in before accessing protected resources
- Ensure the ID token is being sent with requests to the backend

### Firestore Permission Denied
- Check your security rules to ensure they allow the operations you're trying to perform
- Verify that the user is authenticated and has the correct permissions
- Make sure document paths and field names match your security rules 