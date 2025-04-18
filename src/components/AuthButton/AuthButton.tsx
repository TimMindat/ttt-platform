import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { signOutUser } from '../../services/firebase/auth';
import { Button } from '../ui/button';

const AuthButton: React.FC = () => {
  const { currentUser, userData } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOutUser();
      setIsOpen(false);
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  // Animation variants
  const dropdownVariants = {
    hidden: { opacity: 0, y: -10, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        type: "spring", 
        stiffness: 400, 
        damping: 25 
      } 
    },
    exit: { 
      opacity: 0, 
      y: -10, 
      scale: 0.95,
      transition: { duration: 0.2 } 
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: (i: number) => ({ 
      opacity: 1, 
      x: 0,
      transition: { 
        delay: i * 0.05,
        duration: 0.3
      } 
    }),
  };

  if (!currentUser) {
    return (
      <div className="flex items-center gap-3">
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link to="/signin">
            <Button 
              variant="ghost" 
              className="text-gray-300 hover:text-white"
            >
              Sign In
            </Button>
          </Link>
        </motion.div>
        
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link to="/signup">
            <Button 
              className="bg-white text-black hover:bg-gray-200 transition-all duration-300"
            >
              Sign Up
            </Button>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="relative">
      <motion.button
        className="flex items-center gap-2 px-3 py-2 rounded-full bg-[#1a1a1a] border border-gray-800 hover:border-gray-600 transition-all duration-300"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="relative">
          {userData?.photoURL ? (
            <img 
              src={userData.photoURL} 
              alt="Profile" 
              className="w-8 h-8 rounded-full object-cover"
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-medium">
              {userData?.displayName?.charAt(0) || currentUser.email?.charAt(0) || 'U'}
            </div>
          )}
          
          {/* Role indicator */}
          {userData?.role === 'author' && (
            <motion.div 
              className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-blue-500 border border-[#1a1a1a]"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
            />
          )}
          {userData?.role === 'admin' && (
            <motion.div 
              className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-purple-500 border border-[#1a1a1a]"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
            />
          )}
        </div>
        
        <span className="text-white text-sm hidden md:block max-w-[100px] truncate">
          {userData?.displayName || currentUser.email?.split('@')[0] || 'User'}
        </span>
        
        <motion.svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="16" 
          height="16" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          className="text-gray-400"
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <polyline points="6 9 12 15 18 9"></polyline>
        </motion.svg>
      </motion.button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute right-0 mt-2 w-56 rounded-lg bg-[#1a1a1a] border border-gray-800 shadow-xl z-50"
            variants={dropdownVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            style={{ originY: 0 }}
          >
            <div className="p-3 border-b border-gray-800">
              <p className="text-sm font-medium text-white">{userData?.displayName || currentUser.email?.split('@')[0]}</p>
              <p className="text-xs text-gray-400 truncate">{currentUser.email}</p>
              {userData?.role === 'author' && !userData?.authorApproved && (
                <div className="mt-1 text-xs bg-blue-900/30 text-blue-400 px-2 py-1 rounded">
                  Author approval pending
                </div>
              )}
              {userData?.role === 'author' && userData?.authorApproved && (
                <div className="mt-1 text-xs bg-blue-900/30 text-blue-400 px-2 py-1 rounded">
                  Verified Author
                </div>
              )}
              {userData?.role === 'admin' && (
                <div className="mt-1 text-xs bg-purple-900/30 text-purple-400 px-2 py-1 rounded">
                  Administrator
                </div>
              )}
            </div>
            
            <div className="py-1">
              <motion.div custom={0} variants={itemVariants} initial="hidden" animate="visible">
                <Link 
                  to="/profile" 
                  className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white transition-colors duration-200"
                  onClick={() => setIsOpen(false)}
                >
                  <div className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                    Profile
                  </div>
                </Link>
              </motion.div>
              
              {(userData?.role === 'author' || userData?.role === 'admin') && (
                <motion.div custom={1} variants={itemVariants} initial="hidden" animate="visible">
                  <Link 
                    to="/dashboard" 
                    className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white transition-colors duration-200"
                    onClick={() => setIsOpen(false)}
                  >
                    <div className="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                        <line x1="3" y1="9" x2="21" y2="9"></line>
                        <line x1="9" y1="21" x2="9" y2="9"></line>
                      </svg>
                      Dashboard
                    </div>
                  </Link>
                </motion.div>
              )}
              
              {userData?.role === 'admin' && (
                <motion.div custom={2} variants={itemVariants} initial="hidden" animate="visible">
                  <Link 
                    to="/admin" 
                    className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white transition-colors duration-200"
                    onClick={() => setIsOpen(false)}
                  >
                    <div className="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 20h9"></path>
                        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                      </svg>
                      Admin Panel
                    </div>
                  </Link>
                </motion.div>
              )}
              
              <motion.div custom={3} variants={itemVariants} initial="hidden" animate="visible">
                <Link 
                  to="/settings" 
                  className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white transition-colors duration-200"
                  onClick={() => setIsOpen(false)}
                >
                  <div className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="3"></circle>
                      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                    </svg>
                    Settings
                  </div>
                </Link>
              </motion.div>
            </div>
            
            <div className="border-t border-gray-800 py-1">
              <motion.div custom={4} variants={itemVariants} initial="hidden" animate="visible">
                <button 
                  onClick={handleSignOut}
                  className="block w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-gray-800 hover:text-red-300 transition-colors duration-200"
                >
                  <div className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                      <polyline points="16 17 21 12 16 7"></polyline>
                      <line x1="21" y1="12" x2="9" y2="12"></line>
                    </svg>
                    Sign out
                  </div>
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AuthButton;