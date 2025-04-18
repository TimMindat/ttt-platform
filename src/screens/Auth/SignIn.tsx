import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmail, signInWithGoogle, resetPassword } from '../../services/firebase/auth';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { useToast } from '../../components/ui/use-toast';

const SignIn: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [resetEmailSent, setResetEmailSent] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await signInWithEmail(email, password);
      navigate('/');
    } catch (error: any) {
      toast({
        title: "Authentication Error",
        description: error.message || "Failed to sign in. Please check your credentials.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    
    try {
      await signInWithGoogle();
      navigate('/');
    } catch (error: any) {
      toast({
        title: "Google Sign In Error",
        description: error.message || "Failed to sign in with Google.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (!email) {
      toast({
        title: "Email Required",
        description: "Please enter your email address to reset your password.",
        variant: "destructive",
      });
      return;
    }
    
    try {
      await resetPassword(email);
      setResetEmailSent(true);
      toast({
        title: "Password Reset Email Sent",
        description: "Check your inbox for instructions to reset your password.",
      });
    } catch (error: any) {
      toast({
        title: "Reset Password Error",
        description: error.message || "Failed to send reset email.",
        variant: "destructive",
      });
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  const backgroundVariants = {
    hidden: { scale: 1.1, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 0.2,
      transition: { duration: 1.2 }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#121212] relative overflow-hidden">
      {/* Animated background */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('/ocean-bg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(8px) brightness(0.3)"
        }}
        initial="hidden"
        animate="visible"
        variants={backgroundVariants}
      />
      
      <motion.div
        className="absolute inset-0 z-0"
        style={{
          background: "radial-gradient(circle at 50% 50%, rgba(26,26,26,0.7) 0%, rgba(12,12,12,0.9) 70%)"
        }}
        animate={{
          opacity: [0.7, 0.8, 0.7]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div 
        className="max-w-md w-full mx-auto p-8 relative z-10"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div 
          className="text-center mb-8"
          variants={itemVariants}
        >
          <Link to="/">
            <motion.h1 
              className="text-3xl font-['Sora',Helvetica] text-white mb-2"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              Trace of the Tides
            </motion.h1>
          </Link>
          <motion.div 
            className="w-16 h-0.5 bg-white mx-auto mb-6"
            initial={{ width: 0 }}
            animate={{ width: "4rem" }}
            transition={{ delay: 0.5, duration: 0.8 }}
          />
          <motion.p 
            className="text-gray-300"
            variants={itemVariants}
          >
            Sign in to continue your journey
          </motion.p>
        </motion.div>
        
        <motion.form 
          onSubmit={handleSignIn}
          className="space-y-6 bg-[#1a1a1a] p-8 rounded-lg shadow-2xl border border-gray-800"
          variants={itemVariants}
        >
          <motion.div variants={itemVariants}>
            <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-[#2a2a2a] border-gray-700 text-white focus:ring-white focus:border-white"
              placeholder="your@email.com"
            />
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-gray-300">Password</label>
              <motion.button
                type="button"
                onClick={handleResetPassword}
                className="text-xs text-blue-400 hover:text-blue-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Forgot password?
              </motion.button>
            </div>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-[#2a2a2a] border-gray-700 text-white focus:ring-white focus:border-white"
              placeholder="••••••••"
            />
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <Button
              type="submit"
              className="w-full bg-white text-black hover:bg-neutral-200 transition-all duration-300 h-12"
              disabled={isLoading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isLoading ? (
                <motion.div
                  className="h-5 w-5 rounded-full border-2 border-t-transparent border-white"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
              ) : "Sign In"}
            </Button>
          </motion.div>
          
          <motion.div 
            className="relative flex items-center justify-center my-6"
            variants={itemVariants}
          >
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-700"></div>
            </div>
            <div className="relative px-4 bg-[#1a1a1a] text-sm text-gray-400">
              Or continue with
            </div>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <Button
              type="button"
              onClick={handleGoogleSignIn}
              className="w-full bg-transparent border border-gray-700 text-white hover:bg-gray-800 transition-all duration-300 h-12"
              disabled={isLoading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"
                />
              </svg>
              Sign in with Google
            </Button>
          </motion.div>
          
          <motion.div 
            className="text-center mt-6 text-sm text-gray-400"
            variants={itemVariants}
          >
            Don't have an account?{" "}
            <Link 
              to="/signup" 
              className="text-blue-400 hover:text-blue-300 font-medium"
            >
              Sign up
            </Link>
          </motion.div>
        </motion.form>
        
        <motion.div 
          className="mt-8 text-center text-xs text-gray-500"
          variants={itemVariants}
        >
          By signing in, you agree to our{" "}
          <a href="#" className="text-gray-400 hover:text-white">Terms of Service</a>{" "}
          and{" "}
          <a href="#" className="text-gray-400 hover:text-white">Privacy Policy</a>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default SignIn;