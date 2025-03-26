
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Droplet, Menu, LogIn, UserPlus, Hospital, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Define the different user roles in the system
type UserRole = 'donor' | 'hospital' | 'admin' | 'guest';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [userRole, setUserRole] = useState<UserRole>('guest');
  const location = useLocation();

  // Determine user role based on current route
  // This is a simplified approach - in a real app, you'd use auth context
  useEffect(() => {
    if (location.pathname.includes('donor-dashboard')) {
      setUserRole('donor');
    } else if (location.pathname.includes('hospital-dashboard')) {
      setUserRole('hospital');
    } else if (location.pathname.includes('admin-dashboard')) {
      setUserRole('admin');
    } else {
      setUserRole('guest');
    }
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Define navigation links based on user role
  const getNavLinks = (role: UserRole) => {
    const allLinks = [
      { 
        name: 'Donor Registration', 
        path: '/donor-registration', 
        icon: <UserPlus size={16} />, 
        roles: ['guest']
      },
      { 
        name: 'Donor Dashboard', 
        path: '/donor-dashboard', 
        icon: <LogIn size={16} />, 
        roles: ['guest', 'donor'] 
      },
      { 
        name: 'Hospital Dashboard', 
        path: '/hospital-dashboard', 
        icon: <Hospital size={16} />, 
        roles: ['guest', 'hospital', 'admin'] 
      },
      { 
        name: 'Admin Dashboard', 
        path: '/admin-dashboard', 
        icon: <BarChart3 size={16} />, 
        roles: ['admin'] 
      }
    ];

    // Filter links based on role
    return allLinks.filter(link => 
      role === 'guest' ? link.roles.includes('guest') : link.roles.includes(role)
    );
  };

  const navLinks = getNavLinks(userRole);

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-sm' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-2 transition-opacity hover:opacity-80"
          >
            <Droplet className="h-6 w-6 text-blood animate-pulse-subtle" />
            <span className="font-semibold text-xl">HemoTrace</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.path}
                className="text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-blood dark:hover:text-blood-light transition-colors px-1 py-2 rounded-md flex items-center space-x-1"
              >
                {link.icon}
                <span>{link.name}</span>
              </Link>
            ))}
            
            {/* User account dropdown - show when logged in */}
            {userRole !== 'guest' && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="gap-1 px-2">
                    <span className="hidden sm:inline-block">My Account</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Link to="/" className="w-full">Sign Out</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[260px] sm:w-[300px]">
                <div className="flex flex-col space-y-4 mt-6">
                  {navLinks.map((link) => (
                    <Link 
                      key={link.name} 
                      to={link.path}
                      className="flex items-center space-x-2 px-2 py-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    >
                      {link.icon}
                      <span>{link.name}</span>
                    </Link>
                  ))}
                  
                  {/* Show sign out option when logged in */}
                  {userRole !== 'guest' && (
                    <Link 
                      to="/"
                      className="flex items-center space-x-2 px-2 py-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-gray-600 dark:text-gray-300"
                    >
                      <span>Sign Out</span>
                    </Link>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
