import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Package, Droplet, CheckCircle2, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface OrderTrackingProps {
  onBack: () => void;
}

const orders = [
  {
    id: "ORD001",
    date: "2024-01-15",
    items: 5,
    status: "completed",
    stages: ["In Locker", "Picked", "Washing", "Completed"],
    currentStage: 4,
  },
  {
    id: "ORD002",
    date: "2024-01-16",
    items: 3,
    status: "washing",
    stages: ["In Locker", "Picked", "Washing", "Completed"],
    currentStage: 3,
  },
];

const statusColors = {
  completed: "success",
  washing: "primary",
  picked: "warning",
  "in-locker": "muted",
} as const;

const OrderTracking = ({ onBack }: OrderTrackingProps) => {
  return (
    <div className="space-y-6">
      <Button variant="ghost" onClick={onBack} className="gap-2">
        <ArrowLeft className="h-4 w-4" />
        Back to Dashboard
      </Button>

      <div className="space-y-4">
        {orders.map((order) => (
          <Card key={order.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Package className="h-5 w-5 text-primary" />
                    Order {order.id}
                  </CardTitle>
                  <CardDescription>
                    {order.items} items • {order.date}
                  </CardDescription>
                </div>
                <Badge
                  variant={order.status === "completed" ? "default" : "secondary"}
                  className={cn(
                    order.status === "completed" && "bg-success text-success-foreground",
                    order.status === "washing" && "bg-primary text-primary-foreground"
                  )}
                >
                  {order.status === "completed" ? "Ready for Pickup" : "In Progress"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                {order.stages.map((stage, index) => (
                  <div key={stage} className="flex items-center">
                    <div className="flex flex-col items-center">
                      <div
                        className={cn(
                          "w-10 h-10 rounded-full flex items-center justify-center transition-all",
                          index < order.currentStage
                            ? "bg-success text-success-foreground"
                            : index === order.currentStage - 1
                            ? "bg-primary text-primary-foreground animate-pulse"
                            : "bg-muted text-muted-foreground"
                        )}
                      >
                        {index < order.currentStage ? (
                          <CheckCircle2 className="h-5 w-5" />
                        ) : index === order.currentStage - 1 ? (
                          <Droplet className="h-5 w-5" />
                        ) : (
                          <Clock className="h-5 w-5" />
                        )}
                      </div>
                      <span className="text-xs mt-2 text-center font-medium">{stage}</span>
                    </div>
                    {index < order.stages.length - 1 && (
                      <div
                        className={cn(
                          "h-0.5 w-16 mx-2",
                          index < order.currentStage - 1 ? "bg-success" : "bg-muted"
                        )}
                      />
                    )}
                  </div>
                ))}
              </div>

              {order.status === "completed" && (
                <div className="mt-6 p-4 bg-success/10 border border-success/20 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-success">Ready for Collection</div>
                      <div className="text-sm text-muted-foreground">
                        Use OTP: <span className="font-mono font-bold">8452</span>
                      </div>
                    </div>
                    <Button variant="outline">View QR Code</Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default OrderTracking;
