import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from 'firebase/auth';
import { 
  onAuthStateChange, 
  getCurrentUserData, 
  UserData, 
  UserRole 
} from '../services/firebase/auth';

interface AuthContextType {
  currentUser: User | null;
  userData: UserData | null;
  loading: boolean;
  isAdmin: boolean;
  isAuthor: boolean;
  isApprovedAuthor: boolean;
}

const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  userData: null,
  loading: true,
  isAdmin: false,
  isAuthor: false,
  isApprovedAuthor: false
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChange(async (user) => {
      setCurrentUser(user);
      
      if (user) {
        try {
          const data = await getCurrentUserData(user);
          setUserData(data);
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      } else {
        setUserData(null);
      }
      
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  // Computed properties for user roles
  const isAdmin = userData?.role === UserRole.ADMIN;
  const isAuthor = userData?.role === UserRole.AUTHOR || isAdmin;
  const isApprovedAuthor = isAuthor && (userData?.authorApproved || isAdmin);

  const value = {
    currentUser,
    userData,
    loading,
    isAdmin,
    isAuthor,
    isApprovedAuthor
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};