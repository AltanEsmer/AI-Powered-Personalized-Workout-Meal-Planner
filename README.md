# AI-Powered Personalized Workout & Meal Planner

A comprehensive web application that generates personalized workout routines and meal plans based on user preferences, fitness goals, and dietary restrictions using AI technology.

## Features

- **Personalized Plans**: Custom workout and meal plans based on user input
- **User Dashboard**: Track your progress and stay motivated
- **Calendar Integration**: Schedule your workouts and meals
- **Authentication**: Secure user authentication via Google login or email
- **Payment System**: Premium features available for subscribers

## Tech Stack

### Frontend
- React.js with TypeScript
- Tailwind CSS for styling
- Vite for fast development
- React Router for navigation
- Zustand for state management

### Backend
- Node.js with Express
- Firebase Authentication
- Firebase Firestore database
- OpenAI API for AI-powered plan generation
- Stripe for payment processing

## Project Structure

```
├── frontend/               # React frontend
│   ├── public/             # Public assets
│   └── src/                # Source files
│       ├── components/     # Reusable UI components
│       ├── pages/          # Page components
│       ├── styles/         # CSS and Tailwind styles
│       └── utils/          # Utility functions
│
├── backend/                # Express backend
│   └── src/                # Source files
│       ├── routes/         # API route definitions
│       ├── controllers/    # Request handlers
│       ├── models/         # Data models
│       └── middleware/     # Express middleware
│
└── docs/                   # Project documentation
```

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

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
   - Create `.env.local` in the frontend directory
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
