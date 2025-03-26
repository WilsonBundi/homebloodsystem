
import { Droplet, Mail, MapPin, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 dark:bg-gray-900 pt-16 pb-8">
      <div className="container px-4 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Droplet className="h-6 w-6 text-blood" />
              <span className="font-semibold text-xl">HemoTrace</span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-4 max-w-xs">
              A comprehensive blood management system designed to save lives through efficient donation and distribution.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 dark:text-gray-400 hover:text-blood dark:hover:text-blood-light transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/donor-registration" className="text-gray-600 dark:text-gray-400 hover:text-blood dark:hover:text-blood-light transition-colors">
                  Become a Donor
                </Link>
              </li>
              <li>
                <Link to="/donor-dashboard" className="text-gray-600 dark:text-gray-400 hover:text-blood dark:hover:text-blood-light transition-colors">
                  Donor Dashboard
                </Link>
              </li>
              <li>
                <Link to="/hospital-dashboard" className="text-gray-600 dark:text-gray-400 hover:text-blood dark:hover:text-blood-light transition-colors">
                  Hospital Portal
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-blood dark:hover:text-blood-light transition-colors">
                  Blood Donation FAQ
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-blood dark:hover:text-blood-light transition-colors">
                  Eligibility Requirements
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-blood dark:hover:text-blood-light transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-blood dark:hover:text-blood-light transition-colors">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-blood shrink-0 mt-0.5" />
                <span className="text-gray-600 dark:text-gray-400">
                  Blood Center Avenue,<br />Medical District, Kirinyaga
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-blood shrink-0" />
                <span className="text-gray-600 dark:text-gray-400">(123) 456-7890</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-blood shrink-0" />
                <span className="text-gray-600 dark:text-gray-400">contact@hemotrace.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-200 dark:border-gray-800">
          <div className="flex flex-col md:flex-row md:justify-between items-center">
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 md:mb-0">
              © {currentYear} HemoTrace. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-blood dark:hover:text-blood-light transition-colors">
                Privacy
              </a>
              <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-blood dark:hover:text-blood-light transition-colors">
                Terms
              </a>
              <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-blood dark:hover:text-blood-light transition-colors">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
