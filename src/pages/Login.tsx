import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shirt, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const [studentId, setStudentId] = useState("");
  const [adminId, setAdminId] = useState("");
  const [studentPassword, setStudentPassword] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleStudentLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (studentId && studentPassword) {
      localStorage.setItem("userRole", "student");
      localStorage.setItem("userId", studentId);
      toast({
        title: "Login Successful",
        description: "Welcome to Laundry Management System",
      });
      navigate("/student/dashboard");
    } else {
      toast({
        title: "Error",
        description: "Please enter both Student ID and Password",
        variant: "destructive",
      });
    }
  };

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminId && adminPassword) {
      localStorage.setItem("userRole", "admin");
      localStorage.setItem("userId", adminId);
      toast({
        title: "Login Successful",
        description: "Welcome Admin",
      });
      navigate("/admin/dashboard");
    } else {
      toast({
        title: "Error",
        description: "Please enter both Admin ID and Password",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-accent/10 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent mb-4 shadow-lg">
            <Shirt className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            LaundryHub
          </h1>
          <p className="text-muted-foreground mt-2">Smart Laundry Management System</p>
        </div>

        <Card className="shadow-xl border-border/50">
          <CardHeader>
            <CardTitle>Sign In</CardTitle>
            <CardDescription>Choose your account type to continue</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="student" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="student" className="gap-2">
                  <Shirt className="h-4 w-4" />
                  Student
                </TabsTrigger>
                <TabsTrigger value="admin" className="gap-2">
                  <Shield className="h-4 w-4" />
                  Admin
                </TabsTrigger>
              </TabsList>

              <TabsContent value="student">
                <form onSubmit={handleStudentLogin} className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="studentId">Student ID</Label>
                    <Input
                      id="studentId"
                      placeholder="Enter your student ID"
                      value={studentId}
                      onChange={(e) => setStudentId(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="studentPassword">Password</Label>
                    <Input
                      id="studentPassword"
                      type="password"
                      placeholder="Enter your password"
                      value={studentPassword}
                      onChange={(e) => setStudentPassword(e.target.value)}
                    />
                  </div>
                  <Button type="submit" className="w-full bg-gradient-to-r from-primary to-primary/80">
                    Sign In as Student
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="admin">
                <form onSubmit={handleAdminLogin} className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="adminId">Admin ID</Label>
                    <Input
                      id="adminId"
                      placeholder="Enter your admin ID"
                      value={adminId}
                      onChange={(e) => setAdminId(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="adminPassword">Password</Label>
                    <Input
                      id="adminPassword"
                      type="password"
                      placeholder="Enter your password"
                      value={adminPassword}
                      onChange={(e) => setAdminPassword(e.target.value)}
                    />
                  </div>
                  <Button type="submit" className="w-full bg-gradient-to-r from-accent to-accent/80">
                    Sign In as Admin
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
