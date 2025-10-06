import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, MessageSquare } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ComplaintFormProps {
  onBack: () => void;
}

const ComplaintForm = ({ onBack }: ComplaintFormProps) => {
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!type || !description) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Complaint Submitted",
      description: "We'll review your complaint and get back to you soon.",
    });
    onBack();
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
            <MessageSquare className="h-5 w-5 text-primary" />
            File a Complaint
          </CardTitle>
          <CardDescription>Report any issues with your laundry service</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="type">Complaint Type</Label>
              <Select value={type} onValueChange={setType}>
                <SelectTrigger id="type">
                  <SelectValue placeholder="Select complaint type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="lost">Lost Item</SelectItem>
                  <SelectItem value="damaged">Damaged Item</SelectItem>
                  <SelectItem value="mismatched">Wrong Item Received</SelectItem>
                  <SelectItem value="delay">Delayed Service</SelectItem>
                  <SelectItem value="quality">Quality Issue</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Please describe your issue in detail..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={6}
              />
            </div>

            <Button type="submit" className="w-full" size="lg">
              Submit Complaint
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ComplaintForm;
