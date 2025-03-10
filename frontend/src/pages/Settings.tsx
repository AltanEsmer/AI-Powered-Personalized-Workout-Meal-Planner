import { useState, useEffect } from 'react';
import Layout from '../components/layout/Layout';
import { useAuth } from '../contexts/AuthContext';
import { updateUserSettings, getUserDocument, deleteUserAccount } from '../services/firestore';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Settings = () => {
  const { currentUser, logOut } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [settings, setSettings] = useState({
    emailNotifications: false,
    workoutIntensity: 'medium',
    mealPreferences: {
      calories: '',
      macroPreferences: 'balanced',
    },
    darkMode: false,
    language: 'english',
    measurementSystem: 'metric',
  });

  useEffect(() => {
    // Fetch user settings from Firestore
    const fetchUserSettings = async () => {
      if (currentUser) {
        try {
          const userData = await getUserDocument(currentUser.uid);
          if (userData && userData.settings) {
            setSettings(prevSettings => ({
              ...prevSettings,
              ...userData.settings
            }));
          }
        } catch (error) {
          console.error('Error fetching user settings:', error);
        }
      }
    };
    
    fetchUserSettings();
  }, [currentUser]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    // Handle checkbox inputs
    if (type === 'checkbox') {
      setSettings(prevSettings => ({
        ...prevSettings,
        [name]: checked
      }));
      return;
    }
    
    // Handle nested settings (meal preferences)
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setSettings(prevSettings => ({
        ...prevSettings,
        [parent]: {
          ...prevSettings[parent],
          [child]: value
        }
      }));
      return;
    }
    
    // Handle regular inputs
    setSettings(prevSettings => ({
      ...prevSettings,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Update user settings in Firestore
      await updateUserSettings(currentUser.uid, settings);
      toast.success('Settings updated successfully!');
    } catch (error) {
      console.error('Error updating settings:', error);
      toast.error('Failed to update settings. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (deleteConfirmation !== currentUser.email) {
      toast.error('Email does not match. Account deletion cancelled.');
      return;
    }
    
    setLoading(true);
    try {
      await deleteUserAccount(currentUser);
      await logOut();
      toast.success('Your account has been deleted.');
      navigate('/');
    } catch (error) {
      console.error('Error deleting account:', error);
      toast.error('Failed to delete account. Please try again.');
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Settings</h1>
        
        <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-8">
          <form onSubmit={handleSubmit}>
            <div className="px-4 py-5 sm:p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Notifications</h2>
              <div className="mb-6">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="emailNotifications"
                      name="emailNotifications"
                      type="checkbox"
                      checked={settings.emailNotifications}
                      onChange={handleChange}
                      className="focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300 rounded"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="emailNotifications" className="font-medium text-gray-700">
                      Email Notifications
                    </label>
                    <p className="text-gray-500">Receive emails about your workout plans, meal suggestions, and account updates.</p>
                  </div>
                </div>
              </div>
              
              <hr className="my-6" />
              
              <h2 className="text-lg font-medium text-gray-900 mb-4">Workout Preferences</h2>
              <div className="mb-6">
                <label htmlFor="workoutIntensity" className="block text-sm font-medium text-gray-700">
                  Workout Intensity
                </label>
                <select
                  id="workoutIntensity"
                  name="workoutIntensity"
                  value={settings.workoutIntensity}
                  onChange={handleChange}
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                >
                  <option value="beginner">Beginner</option>
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                  <option value="expert">Expert</option>
                </select>
              </div>
              
              <hr className="my-6" />
              
              <h2 className="text-lg font-medium text-gray-900 mb-4">Meal Preferences</h2>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 mb-6">
                <div>
                  <label htmlFor="mealPreferences.calories" className="block text-sm font-medium text-gray-700">
                    Daily Calories Target
                  </label>
                  <input
                    type="number"
                    name="mealPreferences.calories"
                    id="mealPreferences.calories"
                    value={settings.mealPreferences.calories}
                    onChange={handleChange}
                    placeholder="e.g., 2000"
                    className="mt-1 focus:ring-primary-500 focus:border-primary-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
                
                <div>
                  <label htmlFor="mealPreferences.macroPreferences" className="block text-sm font-medium text-gray-700">
                    Macro Preferences
                  </label>
                  <select
                    id="mealPreferences.macroPreferences"
                    name="mealPreferences.macroPreferences"
                    value={settings.mealPreferences.macroPreferences}
                    onChange={handleChange}
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  >
                    <option value="balanced">Balanced</option>
                    <option value="high_protein">High Protein</option>
                    <option value="low_carb">Low Carb</option>
                    <option value="high_carb">High Carb</option>
                    <option value="keto">Keto</option>
                  </select>
                </div>
              </div>
              
              <hr className="my-6" />
              
              <h2 className="text-lg font-medium text-gray-900 mb-4">App Preferences</h2>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 mb-6">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="darkMode"
                      name="darkMode"
                      type="checkbox"
                      checked={settings.darkMode}
                      onChange={handleChange}
                      className="focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300 rounded"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="darkMode" className="font-medium text-gray-700">
                      Dark Mode
                    </label>
                    <p className="text-gray-500">Use dark theme for the application.</p>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="measurementSystem" className="block text-sm font-medium text-gray-700">
                    Measurement System
                  </label>
                  <select
                    id="measurementSystem"
                    name="measurementSystem"
                    value={settings.measurementSystem}
                    onChange={handleChange}
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  >
                    <option value="metric">Metric (kg, cm)</option>
                    <option value="imperial">Imperial (lb, in)</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="language" className="block text-sm font-medium text-gray-700">
                    Language
                  </label>
                  <select
                    id="language"
                    name="language"
                    value={settings.language}
                    onChange={handleChange}
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  >
                    <option value="english">English</option>
                    <option value="spanish">Spanish</option>
                    <option value="french">French</option>
                    <option value="german">German</option>
                  </select>
                </div>
              </div>
            </div>
            
            <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
              <button
                type="submit"
                disabled={loading}
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50"
              >
                {loading ? 'Saving...' : 'Save Settings'}
              </button>
            </div>
          </form>
        </div>
        
        {/* Danger Zone */}
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h2 className="text-lg font-medium text-red-600 mb-4">Danger Zone</h2>
            
            {!showDeleteConfirm ? (
              <div>
                <p className="text-sm text-gray-500 mb-4">
                  Once you delete your account, there is no going back. Please be certain.
                </p>
                <button
                  type="button"
                  onClick={() => setShowDeleteConfirm(true)}
                  className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Delete Account
                </button>
              </div>
            ) : (
              <div>
                <p className="text-sm text-gray-500 mb-4">
                  Please type your email <strong>{currentUser?.email}</strong> to confirm deletion:
                </p>
                <div className="flex items-center mt-2">
                  <input
                    type="email"
                    value={deleteConfirmation}
                    onChange={(e) => setDeleteConfirmation(e.target.value)}
                    className="focus:ring-red-500 focus:border-red-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md mr-2"
                    placeholder="Enter your email"
                  />
                  <button
                    type="button"
                    onClick={handleDeleteAccount}
                    disabled={loading || deleteConfirmation !== currentUser?.email}
                    className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"
                  >
                    {loading ? 'Processing...' : 'Confirm Delete'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowDeleteConfirm(false);
                      setDeleteConfirmation('');
                    }}
                    className="ml-2 inline-flex items-center justify-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Settings; 