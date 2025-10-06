import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Package, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface OrderManagementProps {
  onBack: () => void;
}

const mockOrders = [
  {
    id: "ORD001",
    studentId: "STU123",
    items: 5,
    status: "picked",
    date: "2024-01-15",
  },
  {
    id: "ORD002",
    studentId: "STU456",
    items: 3,
    status: "washing",
    date: "2024-01-16",
  },
  {
    id: "ORD003",
    studentId: "STU789",
    items: 7,
    status: "in-locker",
    date: "2024-01-16",
  },
];

const OrderManagement = ({ onBack }: OrderManagementProps) => {
  const [orders, setOrders] = useState(mockOrders);
  const { toast } = useToast();

  const handleStatusUpdate = (orderId: string, newStatus: string) => {
    setOrders(
      orders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
    toast({
      title: "Status Updated",
      description: `Order ${orderId} status changed to ${newStatus}`,
    });
  };

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
                  <CardDescription className="flex items-center gap-2 mt-1">
                    <User className="h-4 w-4" />
                    Student ID: {order.studentId}
                  </CardDescription>
                </div>
                <Badge variant="secondary">{order.items} items</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <div className="text-sm text-muted-foreground mb-2">Update Status</div>
                  <Select
                    value={order.status}
                    onValueChange={(value) => handleStatusUpdate(order.id, value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="in-locker">In Locker</SelectItem>
                      <SelectItem value="picked">Picked Up</SelectItem>
                      <SelectItem value="washing">Washing</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="text-sm text-muted-foreground">
                  Submitted: {order.date}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default OrderManagement;
