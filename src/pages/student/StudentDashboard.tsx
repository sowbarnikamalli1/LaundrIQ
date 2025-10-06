import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Package, MessageSquare, QrCode, LogOut, Shirt } from "lucide-react";
import SlotBooking from "@/components/student/SlotBooking";
import ClothesSubmission from "@/components/student/ClothesSubmission";
import OrderTracking from "@/components/student/OrderTracking";
import ComplaintForm from "@/components/student/ComplaintForm";

type View = "dashboard" | "booking" | "submit" | "tracking" | "complaints";

const StudentDashboard = () => {
  const [currentView, setCurrentView] = useState<View>("dashboard");
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId") || "Guest";

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    localStorage.removeItem("userId");
    navigate("/login");
  };

  const renderView = () => {
    switch (currentView) {
      case "booking":
        return <SlotBooking onBack={() => setCurrentView("dashboard")} />;
      case "submit":
        return <ClothesSubmission onBack={() => setCurrentView("dashboard")} />;
      case "tracking":
        return <OrderTracking onBack={() => setCurrentView("dashboard")} />;
      case "complaints":
        return <ComplaintForm onBack={() => setCurrentView("dashboard")} />;
      default:
        return (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer border-primary/20" onClick={() => setCurrentView("booking")}>
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                  <Calendar className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Book Slot</CardTitle>
                <CardDescription>Reserve your laundry time slot</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full">Book Now</Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer border-primary/20" onClick={() => setCurrentView("submit")}>
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-2">
                  <Shirt className="h-6 w-6 text-accent" />
                </div>
                <CardTitle>Submit Clothes</CardTitle>
                <CardDescription>Add items and select services</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full">Submit Items</Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer border-primary/20" onClick={() => setCurrentView("tracking")}>
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-success/10 flex items-center justify-center mb-2">
                  <Package className="h-6 w-6 text-success" />
                </div>
                <CardTitle>Track Orders</CardTitle>
                <CardDescription>View your laundry status</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full">Track Now</Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer border-primary/20" onClick={() => setCurrentView("complaints")}>
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-warning/10 flex items-center justify-center mb-2">
                  <MessageSquare className="h-6 w-6 text-warning" />
                </div>
                <CardTitle>Complaints</CardTitle>
                <CardDescription>Report issues or concerns</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full">File Complaint</Button>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                  <QrCode className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Pickup Code</CardTitle>
                <CardDescription>Your OTP/QR for collection</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">****</div>
                  <p className="text-xs text-muted-foreground">Available after completion</p>
                </div>
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
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Shirt className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold">LaundryHub</h1>
              <p className="text-sm text-muted-foreground">Student ID: {userId}</p>
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
            {currentView === "dashboard" ? "Dashboard" : 
             currentView === "booking" ? "Book Slot" :
             currentView === "submit" ? "Submit Clothes" :
             currentView === "tracking" ? "Track Orders" : "Complaints"}
          </h2>
          <p className="text-muted-foreground">
            {currentView === "dashboard" ? "Manage your laundry services" : ""}
          </p>
        </div>

        {renderView()}
      </main>
    </div>
  );
};

export default StudentDashboard;
