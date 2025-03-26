
import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Testimonials from '@/components/Testimonials';
import BloodDonationProcess from '@/components/BloodDonationProcess';
import DonationCountdown from '@/components/DonationCountdown';
import Footer from '@/components/Footer';
import { ChevronRight, Droplet, Heart, Activity } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Index = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <Hero />
        <BloodDonationProcess />
        <Features />
        <DonationCountdown />
        
        {/* Blood types section */}
        <section className="py-16 bg-white dark:bg-gray-800">
          <div className="container px-4 mx-auto">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Understanding Blood Types</h2>
              <p className="text-gray-600 dark:text-gray-300">
                Blood types play a crucial role in transfusions. Learn about the different types and compatibility.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { type: 'A+', description: 'Can receive from: A+, A-, O+, O-. Can donate to: A+, AB+.' },
                { type: 'B+', description: 'Can receive from: B+, B-, O+, O-. Can donate to: B+, AB+.' },
                { type: 'AB+', description: 'Universal recipient - can receive from any blood type. Can donate to: AB+ only.' },
                { type: 'O+', description: 'Can receive from: O+, O-. Can donate to: O+, A+, B+, AB+.' },
                { type: 'A-', description: 'Can receive from: A-, O-. Can donate to: A+, A-, AB+, AB-.' },
                { type: 'B-', description: 'Can receive from: B-, O-. Can donate to: B+, B-, AB+, AB-.' },
                { type: 'AB-', description: 'Can receive from: AB-, A-, B-, O-. Can donate to: AB+, AB-.' },
                { type: 'O-', description: 'Universal donor - can donate to any blood type. Can receive from: O- only.' }
              ].map((blood) => (
                <div 
                  key={blood.type} 
                  className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 text-center hover:shadow-md transition-all border border-transparent hover:border-blood/20"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blood/10 mb-4">
                    <span className="text-xl font-bold text-blood">{blood.type}</span>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Type {blood.type}</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    {blood.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        <Testimonials />
        
        {/* CTA section */}
        <section className="py-16 bg-gradient-to-r from-blood/90 to-blood-dark/90 text-white">
          <div className="container px-4 mx-auto">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Make a Difference?</h2>
              <p className="text-xl opacity-90 mb-8">
                Every donation can save up to three lives. Join our network of donors today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" variant="secondary" className="font-medium px-8 py-3 rounded-md">
                  <Link to="/donor-registration">
                    Register as Donor
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10 font-medium px-8 py-3 rounded-md">
                  <Link to="/donor-dashboard">Sign In</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        {/* Stats section */}
        <section className="py-16 bg-white dark:bg-gray-800">
          <div className="container px-4 mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <Droplet className="h-10 w-10 text-blood" />
                </div>
                <h3 className="text-4xl font-bold mb-2">10,000+</h3>
                <p className="text-gray-600 dark:text-gray-300">Donations Collected</p>
              </div>
              
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <Heart className="h-10 w-10 text-blood" />
                </div>
                <h3 className="text-4xl font-bold mb-2">30,000+</h3>
                <p className="text-gray-600 dark:text-gray-300">Lives Saved</p>
              </div>
              
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <Activity className="h-10 w-10 text-blood" />
                </div>
                <h3 className="text-4xl font-bold mb-2">500+</h3>
                <p className="text-gray-600 dark:text-gray-300">Partnered Hospitals</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
