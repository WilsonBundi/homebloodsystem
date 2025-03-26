
import { motion } from 'framer-motion';
import { ClipboardCheck, Clock, Heart, Droplet } from 'lucide-react';

const BloodDonationProcess = () => {
  const steps = [
    {
      icon: <ClipboardCheck className="h-8 w-8 text-blood" />,
      title: "Register",
      description: "Fill out a quick registration form with your personal details"
    },
    {
      icon: <Clock className="h-8 w-8 text-blood" />,
      title: "Schedule",
      description: "Book your appointment at a convenient donation center"
    },
    {
      icon: <Droplet className="h-8 w-8 text-blood" />,
      title: "Donate",
      description: "The donation process is safe and takes only about 10 minutes"
    },
    {
      icon: <Heart className="h-8 w-8 text-blood" />,
      title: "Save Lives",
      description: "Your donation can help save up to three lives"
    }
  ];

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container px-4 mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How Blood Donation Works</h2>
          <p className="text-gray-600 dark:text-gray-300">
            The process is simple, safe, and life-saving
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-0">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative w-full md:w-1/4 px-4 mb-8 md:mb-0"
            >
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-all h-full">
                <div className="flex justify-center">
                  <div className="flex items-center justify-center w-16 h-16 rounded-full bg-blood/10 mb-4">
                    {step.icon}
                  </div>
                </div>
                <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">{step.description}</p>
              </div>
              
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 w-8 h-8">
                  <div className="w-8 h-0.5 bg-gray-300 dark:bg-gray-700"></div>
                  <div className="absolute right-0 w-2 h-2 border-t-2 border-r-2 border-gray-300 dark:border-gray-700 transform rotate-45 -mt-0.5"></div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BloodDonationProcess;
