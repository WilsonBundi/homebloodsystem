
import { Activity, Shield, BarChart3, Users, Heart, Clock, FileCheck, Star } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: <Shield className="h-8 w-8 text-blood" />,
      title: "Secure Authentication",
      description: "Two-factor authentication and role-based access control for complete security"
    },
    {
      icon: <Activity className="h-8 w-8 text-blood" />,
      title: "Live Inventory Tracking",
      description: "Real-time blood inventory management across donation centers"
    },
    {
      icon: <BarChart3 className="h-8 w-8 text-blood" />,
      title: "Advanced Analytics",
      description: "Comprehensive reporting tools for data-driven decision making"
    },
    {
      icon: <Users className="h-8 w-8 text-blood" />,
      title: "Donor Management",
      description: "Complete donor history and eligibility tracking system"
    },
    {
      icon: <Heart className="h-8 w-8 text-blood" />,
      title: "Hospital Integration",
      description: "Seamless blood request and fulfillment workflow for hospitals"
    },
    {
      icon: <Clock className="h-8 w-8 text-blood" />,
      title: "Automated Reminders",
      description: "Smart notifications for donors about eligibility and appointments"
    },
    {
      icon: <FileCheck className="h-8 w-8 text-blood" />,
      title: "Compliance Ready",
      description: "Built to meet healthcare compliance requirements"
    },
    {
      icon: <Star className="h-8 w-8 text-blood" />,
      title: "Intuitive Experience",
      description: "User-friendly interface designed for all stakeholders"
    }
  ];

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container px-4 mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Comprehensive Blood Management</h2>
          <p className="text-gray-600 dark:text-gray-300">
            Our platform offers a complete solution for blood donation centers, hospitals, and donors
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm hover:shadow-md transition-all"
            >
              <div className="mb-4 inline-block">{feature.icon}</div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
