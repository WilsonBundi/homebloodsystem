
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    {
      quote: "Donating blood through HemoTrace was incredibly smooth and efficient. The platform made it easy to schedule my appointment and track my donation history.",
      author: "Sarah Johnson",
      role: "Regular Donor",
      image: "https://i.pravatar.cc/100?img=1"
    },
    {
      quote: "As a hospital administrator, HemoTrace has revolutionized how we manage blood requests. The real-time inventory tracking is a game-changer for emergency situations.",
      author: "Dr. Michael Chen",
      role: "Hospital Director",
      image: "https://i.pravatar.cc/100?img=3"
    },
    {
      quote: "I've been donating for years, but HemoTrace made the process so much more transparent. I love being able to see the impact of my donations.",
      author: "Robert Williams",
      role: "10-Year Donor",
      image: "https://i.pravatar.cc/100?img=4"
    }
  ];

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container px-4 mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Users Say</h2>
          <p className="text-gray-600 dark:text-gray-300">
            Real experiences from donors and healthcare professionals
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-sm hover:shadow-md transition-all relative"
            >
              <div className="absolute -top-5 left-8">
                <Quote className="h-10 w-10 text-blood/20 rotate-180" />
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-6 pt-4 italic">
                "{testimonial.quote}"
              </p>
              <div className="flex items-center">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.author}
                  className="w-12 h-12 rounded-full mr-4 object-cover"
                />
                <div>
                  <h4 className="font-semibold">{testimonial.author}</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
