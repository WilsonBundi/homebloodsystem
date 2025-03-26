
import { useState, useEffect } from 'react';
import { Droplet, Heart, Activity, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 100 }
    }
  };

  const dropletVariants = {
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden">
      {/* Background abstraction */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-blood/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      <div className="container px-4 mx-auto relative z-10">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial="hidden"
          animate={isLoaded ? "visible" : "hidden"}
          variants={containerVariants}
        >
          <motion.div 
            className="flex justify-center mb-6"
            variants={itemVariants}
          >
            <motion.div
              variants={dropletVariants}
              animate="animate"
            >
              <Droplet className="h-16 w-16 text-blood" />
            </motion.div>
          </motion.div>

          <motion.h1 
            className="text-4xl md:text-6xl font-bold mb-6 leading-tight tracking-tight"
            variants={itemVariants}
          >
            Efficient Blood Management. 
            <span className="text-blood block"> Saving Lives Together.</span>
          </motion.h1>

          <motion.p 
            className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto"
            variants={itemVariants}
          >
            A comprehensive platform for donors, hospitals, and administrators to streamline the vital process of blood donation and distribution.
          </motion.p>

          <motion.div 
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            variants={itemVariants}
          >
            <Button asChild size="lg" className="bg-blood hover:bg-blood-dark text-white font-medium px-8 py-3 rounded-md shadow-md hover:shadow-lg transition-all">
              <Link to="/donor-registration">Become a Donor</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="font-medium px-8 py-3 rounded-md">
              <Link to="/donor-dashboard">Donor Login</Link>
            </Button>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16"
            variants={itemVariants}
          >
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm hover:shadow-md transition-all">
              <div className="flex justify-center items-center w-12 h-12 rounded-full bg-red-50 dark:bg-gray-700 mb-4 mx-auto">
                <Droplet className="text-blood h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Donor Registration</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Quick and secure registration process for blood donors
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm hover:shadow-md transition-all">
              <div className="flex justify-center items-center w-12 h-12 rounded-full bg-red-50 dark:bg-gray-700 mb-4 mx-auto">
                <Activity className="text-blood h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Hospital Requests</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Streamlined blood requisition system for medical facilities
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm hover:shadow-md transition-all">
              <div className="flex justify-center items-center w-12 h-12 rounded-full bg-red-50 dark:bg-gray-700 mb-4 mx-auto">
                <Heart className="text-blood h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Transfusion Tracking</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Complete visibility from donation to transfusion
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
