
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Hospital, User, Search, Droplet, Plus, Clipboard, Clock, Bell, Filter, ArrowUpDown, BarChart2, FileText, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from '@/components/ui/use-toast';

// Simulated data
const mockHospitalData = {
  name: "City General Hospital",
  address: "123 Medical Center Dr, New York, NY",
  inventory: [
    { type: "A+", units: 25, status: "Normal" },
    { type: "A-", units: 10, status: "Low" },
    { type: "B+", units: 15, status: "Normal" },
    { type: "B-", units: 5, status: "Critical" },
    { type: "AB+", units: 12, status: "Normal" },
    { type: "AB-", units: 3, status: "Critical" },
    { type: "O+", units: 30, status: "Normal" },
    { type: "O-", units: 8, status: "Low" },
  ],
  recentRequests: [
    { id: "REQ-8752", date: "2023-11-28", type: "O+", units: 3, status: "Fulfilled", urgency: "Routine" },
    { id: "REQ-8745", date: "2023-11-25", type: "AB-", units: 2, status: "Fulfilled", urgency: "Urgent" },
    { id: "REQ-8734", date: "2023-11-22", type: "B-", units: 1, status: "Fulfilled", urgency: "Emergency" },
    { id: "REQ-8721", date: "2023-11-18", type: "A+", units: 4, status: "Fulfilled", urgency: "Routine" },
  ],
  pendingRequests: [
    { id: "REQ-8761", date: "2023-11-30", type: "O-", units: 2, status: "In Progress", urgency: "Urgent" },
    { id: "REQ-8758", date: "2023-11-29", type: "B+", units: 3, status: "In Progress", urgency: "Routine" },
  ],
  transfusions: [
    { id: "TRN-3421", date: "2023-11-27", patientId: "P-78452", bloodType: "A+", units: 2, department: "Surgery" },
    { id: "TRN-3410", date: "2023-11-25", patientId: "P-78124", bloodType: "O+", units: 1, department: "Emergency" },
    { id: "TRN-3405", date: "2023-11-23", patientId: "P-77953", bloodType: "B+", units: 2, department: "Oncology" },
    { id: "TRN-3398", date: "2023-11-20", patientId: "P-77845", bloodType: "AB-", units: 1, department: "ICU" },
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
          <Hospital className="h-12 w-12 text-blood mx-auto mb-4" />
          <h1 className="text-3xl font-bold mb-2">Hospital Portal</h1>
          <p className="text-gray-600 dark:text-gray-300">
            Sign in to manage blood inventory and requests
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Hospital Sign In</CardTitle>
            <CardDescription>
              Enter your credentials to access the blood management system
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="hospital.admin@example.com"
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
                Need hospital registration? <a href="#" className="text-blood hover:underline">Contact support</a>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const HospitalDashboard = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const hospital = mockHospitalData;
  const [newRequestOpen, setNewRequestOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleNewRequest = () => {
    toast({
      title: "Blood Request Submitted",
      description: "Your request has been successfully submitted and is being processed.",
    });
    setNewRequestOpen(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Critical":
        return "text-red-600 bg-red-100 dark:bg-red-900/20 dark:text-red-400";
      case "Low":
        return "text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20 dark:text-yellow-400";
      case "Normal":
        return "text-green-600 bg-green-100 dark:bg-green-900/20 dark:text-green-400";
      default:
        return "text-gray-600 bg-gray-100 dark:bg-gray-800 dark:text-gray-300";
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "Emergency":
        return "text-red-600 bg-red-100 dark:bg-red-900/20 dark:text-red-400";
      case "Urgent":
        return "text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20 dark:text-yellow-400";
      case "Routine":
        return "text-blue-600 bg-blue-100 dark:bg-blue-900/20 dark:text-blue-400";
      default:
        return "text-gray-600 bg-gray-100 dark:bg-gray-800 dark:text-gray-300";
    }
  };

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
                    <Hospital className="h-8 w-8 text-blood" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold">{hospital.name}</h1>
                    <p className="text-gray-600 dark:text-gray-300 mt-1">{hospital.address}</p>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-4">
                  <Dialog open={newRequestOpen} onOpenChange={setNewRequestOpen}>
                    <DialogTrigger asChild>
                      <Button className="bg-blood hover:bg-blood-dark text-white">
                        <Plus className="h-4 w-4 mr-2" />
                        New Blood Request
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Request Blood Units</DialogTitle>
                        <DialogDescription>
                          Fill in the details to request blood units from the central bank.
                        </DialogDescription>
                      </DialogHeader>
                      
                      <div className="space-y-4 py-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="bloodType">Blood Type</Label>
                            <Select defaultValue="A+">
                              <SelectTrigger>
                                <SelectValue placeholder="Select blood type" />
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
                              </SelectContent>
                            </Select>
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="units">Units Required</Label>
                            <Input 
                              id="units" 
                              type="number" 
                              min="1" 
                              defaultValue="1" 
                            />
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="urgency">Urgency Level</Label>
                          <Select defaultValue="Routine">
                            <SelectTrigger>
                              <SelectValue placeholder="Select urgency level" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Emergency">Emergency</SelectItem>
                              <SelectItem value="Urgent">Urgent</SelectItem>
                              <SelectItem value="Routine">Routine</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="reason">Reason for Request</Label>
                          <Input 
                            id="reason" 
                            placeholder="Brief description of the requirement" 
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="department">Department</Label>
                          <Select defaultValue="Emergency">
                            <SelectTrigger>
                              <SelectValue placeholder="Select department" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Emergency">Emergency</SelectItem>
                              <SelectItem value="Surgery">Surgery</SelectItem>
                              <SelectItem value="ICU">ICU</SelectItem>
                              <SelectItem value="Oncology">Oncology</SelectItem>
                              <SelectItem value="Maternity">Maternity</SelectItem>
                              <SelectItem value="Other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setNewRequestOpen(false)}>
                          Cancel
                        </Button>
                        <Button 
                          className="bg-blood hover:bg-blood-dark text-white"
                          onClick={handleNewRequest}
                        >
                          Submit Request
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                  
                  <div className="relative w-full md:w-auto">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search requests or inventory..."
                      className="pl-10"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                {hospital.inventory.map((item) => (
                  <Card key={item.type} className="border-l-4" style={{ borderLeftColor: item.status === "Critical" ? "#ef4444" : item.status === "Low" ? "#f59e0b" : "#22c55e" }}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          <Droplet className="h-5 w-5 text-blood mr-2" />
                          <h3 className="font-semibold text-lg">{item.type}</h3>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(item.status)}`}>
                          {item.status}
                        </span>
                      </div>
                      <div className="text-3xl font-bold">{item.units}</div>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                        Units available
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Tabs defaultValue="pending">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                  <TabsList>
                    <TabsTrigger value="pending">Pending Requests</TabsTrigger>
                    <TabsTrigger value="history">Request History</TabsTrigger>
                    <TabsTrigger value="transfusions">Transfusion Records</TabsTrigger>
                  </TabsList>
                  
                  <div className="flex items-center space-x-2 mt-4 md:mt-0">
                    <Button variant="outline" size="sm" className="text-xs h-8">
                      <Filter className="h-3 w-3 mr-1" />
                      Filter
                    </Button>
                    <Button variant="outline" size="sm" className="text-xs h-8">
                      <ArrowUpDown className="h-3 w-3 mr-1" />
                      Sort
                    </Button>
                    <Button variant="outline" size="sm" className="text-xs h-8">
                      <FileText className="h-3 w-3 mr-1" />
                      Export
                    </Button>
                  </div>
                </div>
                
                <TabsContent value="pending" className="animate-fade-in">
                  <Card>
                    <CardHeader>
                      <CardTitle>Pending Blood Requests</CardTitle>
                      <CardDescription>
                        Blood units requested and awaiting fulfillment
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {hospital.pendingRequests.length === 0 ? (
                        <div className="text-center py-8">
                          <Clipboard className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                          <h3 className="text-lg font-medium mb-2">No Pending Requests</h3>
                          <p className="text-gray-600 dark:text-gray-300 mb-4">
                            There are currently no pending blood requests.
                          </p>
                          <Button 
                            className="bg-blood hover:bg-blood-dark text-white"
                            onClick={() => setNewRequestOpen(true)}
                          >
                            <Plus className="h-4 w-4 mr-2" />
                            New Request
                          </Button>
                        </div>
                      ) : (
                        <div className="overflow-x-auto">
                          <table className="w-full">
                            <thead>
                              <tr className="border-b">
                                <th className="text-left py-3 px-4 font-medium">Request ID</th>
                                <th className="text-left py-3 px-4 font-medium">Date</th>
                                <th className="text-left py-3 px-4 font-medium">Blood Type</th>
                                <th className="text-left py-3 px-4 font-medium">Units</th>
                                <th className="text-left py-3 px-4 font-medium">Urgency</th>
                                <th className="text-left py-3 px-4 font-medium">Status</th>
                                <th className="text-right py-3 px-4 font-medium">Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              {hospital.pendingRequests.map((req, index) => (
                                <tr key={req.id} className={index !== hospital.pendingRequests.length - 1 ? "border-b" : ""}>
                                  <td className="py-3 px-4">{req.id}</td>
                                  <td className="py-3 px-4">{new Date(req.date).toLocaleDateString()}</td>
                                  <td className="py-3 px-4">{req.type}</td>
                                  <td className="py-3 px-4">{req.units}</td>
                                  <td className="py-3 px-4">
                                    <span className={`text-xs px-2 py-0.5 rounded-full ${getUrgencyColor(req.urgency)}`}>
                                      {req.urgency}
                                    </span>
                                  </td>
                                  <td className="py-3 px-4">
                                    <div className="flex items-center">
                                      <span className="relative flex h-2 w-2 mr-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
                                      </span>
                                      {req.status}
                                    </div>
                                  </td>
                                  <td className="py-3 px-4 text-right">
                                    <Button variant="ghost" size="sm" className="h-8">
                                      Track Status
                                    </Button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="history" className="animate-fade-in">
                  <Card>
                    <CardHeader>
                      <CardTitle>Request History</CardTitle>
                      <CardDescription>
                        Previous blood requests and their outcomes
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b">
                              <th className="text-left py-3 px-4 font-medium">Request ID</th>
                              <th className="text-left py-3 px-4 font-medium">Date</th>
                              <th className="text-left py-3 px-4 font-medium">Blood Type</th>
                              <th className="text-left py-3 px-4 font-medium">Units</th>
                              <th className="text-left py-3 px-4 font-medium">Urgency</th>
                              <th className="text-left py-3 px-4 font-medium">Status</th>
                              <th className="text-right py-3 px-4 font-medium">Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {hospital.recentRequests.map((req, index) => (
                              <tr key={req.id} className={index !== hospital.recentRequests.length - 1 ? "border-b" : ""}>
                                <td className="py-3 px-4">{req.id}</td>
                                <td className="py-3 px-4">{new Date(req.date).toLocaleDateString()}</td>
                                <td className="py-3 px-4">{req.type}</td>
                                <td className="py-3 px-4">{req.units}</td>
                                <td className="py-3 px-4">
                                  <span className={`text-xs px-2 py-0.5 rounded-full ${getUrgencyColor(req.urgency)}`}>
                                    {req.urgency}
                                  </span>
                                </td>
                                <td className="py-3 px-4">
                                  <span className="text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
                                    {req.status}
                                  </span>
                                </td>
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
                
                <TabsContent value="transfusions" className="animate-fade-in">
                  <Card>
                    <CardHeader>
                      <CardTitle>Transfusion Records</CardTitle>
                      <CardDescription>
                        Record of blood units used in patient transfusions
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b">
                              <th className="text-left py-3 px-4 font-medium">Record ID</th>
                              <th className="text-left py-3 px-4 font-medium">Date</th>
                              <th className="text-left py-3 px-4 font-medium">Patient ID</th>
                              <th className="text-left py-3 px-4 font-medium">Blood Type</th>
                              <th className="text-left py-3 px-4 font-medium">Units</th>
                              <th className="text-left py-3 px-4 font-medium">Department</th>
                              <th className="text-right py-3 px-4 font-medium">Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {hospital.transfusions.map((trans, index) => (
                              <tr key={trans.id} className={index !== hospital.transfusions.length - 1 ? "border-b" : ""}>
                                <td className="py-3 px-4">{trans.id}</td>
                                <td className="py-3 px-4">{new Date(trans.date).toLocaleDateString()}</td>
                                <td className="py-3 px-4">{trans.patientId}</td>
                                <td className="py-3 px-4">{trans.bloodType}</td>
                                <td className="py-3 px-4">{trans.units}</td>
                                <td className="py-3 px-4">{trans.department}</td>
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
              </Tabs>

              <div className="mt-8 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
                <div className="flex">
                  <AlertCircle className="h-5 w-5 text-amber-500 mr-3 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-amber-800 dark:text-amber-400">Attention Required</h3>
                    <p className="text-sm text-amber-700 dark:text-amber-300 mt-1">
                      Some blood types in your inventory are at critical levels. Consider placing new requests to replenish your stock.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default HospitalDashboard;
