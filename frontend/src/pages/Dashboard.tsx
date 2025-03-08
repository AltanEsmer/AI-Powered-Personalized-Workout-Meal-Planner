import { useState } from 'react'
import { Link } from 'react-router-dom'
import Layout from '../components/layout/Layout'
import { useAuth } from '../contexts/AuthContext'

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('workout')
  const { currentUser } = useAuth()

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
                <p className="text-gray-500 mb-6">You don't have a workout plan yet. Generate one to get started!</p>
                <button className="btn btn-primary">Generate Workout Plan</button>
              </div>
            )}
            
            {activeTab === 'meal' && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Your Meal Plan</h2>
                <p className="text-gray-500 mb-6">You don't have a meal plan yet. Generate one to get started!</p>
                <button className="btn btn-primary">Generate Meal Plan</button>
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