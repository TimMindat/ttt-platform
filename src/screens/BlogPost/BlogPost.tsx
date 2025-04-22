import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowLeft, Clock, Share2, Bookmark } from "lucide-react";
import { Button } from "../../components/ui/button";

interface BlogPost {
  id: number;
  title: string;
  content: string;
  readTime: string;
  image: string;
  author: string;
  date: string;
  excerpt: string;
}

const BlogPost = () => {
  const { id } = useParams<{ id: string }>();
  const { scrollYProgress } = useScroll();
  const [post, setPost] = useState<BlogPost | null>(null);

  // Reading progress indicator
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  useEffect(() => {
    // In a real app, fetch from your database
    // Mocked data for demonstration
    const mockPost = {
      id: parseInt(id || "1"),
      title: "Israel and the Palestinian Authority ... a struggle for existence or a job?",
      content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum...`,
      readTime: "5 min read",
      image: "/787736-1-3.png",
      author: "John Doe",
      date: "January 15, 2024",
      excerpt: "An in-depth analysis of the ongoing situation..."
    };
    setPost(mockPost);
  }, [id]);

  if (!post) return null;

  return (
    <div className="min-h-screen bg-[#121212] text-white">
      {/* Reading progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-blue-500 origin-left z-50"
        style={{ scaleX }}
      />

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-[#121212]/80 backdrop-blur-md z-40">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/">
            <motion.button
              className="flex items-center text-white/80 hover:text-white"
              whileHover={{ x: -3 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back
            </motion.button>
          </Link>
          
          <div className="flex items-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 hover:bg-white/10 rounded-full"
            >
              <Share2 className="w-5 h-5" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 hover:bg-white/10 rounded-full"
            >
              <Bookmark className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="pt-24 pb-16">
        <article className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Hero section */}
            <div className="mb-12">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
                {post.title}
              </h1>
              <div className="flex items-center text-white/60 space-x-4 mb-8">
                <span>{post.author}</span>
                <span>•</span>
                <span>{post.date}</span>
                <span>•</span>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  <span>{post.readTime}</span>
                </div>
              </div>
              <div className="aspect-[16/9] rounded-xl overflow-hidden mb-8">
                <motion.img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover"
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.6 }}
                />
              </div>
            </div>

            {/* Article content */}
            <div className="prose prose-lg prose-invert max-w-none">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                {post.content}
              </motion.div>
            </div>
          </motion.div>
        </article>
      </main>
    </div>
  );
};

export default BlogPost;