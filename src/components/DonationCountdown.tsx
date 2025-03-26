
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const DonationCountdown = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    // Set target date to 7 days from now for demo purposes
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 7);
    
    const timer = setInterval(() => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();
      
      if (difference <= 0) {
        clearInterval(timer);
        return;
      }
      
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);
      
      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  const timeBlocks = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds }
  ];

  return (
    <section className="py-16 bg-white dark:bg-gray-800 overflow-hidden relative">
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 -mr-20 opacity-10">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="w-64 h-64 rounded-full border-8 border-blood"
        />
      </div>
      <div className="absolute bottom-0 left-0 -ml-10 -mb-10 opacity-10">
        <motion.div 
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="w-40 h-40 rounded-full bg-blood-light/20"
        />
      </div>
      
      <div className="container px-4 mx-auto relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Next Blood Drive</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Our next community blood drive is approaching! Every donation can save up to three lives. 
                Register now and be part of something amazing.
              </p>
              <Button asChild variant="default" className="bg-blood hover:bg-blood-dark text-white font-medium px-8 py-3 rounded-md">
                <Link to="/donor-registration">Register Now</Link>
              </Button>
            </div>
            
            <div>
              <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-8 shadow-sm">
                <h3 className="text-xl font-semibold mb-6 text-center">Countdown to Blood Drive</h3>
                <div className="grid grid-cols-4 gap-2">
                  {timeBlocks.map((block, index) => (
                    <div key={index} className="text-center">
                      <div className="bg-white dark:bg-gray-800 rounded-lg p-3 shadow-sm">
                        <motion.div
                          key={block.value} // Re-render animation when value changes
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ duration: 0.3 }}
                          className="text-2xl md:text-3xl font-bold text-blood"
                        >
                          {block.value.toString().padStart(2, '0')}
                        </motion.div>
                      </div>
                      <p className="text-xs mt-2 text-gray-500 dark:text-gray-400">{block.label}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
                  Location: Central Community Center
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DonationCountdown;
