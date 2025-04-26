import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { CanaaniteIcons } from "../../components/icons/CanaaniteIcons";
import CanaanitePattern from "../../components/CanaanitePattern/CanaanitePattern";
import { CanaanitePattern as UIPattern, CanaaniteDecorativeDivider } from "../../components/ui/CanaanitePatterns";
import { Separator } from "../../components/ui/separator";

const SymbolsPage: React.FC = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6 }
    }
  };

  // Get all icons from CanaaniteIcons
  const iconEntries = Object.entries(CanaaniteIcons);

  // Pattern variants from CanaanitePatterns
  const patternVariants = ["zigzag", "waves", "triangles", "circles", "grid"];

  return (
    <div className="min-h-screen bg-[#121212] text-white">
      {/* Background pattern */}
      <CanaanitePattern opacity={0.03} animate={true} />

      {/* Header with back button */}
      <motion.header 
        className="fixed top-0 left-0 w-full z-50 px-6 py-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ 
          background: "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 100%)"
        }}
      >
        <motion.button
          className="flex items-center text-white hover:text-neutral-300 transition-colors"
          onClick={() => window.history.back()}
          whileHover={{ x: -5 }}
          whileTap={{ scale: 0.95 }}
        >
          <ArrowLeft className="mr-2" />
          <span>Back</span>
        </motion.button>
      </motion.header>

      <div className="container mx-auto px-4 pt-24 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Canaanite Symbols & Patterns</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Ancient symbols that connect our past to our present, representing the enduring Palestinian connection to the land and sea.
          </p>
          <CanaaniteDecorativeDivider animate={true} className="mt-8" />
        </motion.div>

        {/* Introduction Section */}
        <motion.section 
          className="mb-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Symbolism of "Trace of the Tides"</h2>
            <div className="prose prose-lg prose-invert max-w-none">
              <p>
                Tides are ancient, continuous, unstoppable — just like the story of the Palestinian people and land. 
                Traces suggest memory, persistence, faint but indelible marks left behind by history, by people, by civilizations.
              </p>
              <p>
                The Sea (البحر) in Palestinian consciousness (especially the Mediterranean) represents freedom, loss, longing, travel, and return — many Palestinians are exiled from the coast, cut off from the sea.
              </p>
              <p>
                Tides are cyclical: loss and return, departure and homecoming, rise and fall — echoing the Palestinian experience of dispossession but also resilience.
              </p>
            </div>
          </div>
        </motion.section>

        {/* Canaanite Symbols + Tides Section */}
        <motion.section 
          className="mb-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Canaanite Symbols + Tides</h2>
            <div className="prose prose-lg prose-invert max-w-none">
              <p>
                The Canaanites were coastal people — cities like Acre, Jaffa, Gaza, and Sidon were Canaanite port cities.
                The sea was sacred to the Canaanites: it was associated with gods like Yam (god of the sea) and was a lifeline for trade and life.
              </p>
              <p>
                The tide traces could metaphorically represent how ancient civilizations like the Canaanites have left imprints on Palestinian identity — even if erased or denied, those traces remain.
              </p>
              <p>
                Cultural survival: Just as the tides can wash away footprints but never erase the memory of those who walked there, the connection to the land remains despite all attempts to erase it.
              </p>
            </div>
          </div>
        </motion.section>

        {/* What it All Symbolizes Together Section */}
        <motion.section 
          className="mb-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">What it All Symbolizes Together</h2>
            <div className="prose prose-lg prose-invert max-w-none">
              <p>
                "Trace of the Tides" with Canaanite symbols on a Palestinian site symbolizes:
              </p>
              <ul>
                <li>Ancient, indigenous roots — a cultural memory going back thousands of years.</li>
                <li>Continuity despite change — identities may evolve, but they are never fully washed away.</li>
                <li>Resistance to erasure — even if civilizations fall or are occupied, their memory, spirit, and connection to the land live on.</li>
                <li>Spiritual relationship with the land and sea — that Palestinians are not recent arrivals, but part of an ancient, natural cycle of life in that geography.</li>
              </ul>
              <p>
                It carries a very silent but powerful message about belonging, memory, and survival.
              </p>
            </div>
          </div>
        </motion.section>

        <CanaaniteDecorativeDivider animate={true} className="my-16" />

        {/* Icons Section */}
        <motion.section 
          className="mb-20"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <h2 className="text-3xl font-bold mb-12 text-center">Canaanite Icons</h2>
          <p className="text-xl text-center text-gray-300 max-w-3xl mx-auto mb-12">
            These icons are inspired by ancient Canaanite symbols and are used throughout the site to represent different concepts and areas.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {iconEntries.map(([name, IconComponent], index) => (
              <motion.div 
                key={name}
                variants={itemVariants}
                className="bg-black/30 backdrop-blur-sm rounded-lg p-6 border border-white/10 hover:border-white/30 transition-colors"
              >
                <div className="flex items-center justify-center mb-4 h-16 w-16 mx-auto bg-white/5 rounded-full">
                  <IconComponent />
                </div>
                <h3 className="text-xl font-bold text-center mb-2">{name}</h3>
                <p className="text-gray-300 text-center">
                  {getIconDescription(name)}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <CanaaniteDecorativeDivider animate={true} className="my-16" />

        {/* Patterns Section */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <h2 className="text-3xl font-bold mb-12 text-center">Canaanite Patterns</h2>
          <p className="text-xl text-center text-gray-300 max-w-3xl mx-auto mb-12">
            These decorative patterns are inspired by ancient Canaanite art and pottery designs, representing the waves, tides, and geometric elements found in historical artifacts.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {patternVariants.map((variant, index) => (
              <motion.div 
                key={variant}
                variants={itemVariants}
                className="relative bg-black/30 backdrop-blur-sm rounded-lg p-6 border border-white/10 hover:border-white/30 transition-colors h-64 overflow-hidden"
              >
                <h3 className="text-xl font-bold mb-4 relative z-10">{capitalizeFirstLetter(variant)}</h3>
                <p className="text-gray-300 mb-6 relative z-10">
                  {getPatternDescription(variant)}
                </p>
                <div className="absolute inset-0 opacity-50">
                  <UIPattern variant={variant as any} animate={true} opacity={0.5} />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Full-width pattern showcase */}
        <motion.section 
          className="my-20 relative h-64 rounded-xl overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          <div className="absolute inset-0">
            <CanaanitePattern opacity={0.2} animate={true} />
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Patterns in Motion</h2>
              <p className="text-xl text-gray-300">
                Like the tides, our patterns are always in motion, representing the continuous flow of history.
              </p>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

// Helper functions
function getIconDescription(name: string): string {
  const descriptions: Record<string, string> = {
    Coast: "Represents navigation, resilience, and the boundary between land and sea. Inspired by the Aleph symbol (ox head).",
    Harbour: "Symbolizes shelter, community, and safe haven. Derived from the Beth symbol (house).",
    Azure: "Represents water, depth, and the infinite horizon. Based on the Mem symbol (water).",
    Commons: "Symbolizes community, shared spaces, and dialogue. Inspired by the Taw symbol (mark/cross).",
    Profile: "Represents identity, personal agency, and human connection. Based on the Yod symbol (hand).",
    Gift: "Symbolizes generosity, exchange, and cultural sharing. Derived from the Kaph symbol (palm).",
    Language: "Represents communication, storytelling, and cultural expression. Inspired by the Pe symbol (mouth)."
  };
  
  return descriptions[name] || "An ancient Canaanite symbol representing connection to land and sea.";
}

function getPatternDescription(variant: string): string {
  const descriptions: Record<string, string> = {
    zigzag: "Represents the waves of the sea and the ups and downs of life's journey.",
    waves: "Symbolizes the continuous flow of water, time, and memory.",
    triangles: "Represents mountains, stability, and the connection between earth and sky.",
    circles: "Symbolizes unity, wholeness, and the cyclical nature of life and tides.",
    grid: "Represents structure, community, and the interconnectedness of all things."
  };
  
  return descriptions[variant] || "A pattern inspired by ancient Canaanite art.";
}

function capitalizeFirstLetter(string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export default SymbolsPage;