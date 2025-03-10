import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  UserCredential, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  updateProfile
} from 'firebase/auth';
import { auth, googleProvider } from '../utils/firebase';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../utils/firebase';

// Interface for user data
interface UserData {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
}

// Interface for auth context
interface AuthContextType {
  currentUser: UserData | null;
  loading: boolean;
  signUp: (email: string, password: string) => Promise<UserCredential>;
  logIn: (email: string, password: string) => Promise<UserCredential>;
  logOut: () => Promise<void>;
  signInWithGoogle: () => Promise<UserCredential>;
  resetPassword: (email: string) => Promise<void>;
  updateUserProfile: (displayName: string, photoURL?: string) => Promise<void>;
}

// Create context
const AuthContext = createContext<AuthContextType | null>(null);

// Create hook to use auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// Create AuthProvider component
interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [currentUser, setCurrentUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Helper function to ensure user document exists in Firestore
  const ensureUserDocumentExists = async (user: UserData) => {
    try {
      const userRef = doc(db, 'users', user.uid);
      const userSnap = await getDoc(userRef);
      
      if (!userSnap.exists()) {
        // Create new user document with default values
        await setDoc(userRef, {
          displayName: user.displayName || '',
          email: user.email || '',
          photoURL: user.photoURL || '',
          fitnessGoals: '',
          activityLevel: '',
          dietaryRestrictions: '',
          weight: '',
          height: '',
          age: '',
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
          settings: {
            emailNotifications: false,
            workoutIntensity: 'medium',
            mealPreferences: {
              calories: '',
              macroPreferences: 'balanced',
            },
            darkMode: false,
            language: 'english',
            measurementSystem: 'metric',
          }
        });
        console.log('User document created successfully');
      }
    } catch (error) {
      console.error('Error ensuring user document exists:', error);
    }
  };

  // Sign up with email and password
  async function signUp(email: string, password: string) {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    
    // Create user document in Firestore
    if (userCredential.user) {
      const userData: UserData = {
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        displayName: userCredential.user.displayName,
        photoURL: userCredential.user.photoURL
      };
      await ensureUserDocumentExists(userData);
    }
    
    return userCredential;
  }

  // Log in with email and password
  async function logIn(email: string, password: string) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  // Log out
  function logOut() {
    return signOut(auth);
  }

  // Sign in with Google
  async function signInWithGoogle() {
    const userCredential = await signInWithPopup(auth, googleProvider);
    
    // Create user document in Firestore
    if (userCredential.user) {
      const userData: UserData = {
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        displayName: userCredential.user.displayName,
        photoURL: userCredential.user.photoURL
      };
      await ensureUserDocumentExists(userData);
    }
    
    return userCredential;
  }

  // Reset password
  function resetPassword(email: string) {
    return sendPasswordResetEmail(auth, email);
  }

  // Update user profile
  async function updateUserProfile(displayName: string, photoURL?: string) {
    if (!auth.currentUser) throw new Error('No user signed in');
    
    return updateProfile(auth.currentUser, {
      displayName,
      photoURL: photoURL || auth.currentUser.photoURL
    });
  }

  // Set up auth state listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userData: UserData = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL
        };
        
        setCurrentUser(userData);
        
        // Ensure user document exists in Firestore
        await ensureUserDocumentExists(userData);
      } else {
        setCurrentUser(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    loading,
    signUp,
    logIn,
    logOut,
    signInWithGoogle,
    resetPassword,
    updateUserProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
} 