import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface SlotBookingProps {
  onBack: () => void;
}

const timeSlots = [
  { time: "08:00 AM", available: 8, total: 10 },
  { time: "10:00 AM", available: 5, total: 10 },
  { time: "12:00 PM", available: 0, total: 10 },
  { time: "02:00 PM", available: 7, total: 10 },
  { time: "04:00 PM", available: 3, total: 10 },
  { time: "06:00 PM", available: 9, total: 10 },
];

const SlotBooking = ({ onBack }: SlotBookingProps) => {
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const { toast } = useToast();

  const handleBookSlot = () => {
    if (selectedSlot) {
      toast({
        title: "Slot Booked Successfully",
        description: `Your slot at ${selectedSlot} has been reserved.`,
      });
      onBack();
    }
  };

  return (
    <div className="space-y-6">
      <Button variant="ghost" onClick={onBack} className="gap-2">
        <ArrowLeft className="h-4 w-4" />
        Back to Dashboard
      </Button>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            Select Your Slot
          </CardTitle>
          <CardDescription>Choose an available time slot for your laundry</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {timeSlots.map((slot) => {
              const isAvailable = slot.available > 0;
              const isSelected = selectedSlot === slot.time;

              return (
                <Card
                  key={slot.time}
                  className={cn(
                    "cursor-pointer transition-all duration-300 hover:shadow-md",
                    isSelected && "ring-2 ring-primary border-primary",
                    !isAvailable && "opacity-50 cursor-not-allowed"
                  )}
                  onClick={() => isAvailable && setSelectedSlot(slot.time)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <Clock className="h-5 w-5 text-muted-foreground" />
                      <span
                        className={cn(
                          "text-xs font-medium px-2 py-1 rounded-full",
                          isAvailable
                            ? "bg-success/10 text-success"
                            : "bg-destructive/10 text-destructive"
                        )}
                      >
                        {isAvailable ? "Available" : "Full"}
                      </span>
                    </div>
                    <div className="text-2xl font-bold mb-2">{slot.time}</div>
                    <div className="text-sm text-muted-foreground">
                      {slot.available}/{slot.total} slots free
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {selectedSlot && (
            <div className="mt-6 flex justify-end">
              <Button onClick={handleBookSlot} size="lg" className="gap-2">
                <Calendar className="h-4 w-4" />
                Confirm Booking
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SlotBooking;
