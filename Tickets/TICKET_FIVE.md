## Week 5 – Removing AI & Implementing New Features

### Description  
This week focuses on **removing AI-related features** and transitioning the app into a **curated workout and meal planner** with community-driven elements. Additionally, **new features** such as **progress tracking, gamification, and user-submitted plans** will be introduced.

### Tasks  

#### 1. Remove AI-Related Features  
- **DeepSeek API Removal:**
  - Delete `deepseekAI.ts` and any API calls related to AI-generated workouts or meal plans.
  - Remove AI-related error handling (e.g., Axios request errors, 402 error handling).
- **UI Cleanup:**
  - Remove AI-based plan generation buttons and loading states.
  - Update the dashboard UI to reflect the new curated content approach.
- **Codebase Cleanup:**
  - Remove unused AI-related imports, states, and functions.
  - Ensure no broken references exist in components.

#### 2. Implement Curated Workout & Meal Planner  
- **Database Setup:**
  - Create **predefined workout routines** and **meal plans** stored in Firestore.
  - Each plan should include:
    - **Workout:** Title, description, duration, difficulty, exercises list.
    - **Meal:** Name, ingredients, calories, dietary category (vegan, keto, etc.).
- **Frontend Integration:**
  - Update the dashboard to display **curated workout and meal plans**.
  - Allow users to filter by **difficulty, duration, and dietary preferences**.

#### 3. Enable User-Submitted Plans  
- **User Upload Feature:**
  - Create a UI for users to submit their own workout or meal plans.
  - Store submissions in Firestore with a pending approval status.
  - Admins can review and approve user-submitted content.
- **Community Ratings & Reviews:**
  - Allow users to **rate and review** workouts and meal plans.
  - Display average ratings and user comments on each plan.

#### 4. Implement Progress Tracking  
- **Workout & Meal Logs:**
  - Allow users to log completed workouts and meals.
  - Store logs in Firestore linked to user accounts.
- **Progress Dashboard:**
  - Show graphs and statistics on completed workouts and meals.
  - Use Recharts for visual analytics:
    ```sh
    npm install recharts
    ```

#### 5. Add Gamification Elements  
- **Badges & Achievements:**
  - Reward users with badges for milestones (e.g., "First Workout Logged", "10 Days Streak").
  - Display earned badges in the Profile Page.
- **Leaderboard (Optional):**
  - Show top users based on engagement (completed workouts, submitted plans, etc.).

#### 6. UI & UX Enhancements  
- **Update Dashboard Navigation:**
  - Modify the dashboard to include new sections for **Curated Plans, Progress Tracking, and Community Submissions**.
- **Improve Settings Page:**
  - Ensure dark mode and language preferences apply to new pages.
  - Allow users to **reset progress** if needed.

#### 7. Update Documentation  
- Update **README.md** to reflect:
  - The removal of AI-based features.
  - New curated workout and meal plan structure.
  - User-uploaded plans and progress tracking features.
- Document **database schema** for workouts, meals, and user submissions.

### Acceptance Criteria  
- **AI-related features are fully removed** with no broken components.
- **Curated workout and meal plans are displayed on the dashboard**.
- **Users can submit their own plans**, which are stored and reviewed.
- **Users can log their workouts and meals**, with progress displayed on the dashboard.
- **Gamification (badges, milestones) is implemented and visible in the profile.**
- **Dark mode and language settings persist across new sections.**
- **Documentation is updated to reflect these changes.**

### Notes  
- Ensure **database queries are optimized** to prevent unnecessary reads/writes.
- Implement **secure validation** on user-submitted content to prevent spam.
- Keep UI **consistent and responsive** across all devices.
