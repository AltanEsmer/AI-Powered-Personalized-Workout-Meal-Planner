# Wireframes & UI Design

## Overview

This document outlines the basic wireframes and UI design for the AI-Powered Workout & Meal Planner application. These wireframes serve as a visual guide for the development team and provide a blueprint for the user interface.

## Color Palette

- **Primary**: #0ea5e9 (Blue)
- **Secondary**: #f97316 (Orange)
- **Accent**: #10b981 (Green)
- **Background**: #f9fafb (Light Gray)
- **Text**: #1f2937 (Dark Gray)
- **Error**: #ef4444 (Red)
- **Success**: #22c55e (Green)

## Typography

- **Headings**: Inter, sans-serif
- **Body**: Inter, sans-serif
- **Accents**: Inter, sans-serif

## Key Pages

### 1. Homepage

```
+-----------------------------------------------+
|  LOGO           MENU                 SIGN IN  |
+-----------------------------------------------+
|                                               |
|  +-------------------------------------------+|
|  |                                           ||
|  |  AI-Powered Personalized                  ||
|  |  Workout & Meal Plans                     ||
|  |                                           ||
|  |  Get customized plans tailored to your    ||
|  |  goals and preferences                    ||
|  |                                           ||
|  |  [GET STARTED]    [LEARN MORE]           ||
|  |                                           ||
|  +-------------------------------------------+|
|                                               |
+-----------------------------------------------+
|                                               |
|  KEY FEATURES                                 |
|                                               |
|  +-------------+  +-------------+  +---------+|
|  | Personalized|  | Progress    |  | Calendar ||
|  | Plans       |  | Tracking    |  | Integr.  ||
|  |             |  |             |  |          ||
|  | Description |  | Description |  | Descript.||
|  +-------------+  +-------------+  +---------+|
|                                               |
+-----------------------------------------------+
|                                               |
|  HOW IT WORKS                                 |
|                                               |
|  1. Tell us about yourself                    |
|  2. Get your personalized plan                |
|  3. Track your progress                       |
|                                               |
+-----------------------------------------------+
|                                               |
|  FOOTER                                       |
|                                               |
+-----------------------------------------------+
```

### 2. User Input Form

```
+-----------------------------------------------+
|  LOGO           MENU                 PROFILE  |
+-----------------------------------------------+
|                                               |
|  TELL US ABOUT YOURSELF                       |
|                                               |
|  +-------------------------------------------+|
|  |                                           ||
|  |  Step 1 of 3: Fitness Goals               ||
|  |                                           ||
|  |  What are your primary fitness goals?     ||
|  |  [ ] Weight Loss                          ||
|  |  [ ] Muscle Gain                          ||
|  |  [ ] Endurance                            ||
|  |  [ ] General Fitness                      ||
|  |                                           ||
|  |  How many days per week can you workout?  ||
|  |  [Dropdown: 1-7]                          ||
|  |                                           ||
|  |  [NEXT]                                   ||
|  |                                           ||
|  +-------------------------------------------+|
|                                               |
+-----------------------------------------------+
|                                               |
|  FOOTER                                       |
|                                               |
+-----------------------------------------------+
```

### 3. Dashboard

```
+-----------------------------------------------+
|  LOGO           MENU                 PROFILE  |
+-----------------------------------------------+
|                                               |
|  DASHBOARD                                    |
|                                               |
|  +-------------+  +-------------+  +---------+|
|  | Today's     |  | Today's     |  | Progress ||
|  | Workout     |  | Meals       |  | Summary  ||
|  |             |  |             |  |          ||
|  | [View]      |  | [View]      |  | [View]   ||
|  +-------------+  +-------------+  +---------+|
|                                               |
|  +-------------------------------------------+|
|  |                                           ||
|  |  Weekly Calendar                          ||
|  |                                           ||
|  |  [M] [T] [W] [T] [F] [S] [S]             ||
|  |   *   *   *                               ||
|  |                                           ||
|  +-------------------------------------------+|
|                                               |
|  +-------------------------------------------+|
|  |                                           ||
|  |  Recent Progress                          ||
|  |                                           ||
|  |  [Chart showing weight/workout progress]  ||
|  |                                           ||
|  +-------------------------------------------+|
|                                               |
+-----------------------------------------------+
|                                               |
|  FOOTER                                       |
|                                               |
+-----------------------------------------------+
```

### 4. Workout Plan View

```
+-----------------------------------------------+
|  LOGO           MENU                 PROFILE  |
+-----------------------------------------------+
|                                               |
|  YOUR WORKOUT PLAN                            |
|                                               |
|  +-------------------------------------------+|
|  |                                           ||
|  |  Monday - Upper Body                      ||
|  |                                           ||
|  |  Exercise 1: Push-ups                     ||
|  |  Sets: 3, Reps: 12                        ||
|  |  [Video Icon] [Mark Complete]             ||
|  |                                           ||
|  |  Exercise 2: Pull-ups                     ||
|  |  Sets: 3, Reps: 8                         ||
|  |  [Video Icon] [Mark Complete]             ||
|  |                                           ||
|  |  Exercise 3: Shoulder Press               ||
|  |  Sets: 3, Reps: 10                        ||
|  |  [Video Icon] [Mark Complete]             ||
|  |                                           ||
|  +-------------------------------------------+|
|                                               |
|  [PREVIOUS DAY]              [NEXT DAY]      |
|                                               |
+-----------------------------------------------+
|                                               |
|  FOOTER                                       |
|                                               |
+-----------------------------------------------+
```

### 5. Meal Plan View

```
+-----------------------------------------------+
|  LOGO           MENU                 PROFILE  |
+-----------------------------------------------+
|                                               |
|  YOUR MEAL PLAN                               |
|                                               |
|  +-------------------------------------------+|
|  |                                           ||
|  |  Monday                                   ||
|  |                                           ||
|  |  Breakfast: Protein Oatmeal               ||
|  |  Ingredients:                             ||
|  |  - 1/2 cup rolled oats                    ||
|  |  - 1 scoop protein powder                 ||
|  |  - 1 tbsp almond butter                   ||
|  |  - 1/2 banana, sliced                     ||
|  |  - Cinnamon to taste                      ||
|  |  Calories: 350, Protein: 25g              ||
|  |  [Recipe] [Mark Complete]                 ||
|  |                                           ||
|  |  Lunch: Chicken Salad                     ||
|  |  ...                                      ||
|  |                                           ||
|  |  Dinner: Salmon with Quinoa               ||
|  |  ...                                      ||
|  |                                           ||
|  +-------------------------------------------+|
|                                               |
|  [PREVIOUS DAY]              [NEXT DAY]      |
|                                               |
+-----------------------------------------------+
|                                               |
|  FOOTER                                       |
|                                               |
+-----------------------------------------------+
```

## Mobile Responsiveness

All pages will be designed with a mobile-first approach, ensuring that the application is fully functional and visually appealing on devices of all sizes.

### Mobile Adaptations

- **Navigation**: Hamburger menu on small screens
- **Layout**: Single column layout on mobile
- **Components**: Stacked cards instead of side-by-side
- **Inputs**: Larger touch targets for better mobile usability

## UI Components

### Common Components

1. **Navigation Bar**
   - Logo
   - Main navigation links
   - User profile/login button

2. **Footer**
   - Copyright information
   - Links to Terms, Privacy, Contact
   - Social media icons

3. **Buttons**
   - Primary (filled)
   - Secondary (outlined)
   - Tertiary (text only)

4. **Cards**
   - Information cards
   - Action cards
   - Progress cards

5. **Forms**
   - Input fields
   - Checkboxes and radio buttons
   - Dropdowns
   - Sliders

6. **Modals**
   - Confirmation dialogs
   - Information popups
   - Form modals

## Next Steps

1. Create high-fidelity mockups in Figma
2. Develop UI component library
3. Implement responsive layouts
4. Test usability with potential users 