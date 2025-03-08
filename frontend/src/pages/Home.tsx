import { Link } from 'react-router-dom'
import Layout from '../components/layout/Layout'
import { useAuth } from '../contexts/AuthContext'

const Home = () => {
  const { currentUser } = useAuth()

  return (
    <Layout>
      <div className="min-h-screen">
        {/* Hero Section */}
        <header className="bg-gradient-to-r from-primary-700 to-primary-900 text-white">
          <div className="container py-16 md:py-24 mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                AI-Powered Personalized Workout & Meal Plans
              </h1>
              <p className="text-xl mb-8">
                Get customized workout routines and meal plans tailored to your goals, preferences, and dietary restrictions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {currentUser ? (
                  <Link to="/dashboard" className="btn btn-primary">
                    Go to Dashboard
                  </Link>
                ) : (
                  <Link to="/signup" className="btn btn-primary">
                    Get Started
                  </Link>
                )}
                <a href="#features" className="btn bg-white text-primary-800 hover:bg-gray-100">
                  Learn More
                </a>
              </div>
            </div>
          </div>
        </header>

        {/* Features Section */}
        <section id="features" className="py-16 bg-white">
          <div className="container mx-auto px-4">
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
          <div className="container mx-auto px-4">
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

        {/* Pricing Section */}
        <section id="pricing" className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Pricing Plans</h2>
            <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8">
              <div className="border rounded-lg p-8 flex flex-col">
                <h3 className="text-xl font-bold mb-4">Free</h3>
                <div className="text-4xl font-bold mb-6">$0<span className="text-lg text-gray-500 font-normal">/month</span></div>
                <ul className="mb-8 flex-grow space-y-3">
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Basic workout plans
                  </li>
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Basic meal suggestions
                  </li>
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Limited progress tracking
                  </li>
                </ul>
                <Link
                  to="/signup"
                  className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  Sign up for free
                </Link>
              </div>

              <div className="border border-primary-500 rounded-lg p-8 flex flex-col relative shadow-lg">
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-primary-600 text-white px-4 py-1 rounded-full text-sm font-bold">
                  POPULAR
                </div>
                <h3 className="text-xl font-bold mb-4">Premium</h3>
                <div className="text-4xl font-bold mb-6">$9.99<span className="text-lg text-gray-500 font-normal">/month</span></div>
                <ul className="mb-8 flex-grow space-y-3">
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Advanced AI-powered workout plans
                  </li>
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Detailed meal plans with recipes
                  </li>
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Comprehensive progress tracking
                  </li>
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Weekly plan adjustments
                  </li>
                </ul>
                <button
                  className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  Get started
                </button>
              </div>

              <div className="border rounded-lg p-8 flex flex-col">
                <h3 className="text-xl font-bold mb-4">Pro</h3>
                <div className="text-4xl font-bold mb-6">$19.99<span className="text-lg text-gray-500 font-normal">/month</span></div>
                <ul className="mb-8 flex-grow space-y-3">
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Everything in Premium
                  </li>
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Personal coach consultation
                  </li>
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Custom exercise videos
                  </li>
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Priority support
                  </li>
                </ul>
                <button
                  className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  Get started
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  )
}

export default Home 