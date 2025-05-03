import React, { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "../../components/Navbar/Navbar";
import { CanaaniteIcons } from "../../components/icons/CanaaniteIcons";

// Content types that can be submitted
const contentTypes = [
  { id: "story", name: "Personal Story", icon: CanaaniteIcons.Book },
  { id: "testimony", name: "Testimony", icon: CanaaniteIcons.Voice },
  { id: "biography", name: "Biography", icon: CanaaniteIcons.Profile },
  { id: "artwork", name: "Artwork", icon: CanaaniteIcons.Art },
  { id: "music", name: "Music", icon: CanaaniteIcons.Music },
  { id: "literature", name: "Literature", icon: CanaaniteIcons.Scroll },
  { id: "photo", name: "Photography", icon: CanaaniteIcons.Camera },
  { id: "document", name: "Historical Document", icon: CanaaniteIcons.Document },
];

export const ContributePage = (): JSX.Element => {
  const [contentType, setContentType] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [files, setFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [dragActive, setDragActive] = useState<boolean>(false);
  
  // Define allowed file types and max size
  const allowedFileTypes = {
    photo: ['image/jpeg', 'image/png', 'image/gif'],
    document: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
    music: ['audio/mpeg', 'audio/wav'],
    artwork: ['image/jpeg', 'image/png', 'image/gif', 'image/svg+xml'],
    video: ['video/mp4', 'video/quicktime'],
    all: ['image/jpeg', 'image/png', 'image/gif', 'application/pdf', 'application/msword', 
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 
          'audio/mpeg', 'audio/wav', 'video/mp4', 'video/quicktime', 'image/svg+xml']
  };
  
  const MAX_FILE_SIZE = 20 * 1024 * 1024; // 20MB in bytes
  
  // Handle file validation
  const validateFile = (file: File): string | null => {
    // Check file size
    if (file.size > MAX_FILE_SIZE) {
      return `File "${file.name}" exceeds the 20MB size limit`;
    }
    
    // Check file type
    const fileType = contentType && contentType !== 'story' && contentType !== 'testimony' && contentType !== 'literature'
      ? allowedFileTypes[contentType as keyof typeof allowedFileTypes] || allowedFileTypes.all
      : allowedFileTypes.all;
      
    if (!fileType.includes(file.type)) {
      return `File "${file.name}" has unsupported format. Please upload only JPG, PNG, PDF, MP3, MP4, or DOC files`;
    }
    
    return null;
  };
  
  // Handle file selection with validation
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const fileArray = Array.from(e.target.files);
      const validationErrors: string[] = [];
      const validFiles: File[] = [];
      
      fileArray.forEach(file => {
        const error = validateFile(file);
        if (error) {
          validationErrors.push(error);
        } else {
          validFiles.push(file);
        }
      });
      
      if (validationErrors.length > 0) {
        setErrors(prev => ({
          ...prev,
          files: validationErrors.join('. ')
        }));
      } else {
        setErrors(prev => {
          const newErrors = {...prev};
          delete newErrors.files;
          return newErrors;
        });
      }
      
      setFiles(prev => [...prev, ...validFiles]);
    }
  };
  
  // Handle drag events
  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };
  
  // Handle drop event
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const fileArray = Array.from(e.dataTransfer.files);
      const validationErrors: string[] = [];
      const validFiles: File[] = [];
      
      fileArray.forEach(file => {
        const error = validateFile(file);
        if (error) {
          validationErrors.push(error);
        } else {
          validFiles.push(file);
        }
      });
      
      if (validationErrors.length > 0) {
        setErrors(prev => ({
          ...prev,
          files: validationErrors.join('. ')
        }));
      } else {
        setErrors(prev => {
          const newErrors = {...prev};
          delete newErrors.files;
          return newErrors;
        });
      }
      
      setFiles(prev => [...prev, ...validFiles]);
    }
  };
  
  // Get file icon based on type
  const getFileIcon = (file: File) => {
    if (file.type.startsWith('image/')) {
      return <CanaaniteIcons.Camera className="w-5 h-5 mr-3 text-white/70" />;
    } else if (file.type.startsWith('audio/')) {
      return <CanaaniteIcons.Music className="w-5 h-5 mr-3 text-white/70" />;
    } else if (file.type.startsWith('video/')) {
      return <CanaaniteIcons.Video className="w-5 h-5 mr-3 text-white/70" />;
    } else {
      return <CanaaniteIcons.Document className="w-5 h-5 mr-3 text-white/70" />;
    }
  };
  
  // Format file size
  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B';
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    else return (bytes / 1048576).toFixed(1) + ' MB';
  };
  
  // Remove a file from the selection
  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };
  
  // Validate form
  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!contentType) newErrors.contentType = "Please select a content type";
    if (!title.trim()) newErrors.title = "Title is required";
    if (!description.trim()) newErrors.description = "Description is required";
    if (!author.trim()) newErrors.author = "Author name is required";
    if (!email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Email is invalid";
    
    if (contentType !== "story" && contentType !== "testimony" && contentType !== "literature" && files.length === 0) {
      newErrors.files = "Please upload at least one file";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    try {
      // In a real implementation, this would be an API call to submit the content
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setIsSubmitted(true);
      // Reset form
      setContentType("");
      setTitle("");
      setDescription("");
      setAuthor("");
      setEmail("");
      setFiles([]);
    } catch (error) {
      console.error("Error submitting content:", error);
      setErrors({submit: "There was an error submitting your content. Please try again."});
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-[#121212] text-white">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-32 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 canaanite-title">Contribute</h1>
          <p className="text-lg text-white/80 max-w-3xl mx-auto">
            Share your story, artwork, or historical documents to help preserve our collective memory.
          </p>
          
          {/* Canaanite-inspired decorative divider */}
          <div className="flex justify-center my-8">
            <svg width="200" height="20" viewBox="0 0 200 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="canaanite-divider">
              <path d="M0 10H200" stroke="white" strokeWidth="0.5" strokeDasharray="1 3" />
              <path d="M40 10L60 5L80 10L100 5L120 10L140 5L160 10" stroke="white" strokeWidth="1" />
              <circle cx="40" cy="10" r="3" fill="white" fillOpacity="0.6" />
              <circle cx="100" cy="10" r="3" fill="white" fillOpacity="0.6" />
              <circle cx="160" cy="10" r="3" fill="white" fillOpacity="0.6" />
            </svg>
          </div>
        </motion.div>
        
        {isSubmitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl mx-auto bg-[#1a1a1a] rounded-lg p-8 text-center"
          >
            <div className="text-5xl mb-6">✓</div>
            <h2 className="text-2xl font-bold mb-4">Thank You for Your Contribution!</h2>
            <p className="text-white/80 mb-6">
              Your submission has been received and will be reviewed by our team. We appreciate your contribution to preserving our collective history.
            </p>
            <button
              onClick={() => setIsSubmitted(false)}
              className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
            >
              Submit Another Contribution
            </button>
          </motion.div>
        ) : (
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-3xl mx-auto bg-[#1a1a1a] rounded-lg p-6 md:p-8"
            onSubmit={handleSubmit}
          >
            {/* Content Type Selection */}
            <div className="mb-8">
              <label className="block text-white/80 mb-3 text-lg">What would you like to contribute?</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {contentTypes.map(type => (
                  <button
                    key={type.id}
                    type="button"
                    className={`flex flex-col items-center justify-center p-4 rounded-lg border transition-all ${
                      contentType === type.id 
                        ? "border-white bg-white/10 text-white" 
                        : "border-white/20 hover:border-white/40 text-white/70 hover:text-white"
                    }`}
                    onClick={() => setContentType(type.id)}
                  >
                    <type.icon className="w-8 h-8 mb-2" />
                    <span className="text-sm">{type.name}</span>
                  </button>
                ))}
              </div>
              {errors.contentType && <p className="text-red-400 mt-2 text-sm">{errors.contentType}</p>}
            </div>
            
            {/* Title */}
            <div className="mb-6">
              <label htmlFor="title" className="block text-white/80 mb-2">Title</label>
              <input
                type="text"
                id="title"
                className="w-full bg-[#252525] border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white/50"
                placeholder="Enter a title for your contribution"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              {errors.title && <p className="text-red-400 mt-2 text-sm">{errors.title}</p>}
            </div>
            
            {/* Description */}
            <div className="mb-6">
              <label htmlFor="description" className="block text-white/80 mb-2">Description</label>
              <textarea
                id="description"
                rows={5}
                className="w-full bg-[#252525] border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white/50"
                placeholder="Describe your contribution..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
              {errors.description && <p className="text-red-400 mt-2 text-sm">{errors.description}</p>}
            </div>
            
            {/* File Upload */}
            <div className="mb-6">
              <label className="block text-white/80 mb-2">Upload Files</label>
              <div 
                className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                  dragActive 
                    ? "border-white/50 bg-white/5" 
                    : "border-white/20 hover:border-white/30"
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <input
                  type="file"
                  id="fileUpload"
                  multiple
                  className="hidden"
                  onChange={handleFileChange}
                  accept={contentType && contentType !== 'story' && contentType !== 'testimony' && contentType !== 'literature'
                    ? allowedFileTypes[contentType as keyof typeof allowedFileTypes]?.join(',') 
                    : allowedFileTypes.all.join(',')}
                />
                <label
                  htmlFor="fileUpload"
                  className="cursor-pointer flex flex-col items-center justify-center"
                >
                  <CanaaniteIcons.Upload className="w-12 h-12 text-white/50 mb-4" />
                  <p className="text-white/80 mb-2">
                    {dragActive 
                      ? "Drop files here to upload" 
                      : "Drag and drop files here, or click to browse"}
                  </p>
                  <p className="text-white/50 text-sm">
                    Supported formats: JPG, PNG, PDF, MP3, MP4, DOC (Max 20MB)
                  </p>
                  {contentType && (
                    <p className="text-white/70 text-sm mt-2">
                      {contentType === 'photo' && "For photos, please upload JPG or PNG files"}
                      {contentType === 'document' && "For documents, please upload PDF or DOC files"}
                      {contentType === 'music' && "For music, please upload MP3 or WAV files"}
                      {contentType === 'artwork' && "For artwork, please upload JPG, PNG, or SVG files"}
                    </p>
                  )}
                </label>
              </div>
              {errors.files && <p className="text-red-400 mt-2 text-sm">{errors.files}</p>}
              
              {/* File Preview */}
              {files.length > 0 && (
                <div className="mt-4">
                  <p className="text-white/80 mb-2">Selected Files:</p>
                  <div className="space-y-2">
                    {files.map((file, index) => (
                      <div key={index} className="flex items-center justify-between bg-[#252525] rounded-lg p-3">
                        <div className="flex items-center overflow-hidden">
                          {getFileIcon(file)}
                          <div className="truncate">
                            <span className="text-white/90 truncate block">{file.name}</span>
                            <span className="text-white/50 text-xs">{formatFileSize(file.size)}</span>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeFile(index)}
                          className="text-white/60 hover:text-white/90 ml-3 flex-shrink-0"
                        >
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            {/* Author Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <label htmlFor="author" className="block text-white/80 mb-2">Your Name</label>
                <input
                  type="text"
                  id="author"
                  className="w-full bg-[#252525] border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white/50"
                  placeholder="Enter your name"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                />
                {errors.author && <p className="text-red-400 mt-2 text-sm">{errors.author}</p>}
              </div>
              <div>
                <label htmlFor="email" className="block text-white/80 mb-2">Email Address</label>
                <input
                  type="email"
                  id="email"
                  className="w-full bg-[#252525] border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white/50"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && <p className="text-red-400 mt-2 text-sm">{errors.email}</p>}
              </div>
            </div>
            
            {/* Terms and Conditions */}
            <div className="mb-8">
              <label className="flex items-start">
                <input
                  type="checkbox"
                  className="mt-1 mr-3"
                  required
                />
                <span className="text-white/70 text-sm">
                  I understand that by submitting this content, I grant Trace of the Tides permission to review, 
                  archive, and potentially publish this material while maintaining attribution to me as the original creator.
                </span>
              </label>
            </div>
            
            {/* Submit Button */}
            <div className="text-center">
              {errors.submit && <p className="text-red-400 mb-4">{errors.submit}</p>}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`px-8 py-3 rounded-lg text-lg font-medium transition-all ${
                  isSubmitting 
                    ? "bg-white/30 cursor-not-allowed" 
                    : "bg-white/20 hover:bg-white/30 hover:scale-105"
                }`}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting...
                  </span>
                ) : "Submit Contribution"}
              </button>
            </div>
          </motion.form>
        )}
      </div>
    </div>
  );
};