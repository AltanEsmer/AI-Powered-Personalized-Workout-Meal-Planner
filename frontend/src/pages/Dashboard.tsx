import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Layout from '../components/layout/Layout'
import { useAuth } from '../contexts/AuthContext'
import { getUserDocument, createWorkoutPlan, createMealPlan } from '../services/firestore'
import deepseekAI from '../services/deepseekAI'
import { toast } from 'react-hot-toast'

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('workout')
  const { currentUser } = useAuth()
  const [loading, setLoading] = useState({
    workout: false,
    meal: false
  })
  const [userProfile, setUserProfile] = useState<any>(null)
  const [userSettings, setUserSettings] = useState<any>(null)

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
      if (currentUser) {
        try {
          const userData = await getUserDocument(currentUser.uid);
          if (userData) {
            setUserProfile(userData);
            setUserSettings(userData.settings || {});
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    };
    
    fetchUserData();
  }, [currentUser]);

  // Generate a workout plan using DeepSeek AI
  const handleGenerateWorkoutPlan = async () => {
    if (!userProfile) {
      toast.error('Please complete your profile first');
      return;
    }

    setLoading(prev => ({ ...prev, workout: true }));
    try {
      // Generate workout plan using DeepSeek AI
      const workoutPlanContent = await deepseekAI.generateWorkoutPlan(userProfile);
      
      // Save to Firestore
      if (currentUser) {
        await createWorkoutPlan(currentUser.uid, {
          content: workoutPlanContent,
          title: `7-Day Workout Plan - ${new Date().toLocaleDateString()}`,
          type: 'ai-generated'
        });
      }
      
      toast.success('Workout plan generated successfully!');
    } catch (error) {
      console.error('Error generating workout plan:', error);
      toast.error('Failed to generate workout plan. Please try again.');
    } finally {
      setLoading(prev => ({ ...prev, workout: false }));
    }
  };

  // Generate a meal plan using DeepSeek AI
  const handleGenerateMealPlan = async () => {
    if (!userProfile) {
      toast.error('Please complete your profile first');
      return;
    }

    setLoading(prev => ({ ...prev, meal: true }));
    try {
      // Generate meal plan using DeepSeek AI
      const mealPlanContent = await deepseekAI.generateMealPlan(userProfile, userSettings);
      
      // Save to Firestore
      if (currentUser) {
        await createMealPlan(currentUser.uid, {
          content: mealPlanContent,
          title: `7-Day Meal Plan - ${new Date().toLocaleDateString()}`,
          type: 'ai-generated'
        });
      }
      
      toast.success('Meal plan generated successfully!');
    } catch (error) {
      console.error('Error generating meal plan:', error);
      toast.error('Failed to generate meal plan. Please try again.');
    } finally {
      setLoading(prev => ({ ...prev, meal: false }));
    }
  };

  return (
    <Layout>
      <div className="bg-gray-50 min-h-screen">
        {/* Dashboard Header */}
        <div className="bg-white shadow">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900">
              {getGreeting()}, {getUserFirstName()}!
            </h1>
          </div>
        </div>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          {/* Quick Stats */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 mb-8">
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-primary-100 rounded-md p-3">
                    <svg className="h-6 w-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Today's Activity</dt>
                      <dd className="flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900">Pending</div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-4 sm:px-6">
                <div className="text-sm">
                  <Link to="/workout" className="font-medium text-primary-600 hover:text-primary-500">
                    View today's workout
                  </Link>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-primary-100 rounded-md p-3">
                    <svg className="h-6 w-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Weekly Progress</dt>
                      <dd className="flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900">3/7 days</div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-4 sm:px-6">
                <div className="text-sm">
                  <Link to="/progress" className="font-medium text-primary-600 hover:text-primary-500">
                    View detailed progress
                  </Link>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-primary-100 rounded-md p-3">
                    <svg className="h-6 w-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Account Status</dt>
                      <dd className="flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900">Free</div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-4 sm:px-6">
                <div className="text-sm">
                  <Link to="/subscription" className="font-medium text-primary-600 hover:text-primary-500">
                    Upgrade your account
                  </Link>
                </div>
              </div>
            </div>
          </div>
          
          {/* Profile Completeness Alert */}
          {!userProfile && (
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-yellow-700">
                    Your profile is incomplete. Please <Link to="/profile" className="font-medium underline text-yellow-700 hover:text-yellow-600">complete your profile</Link> to get personalized workout and meal plans.
                  </p>
                </div>
              </div>
            </div>
          )}
          
          {/* Tabs */}
          <div className="flex border-b mb-6">
            <button 
              className={`px-4 py-2 font-medium ${activeTab === 'workout' ? 'text-primary-600 border-b-2 border-primary-600' : 'text-gray-500'}`}
              onClick={() => setActiveTab('workout')}
            >
              Workout Plan
            </button>
            <button 
              className={`px-4 py-2 font-medium ${activeTab === 'meal' ? 'text-primary-600 border-b-2 border-primary-600' : 'text-gray-500'}`}
              onClick={() => setActiveTab('meal')}
            >
              Meal Plan
            </button>
            <button 
              className={`px-4 py-2 font-medium ${activeTab === 'progress' ? 'text-primary-600 border-b-2 border-primary-600' : 'text-gray-500'}`}
              onClick={() => setActiveTab('progress')}
            >
              Progress
            </button>
          </div>
          
          {/* Tab Content */}
          <div className="bg-white p-6 rounded-lg shadow">
            {activeTab === 'workout' && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Your Workout Plan</h2>
                <p className="text-gray-500 mb-6">Generate a personalized workout plan based on your profile and fitness goals.</p>
                <button 
                  onClick={handleGenerateWorkoutPlan}
                  disabled={loading.workout || !userProfile}
                  className="btn btn-primary bg-primary-600 text-white py-2 px-4 rounded hover:bg-primary-700 disabled:opacity-50"
                >
                  {loading.workout ? 'Generating...' : 'Generate Workout Plan'}
                </button>
              </div>
            )}
            
            {activeTab === 'meal' && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Your Meal Plan</h2>
                <p className="text-gray-500 mb-6">Generate a personalized meal plan based on your profile, dietary preferences, and nutritional goals.</p>
                <button 
                  onClick={handleGenerateMealPlan}
                  disabled={loading.meal || !userProfile}
                  className="btn btn-primary bg-primary-600 text-white py-2 px-4 rounded hover:bg-primary-700 disabled:opacity-50"
                >
                  {loading.meal ? 'Generating...' : 'Generate Meal Plan'}
                </button>
              </div>
            )}
            
            {activeTab === 'progress' && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Your Progress</h2>
                <p className="text-gray-500 mb-6">Start tracking your progress to see your results here.</p>
                <div className="bg-gray-100 h-64 rounded flex items-center justify-center">
                  <p className="text-gray-400">Progress charts will appear here</p>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </Layout>
  )
}

export default Dashboard 