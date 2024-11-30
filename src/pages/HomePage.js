import React, { useState, useEffect } from 'react';
import Headbar from "../components/HomePage/Headbar";
import Logoshow from "../components/comonCompo/Logoshow";
import ShowLaptop from "../components/comonCompo/ShowLaptop";
import BG from "../images/background.jpg";
import BGhome from "../images/BGHome.jpg";
import { motion, AnimatePresence } from "framer-motion";
//import LOGO from '../images/logo.png'

export default function HomePage() {
  // Array of phrases to cycle through
  const phrases = [
    "Island Wide Delivery",
    "Fast & Reliable Service", 
    "Nationwide Coverage",
    "Connecting Every Corner",
    "Your Trusted Delivery Partner"
  ];

  const [currentPhrase, setCurrentPhrase] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhrase((prev) => (prev + 1) % phrases.length);
    }, 3000); // Change phrase every 3 seconds

    return () => clearInterval(interval);
  }, [phrases.length]); // Added phrases.length to dependency array

  return (
    <div
      className="absolute inset-0 bg-center bg-no-repeat bg-cover"
      style={{
        backgroundImage: `url(${BG})`,
      }}
    >
      {/* Fixed Headbar */}
      <div className="fixed top-0 left-0 z-50 w-full">
        <Headbar />
      </div>

      {/* Scrollable Content */}
      <div className="pt-[80px] overflow-y-auto h-screen">
        {/* Section with BGHome background */}
        <div className="relative h-[300px] sm:h-[400px] md:h-[500px] bg-cover bg-center flex items-center justify-center text-white">
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-center bg-cover"
            style={{
              backgroundImage: `url(${BGhome})`,
              opacity: 0.6,
            }}
          ></div>

          {/* Text Overlay with Animation */}
          <div className="relative items-center text-center">
            <motion.div
              key="island-text"
              className="text-orange-500 text-[60px] sm:text-[100px] md:text-[150px] font-bold"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            ><div className='flex justify-center'>
              LapLanka<span className='text-[#19191A]'>.lk</span>
              
            </div>
              
            </motion.div>

            {/* Animated Phrase */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentPhrase}
                className="text-[#19191A] text-xl sm:text-3xl md:text-6xl font-bold"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                {phrases[currentPhrase]}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Logo Show and Laptop Section */}
        <div className="pt-20 md:pt-20">
          <div className="flex justify-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5 }}
            >
              <Logoshow />
            </motion.div>
          </div>
          <div className="mt-10 md:mt-20">
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <ShowLaptop />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}