import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { useAuth } from "../../contexts/AuthContext";

const AuthButton: React.FC = () => {
  const { currentUser, isAdmin } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  
  if (currentUser) {
    return (
      <div className="relative">
        <motion.button
          className="flex items-center space-x-2 text-white"
          onClick={() => setShowDropdown(!showDropdown)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
            {currentUser.displayName ? currentUser.displayName.charAt(0).toUpperCase() : "U"}
          </div>
        </motion.button>
        
        <AnimatePresence>
          {showDropdown && (
            <motion.div
              className="absolute right-0 mt-2 w-48 bg-[#1a1a1a] rounded-md shadow-lg py-1 z-50"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <Link 
                to="/profile" 
                className="block px-4 py-2 text-sm text-white hover:bg-[#333333]"
              >
                Profile
              </Link>
              {isAdmin && (
                <Link 
                  to="/admin" 
                  className="block px-4 py-2 text-sm text-white hover:bg-[#333333]"
                >
                  Admin Dashboard
                </Link>
              )}
              <button 
                className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-[#333333]"
                onClick={() => {
                  // Sign out logic here
                }}
              >
                Sign Out
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }
  
  return (
    <Link to="/signin">
      <Button 
        variant="outline" 
        className="border-white/20 text-white hover:bg-white/10 hover:text-white"
        size="sm"
      >
        Sign In
      </Button>
    </Link>
  );
};

export default AuthButton;