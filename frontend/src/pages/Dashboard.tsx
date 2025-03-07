import { useState } from 'react'
import { Link } from 'react-router-dom'

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('workout')

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="container py-4 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-primary-600">AI Planner</Link>
          <div className="flex items-center space-x-4">
            <button className="btn btn-secondary">Profile</button>
            <button className="btn btn-primary">Generate New Plan</button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-8">
        <h1 className="text-3xl font-bold mb-8">Your Dashboard</h1>
        
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
  )
}

export default Dashboard 