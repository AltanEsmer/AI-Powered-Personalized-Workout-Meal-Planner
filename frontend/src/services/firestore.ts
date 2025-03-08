import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit as firestoreLimit,
  Timestamp,
  addDoc
} from 'firebase/firestore';
import { db } from '../utils/firebase';

// User profiles
export const createUserProfile = async (userId: string, data: any) => {
  try {
    await setDoc(doc(db, 'users', userId), {
      ...data,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    });
    return true;
  } catch (error) {
    console.error('Error creating user profile:', error);
    throw error;
  }
};

export const getUserProfile = async (userId: string) => {
  try {
    const docRef = doc(db, 'users', userId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error getting user profile:', error);
    throw error;
  }
};

export const updateUserProfile = async (userId: string, data: any) => {
  try {
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, {
      ...data,
      updatedAt: Timestamp.now()
    });
    return true;
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }
};

// Workout plans
export const createWorkoutPlan = async (userId: string, workoutPlan: any) => {
  try {
    const workoutData = {
      ...workoutPlan,
      userId,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    };
    
    const docRef = await addDoc(collection(db, 'workoutPlans'), workoutData);
    return { id: docRef.id, ...workoutData };
  } catch (error) {
    console.error('Error creating workout plan:', error);
    throw error;
  }
};

export const getUserWorkoutPlans = async (userId: string) => {
  try {
    const workoutsQuery = query(
      collection(db, 'workoutPlans'),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    );
    
    const querySnapshot = await getDocs(workoutsQuery);
    const workouts: any[] = [];
    
    querySnapshot.forEach((doc) => {
      workouts.push({ id: doc.id, ...doc.data() });
    });
    
    return workouts;
  } catch (error) {
    console.error('Error getting user workout plans:', error);
    throw error;
  }
};

export const getWorkoutPlan = async (planId: string) => {
  try {
    const docRef = doc(db, 'workoutPlans', planId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error getting workout plan:', error);
    throw error;
  }
};

export const updateWorkoutPlan = async (planId: string, data: any) => {
  try {
    const workoutRef = doc(db, 'workoutPlans', planId);
    await updateDoc(workoutRef, {
      ...data,
      updatedAt: Timestamp.now()
    });
    return true;
  } catch (error) {
    console.error('Error updating workout plan:', error);
    throw error;
  }
};

export const deleteWorkoutPlan = async (planId: string) => {
  try {
    await deleteDoc(doc(db, 'workoutPlans', planId));
    return true;
  } catch (error) {
    console.error('Error deleting workout plan:', error);
    throw error;
  }
};

// Meal plans
export const createMealPlan = async (userId: string, mealPlan: any) => {
  try {
    const mealData = {
      ...mealPlan,
      userId,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    };
    
    const docRef = await addDoc(collection(db, 'mealPlans'), mealData);
    return { id: docRef.id, ...mealData };
  } catch (error) {
    console.error('Error creating meal plan:', error);
    throw error;
  }
};

export const getUserMealPlans = async (userId: string) => {
  try {
    const mealsQuery = query(
      collection(db, 'mealPlans'),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    );
    
    const querySnapshot = await getDocs(mealsQuery);
    const meals: any[] = [];
    
    querySnapshot.forEach((doc) => {
      meals.push({ id: doc.id, ...doc.data() });
    });
    
    return meals;
  } catch (error) {
    console.error('Error getting user meal plans:', error);
    throw error;
  }
};

export const getMealPlan = async (planId: string) => {
  try {
    const docRef = doc(db, 'mealPlans', planId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error getting meal plan:', error);
    throw error;
  }
};

export const updateMealPlan = async (planId: string, data: any) => {
  try {
    const mealRef = doc(db, 'mealPlans', planId);
    await updateDoc(mealRef, {
      ...data,
      updatedAt: Timestamp.now()
    });
    return true;
  } catch (error) {
    console.error('Error updating meal plan:', error);
    throw error;
  }
};

export const deleteMealPlan = async (planId: string) => {
  try {
    await deleteDoc(doc(db, 'mealPlans', planId));
    return true;
  } catch (error) {
    console.error('Error deleting meal plan:', error);
    throw error;
  }
};

// User progress
export const trackUserProgress = async (userId: string, progressData: any) => {
  try {
    const data = {
      ...progressData,
      userId,
      date: Timestamp.now()
    };
    
    const docRef = await addDoc(collection(db, 'userProgress'), data);
    return { id: docRef.id, ...data };
  } catch (error) {
    console.error('Error tracking user progress:', error);
    throw error;
  }
};

export const getUserProgress = async (userId: string, limitCount = 30) => {
  try {
    const progressQuery = query(
      collection(db, 'userProgress'),
      where('userId', '==', userId),
      orderBy('date', 'desc'),
      firestoreLimit(limitCount)
    );
    
    const querySnapshot = await getDocs(progressQuery);
    const progress: any[] = [];
    
    querySnapshot.forEach((doc) => {
      progress.push({ id: doc.id, ...doc.data() });
    });
    
    return progress;
  } catch (error) {
    console.error('Error getting user progress:', error);
    throw error;
  }
}; 