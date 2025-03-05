'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LoadingScreen = () => {
   const [progress, setProgress] = useState(0);
   const [isLoaded, setIsLoaded] = useState(false);
   const [showOverlay, setShowOverlay] = useState(false);

   useEffect(() => {
      const interval = setInterval(() => {
         setProgress((prevProgress) => {
            const newProgress = prevProgress + Math.random() * 5 + 2; // Smaller increments for smoothness

            if (newProgress >= 100) {
               clearInterval(interval);
               setTimeout(() => setShowOverlay(true), 500); // Delay before slide effect
               setTimeout(() => setIsLoaded(true), 1500); // Ensure white slide covers before removing loading screen
               return 100;
            }
            return newProgress;
         });
      }, 70); // Faster updates for smoother effect

      return () => clearInterval(interval);
   }, []);

   if (isLoaded) return null; // Remove loading screen after transition

   return (
      <div className="fixed inset-0 z-50 flex items-start justify-start overflow-hidden">
         {/* Background with smoother gradient transition */}
         <motion.div
            className="absolute inset-0 bg-purple-600"
            animate={{
               background: `linear-gradient(to top, #8b5cf6 ${progress}%, #000000 ${progress}%)`,
            }}
            transition={{ ease: 'easeOut', duration: 0.5 }}
         />

         {/* Center Logo or Message */}
         <div className="font-neue font-medium z-10 text-white text-2xl lg:text-4xl font-bold p-8">
            We are YARA
         </div>

         {/* Progress Indicator */}
         <div className="font-neue font-medium absolute bottom-8 right-8 text-white flex flex-col items-end">
            <motion.div
               className="text-9xl lg:text-[250px] font-bold mb-2"
               animate={{ opacity: [0.8, 1, 0.8] }}
               transition={{ repeat: Infinity, duration: 1.5 }}
            >
               {Math.round(progress)}%
            </motion.div>
         </div>

         {/* White Slide-Out Effect */}
         <AnimatePresence>
            {showOverlay && (
               <motion.div
                  className="absolute inset-0 bg-white"
                  initial={{ y: '100%' }}
                  animate={{ y: '0%' }}
                  exit={{ y: '-100%' }}
                  transition={{ duration: 1, ease: 'easeInOut' }}
               />
            )}
         </AnimatePresence>
      </div>
   );
};

export default LoadingScreen;
