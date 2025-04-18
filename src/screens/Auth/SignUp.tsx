import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { signUpWithEmail, signInWithGoogle } from '../../services/firebase/auth';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { useToast } from '../../components/ui/use-toast';

const SignUp: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const { toast } = useToast();

  const validatePassword = () => {
    if (password.length < 8) {
      return "Password must be at least 8 characters";
    }
    if (!/[A-Z]/.test(password)) {
      return "Password must contain at least one uppercase letter";
    }
    if (!/[0-9]/.test(password)) {
      return "Password must contain at least one number";
    }
    if (!/[!@#$%^&*]/.test(password)) {
      return "Password must contain at least one special character";
    }
    return null;
  };

  const handleNextStep = () => {
    const passwordError = validatePassword();
    if (passwordError) {
      toast({
        title: "Password Requirements",
        description: passwordError,
        variant: "destructive",
      });
      return;
    }
    
    if (password !== confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "Passwords do not match",
        variant: "destructive",
      });
      return;
    }
    
    setStep(2);
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!displayName.trim()) {
      toast({
        title: "Name Required",
        description: "Please enter your name",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      await signUpWithEmail(email, password, displayName);
      toast({
        title: "Account Created",
        description: "Please verify your email to complete registration",
      });
      navigate('/signin');
    } catch (error: any) {
      toast({
        title: "Registration Error",
        description: error.message || "Failed to create account",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    setIsLoading(true);
    
    try {
      await signInWithGoogle();
      navigate('/');
    } catch (error: any) {
      toast({
        title: "Google Sign Up Error",
        description: error.message || "Failed to sign up with Google",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
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

  const pageVariants = {
    initial: { x: 300, opacity: 0 },
    animate: { x: 0, opacity: 1, transition: { type: "spring", stiffness: 100, damping: 15 } },
    exit: { x: -300, opacity: 0, transition: { duration: 0.3 } }
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
          backgroundImage: "url('/pattern-bg.png')",
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
            Create your account
          </motion.p>
        </motion.div>
        
        <motion.div 
          className="bg-[#1a1a1a] p-8 rounded-lg shadow-2xl border border-gray-800"
          variants={itemVariants}
        >
          {/* Step indicator */}
          <div className="flex justify-center mb-6">
            <div className="flex items-center">
              <motion.div 
                className={`w-8 h-8 rounded-full flex items-center justify-center ${step === 1 ? 'bg-white text-black' : 'bg-gray-700 text-white'}`}
                animate={{ scale: step === 1 ? 1.1 : 1 }}
                transition={{ duration: 0.3 }}
              >
                1
              </motion.div>
              <div className="w-10 h-0.5 bg-gray-700">
                <motion.div 
                  className="h-full bg-white" 
                  initial={{ width: "0%" }}
                  animate={{ width: step === 1 ? "0%" : "100%" }}
                  transition={{ duration: 0.5 }}
                />
              </div>
              <motion.div 
                className={`w-8 h-8 rounded-full flex items-center justify-center ${step === 2 ? 'bg-white text-black' : 'bg-gray-700 text-white'}`}
                animate={{ scale: step === 2 ? 1.1 : 1 }}
                transition={{ duration: 0.3 }}
              >
                2
              </motion.div>
            </div>
          </div>
          
          {step === 1 && (
            <motion.div
              initial="initial"
              animate="animate"
              exit="exit"
              variants={pageVariants}
              className="space-y-6"
            >
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full bg-[#2a2a2a] border-gray-700 text-white focus:ring-white focus:border-white"
                  placeholder="your@email.com"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full bg-[#2a2a2a] border-gray-700 text-white focus:ring-white focus:border-white"
                  placeholder="••••••••"
                />
                <p className="mt-1 text-xs text-gray-400">
                  Must be at least 8 characters with uppercase, number, and special character
                </p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Confirm Password</label>
                <Input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="w-full bg-[#2a2a2a] border-gray-700 text-white focus:ring-white focus:border-white"
                  placeholder="••••••••"
                />
              </div>
              
              <Button
                type="button"
                onClick={handleNextStep}
                className="w-full bg-white text-black hover:bg-neutral-200 transition-all duration-300 h-12"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Continue
              </Button>
              
              <div className="relative flex items-center justify-center my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-700"></div>
                </div>
                <div className="relative px-4 bg-[#1a1a1a] text-sm text-gray-400">
                  Or sign up with
                </div>
              </div>
              
              <Button
                type="button"
                onClick={handleGoogleSignUp}
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
                Sign up with Google
              </Button>
            </motion.div>
          )}
          
          {step === 2 && (
            <motion.form
              onSubmit={handleSignUp}
              initial="initial"
              animate="animate"
              exit="exit"
              variants={pageVariants}
              className="space-y-6"
            >
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
                <Input
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  required
                  className="w-full bg-[#2a2a2a] border-gray-700 text-white focus:ring-white focus:border-white"
                  placeholder="Your name"
                />
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">Account Type</label>
                <div className="grid grid-cols-2 gap-4">
                  <motion.div
                    className="bg-[#2a2a2a] border border-gray-700 rounded-lg p-4 cursor-pointer"
                    whileHover={{ scale: 1.03, borderColor: "rgba(255,255,255,0.5)" }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center justify-center mb-2">
                      <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <h3 className="text-center text-white font-medium">Reader</h3>
                    <p className="text-xs text-gray-400 text-center mt-1">Access all stories and programs</p>
                  </motion.div>
                  
                  <motion.div
                    className="bg-[#2a2a2a] border border-gray-700 rounded-lg p-4 cursor-pointer"
                    whileHover={{ scale: 1.03, borderColor: "rgba(255,255,255,0.5)" }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center justify-center mb-2">
                      <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                    </div>
                    <h3 className="text-center text-white font-medium">Author</h3>
                    <p className="text-xs text-gray-400 text-center mt-1">Request to publish your stories</p>
                  </motion.div>
                </div>
                <p className="text-xs text-gray-400 mt-2">
                  Author requests require approval from our team
                </p>
              </div>
              
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="terms"
                    type="checkbox"
                    className="w-4 h-4 border border-gray-600 rounded bg-[#2a2a2a] focus:ring-white"
                    required
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="terms" className="text-gray-300">
                    I agree to the <a href="#" className="text-blue-400 hover:text-blue-300">Terms of Service</a> and <a href="#" className="text-blue-400 hover:text-blue-300">Privacy Policy</a>
                  </label>
                </div>
              </div>
              
              <div className="flex space-x-4">
                <Button
                  type="button"
                  onClick={() => setStep(1)}
                  className="w-1/3 bg-transparent border border-gray-700 text-white hover:bg-gray-800 transition-all duration-300 h-12"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Back
                </Button>
                
                <Button
                  type="submit"
                  className="w-2/3 bg-white text-black hover:bg-neutral-200 transition-all duration-300 h-12"
                  disabled={isLoading}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isLoading ? (
                    <motion.div
                      className="h-5 w-5 rounded-full border-2 border-t-transparent border-black"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                  ) : "Create Account"}
                </Button>
              </div>
            </motion.form>
          )}
          
          <motion.div 
            className="text-center mt-6 text-sm text-gray-400"
            variants={itemVariants}
          >
            Already have an account?{" "}
            <Link 
              to="/signin" 
              className="text-blue-400 hover:text-blue-300 font-medium"
            >
              Sign in
            </Link>
          </motion.div>
        </motion.div>
        
        <motion.div 
          className="mt-8 text-center text-xs text-gray-500"
          variants={itemVariants}
        >
          By creating an account, you agree to our{" "}
          <a href="#" className="text-gray-400 hover:text-white">Terms of Service</a>{" "}
          and{" "}
          <a href="#" className="text-gray-400 hover:text-white">Privacy Policy</a>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default SignUp;