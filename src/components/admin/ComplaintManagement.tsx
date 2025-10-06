import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, MessageSquare, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ComplaintManagementProps {
  onBack: () => void;
}

const mockComplaints = [
  {
    id: "CMP001",
    studentId: "STU123",
    type: "Lost Item",
    description: "One of my shirts is missing from the order",
    status: "pending",
    date: "2024-01-15",
  },
  {
    id: "CMP002",
    studentId: "STU456",
    type: "Damaged Item",
    description: "My white shirt has a stain that wasn't there before",
    status: "pending",
    date: "2024-01-16",
  },
  {
    id: "CMP003",
    studentId: "STU789",
    type: "Quality Issue",
    description: "Clothes were not properly ironed",
    status: "resolved",
    date: "2024-01-14",
  },
];

const ComplaintManagement = ({ onBack }: ComplaintManagementProps) => {
  const [complaints, setComplaints] = useState(mockComplaints);
  const { toast } = useToast();

  const handleResolve = (complaintId: string) => {
    setComplaints(
      complaints.map((complaint) =>
        complaint.id === complaintId
          ? { ...complaint, status: "resolved" }
          : complaint
      )
    );
    toast({
      title: "Complaint Resolved",
      description: `Complaint ${complaintId} marked as resolved`,
    });
  };

  return (
    <div className="space-y-6">
      <Button variant="ghost" onClick={onBack} className="gap-2">
        <ArrowLeft className="h-4 w-4" />
        Back to Dashboard
      </Button>

      <div className="space-y-4">
        {complaints.map((complaint) => (
          <Card key={complaint.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5 text-warning" />
                    {complaint.type}
                  </CardTitle>
                  <CardDescription>
                    Student: {complaint.studentId} • {complaint.date}
                  </CardDescription>
                </div>
                <Badge
                  variant={complaint.status === "resolved" ? "default" : "secondary"}
                  className={
                    complaint.status === "resolved"
                      ? "bg-success text-success-foreground"
                      : "bg-warning text-warning-foreground"
                  }
                >
                  {complaint.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm mb-4">{complaint.description}</p>
              {complaint.status === "pending" && (
                <Button
                  onClick={() => handleResolve(complaint.id)}
                  variant="outline"
                  className="gap-2"
                >
                  <CheckCircle2 className="h-4 w-4" />
                  Mark as Resolved
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ComplaintManagement;
