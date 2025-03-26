
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Droplet, ChevronRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/components/ui/use-toast';

const DonorRegistration = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    bloodType: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Registration Successful",
      description: "Your donor account has been created. You can now log in to your dashboard.",
    });
    console.log('Form submitted:', formData);
  };

  const nextStep = () => {
    setStep(step + 1);
    window.scrollTo(0, 0);
  };

  const prevStep = () => {
    setStep(step - 1);
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow pt-24 pb-16">
        <div className="container px-4 mx-auto">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <Droplet className="h-12 w-12 text-blood mx-auto mb-4" />
              <h1 className="text-3xl font-bold mb-2">Become a Blood Donor</h1>
              <p className="text-gray-600 dark:text-gray-300">
                Register to join our life-saving community
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
              <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
                <div className="flex items-center justify-between">
                  <h2 className="font-semibold">Registration Form</h2>
                  <div className="flex items-center space-x-2 text-sm">
                    <span className={`flex items-center justify-center w-6 h-6 rounded-full ${step >= 1 ? 'bg-blood text-white' : 'bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300'}`}>
                      {step > 1 ? <Check className="h-4 w-4" /> : "1"}
                    </span>
                    <span className="text-gray-400">—</span>
                    <span className={`flex items-center justify-center w-6 h-6 rounded-full ${step >= 2 ? 'bg-blood text-white' : 'bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300'}`}>
                      {step > 2 ? <Check className="h-4 w-4" /> : "2"}
                    </span>
                    <span className="text-gray-400">—</span>
                    <span className={`flex items-center justify-center w-6 h-6 rounded-full ${step >= 3 ? 'bg-blood text-white' : 'bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300'}`}>
                      3
                    </span>
                  </div>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="p-6">
                {step === 1 && (
                  <div className="space-y-6 animate-fade-in">
                    <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          id="lastName"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="dateOfBirth">Date of Birth</Label>
                      <Input
                        id="dateOfBirth"
                        name="dateOfBirth"
                        type="date"
                        value={formData.dateOfBirth}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bloodType">Blood Type</Label>
                      <Select
                        onValueChange={(value) => handleSelectChange('bloodType', value)}
                        value={formData.bloodType}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select your blood type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="A+">A+</SelectItem>
                          <SelectItem value="A-">A-</SelectItem>
                          <SelectItem value="B+">B+</SelectItem>
                          <SelectItem value="B-">B-</SelectItem>
                          <SelectItem value="AB+">AB+</SelectItem>
                          <SelectItem value="AB-">AB-</SelectItem>
                          <SelectItem value="O+">O+</SelectItem>
                          <SelectItem value="O-">O-</SelectItem>
                          <SelectItem value="unknown">I don't know</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="pt-4 flex justify-end">
                      <Button 
                        type="button" 
                        onClick={nextStep}
                        className="bg-blood hover:bg-blood-dark text-white"
                      >
                        Next Step
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-6 animate-fade-in">
                    <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="address">Address</Label>
                      <Input
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="city">City</Label>
                        <Input
                          id="city"
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="state">State</Label>
                        <Input
                          id="state"
                          name="state"
                          value={formData.state}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="zipCode">Zip Code</Label>
                        <Input
                          id="zipCode"
                          name="zipCode"
                          value={formData.zipCode}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="pt-4 flex justify-between">
                      <Button 
                        type="button" 
                        onClick={prevStep}
                        variant="outline"
                      >
                        Previous
                      </Button>
                      <Button 
                        type="button" 
                        onClick={nextStep}
                        className="bg-blood hover:bg-blood-dark text-white"
                      >
                        Next Step
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-6 animate-fade-in">
                    <h3 className="text-lg font-semibold mb-4">Account Setup</h3>
                    
                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <Input
                        id="password"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm Password</Label>
                      <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    
                    <div className="flex items-center space-x-2 pt-2">
                      <input
                        type="checkbox"
                        id="agreeTerms"
                        name="agreeTerms"
                        checked={formData.agreeTerms}
                        onChange={handleChange}
                        className="rounded border-gray-300 text-blood focus:ring-blood"
                        required
                      />
                      <label htmlFor="agreeTerms" className="text-sm text-gray-600 dark:text-gray-300">
                        I agree to the <a href="#" className="text-blood hover:underline">Terms of Service</a> and <a href="#" className="text-blood hover:underline">Privacy Policy</a>
                      </label>
                    </div>

                    <div className="pt-4 flex justify-between">
                      <Button 
                        type="button" 
                        onClick={prevStep}
                        variant="outline"
                      >
                        Previous
                      </Button>
                      <Button 
                        type="submit"
                        className="bg-blood hover:bg-blood-dark text-white"
                      >
                        Complete Registration
                      </Button>
                    </div>
                  </div>
                )}
              </form>
            </div>

            <div className="mt-8 text-center">
              <p className="text-gray-600 dark:text-gray-300">
                Already registered? <a href="/donor-dashboard" className="text-blood hover:underline">Sign in to your account</a>
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default DonorRegistration;
