import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, Users, MessageSquare, BarChart3, LogOut, Shield } from "lucide-react";
import OrderManagement from "@/components/admin/OrderManagement";
import ComplaintManagement from "@/components/admin/ComplaintManagement";

type View = "dashboard" | "orders" | "complaints" | "analytics";

const AdminDashboard = () => {
  const [currentView, setCurrentView] = useState<View>("dashboard");
  const navigate = useNavigate();
  const adminId = localStorage.getItem("userId") || "Admin";

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    localStorage.removeItem("userId");
    navigate("/login");
  };

  const renderView = () => {
    switch (currentView) {
      case "orders":
        return <OrderManagement onBack={() => setCurrentView("dashboard")} />;
      case "complaints":
        return <ComplaintManagement onBack={() => setCurrentView("dashboard")} />;
      case "analytics":
        return (
          <Card>
            <CardHeader>
              <CardTitle>Analytics & Reports</CardTitle>
              <CardDescription>Coming soon - Usage statistics and reports</CardDescription>
            </CardHeader>
          </Card>
        );
      default:
        return (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer border-accent/20" onClick={() => setCurrentView("orders")}>
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                  <Package className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Order Management</CardTitle>
                <CardDescription>View and update laundry orders</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary mb-2">12</div>
                <p className="text-sm text-muted-foreground">Active orders</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer border-accent/20" onClick={() => setCurrentView("complaints")}>
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-warning/10 flex items-center justify-center mb-2">
                  <MessageSquare className="h-6 w-6 text-warning" />
                </div>
                <CardTitle>Complaints</CardTitle>
                <CardDescription>Handle customer complaints</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-warning mb-2">3</div>
                <p className="text-sm text-muted-foreground">Pending complaints</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer border-accent/20" onClick={() => setCurrentView("analytics")}>
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-2">
                  <BarChart3 className="h-6 w-6 text-accent" />
                </div>
                <CardTitle>Analytics</CardTitle>
                <CardDescription>View reports and statistics</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full">View Reports</Button>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-success/10 flex items-center justify-center mb-2">
                  <Users className="h-6 w-6 text-success" />
                </div>
                <CardTitle>Active Students</CardTitle>
                <CardDescription>Currently using service</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-success mb-2">48</div>
                <p className="text-sm text-muted-foreground">This week</p>
              </CardContent>
            </Card>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center">
              <Shield className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold">LaundryHub Admin</h1>
              <p className="text-sm text-muted-foreground">Admin ID: {adminId}</p>
            </div>
          </div>
          <Button variant="ghost" onClick={handleLogout} className="gap-2">
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h2 className="text-3xl font-bold mb-2">
            {currentView === "dashboard" ? "Admin Dashboard" :
             currentView === "orders" ? "Order Management" :
             currentView === "complaints" ? "Complaint Management" : "Analytics"}
          </h2>
          <p className="text-muted-foreground">
            {currentView === "dashboard" ? "Manage laundry operations" : ""}
          </p>
        </div>

        {renderView()}
      </main>
    </div>
  );
};

export default AdminDashboard;
