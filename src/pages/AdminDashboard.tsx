
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { BarChart2, PieChart, LineChart, Users, Droplet, Clock, Hospital, Shield, Download, Plus, Search, Filter, Eye, BarChart, Activity, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BarChart as RechartBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, PieChart as RechartPieChart, Pie, Cell } from 'recharts';

// Simulated data
const mockAdminData = {
  inventorySummary: {
    totalUnits: 450,
    criticalTypes: 2,
    lowTypes: 2,
    recentDonations: 24,
    pendingRequests: 12,
  },
  inventoryByType: [
    { name: "A+", units: 120 },
    { name: "A-", units: 45 },
    { name: "B+", units: 75 },
    { name: "B-", units: 25 },
    { name: "AB+", units: 35 },
    { name: "AB-", units: 15 },
    { name: "O+", units: 95 },
    { name: "O-", units: 40 },
  ],
  donationsByMonth: [
    { month: "Jan", donations: 145 },
    { month: "Feb", donations: 132 },
    { month: "Mar", donations: 164 },
    { month: "Apr", donations: 128 },
    { month: "May", donations: 143 },
    { month: "Jun", donations: 167 },
    { month: "Jul", donations: 188 },
    { month: "Aug", donations: 174 },
    { month: "Sep", donations: 142 },
    { month: "Oct", donations: 159 },
    { month: "Nov", donations: 187 },
    { month: "Dec", donations: 201 },
  ],
  recentHospitalRequests: [
    { id: "REQ-8761", hospital: "City General Hospital", date: "2023-11-30", type: "O-", units: 2, status: "In Progress", urgency: "Urgent" },
    { id: "REQ-8758", hospital: "Memorial Medical Center", date: "2023-11-29", type: "B+", units: 3, status: "In Progress", urgency: "Routine" },
    { id: "REQ-8752", hospital: "St. Mary's Hospital", date: "2023-11-28", type: "O+", units: 3, status: "Fulfilled", urgency: "Routine" },
    { id: "REQ-8745", hospital: "University Medical Center", date: "2023-11-25", type: "AB-", units: 2, status: "Fulfilled", urgency: "Urgent" },
  ],
  donorDemographics: {
    byAge: [
      { name: "18-24", value: 20 },
      { name: "25-34", value: 35 },
      { name: "35-44", value: 25 },
      { name: "45-54", value: 15 },
      { name: "55+", value: 5 },
    ],
    byGender: [
      { name: "Male", value: 55 },
      { name: "Female", value: 44 },
      { name: "Other", value: 1 },
    ],
    byFrequency: [
      { name: "First time", value: 30 },
      { name: "Occasional", value: 45 },
      { name: "Regular", value: 25 },
    ]
  }
};

const COLORS = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'];

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
          <Shield className="h-12 w-12 text-blood mx-auto mb-4" />
          <h1 className="text-3xl font-bold mb-2">Admin Portal</h1>
          <p className="text-gray-600 dark:text-gray-300">
            Sign in to access the blood management system administration
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Admin Sign In</CardTitle>
            <CardDescription>
              Enter your credentials to access the admin dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium">Email</label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium">Password</label>
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
              
              <div className="flex items-center space-x-2 pt-2">
                <input
                  type="checkbox"
                  id="twoFactor"
                  className="rounded border-gray-300 text-blood focus:ring-blood"
                />
                <label htmlFor="twoFactor" className="text-sm text-gray-600 dark:text-gray-300">
                  Use Google Authenticator
                </label>
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-blood hover:bg-blood-dark text-white"
              >
                Sign In
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const AdminDashboard = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const admin = mockAdminData;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow pt-24 pb-16">
        <div className="container px-4 mx-auto">
          {!isLoggedIn ? (
            <LoginForm onLogin={() => setIsLoggedIn(true)} />
          ) : (
            <div className="animate-fade-in">
              <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
                <p className="text-gray-600 dark:text-gray-300">
                  Comprehensive overview of the blood management system
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center text-lg">
                      <Droplet className="h-5 w-5 mr-2 text-blood" />
                      Blood Units
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">{admin.inventorySummary.totalUnits}</div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                      Total units in inventory
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center text-lg">
                      <Users className="h-5 w-5 mr-2 text-blood" />
                      Recent Donations
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">{admin.inventorySummary.recentDonations}</div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                      In the last 24 hours
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center text-lg">
                      <Hospital className="h-5 w-5 mr-2 text-blood" />
                      Pending Requests
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">{admin.inventorySummary.pendingRequests}</div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                      Awaiting fulfillment
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center text-lg">
                      <Activity className="h-5 w-5 mr-2 text-blood" />
                      Critical Levels
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">{admin.inventorySummary.criticalTypes}</div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                      Blood types at critical level
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle>Donations Trend</CardTitle>
                    <CardDescription>Monthly blood donations over the past year</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <RechartBarChart
                          data={admin.donationsByMonth}
                          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="donations" fill="#EF4444" />
                        </RechartBarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Inventory by Blood Type</CardTitle>
                    <CardDescription>Current blood units distribution</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <RechartPieChart>
                          <Pie
                            data={admin.inventoryByType}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="units"
                            nameKey="name"
                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          >
                            {admin.inventoryByType.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </RechartPieChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Tabs defaultValue="requests" className="mb-8">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6">
                  <TabsList>
                    <TabsTrigger value="requests">Hospital Requests</TabsTrigger>
                    <TabsTrigger value="donor-stats">Donor Statistics</TabsTrigger>
                    <TabsTrigger value="reports">Generated Reports</TabsTrigger>
                  </TabsList>
                  
                  <div className="flex items-center space-x-2 mt-4 sm:mt-0">
                    <Button variant="outline" size="sm" className="h-8">
                      <Download className="h-3 w-3 mr-2" />
                      Export Data
                    </Button>
                  </div>
                </div>
                
                <TabsContent value="requests" className="animate-fade-in">
                  <Card>
                    <CardHeader className="pb-3">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div>
                          <CardTitle>Recent Hospital Requests</CardTitle>
                          <CardDescription>
                            Recent blood requests from hospitals
                          </CardDescription>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <Input
                              placeholder="Search requests..."
                              className="pl-10 h-9 w-full sm:w-[200px]"
                            />
                          </div>
                          <Button variant="outline" size="sm" className="h-9">
                            <Filter className="h-4 w-4 mr-2" />
                            Filter
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b">
                              <th className="text-left py-3 px-4 font-medium">Request ID</th>
                              <th className="text-left py-3 px-4 font-medium">Hospital</th>
                              <th className="text-left py-3 px-4 font-medium">Date</th>
                              <th className="text-left py-3 px-4 font-medium">Type</th>
                              <th className="text-left py-3 px-4 font-medium">Units</th>
                              <th className="text-left py-3 px-4 font-medium">Status</th>
                              <th className="text-right py-3 px-4 font-medium">Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {admin.recentHospitalRequests.map((req, index) => (
                              <tr key={req.id} className={index !== admin.recentHospitalRequests.length - 1 ? "border-b" : ""}>
                                <td className="py-3 px-4">{req.id}</td>
                                <td className="py-3 px-4">{req.hospital}</td>
                                <td className="py-3 px-4">{new Date(req.date).toLocaleDateString()}</td>
                                <td className="py-3 px-4">
                                  <span className="flex items-center">
                                    <Droplet className="h-3 w-3 text-blood mr-1" />
                                    {req.type}
                                  </span>
                                </td>
                                <td className="py-3 px-4">{req.units}</td>
                                <td className="py-3 px-4">
                                  <span className={`text-xs px-2 py-0.5 rounded-full ${req.status === 'Fulfilled' ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' : 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'}`}>
                                    {req.status}
                                  </span>
                                </td>
                                <td className="py-3 px-4 text-right">
                                  <Button variant="ghost" size="sm" className="h-8">
                                    <Eye className="h-4 w-4 mr-2" />
                                    View
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
                
                <TabsContent value="donor-stats" className="animate-fade-in">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Donors by Age</CardTitle>
                        <CardDescription>Age distribution of blood donors</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="h-[250px]">
                          <ResponsiveContainer width="100%" height="100%">
                            <RechartPieChart>
                              <Pie
                                data={admin.donorDemographics.byAge}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="value"
                                nameKey="name"
                                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                              >
                                {admin.donorDemographics.byAge.map((entry, index) => (
                                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                              </Pie>
                              <Tooltip />
                            </RechartPieChart>
                          </ResponsiveContainer>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle>Donors by Gender</CardTitle>
                        <CardDescription>Gender distribution of blood donors</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="h-[250px]">
                          <ResponsiveContainer width="100%" height="100%">
                            <RechartPieChart>
                              <Pie
                                data={admin.donorDemographics.byGender}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="value"
                                nameKey="name"
                                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                              >
                                {admin.donorDemographics.byGender.map((entry, index) => (
                                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                              </Pie>
                              <Tooltip />
                            </RechartPieChart>
                          </ResponsiveContainer>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle>Donation Frequency</CardTitle>
                        <CardDescription>How often donors give blood</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="h-[250px]">
                          <ResponsiveContainer width="100%" height="100%">
                            <RechartPieChart>
                              <Pie
                                data={admin.donorDemographics.byFrequency}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="value"
                                nameKey="name"
                                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                              >
                                {admin.donorDemographics.byFrequency.map((entry, index) => (
                                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                              </Pie>
                              <Tooltip />
                            </RechartPieChart>
                          </ResponsiveContainer>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
                
                <TabsContent value="reports" className="animate-fade-in">
                  <Card>
                    <CardHeader className="pb-3">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div>
                          <CardTitle>Generated Reports</CardTitle>
                          <CardDescription>
                            Reports generated for analysis and auditing
                          </CardDescription>
                        </div>
                        
                        <div>
                          <Button className="bg-blood hover:bg-blood-dark text-white">
                            <Plus className="h-4 w-4 mr-2" />
                            Generate Report
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                          <div className="flex items-center mb-2">
                            <BarChart className="h-5 w-5 text-blood mr-2" />
                            <h3 className="font-medium">Monthly Inventory Report</h3>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                            Comprehensive analysis of blood inventory levels for January 12 2025
                          </p>
                          <div className="flex justify-between items-center">
                            <span className="text-xs text-gray-500">Generated on  Jan 12, 2025</span>
                            <Button variant="outline" size="sm">
                              <Download className="h-3 w-3 mr-2" />
                              Download
                            </Button>
                          </div>
                        </div>
                        
                        <div className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                          <div className="flex items-center mb-2">
                            <PieChart className="h-5 w-5 text-blood mr-2" />
                            <h3 className="font-medium">Donor Demographics Q4</h3>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                            Analysis of donor demographics and patterns for Q4 2023
                          </p>
                          <div className="flex justify-between items-center">
                            <span className="text-xs text-gray-500">Generated on Nov 25, 2023</span>
                            <Button variant="outline" size="sm">
                              <Download className="h-3 w-3 mr-2" />
                              Download
                            </Button>
                          </div>
                        </div>
                        
                        <div className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                          <div className="flex items-center mb-2">
                            <LineChart className="h-5 w-5 text-blood mr-2" />
                            <h3 className="font-medium">Hospital Utilization Report</h3>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                            Blood utilization patterns across all partner hospitals
                          </p>
                          <div className="flex justify-between items-center">
                            <span className="text-xs text-gray-500">Generated on Nov 20, 2023</span>
                            <Button variant="outline" size="sm">
                              <Download className="h-3 w-3 mr-2" />
                              Download
                            </Button>
                          </div>
                        </div>
                        
                        <div className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                          <div className="flex items-center mb-2">
                            <FileText className="h-5 w-5 text-blood mr-2" />
                            <h3 className="font-medium">Compliance Audit Report</h3>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                            Regulatory compliance audit for blood management operations
                          </p>
                          <div className="flex justify-between items-center">
                            <span className="text-xs text-gray-500">Generated on Nov 15, 2023</span>
                            <Button variant="outline" size="sm">
                              <Download className="h-3 w-3 mr-2" />
                              Download
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>

              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>System Activity</CardTitle>
                  <CardDescription>Recent actions and system events</CardDescription>
                </CardHeader>
                <CardContent className="max-h-[300px] overflow-y-auto">
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                        <Users className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">New donor registered</p>
                        <p className="text-xs text-gray-500">Nov 30, 2023 at 10:24 AM</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
                        <Hospital className="h-4 w-4 text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Blood request fulfilled</p>
                        <p className="text-xs text-gray-500">Nov 30, 2023 at 09:45 AM</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center mr-3">
                        <Activity className="h-4 w-4 text-yellow-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Inventory alert: O- levels low</p>
                        <p className="text-xs text-gray-500">Nov 30, 2023 at 08:15 AM</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-red-100 flex items-center justify-center mr-3">
                        <Droplet className="h-4 w-4 text-red-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Donation recorded</p>
                        <p className="text-xs text-gray-500">Nov 29, 2023 at 05:32 PM</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                        <BarChart className="h-4 w-4 text-purple-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Monthly report generated</p>
                        <p className="text-xs text-gray-500">Nov 29, 2023 at 03:10 PM</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                        <Shield className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">User permissions updated</p>
                        <p className="text-xs text-gray-500">Nov 29, 2023 at 01:45 PM</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AdminDashboard;
