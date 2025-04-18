import { 
  getAuth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  GoogleAuthProvider, 
  signInWithPopup,
  sendEmailVerification,
  sendPasswordResetEmail,
  onAuthStateChanged,
  User
} from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { app } from './firebase';

// Initialize Firebase Auth and Firestore
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

// User roles
export enum UserRole {
  USER = 'user',
  AUTHOR = 'author',
  ADMIN = 'admin'
}

// User interface
export interface UserData {
  uid: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  role: UserRole;
  authorApproved?: boolean;
  createdAt: number;
}

// Sign up with email and password
export const signUpWithEmail = async (email: string, password: string, displayName: string): Promise<UserData> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Send email verification
    await sendEmailVerification(user);
    
    // Create user document in Firestore
    const userData: UserData = {
      uid: user.uid,
      email: user.email!,
      displayName: displayName,
      photoURL: user.photoURL || '',
      role: UserRole.USER,
      createdAt: Date.now()
    };
    
    await setDoc(doc(db, 'users', user.uid), userData);
    
    return userData;
  } catch (error) {
    console.error('Error signing up with email:', error);
    throw error;
  }
};

// Sign in with email and password
export const signInWithEmail = async (email: string, password: string): Promise<User> => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error('Error signing in with email:', error);
    throw error;
  }
};

// Sign in with Google
export const signInWithGoogle = async (): Promise<UserData> => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    
    // Check if user exists in Firestore
    const userDoc = await getDoc(doc(db, 'users', user.uid));
    
    if (!userDoc.exists()) {
      // Create new user document
      const userData: UserData = {
        uid: user.uid,
        email: user.email!,
        displayName: user.displayName || '',
        photoURL: user.photoURL || '',
        role: UserRole.USER,
        createdAt: Date.now()
      };
      
      await setDoc(doc(db, 'users', user.uid), userData);
      return userData;
    } else {
      // Return existing user data
      return userDoc.data() as UserData;
    }
  } catch (error) {
    console.error('Error signing in with Google:', error);
    throw error;
  }
};

// Sign out
export const signOutUser = async (): Promise<void> => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error('Error signing out:', error);
    throw error;
  }
};

// Reset password
export const resetPassword = async (email: string): Promise<void> => {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (error) {
    console.error('Error resetting password:', error);
    throw error;
  }
};

// Request author role
export const requestAuthorRole = async (uid: string): Promise<void> => {
  try {
    const userRef = doc(db, 'users', uid);
    await updateDoc(userRef, {
      role: UserRole.AUTHOR,
      authorApproved: false
    });
  } catch (error) {
    console.error('Error requesting author role:', error);
    throw error;
  }
};

// Get current user data from Firestore
export const getCurrentUserData = async (user: User): Promise<UserData | null> => {
  try {
    const userDoc = await getDoc(doc(db, 'users', user.uid));
    if (userDoc.exists()) {
      return userDoc.data() as UserData;
    }
    return null;
  } catch (error) {
    console.error('Error getting user data:', error);
    throw error;
  }
};

// Auth state observer
export const onAuthStateChange = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, callback);
};

// Get current auth user
export const getCurrentUser = (): User | null => {
  return auth.currentUser;
};