import axios from 'axios';

const DEEPSEEK_API_KEY = import.meta.env.VITE_DEEPSEEK_API_KEY;
const DEEPSEEK_API_URL = 'https://api.deepseek.com';

// Type definitions for DeepSeek API requests and responses
interface DeepSeekRequestOptions {
  model: string;
  messages: Array<{
    role: 'system' | 'user' | 'assistant';
    content: string;
  }>;
  temperature?: number;
  max_tokens?: number;
}

interface DeepSeekResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: Array<{
    index: number;
    message: {
      role: string;
      content: string;
    };
    finish_reason: string;
  }>;
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

// Configure axios instance for DeepSeek API
const deepseekApi = axios.create({
  baseURL: DEEPSEEK_API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${DEEPSEEK_API_KEY}`
  }
});

/**
 * Generate personalized workout plan based on user preferences
 * @param userProfile User profile data
 * @returns Generated workout plan
 */
export const generateWorkoutPlan = async (userProfile: any): Promise<string> => {
  try {
    const prompt = `
      Create a personalized 7-day workout plan for a user with the following profile:
      - Age: ${userProfile.age || 'Not specified'}
      - Weight: ${userProfile.weight || 'Not specified'} kg
      - Height: ${userProfile.height || 'Not specified'} cm
      - Fitness Goals: ${userProfile.fitnessGoals || 'General fitness'}
      - Activity Level: ${userProfile.activityLevel || 'Moderate'}

      Please structure the plan with:
      1. A brief introduction explaining the benefits of this plan for their specific goals
      2. Daily workouts with exercise names, sets, reps, and rest periods
      3. Warm-up and cool-down recommendations
      4. Weekly progression suggestions
    `;

    const options: DeepSeekRequestOptions = {
      model: 'deepseek-chat',
      messages: [
        {
          role: 'system',
          content: 'You are an expert fitness trainer who creates personalized workout plans based on user profiles.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 2000
    };

    const response = await deepseekApi.post<DeepSeekResponse>('/v1/chat/completions', options);
    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('Error generating workout plan:', error);
    throw new Error('Failed to generate workout plan. Please try again later.');
  }
};

/**
 * Generate personalized meal plan based on user preferences
 * @param userProfile User profile data
 * @param settings User settings
 * @returns Generated meal plan
 */
export const generateMealPlan = async (userProfile: any, settings: any): Promise<string> => {
  try {
    const prompt = `
      Create a personalized 7-day meal plan for a user with the following profile:
      - Age: ${userProfile.age || 'Not specified'}
      - Weight: ${userProfile.weight || 'Not specified'} kg
      - Height: ${userProfile.height || 'Not specified'} cm
      - Fitness Goals: ${userProfile.fitnessGoals || 'General fitness'}
      - Dietary Restrictions: ${userProfile.dietaryRestrictions || 'None'}
      - Daily Calorie Target: ${settings?.mealPreferences?.calories || 'Not specified'}
      - Macro Preference: ${settings?.mealPreferences?.macroPreferences || 'Balanced'}

      Please structure the plan with:
      1. A brief introduction explaining how this meal plan supports their goals
      2. Daily meal suggestions including breakfast, lunch, dinner, and snacks
      3. Approximate calorie and macronutrient breakdown for each meal
      4. A shopping list for the week
      5. Simple preparation instructions for complex meals
    `;

    const options: DeepSeekRequestOptions = {
      model: 'deepseek-chat',
      messages: [
        {
          role: 'system',
          content: 'You are an expert nutritionist who creates personalized meal plans based on user profiles and dietary preferences.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 2000
    };

    const response = await deepseekApi.post<DeepSeekResponse>('/v1/chat/completions', options);
    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('Error generating meal plan:', error);
    throw new Error('Failed to generate meal plan. Please try again later.');
  }
};

/**
 * Generate fitness advice based on user query
 * @param userProfile User profile data
 * @param query User's fitness-related question
 * @returns Generated fitness advice
 */
export const getFitnessAdvice = async (userProfile: any, query: string): Promise<string> => {
  try {
    const prompt = `
      User Profile:
      - Age: ${userProfile.age || 'Not specified'}
      - Weight: ${userProfile.weight || 'Not specified'} kg
      - Height: ${userProfile.height || 'Not specified'} cm
      - Fitness Goals: ${userProfile.fitnessGoals || 'General fitness'}
      - Activity Level: ${userProfile.activityLevel || 'Moderate'}

      User Question: ${query}

      Please provide a helpful, informative response that is tailored to this specific user's profile.
    `;

    const options: DeepSeekRequestOptions = {
      model: 'deepseek-chat',
      messages: [
        {
          role: 'system',
          content: 'You are a knowledgeable fitness expert who provides personalized advice based on user profiles.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 1000
    };

    const response = await deepseekApi.post<DeepSeekResponse>('/v1/chat/completions', options);
    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('Error generating fitness advice:', error);
    throw new Error('Failed to generate fitness advice. Please try again later.');
  }
};

export default {
  generateWorkoutPlan,
  generateMealPlan,
  getFitnessAdvice
}; 