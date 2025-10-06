import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Shirt, Calendar, Package, Shield, CheckCircle2 } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <header className="border-b bg-card/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Shirt className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold">LaundryHub</span>
          </div>
          <Button onClick={() => navigate("/login")} className="gap-2">
            Sign In
          </Button>
        </div>
      </header>

      <main>
        <section className="container mx-auto px-4 py-20 text-center">
          <div className="max-w-4xl mx-auto space-y-8">
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent">
              Smart Laundry Management
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Book slots, track orders, and manage your laundry with ease. A complete solution for students and administrators.
            </p>
            <div className="flex gap-4 justify-center">
              <Button size="lg" onClick={() => navigate("/login")} className="gap-2">
                Get Started
              </Button>
              <Button size="lg" variant="outline" onClick={() => navigate("/login")}>
                Learn More
              </Button>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 py-20">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="p-6 rounded-lg bg-card border border-border/50 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Calendar className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Easy Slot Booking</h3>
              <p className="text-muted-foreground">
                Book your laundry slot like cinema tickets. Visual interface with real-time availability.
              </p>
            </div>

            <div className="p-6 rounded-lg bg-card border border-border/50 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                <Package className="h-6 w-6 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Real-time Tracking</h3>
              <p className="text-muted-foreground">
                Track your clothes from locker to pickup with live status updates.
              </p>
            </div>

            <div className="p-6 rounded-lg bg-card border border-border/50 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-full bg-success/10 flex items-center justify-center mb-4">
                <CheckCircle2 className="h-6 w-6 text-success" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Secure Pickup</h3>
              <p className="text-muted-foreground">
                OTP and QR code verification for safe and secure cloth collection.
              </p>
            </div>

            <div className="p-6 rounded-lg bg-card border border-border/50 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-full bg-warning/10 flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-warning" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Admin Control</h3>
              <p className="text-muted-foreground">
                Comprehensive admin dashboard for managing orders and complaints.
              </p>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 py-20 text-center">
          <div className="max-w-3xl mx-auto p-8 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 border border-border/50">
            <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
            <p className="text-muted-foreground mb-6">
              Join hundreds of students using LaundryHub for hassle-free laundry management.
            </p>
            <Button size="lg" onClick={() => navigate("/login")} className="gap-2">
              <Shirt className="h-5 w-5" />
              Sign In Now
            </Button>
          </div>
        </section>
      </main>

      <footer className="border-t bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-8 text-center text-muted-foreground">
          <p>© 2024 LaundryHub. Smart Laundry Management System.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
