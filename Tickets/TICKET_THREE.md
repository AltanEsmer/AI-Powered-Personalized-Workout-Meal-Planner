## Week 3 – User Profile, Settings, Pricing Links & DeepSeek API Integration

### Description  
In Week 3, the focus is on enhancing user experience by implementing a **Profile Page**, **Settings Page**, and fixing **Features & Pricing Links** in the Dashboard. Additionally, integrate **DeepSeek API** to power AI-driven recommendations or functionalities.

### Tasks  

#### 1. Create User Profile Page  
- **UI Implementation:**
  - Design and develop the Profile page in React.
  - Display user information (name, email, profile picture, fitness goals, etc.).
  - Allow users to update their details.
- **Backend Integration:**
  - Store user profile details in Firestore.
  - Implement API endpoints (if necessary) to update user data.
- **Error Handling:**
  - Handle missing or incomplete profile data gracefully.
  - Implement success/error messages for updates.

#### 2. Create Settings Page  
- **UI Implementation:**
  - Design a settings page where users can configure preferences (e.g., workout intensity, dietary restrictions, AI-generated meal/workout plans).
  - Allow users to enable/disable email notifications.
- **Database & Authentication Integration:**
  - Store settings preferences in Firestore.
  - Provide options for users to delete their account.
- **Security & Error Handling:**
  - Ensure authenticated users can only modify their own settings.
  - Handle incorrect inputs and provide clear user feedback.

#### 3. Fix Features & Pricing Links in Dashboard  
- **Bug Fixes:**
  - Ensure Features & Pricing links redirect correctly.
  - Add missing or broken navigation links.
- **UI & UX Enhancements:**
  - Improve visibility of links in the dashboard.
  - Ensure responsiveness and accessibility.
- **Testing:**
  - Manually verify navigation works across all devices.
  - Use React Router to manage navigation properly.

#### 4. Apply DeepSeek API  
- **API Integration:**
  - Research and register for DeepSeek API.
  - Install required package and dependencies:
    ```sh
    npm install axios
    ```
  - Create a utility function to interact with DeepSeek API.
  - Use DeepSeek AI to generate personalized insights (e.g., custom workout plans, meal suggestions, fitness advice).
- **Backend Integration (Optional):**
  - Store AI-generated responses for user history tracking.
  - Optimize API calls to reduce unnecessary requests.
- **Security & Error Handling:**
  - Implement API key security in `.env` file:
    ```
    VITE_DEEPSEEK_API_KEY=your_deepseek_api_key
    ```
  - Handle API failures gracefully.
  - Implement rate-limiting if necessary.

#### 5. Update Documentation  
- Update project README with:
  - User Profile and Settings Page details.
  - DeepSeek API usage.
  - Fixed dashboard navigation links.
  - Troubleshooting guide for potential API errors.

### Acceptance Criteria  
- Fully functional **Profile Page** where users can view and edit personal details.
- Fully functional **Settings Page** for user preferences and notifications.
- **Fixed navigation links** for Features & Pricing in the dashboard.
- **Successfully integrated DeepSeek API** for AI-powered insights.
- Clear documentation on API usage and error handling.

### Notes  
- Keep UI consistent with the existing design.
- Optimize API requests to avoid unnecessary calls.
- Secure API keys and ensure user authentication is applied properly.
- Thoroughly test all new features before pushing to production.