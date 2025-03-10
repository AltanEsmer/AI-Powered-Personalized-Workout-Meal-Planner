import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Layout from '../components/layout/Layout'
import { useAuth } from '../contexts/AuthContext'
import { 
  getUserDocument, 
  getUserWorkoutPlans, 
  getUserMealPlans, 
  getCuratedWorkoutPlans, 
  getCuratedMealPlans,
  submitUserPlan,
  getUserProgress,
  logWorkoutCompletion,
  logMealCompletion,
  getUserAchievements
} from '../services/firestore'
import { toast } from 'react-hot-toast'

// Define interfaces for type safety
interface UserSettings {
  emailNotifications?: boolean;
  workoutIntensity?: string;
  mealPreferences?: {
    calories?: string;
    macroPreferences?: string;
  };
  darkMode?: boolean;
  language?: string;
  measurementSystem?: string;
  [key: string]: any; // Allow for other properties
}

interface UserProfile {
  id: string;
  displayName?: string;
  email?: string;
  photoURL?: string;
  fitnessGoals?: string;
  activityLevel?: string;
  dietaryRestrictions?: string;
  weight?: string;
  height?: string;
  age?: string;
  settings?: UserSettings;
  [key: string]: any; // Allow for other properties
}

interface WorkoutPlan {
  id: string;
  title: string;
  description: string;
  duration: string;
  difficulty: string;
  exercises: Array<{
    name: string;
    sets: number;
    reps: number;
    rest: string;
  }>;
  userSubmitted?: boolean;
  avgRating?: number;
  totalRatings?: number;
}

interface MealPlan {
  id: string;
  name: string;
  description: string;
  dietaryCategory: string;
  meals: Array<{
    name: string;
    ingredients: string[];
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  }>;
  userSubmitted?: boolean;
  avgRating?: number;
  totalRatings?: number;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  earnedAt: Date;
}

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('workout')
  const { currentUser } = useAuth()
  const [loading, setLoading] = useState({
    workout: false,
    meal: false,
    progress: false,
    achievements: false
  })
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [userSettings, setUserSettings] = useState<UserSettings>({
    emailNotifications: false,
    workoutIntensity: 'medium',
    mealPreferences: {
      calories: '',
      macroPreferences: 'balanced',
    },
    darkMode: false,
    language: 'english',
    measurementSystem: 'metric',
  })

  const [curatedWorkoutPlans, setCuratedWorkoutPlans] = useState<WorkoutPlan[]>([])
  const [curatedMealPlans, setCuratedMealPlans] = useState<MealPlan[]>([])
  const [userWorkoutPlans, setUserWorkoutPlans] = useState<WorkoutPlan[]>([])
  const [userMealPlans, setUserMealPlans] = useState<MealPlan[]>([])
  const [showSubmitPlanModal, setShowSubmitPlanModal] = useState(false)
  const [planSubmissionType, setPlanSubmissionType] = useState<'workout'|'meal'>('workout')
  const [userProgress, setUserProgress] = useState<any[]>([])
  const [userAchievements, setUserAchievements] = useState<Achievement[]>([])
  const [filters, setFilters] = useState({
    difficulty: 'all',
    duration: 'all',
    dietaryCategory: 'all'
  })

  // Function to greet user based on time of day
  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Good morning'
    if (hour < 18) return 'Good afternoon'
    return 'Good evening'
  }

  // Get user's first name or display "there"
  const getUserFirstName = () => {
    if (currentUser?.displayName) {
      return currentUser.displayName.split(' ')[0]
    }
    return 'there'
  }

  // Fetch user profile and settings on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      if (currentUser?.uid) {
        setLoading({
          workout: true,
          meal: true,
          progress: true,
          achievements: true
        });
        
        try {
          // Fetch user document
          const userData = await getUserDocument(currentUser.uid);
          if (userData) {
            setUserProfile(userData as UserProfile);
            setUserSettings((userData as UserProfile).settings || {});
          }

          // Fetch all data in parallel for better performance
          const [workoutPlans, mealPlans, userWorkouts, userMeals, progress, achievements] = await Promise.allSettled([
            getCuratedWorkoutPlans(filters.difficulty, filters.duration),
            getCuratedMealPlans(filters.dietaryCategory),
            getUserWorkoutPlans(currentUser.uid),
            getUserMealPlans(currentUser.uid),
            getUserProgress(currentUser.uid),
            getUserAchievements(currentUser.uid)
          ]);

          // Set data based on promise results
          if (workoutPlans.status === 'fulfilled') {
            setCuratedWorkoutPlans(workoutPlans.value as WorkoutPlan[]);
          }
          
          if (mealPlans.status === 'fulfilled') {
            setCuratedMealPlans(mealPlans.value as MealPlan[]);
          }
          
          if (userWorkouts.status === 'fulfilled') {
            setUserWorkoutPlans(userWorkouts.value as WorkoutPlan[]);
          }
          
          if (userMeals.status === 'fulfilled') {
            setUserMealPlans(userMeals.value as MealPlan[]);
          }
          
          if (progress.status === 'fulfilled') {
            setUserProgress(progress.value);
          }
          
          if (achievements.status === 'fulfilled') {
            setUserAchievements(achievements.value as Achievement[]);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          toast.error("Some data couldn't be loaded. Please refresh to try again.");
        } finally {
          setLoading({
            workout: false,
            meal: false,
            progress: false,
            achievements: false
          });
        }
      }
    };

    fetchUserData();
  }, [currentUser, filters]);

  const handleFilterChange = (filterType: string, value: string) => {
    setFilters({
      ...filters,
      [filterType]: value
    });
  };

  const handleSubmitPlan = (type: 'workout' | 'meal') => {
    setPlanSubmissionType(type);
    setShowSubmitPlanModal(true);
  };

  const handlePlanSubmission = async (planData: any) => {
    try {
      if (!currentUser?.uid) return;
      
      await submitUserPlan(currentUser.uid, planData, planSubmissionType);
      toast.success(`Your ${planSubmissionType} plan has been submitted for review`);
      setShowSubmitPlanModal(false);
      
      // Refresh user plans
      if (planSubmissionType === 'workout') {
        const userWorkouts = await getUserWorkoutPlans(currentUser.uid);
        setUserWorkoutPlans(userWorkouts as WorkoutPlan[]);
      } else {
        const userMeals = await getUserMealPlans(currentUser.uid);
        setUserMealPlans(userMeals as MealPlan[]);
      }
    } catch (error) {
      console.error("Error submitting plan:", error);
      toast.error("Failed to submit plan");
    }
  };

  const handleLogCompletion = async (planId: string, type: 'workout' | 'meal') => {
    try {
      if (!currentUser?.uid) {
        toast.error("Please sign in to log completion");
        return;
      }
      
      // Add loading state
      setLoading({
        ...loading,
        [type]: true
      });
      
      let success = false;
      
      if (type === 'workout') {
        success = await logWorkoutCompletion(currentUser.uid, planId);
        if (success) {
          toast.success("Workout logged successfully");
        }
      } else {
        success = await logMealCompletion(currentUser.uid, planId);
        if (success) {
          toast.success("Meal logged successfully");
        }
      }
      
      if (success) {
        // Refresh progress data - use local data if database fetch fails
        try {
          const progress = await getUserProgress(currentUser.uid);
          setUserProgress(progress);
        } catch (progressError) {
          console.warn("Error fetching updated progress, using local update", progressError);
          // Update progress locally
          setUserProgress(prevProgress => {
            if (prevProgress.length === 0) {
              return [{
                totalWorkouts: type === 'workout' ? 1 : 0,
                totalMeals: type === 'meal' ? 1 : 0,
                workoutStreak: type === 'workout' ? 1 : 0,
                mealAdherence: type === 'meal' ? 5 : 0,
              }];
            }
            
            const updatedProgress = [...prevProgress];
            if (type === 'workout') {
              updatedProgress[0].totalWorkouts = (updatedProgress[0].totalWorkouts || 0) + 1;
              updatedProgress[0].workoutStreak = (updatedProgress[0].workoutStreak || 0) + 1;
            } else {
              updatedProgress[0].totalMeals = (updatedProgress[0].totalMeals || 0) + 1;
              updatedProgress[0].mealAdherence = Math.min(100, ((updatedProgress[0].totalMeals || 0) / 21) * 100);
            }
            return updatedProgress;
          });
        }
        
        // Refresh achievements - use mock data if database fetch fails
        try {
          const achievements = await getUserAchievements(currentUser.uid);
          setUserAchievements(achievements as Achievement[]);
        } catch (achievementError) {
          console.warn("Error fetching updated achievements", achievementError);
          // Don't update achievements locally - we'll show what we have
        }
      }
      
      // Clear loading state
      setLoading({
        ...loading,
        [type]: false
      });
      
    } catch (error) {
      console.error("Error logging completion:", error);
      toast.error("Failed to log completion");
      setLoading({
        ...loading,
        [type]: false
      });
    }
  };

  return (
    <Layout>
      <div className="dashboard-container p-4">
        <div className="header mb-6">
          <h1 className="text-2xl font-bold">{getGreeting()} {getUserFirstName()}</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Welcome to your fitness dashboard
          </p>
        </div>

        {/* Dashboard Navigation Tabs */}
        <div className="tab-navigation mb-6 border-b border-gray-200 dark:border-gray-700">
          <ul className="flex flex-wrap -mb-px">
            <li className="mr-2">
              <button 
                className={`inline-block p-4 ${activeTab === 'workout' ? 
                  'text-blue-600 border-b-2 border-blue-600 dark:text-blue-500 dark:border-blue-500' : 
                  'text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300'}`}
                onClick={() => setActiveTab('workout')}
              >
                Workout Plans
              </button>
            </li>
            <li className="mr-2">
              <button 
                className={`inline-block p-4 ${activeTab === 'meal' ? 
                  'text-blue-600 border-b-2 border-blue-600 dark:text-blue-500 dark:border-blue-500' : 
                  'text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300'}`}
                onClick={() => setActiveTab('meal')}
              >
                Meal Plans
              </button>
            </li>
            <li className="mr-2">
              <button 
                className={`inline-block p-4 ${activeTab === 'progress' ? 
                  'text-blue-600 border-b-2 border-blue-600 dark:text-blue-500 dark:border-blue-500' : 
                  'text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300'}`}
                onClick={() => setActiveTab('progress')}
              >
                Progress Tracking
              </button>
            </li>
            <li className="mr-2">
              <button 
                className={`inline-block p-4 ${activeTab === 'community' ? 
                  'text-blue-600 border-b-2 border-blue-600 dark:text-blue-500 dark:border-blue-500' : 
                  'text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300'}`}
                onClick={() => setActiveTab('community')}
              >
                Community
              </button>
            </li>
            <li className="mr-2">
              <button 
                className={`inline-block p-4 ${activeTab === 'achievements' ? 
                  'text-blue-600 border-b-2 border-blue-600 dark:text-blue-500 dark:border-blue-500' : 
                  'text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300'}`}
                onClick={() => setActiveTab('achievements')}
              >
                Achievements
              </button>
            </li>
          </ul>
        </div>

        {/* Content area */}
        <div className="content-area">
          {activeTab === 'workout' && (
            <div className="workout-plans">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Curated Workout Plans</h2>
                <div className="filters flex gap-2">
                  <select 
                    className="p-2 border rounded dark:bg-gray-800 dark:border-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    onChange={(e) => handleFilterChange('difficulty', e.target.value)}
                    value={filters.difficulty}
                  >
                    <option value="all">All Difficulties</option>
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                  <select 
                    className="p-2 border rounded dark:bg-gray-800 dark:border-gray-700"
                    onChange={(e) => handleFilterChange('duration', e.target.value)}
                    value={filters.duration}
                  >
                    <option value="all">All Durations</option>
                    <option value="short">Short (&lt; 30 min)</option>
                    <option value="medium">Medium (30-60 min)</option>
                    <option value="long">Long (&gt; 60 min)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                {curatedWorkoutPlans.map((plan) => (
                  <div key={plan.id} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow hover:shadow-lg transition-shadow duration-300 border-l-4 border-indigo-500">
                    <h3 className="text-lg font-semibold mb-2 text-indigo-700 dark:text-indigo-300">{plan.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{plan.description}</p>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm bg-indigo-100 dark:bg-indigo-900 px-2 py-1 rounded text-indigo-800 dark:text-indigo-200">
                        {plan.difficulty}
                      </span>
                      <span className="text-sm bg-emerald-100 dark:bg-emerald-900 px-2 py-1 rounded text-emerald-800 dark:text-emerald-200">
                        {plan.duration}
                      </span>
                    </div>
                    {plan.avgRating && (
                      <div className="flex items-center mb-2">
                        <span className="text-amber-500">★</span>
                        <span className="ml-1 text-sm">{plan.avgRating.toFixed(1)} ({plan.totalRatings} ratings)</span>
                      </div>
                    )}
                    <div className="flex justify-between mt-3">
                      <button 
                        className={`bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white px-3 py-1 rounded transition-all duration-200 shadow-md hover:shadow-lg ${loading.workout ? 'opacity-50 cursor-wait' : ''}`}
                        onClick={() => handleLogCompletion(plan.id, 'workout')}
                        disabled={loading.workout}
                      >
                        {loading.workout ? (
                          <span className="flex items-center">
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Logging...
                          </span>
                        ) : "Log Completion"}
                      </button>
                      <Link to={`/workout/${plan.id}`} className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 hover:underline">
                        View Details
                      </Link>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Your Workout Plans</h2>
                <button 
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded transition-colors duration-200 shadow-sm"
                  onClick={() => handleSubmitPlan('workout')}
                >
                  Submit New Plan
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {userWorkoutPlans.map((plan) => (
                  <div key={plan.id} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow hover:shadow-lg transition-shadow duration-300 border border-indigo-200 dark:border-indigo-900">
                    <div className="flex justify-between items-start">
                      <h3 className="text-lg font-semibold mb-2 text-indigo-700 dark:text-indigo-300">{plan.title}</h3>
                      <span className="bg-amber-100 dark:bg-amber-900 text-xs px-2 py-1 rounded text-amber-800 dark:text-amber-200">
                        {plan.userSubmitted ? 'Your Submission' : 'Saved Plan'}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{plan.description}</p>
                    <div className="flex justify-between mt-3">
                      <button 
                        className={`bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white px-3 py-1 rounded transition-all duration-200 shadow-md hover:shadow-lg ${loading.workout ? 'opacity-50 cursor-wait' : ''}`}
                        onClick={() => handleLogCompletion(plan.id, 'workout')}
                        disabled={loading.workout}
                      >
                        {loading.workout ? (
                          <span className="flex items-center">
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Logging...
                          </span>
                        ) : "Log Completion"}
                      </button>
                      <Link to={`/workout/${plan.id}`} className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 hover:underline">
                        View Details
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'meal' && (
            <div className="meal-plans">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Curated Meal Plans</h2>
                <div className="filters">
                  <select 
                    className="p-2 border rounded dark:bg-gray-800 dark:border-gray-700 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    onChange={(e) => handleFilterChange('dietaryCategory', e.target.value)}
                    value={filters.dietaryCategory}
                  >
                    <option value="all">All Diets</option>
                    <option value="vegan">Vegan</option>
                    <option value="vegetarian">Vegetarian</option>
                    <option value="keto">Keto</option>
                    <option value="paleo">Paleo</option>
                    <option value="balanced">Balanced</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                {curatedMealPlans.map((plan) => (
                  <div key={plan.id} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow hover:shadow-lg transition-shadow duration-300 border-l-4 border-purple-500">
                    <h3 className="text-lg font-semibold mb-2 text-purple-700 dark:text-purple-300">{plan.name}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{plan.description}</p>
                    <div className="mb-2">
                      <span className="text-sm bg-purple-100 dark:bg-purple-900 px-2 py-1 rounded text-purple-800 dark:text-purple-200">
                        {plan.dietaryCategory}
                      </span>
                    </div>
                    {plan.avgRating && (
                      <div className="flex items-center mb-2">
                        <span className="text-amber-500">★</span>
                        <span className="ml-1 text-sm">{plan.avgRating.toFixed(1)} ({plan.totalRatings} ratings)</span>
                      </div>
                    )}
                    <div className="flex justify-between mt-3">
                      <button 
                        className={`bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-3 py-1 rounded transition-all duration-200 shadow-md hover:shadow-lg ${loading.meal ? 'opacity-50 cursor-wait' : ''}`}
                        onClick={() => handleLogCompletion(plan.id, 'meal')}
                        disabled={loading.meal}
                      >
                        {loading.meal ? (
                          <span className="flex items-center">
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Logging...
                          </span>
                        ) : "Log Completion"}
                      </button>
                      <Link to={`/meal/${plan.id}`} className="text-purple-600 hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-300 hover:underline">
                        View Details
                      </Link>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Your Meal Plans</h2>
                <button 
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded transition-colors duration-200 shadow-sm"
                  onClick={() => handleSubmitPlan('meal')}
                >
                  Submit New Plan
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {userMealPlans.map((plan) => (
                  <div key={plan.id} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow hover:shadow-lg transition-shadow duration-300 border border-purple-200 dark:border-purple-900">
                    <div className="flex justify-between items-start">
                      <h3 className="text-lg font-semibold mb-2 text-purple-700 dark:text-purple-300">{plan.name}</h3>
                      <span className="bg-amber-100 dark:bg-amber-900 text-xs px-2 py-1 rounded text-amber-800 dark:text-amber-200">
                        {plan.userSubmitted ? 'Your Submission' : 'Saved Plan'}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{plan.description}</p>
                    <div className="flex justify-between mt-3">
                      <button 
                        className={`bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-3 py-1 rounded transition-all duration-200 shadow-md hover:shadow-lg ${loading.meal ? 'opacity-50 cursor-wait' : ''}`}
                        onClick={() => handleLogCompletion(plan.id, 'meal')}
                        disabled={loading.meal}
                      >
                        {loading.meal ? (
                          <span className="flex items-center">
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Logging...
                          </span>
                        ) : "Log Completion"}
                      </button>
                      <Link to={`/meal/${plan.id}`} className="text-purple-600 hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-300 hover:underline">
                        View Details
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'progress' && (
            <div className="progress-tracking">
              <h2 className="text-xl font-semibold mb-4 text-indigo-700 dark:text-indigo-300">Your Progress</h2>
              
              {loading.progress ? (
                <div className="flex justify-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                </div>
              ) : userProgress.length > 0 ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow border-t-4 border-indigo-500">
                    <h3 className="font-medium mb-3 text-indigo-700 dark:text-indigo-300">Workout Completion History</h3>
                    <div className="h-64">
                      {/* Recharts will be implemented here */}
                      <div className="flex h-full items-center justify-center">
                        <p>Chart will be displayed here</p>
                      </div>
                    </div>
                    <div className="mt-3">
                      <p className="text-sm">
                        Recent streak: <span className="font-semibold">{userProgress[0]?.workoutStreak || 0} days</span>
                      </p>
                      <p className="text-sm">
                        Total workouts: <span className="font-semibold">{userProgress[0]?.totalWorkouts || 0}</span>
                      </p>
                    </div>
                  </div>
                  
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow border-t-4 border-purple-500">
                    <h3 className="font-medium mb-3 text-purple-700 dark:text-purple-300">Meal Plan Adherence</h3>
                    <div className="h-64">
                      {/* Recharts will be implemented here */}
                      <div className="flex h-full items-center justify-center">
                        <p>Chart will be displayed here</p>
                      </div>
                    </div>
                    <div className="mt-3">
                      <p className="text-sm">
                        Diet adherence: <span className="font-semibold">{userProgress[0]?.mealAdherence || 0}%</span>
                      </p>
                      <p className="text-sm">
                        Logged meals: <span className="font-semibold">{userProgress[0]?.totalMeals || 0}</span>
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow text-center border border-dashed border-indigo-300 dark:border-indigo-700">
                  <p>No progress data yet. Start logging your workouts and meals to track your progress!</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'community' && (
            <div className="community">
              <h2 className="text-xl font-semibold mb-4 text-indigo-700 dark:text-indigo-300">Community Submissions</h2>
              
              <div className="mb-6">
                <h3 className="font-medium mb-3 text-indigo-700 dark:text-indigo-300">Top Rated Workout Plans</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {curatedWorkoutPlans
                    .filter(plan => plan.userSubmitted)
                    .sort((a, b) => (b.avgRating || 0) - (a.avgRating || 0))
                    .slice(0, 3)
                    .map(plan => (
                      <div key={plan.id} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow border-l-4 border-indigo-500">
                        <h4 className="font-semibold text-indigo-700 dark:text-indigo-300">{plan.title}</h4>
                        <div className="flex items-center my-1">
                          <span className="text-amber-500">★</span>
                          <span className="ml-1 text-sm">{plan.avgRating?.toFixed(1) || '0.0'}</span>
                        </div>
                        <Link to={`/workout/${plan.id}`} className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 text-sm hover:underline">
                          View Details
                        </Link>
                      </div>
                    ))}
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-3 text-purple-700 dark:text-purple-300">Top Rated Meal Plans</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {curatedMealPlans
                    .filter(plan => plan.userSubmitted)
                    .sort((a, b) => (b.avgRating || 0) - (a.avgRating || 0))
                    .slice(0, 3)
                    .map(plan => (
                      <div key={plan.id} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow border-l-4 border-purple-500">
                        <h4 className="font-semibold text-purple-700 dark:text-purple-300">{plan.name}</h4>
                        <div className="flex items-center my-1">
                          <span className="text-amber-500">★</span>
                          <span className="ml-1 text-sm">{plan.avgRating?.toFixed(1) || '0.0'}</span>
                        </div>
                        <Link to={`/meal/${plan.id}`} className="text-purple-600 hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-300 text-sm hover:underline">
                          View Details
                        </Link>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'achievements' && (
            <div className="achievements">
              <h2 className="text-xl font-semibold mb-4 text-indigo-700 dark:text-indigo-300">Your Achievements</h2>
              
              {loading.achievements ? (
                <div className="flex justify-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                </div>
              ) : userAchievements.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {userAchievements.map(achievement => (
                    <div key={achievement.id} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow text-center hover:shadow-lg transition-shadow duration-300 border-t-4 border-amber-500">
                      <div className="achievement-icon text-4xl mb-2">
                        {achievement.icon}
                      </div>
                      <h3 className="font-semibold text-amber-700 dark:text-amber-300">{achievement.title}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{achievement.description}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
                        Earned on {achievement.earnedAt.toLocaleDateString()}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow text-center border border-dashed border-amber-300 dark:border-amber-700">
                  <p>No achievements yet. Complete workouts and meals to earn badges!</p>
                  <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="p-3 border border-dashed rounded-lg text-center text-gray-400 hover:border-amber-400 transition-colors duration-200">
                      <div className="text-3xl mb-2">🏃</div>
                      <p className="font-medium">First Workout</p>
                    </div>
                    <div className="p-3 border border-dashed rounded-lg text-center text-gray-400 hover:border-amber-400 transition-colors duration-200">
                      <div className="text-3xl mb-2">🥗</div>
                      <p className="font-medium">Healthy Eater</p>
                    </div>
                    <div className="p-3 border border-dashed rounded-lg text-center text-gray-400 hover:border-amber-400 transition-colors duration-200">
                      <div className="text-3xl mb-2">🔥</div>
                      <p className="font-medium">7 Day Streak</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Plan Submission Modal */}
      {showSubmitPlanModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-semibold mb-4 text-indigo-700 dark:text-indigo-300">Submit New {planSubmissionType === 'workout' ? 'Workout' : 'Meal'} Plan</h2>
            
            <form onSubmit={(e) => {
              e.preventDefault();
              // Form handling logic will be implemented here
              const formData = new FormData(e.target as HTMLFormElement);
              const planData = Object.fromEntries(formData.entries());
              handlePlanSubmission(planData);
            }}>
              {/* Form fields will be added here based on plan type */}
              {planSubmissionType === 'workout' ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Title</label>
                    <input type="text" name="title" className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Description</label>
                    <textarea name="description" rows={3} className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600" required></textarea>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Difficulty</label>
                      <select name="difficulty" className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600" required>
                        <option value="">Select difficulty</option>
                        <option value="beginner">Beginner</option>
                        <option value="intermediate">Intermediate</option>
                        <option value="advanced">Advanced</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Duration</label>
                      <select name="duration" className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600" required>
                        <option value="">Select duration</option>
                        <option value="short">Short (&lt; 30 min)</option>
                        <option value="medium">Medium (30-60 min)</option>
                        <option value="long">Long (&gt; 60 min)</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Exercises (one per line, format: name, sets, reps, rest)</label>
                    <textarea name="exercises" rows={5} className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600" placeholder="Pushups, 3, 10, 60s" required></textarea>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Meal Plan Name</label>
                    <input type="text" name="name" className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Description</label>
                    <textarea name="description" rows={3} className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600" required></textarea>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Dietary Category</label>
                    <select name="dietaryCategory" className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600" required>
                      <option value="">Select category</option>
                      <option value="vegan">Vegan</option>
                      <option value="vegetarian">Vegetarian</option>
                      <option value="keto">Keto</option>
                      <option value="paleo">Paleo</option>
                      <option value="balanced">Balanced</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Meals (JSON format)</label>
                    <textarea name="meals" rows={8} className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600" 
                      placeholder='[{"name": "Breakfast", "ingredients": ["Oats", "Banana", "Almond milk"], "calories": 350, "protein": 12, "carbs": 55, "fat": 8}]'
                      required></textarea>
                  </div>
                </div>
              )}
              
              <div className="flex justify-end gap-3 mt-6">
                <button 
                  type="button" 
                  className="px-4 py-2 bg-gray-300 hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-600 rounded transition-colors duration-200"
                  onClick={() => setShowSubmitPlanModal(false)}
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded transition-colors duration-200"
                >
                  Submit Plan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </Layout>
  )
}

export default Dashboard 