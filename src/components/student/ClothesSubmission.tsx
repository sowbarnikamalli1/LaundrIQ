import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Shirt, Plus, Minus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ClothesSubmissionProps {
  onBack: () => void;
}

interface ClothItem {
  id: string;
  name: string;
  count: number;
  price: number;
}

const clothTypes = [
  { id: "shirt", name: "Shirt", price: 30 },
  { id: "pant", name: "Pant", price: 40 },
  { id: "tshirt", name: "T-Shirt", price: 25 },
  { id: "shorts", name: "Shorts", price: 20 },
  { id: "inners", name: "Inners", price: 15 },
];

const ClothesSubmission = ({ onBack }: ClothesSubmissionProps) => {
  const [items, setItems] = useState<ClothItem[]>([]);
  const [ironing, setIroning] = useState(false);
  const [emergency, setEmergency] = useState(false);
  const { toast } = useToast();

  const addItem = (cloth: typeof clothTypes[0]) => {
    const existing = items.find((item) => item.id === cloth.id);
    if (existing) {
      setItems(
        items.map((item) =>
          item.id === cloth.id ? { ...item, count: item.count + 1 } : item
        )
      );
    } else {
      setItems([...items, { ...cloth, count: 1 }]);
    }
  };

  const removeItem = (id: string) => {
    const existing = items.find((item) => item.id === id);
    if (existing && existing.count > 1) {
      setItems(
        items.map((item) =>
          item.id === id ? { ...item, count: item.count - 1 } : item
        )
      );
    } else {
      setItems(items.filter((item) => item.id !== id));
    }
  };

  const calculateTotal = () => {
    let total = items.reduce((sum, item) => sum + item.price * item.count, 0);
    if (ironing) total += 50;
    if (emergency) total += 100;
    return total;
  };

  const handleSubmit = () => {
    if (items.length === 0) {
      toast({
        title: "No items selected",
        description: "Please add at least one item",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Order Submitted",
      description: `Total: ₹${calculateTotal()}. Your clothes will be collected soon.`,
    });
    onBack();
  };

  return (
    <div className="space-y-6">
      <Button variant="ghost" onClick={onBack} className="gap-2">
        <ArrowLeft className="h-4 w-4" />
        Back to Dashboard
      </Button>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Select Items</CardTitle>
            <CardDescription>Add the clothes you want to wash</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {clothTypes.map((cloth) => {
              const item = items.find((i) => i.id === cloth.id);
              return (
                <div
                  key={cloth.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:border-primary transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Shirt className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <div className="font-medium">{cloth.name}</div>
                      <div className="text-sm text-muted-foreground">₹{cloth.price} each</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {item ? (
                      <>
                        <Button
                          size="icon"
                          variant="outline"
                          onClick={() => removeItem(cloth.id)}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="w-8 text-center font-medium">{item.count}</span>
                        <Button
                          size="icon"
                          variant="outline"
                          onClick={() => addItem(cloth)}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </>
                    ) : (
                      <Button variant="outline" onClick={() => addItem(cloth)}>
                        Add
                      </Button>
                    )}
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Additional Services</CardTitle>
              <CardDescription>Optional add-ons for your order</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="ironing"
                    checked={ironing}
                    onCheckedChange={(checked) => setIroning(checked as boolean)}
                  />
                  <Label htmlFor="ironing" className="cursor-pointer">
                    <div className="font-medium">Ironing Service</div>
                    <div className="text-sm text-muted-foreground">+₹50</div>
                  </Label>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="emergency"
                    checked={emergency}
                    onCheckedChange={(checked) => setEmergency(checked as boolean)}
                  />
                  <Label htmlFor="emergency" className="cursor-pointer">
                    <div className="font-medium">Emergency Wash</div>
                    <div className="text-sm text-muted-foreground">+₹100 (24hr delivery)</div>
                  </Label>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-primary/5 to-accent/5">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Items ({items.reduce((sum, item) => sum + item.count, 0)})</span>
                  <span>₹{items.reduce((sum, item) => sum + item.price * item.count, 0)}</span>
                </div>
                {ironing && (
                  <div className="flex justify-between text-sm">
                    <span>Ironing Service</span>
                    <span>₹50</span>
                  </div>
                )}
                {emergency && (
                  <div className="flex justify-between text-sm">
                    <span>Emergency Wash</span>
                    <span>₹100</span>
                  </div>
                )}
              </div>
              <div className="pt-4 border-t">
                <div className="flex justify-between font-bold text-lg mb-4">
                  <span>Total</span>
                  <span className="text-primary">₹{calculateTotal()}</span>
                </div>
                <Button onClick={handleSubmit} className="w-full" size="lg">
                  Submit Order
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ClothesSubmission;
