
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Droplet, User, Calendar, Clock, FileText, Bell, LogOut, ChevronRight, Layers } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

// Simulated data
const mockDonorData = {
  name: "wilson",
  bloodType: "O+",
  nextEligibleDate: "2025-02-15",
  totalDonations: 8,
  points: 240,
  lastDonation: "2025-03-15",
  upcomingAppointment: "2025-01-20",
  recentDonations: [
    { id: "DON-7845", date: "2024-09-15", location: "Central Blood Bank", type: "Whole Blood" },
    { id: "DON-6542", date: "2024-06-12", location: "City Hospital", type: "Whole Blood" },
    { id: "DON-5321", date: "2024-03-05", location: "Red Cross Center", type: "Plasma" },
    { id: "DON-4123", date: "2024-12-18", location: "Central Blood Bank", type: "Whole Blood" },
  ],
  notifications: [
    { id: 1, message: "You are now eligible to donate again", date: "2024-12-01", read: false },
    { id: 2, message: "Thank you for your recent donation", date: "2024-09-16", read: true },
    { id: 3, message: "Blood drive in your area next week", date: "2024-09-10", read: true },
  ],
  certificates: [
    { id: "CERT-123", name: "5 Donations Achievement", date: "2024-02-10" },
    { id: "CERT-089", name: "Donor Recognition Award", date: "2024-11-05" },
  ]
};

const LoginForm = ({ onLogin }: { onLogin: () => void }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Droplet className="h-12 w-12 text-blood mx-auto mb-4" />
          <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
          <p className="text-gray-600 dark:text-gray-300">
            Sign in to access your donor dashboard
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Donor Sign In</CardTitle>
            <CardDescription>
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="bundi.email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <a href="#" className="text-sm text-blood hover:underline">
                    Forgot password?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-blood hover:bg-blood-dark text-white"
              >
                Sign In
              </Button>
            </form>
            
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Don't have an account?{" "}
                <a href="/donor-registration" className="text-blood hover:underline">
                  Register as a donor
                </a>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const DonorDashboard = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const donor = mockDonorData;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow pt-24 pb-16">
        <div className="container px-4 mx-auto">
          {!isLoggedIn ? (
            <LoginForm onLogin={() => setIsLoggedIn(true)} />
          ) : (
            <div className="animate-fade-in">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
                <div className="flex items-center mb-4 md:mb-0">
                  <div className="w-16 h-16 bg-blood/10 rounded-full flex items-center justify-center mr-4">
                    <User className="h-8 w-8 text-blood" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold">{donor.name}</h1>
                    <div className="flex items-center mt-1">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blood/10 text-blood">
                        <Droplet className="h-3 w-3 mr-1" />
                        {donor.bloodType}
                      </span>
                      <span className="ml-2 text-sm text-gray-600 dark:text-gray-300">
                        Next eligible: {new Date(donor.nextEligibleDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-4">
                  <Button variant="outline" className="text-sm">
                    <Calendar className="h-4 w-4 mr-2" />
                    Schedule Donation
                  </Button>
                  <Button variant="ghost" className="text-sm">
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center text-lg">
                      <Droplet className="h-5 w-5 mr-2 text-blood" />
                      Total Donations
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">{donor.totalDonations}</div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                      Last donation: {new Date(donor.lastDonation).toLocaleDateString()}
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center text-lg">
                      <Layers className="h-5 w-5 mr-2 text-blood" />
                      Donor Points
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">{donor.points}</div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                      Redeem for rewards
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center text-lg">
                      <Clock className="h-5 w-5 mr-2 text-blood" />
                      Next Appointment
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-xl font-medium">
                      {donor.upcomingAppointment ? new Date(donor.upcomingAppointment).toLocaleDateString() : "None scheduled"}
                    </div>
                    {donor.upcomingAppointment && (
                      <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                        Central Blood Bank, 10:00 AM
                      </p>
                    )}
                  </CardContent>
                </Card>
              </div>

              <Tabs defaultValue="history">
                <TabsList className="mb-6">
                  <TabsTrigger value="history">Donation History</TabsTrigger>
                  <TabsTrigger value="notifications">Notifications</TabsTrigger>
                  <TabsTrigger value="certificates">Certificates</TabsTrigger>
                </TabsList>
                
                <TabsContent value="history" className="animate-fade-in">
                  <Card>
                    <CardHeader>
                      <CardTitle>Your Donation History</CardTitle>
                      <CardDescription>
                        View all your previous blood donations
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b">
                              <th className="text-left py-3 px-4 font-medium">Donation ID</th>
                              <th className="text-left py-3 px-4 font-medium">Date</th>
                              <th className="text-left py-3 px-4 font-medium">Location</th>
                              <th className="text-left py-3 px-4 font-medium">Type</th>
                              <th className="text-right py-3 px-4 font-medium">Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {donor.recentDonations.map((donation, index) => (
                              <tr key={donation.id} className={index !== donor.recentDonations.length - 1 ? "border-b" : ""}>
                                <td className="py-3 px-4">{donation.id}</td>
                                <td className="py-3 px-4">{new Date(donation.date).toLocaleDateString()}</td>
                                <td className="py-3 px-4">{donation.location}</td>
                                <td className="py-3 px-4">{donation.type}</td>
                                <td className="py-3 px-4 text-right">
                                  <Button variant="ghost" size="sm" className="h-8">
                                    View Details
                                  </Button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="notifications" className="animate-fade-in">
                  <Card>
                    <CardHeader>
                      <CardTitle>Your Notifications</CardTitle>
                      <CardDescription>
                        Stay updated on donation opportunities and system alerts
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {donor.notifications.map((notification) => (
                          <div key={notification.id} className={`p-4 rounded-lg border ${notification.read ? 'bg-transparent' : 'bg-blue-50 dark:bg-blue-900/10'}`}>
                            <div className="flex items-start justify-between">
                              <div className="flex items-start">
                                <Bell className={`h-5 w-5 mt-0.5 mr-3 ${notification.read ? 'text-gray-400' : 'text-blood'}`} />
                                <div>
                                  <p className={`${notification.read ? 'text-gray-600 dark:text-gray-300' : 'font-medium'}`}>
                                    {notification.message}
                                  </p>
                                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                    {new Date(notification.date).toLocaleDateString()}
                                  </p>
                                </div>
                              </div>
                              {!notification.read && (
                                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100">
                                  New
                                </span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="certificates" className="animate-fade-in">
                  <Card>
                    <CardHeader>
                      <CardTitle>Your Certificates</CardTitle>
                      <CardDescription>
                        Recognition for your contribution to saving lives
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {donor.certificates.map((cert) => (
                          <div key={cert.id} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                            <div className="flex items-center mb-2">
                              <FileText className="h-5 w-5 text-blood mr-2" />
                              <h3 className="font-medium">{cert.name}</h3>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                              Issued on {new Date(cert.date).toLocaleDateString()}
                            </p>
                            <Button variant="outline" size="sm" className="w-full">
                              Download Certificate
                            </Button>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default DonorDashboard;
