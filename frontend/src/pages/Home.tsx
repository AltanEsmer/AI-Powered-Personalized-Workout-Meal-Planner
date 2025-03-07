import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <header className="bg-gradient-to-r from-primary-700 to-primary-900 text-white">
        <div className="container py-16 md:py-24">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              AI-Powered Personalized Workout & Meal Plans
            </h1>
            <p className="text-xl mb-8">
              Get customized workout routines and meal plans tailored to your goals, preferences, and dietary restrictions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/dashboard" className="btn btn-primary">
                Get Started
              </Link>
              <a href="#features" className="btn bg-white text-primary-800 hover:bg-gray-100">
                Learn More
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section id="features" className="py-16 bg-white">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Personalized Plans</h3>
              <p>Custom workout and meal plans based on your goals, preferences, and restrictions.</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Progress Tracking</h3>
              <p>Monitor your fitness journey with detailed progress tracking and analytics.</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Calendar Integration</h3>
              <p>Schedule your workouts and meals with our easy-to-use calendar integration.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-center mb-12">
              <div className="md:w-1/2 mb-6 md:mb-0 md:pr-8">
                <div className="bg-primary-100 text-primary-800 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  1
                </div>
                <h3 className="text-xl font-semibold mb-2">Tell us about yourself</h3>
                <p>Share your fitness goals, dietary preferences, and any restrictions you may have.</p>
              </div>
              <div className="md:w-1/2 bg-gray-200 h-64 rounded-lg"></div>
            </div>
            <div className="flex flex-col md:flex-row-reverse items-center mb-12">
              <div className="md:w-1/2 mb-6 md:mb-0 md:pl-8">
                <div className="bg-primary-100 text-primary-800 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  2
                </div>
                <h3 className="text-xl font-semibold mb-2">Get your personalized plan</h3>
                <p>Our AI generates a customized workout routine and meal plan tailored to your needs.</p>
              </div>
              <div className="md:w-1/2 bg-gray-200 h-64 rounded-lg"></div>
            </div>
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-6 md:mb-0 md:pr-8">
                <div className="bg-primary-100 text-primary-800 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  3
                </div>
                <h3 className="text-xl font-semibold mb-2">Track your progress</h3>
                <p>Follow your plan and track your progress to stay motivated and achieve your goals.</p>
              </div>
              <div className="md:w-1/2 bg-gray-200 h-64 rounded-lg"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">AI Workout & Meal Planner</h2>
            <p className="mb-6">Your personal fitness and nutrition assistant</p>
            <div className="flex justify-center space-x-4">
              <a href="#" className="hover:text-primary-300">Terms</a>
              <a href="#" className="hover:text-primary-300">Privacy</a>
              <a href="#" className="hover:text-primary-300">Contact</a>
            </div>
            <p className="mt-8 text-gray-400">© {new Date().getFullYear()} AI Workout & Meal Planner. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Home 