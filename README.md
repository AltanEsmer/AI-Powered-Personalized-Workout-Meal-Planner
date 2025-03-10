# Personalized Workout & Meal Planner

A comprehensive web application that provides curated workout routines and meal plans based on user preferences, fitness goals, and dietary restrictions. The platform also includes community-driven content, progress tracking, and gamification elements.

## Features

- **Curated Plans**: Access a variety of pre-defined workout and meal plans
- **User-Submitted Content**: Submit and share your own workout and meal plans with the community
- **Progress Tracking**: Log completed workouts and meals to track your fitness journey
- **Gamification**: Earn badges and achievements as you reach fitness milestones
- **User Dashboard**: Filter plans by difficulty, duration, and dietary preferences
- **User Profile**: Manage your personal information and fitness preferences
- **Settings Page**: Configure application preferences and notification settings
- **Community Ratings**: Rate and review workout and meal plans
- **Authentication**: Secure user authentication via Google login or email
- **Dark Mode**: Toggle between light and dark themes

## Tech Stack

### Frontend
- React.js with TypeScript
- Tailwind CSS for styling
- Vite for fast development
- React Router for navigation
- Zustand for state management
- React Hot Toast for notifications
- Recharts for progress visualization

### Backend
- Firebase Authentication
- Firebase Firestore database
- Cloud Functions for serverless operations

## Project Structure

```
├── frontend/               # React frontend
│   ├── public/             # Public assets
│   └── src/                # Source files
│       ├── components/     # Reusable UI components
│       ├── contexts/       # React contexts (Auth, etc.)
│       ├── pages/          # Page components
│       ├── services/       # API services
│       ├── styles/         # CSS and Tailwind styles
│       └── utils/          # Utility functions
│
├── backend/                # Firebase backend
│   └── src/                # Source files
│       ├── functions/      # Cloud Functions
│       └── utils/          # Utility functions
```

## Database Schema

### Users
- `users/{userId}`
  - `displayName`: string
  - `email`: string
  - `photoURL`: string
  - `fitnessGoals`: string
  - `activityLevel`: string
  - `dietaryRestrictions`: string
  - `weight`: string
  - `height`: string
  - `age`: string
  - `settings`: object
    - `workoutIntensity`: string
    - `enableNotifications`: boolean
    - `darkMode`: boolean
    - `language`: string
    - `measurementSystem`: string

### Workout Plans
- `workoutPlans/{planId}`
  - `title`: string
  - `description`: string
  - `difficulty`: string (beginner, intermediate, advanced)
  - `duration`: string (short, medium, long)
  - `exercises`: array
    - `name`: string
    - `sets`: number
    - `reps`: number
    - `rest`: string
  - `userSubmitted`: boolean
  - `userId`: string (if user-submitted)
  - `status`: string (pending, approved)
  - `avgRating`: number
  - `totalRatings`: number

### Meal Plans
- `mealPlans/{planId}`
  - `name`: string
  - `description`: string
  - `dietaryCategory`: string (vegan, vegetarian, keto, etc.)
  - `meals`: array
    - `name`: string
    - `ingredients`: array of strings
    - `calories`: number
    - `protein`: number
    - `carbs`: number
    - `fat`: number
  - `userSubmitted`: boolean
  - `userId`: string (if user-submitted)
  - `status`: string (pending, approved)
  - `avgRating`: number
  - `totalRatings`: number

### User Progress
- `users/{userId}/progress/stats`
  - `totalWorkouts`: number
  - `totalMeals`: number
  - `workoutStreak`: number
  - `lastWorkoutDate`: timestamp
  - `mealAdherence`: number
  - `updatedAt`: timestamp

### Achievements
- `users/{userId}/achievements/{achievementId}`
  - `title`: string
  - `description`: string
  - `icon`: string
  - `earnedAt`: timestamp

### Logs
- `users/{userId}/workoutLogs/{logId}`
  - `workoutId`: string
  - `completedAt`: timestamp
- `users/{userId}/mealLogs/{logId}`
  - `mealId`: string
  - `completedAt`: timestamp

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Firebase account

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/AI-Powered-Personalized-Workout-Meal-Planner.git
   cd AI-Powered-Personalized-Workout-Meal-Planner
   ```

2. Install frontend dependencies
   ```bash
   cd frontend
   npm install
   ```

3. Install backend dependencies
   ```bash
   cd ../backend
   npm install
   ```

4. Create environment files
   - Create `.env.local` in the frontend directory with the following variables:
     ```
     # API Configuration
     VITE_API_URL=http://localhost:3000/api

     # Firebase Configuration
     VITE_FIREBASE_API_KEY=your_firebase_api_key
     VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
     VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
     VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
     VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
     VITE_FIREBASE_APP_ID=your_firebase_app_id

     # DeepSeek AI
     VITE_DEEPSEEK_API_KEY=your_deepseek_api_key
     ```
   - Create `.env` in the backend directory

5. Start development servers
   ```bash
   # In frontend directory
   npm run dev

   # In backend directory
   npm run dev
   ```

## License

This project is licensed under the MIT License - see the LICENSE file for details.
