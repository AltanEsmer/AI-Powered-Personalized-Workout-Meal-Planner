import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { createUserProfile, getUserProfile, updateUserProfile } from '../services/firestore';

interface UserProfileData {
  id?: string;
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
  fitnessGoals?: string[];
  dietaryPreferences?: {
    diet?: string;
    restrictions?: string[];
    allergies?: string[];
  };
  measurements?: {
    weight?: number;
    height?: number;
    bodyFat?: number;
  };
  [key: string]: any;
}

export function useUserProfile() {
  const [profile, setProfile] = useState<UserProfileData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { currentUser } = useAuth();

  // Fetch user profile
  const fetchUserProfile = async () => {
    if (!currentUser) {
      setProfile(null);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      // Try to fetch existing profile
      const userProfile = await getUserProfile(currentUser.uid);
      
      if (userProfile) {
        // Cast the unknown profile data to our expected type
        setProfile(userProfile as unknown as UserProfileData);
      } else {
        // Create a new profile if one doesn't exist
        await createUserProfile(currentUser.uid, {
          displayName: currentUser.displayName,
          email: currentUser.email,
          photoURL: currentUser.photoURL
        });
        
        // Fetch the newly created profile
        const newProfile = await getUserProfile(currentUser.uid);
        setProfile(newProfile as unknown as UserProfileData);
      }
    } catch (err: any) {
      console.error('Error in useUserProfile:', err);
      setError(err.message || 'An error occurred while fetching user profile');
    } finally {
      setLoading(false);
    }
  };

  // Update user profile
  const updateProfile = async (data: Partial<UserProfileData>) => {
    if (!currentUser) {
      setError('No user is signed in');
      return false;
    }

    try {
      setLoading(true);
      setError(null);
      
      await updateUserProfile(currentUser.uid, data);
      
      // Update local profile state
      setProfile(prev => {
        if (!prev) return data as UserProfileData;
        return { ...prev, ...data };
      });
      
      return true;
    } catch (err: any) {
      console.error('Error updating profile:', err);
      setError(err.message || 'An error occurred while updating user profile');
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Fetch profile on auth state change
  useEffect(() => {
    fetchUserProfile();
  }, [currentUser?.uid]);

  return { profile, loading, error, updateProfile, refreshProfile: fetchUserProfile };
} 