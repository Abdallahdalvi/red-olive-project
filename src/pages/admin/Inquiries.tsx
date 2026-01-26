import { useEffect, useState } from "react";
import { Loader2, Eye, Mail, Phone, Calendar, MapPin, Users, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";

interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  destination: string | null;
  travel_date: string | null;
  travelers: number | null;
  budget: string | null;
  message: string | null;
  inquiry_type: string | null;
  status: string;
  source: string | null;
  created_at: string;
}

const statusOptions = [
  { value: "new", label: "New", color: "bg-blue-100 text-blue-700" },
  { value: "contacted", label: "Contacted", color: "bg-yellow-100 text-yellow-700" },
  { value: "qualified", label: "Qualified", color: "bg-purple-100 text-purple-700" },
  { value: "converted", label: "Converted", color: "bg-green-100 text-green-700" },
  { value: "closed", label: "Closed", color: "bg-gray-100 text-gray-700" },
];

export default function AdminInquiries() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>("all");

  useEffect(() => {
    fetchInquiries();
  }, []);

  async function fetchInquiries() {
    const { data, error } = await supabase
      .from("inquiries")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      setInquiries(data || []);
    }
    setLoading(false);
  }

  const updateStatus = async (id: string, status: string) => {
    const { error } = await supabase.from("inquiries").update({ status }).eq("id", id);

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Updated", description: "Status updated successfully" });
      fetchInquiries();
    }
  };

  const getStatusColor = (status: string) => {
    return statusOptions.find((s) => s.value === status)?.color || "bg-gray-100 text-gray-700";
  };

  const filteredInquiries = filterStatus === "all" 
    ? inquiries 
    : inquiries.filter((i) => i.status === filterStatus);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">Inquiries</h2>
          <p className="text-muted-foreground">Manage customer inquiries and leads</p>
        </div>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            {statusOptions.map((s) => (
              <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Card>
        <CardContent className="p-0">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          ) : filteredInquiries.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">No inquiries yet</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Destination</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredInquiries.map((inquiry) => (
                  <TableRow key={inquiry.id}>
                    <TableCell className="font-medium">{inquiry.name}</TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div>{inquiry.email}</div>
                        {inquiry.phone && <div className="text-muted-foreground">{inquiry.phone}</div>}
                      </div>
                    </TableCell>
                    <TableCell>{inquiry.destination || "-"}</TableCell>
                    <TableCell>{format(new Date(inquiry.created_at), "MMM d, yyyy")}</TableCell>
                    <TableCell>
                      <Select value={inquiry.status} onValueChange={(value) => updateStatus(inquiry.id, value)}>
                        <SelectTrigger className={`w-28 h-7 text-xs ${getStatusColor(inquiry.status)}`}>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {statusOptions.map((s) => (
                            <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon" onClick={() => setSelectedInquiry(inquiry)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Detail Dialog */}
      <Dialog open={!!selectedInquiry} onOpenChange={() => setSelectedInquiry(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Inquiry Details</DialogTitle>
          </DialogHeader>
          {selectedInquiry && (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Badge className={getStatusColor(selectedInquiry.status)}>
                  {statusOptions.find((s) => s.value === selectedInquiry.status)?.label}
                </Badge>
                {selectedInquiry.inquiry_type && (
                  <Badge variant="outline" className="capitalize">
                    {selectedInquiry.inquiry_type.replace("_", " ")}
                  </Badge>
                )}
              </div>

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Users className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="font-medium">{selectedInquiry.name}</p>
                    <p className="text-sm text-muted-foreground">Customer</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <a href={`mailto:${selectedInquiry.email}`} className="text-primary hover:underline">
                      {selectedInquiry.email}
                    </a>
                  </div>
                </div>

                {selectedInquiry.phone && (
                  <div className="flex items-start gap-3">
                    <Phone className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <a href={`tel:${selectedInquiry.phone}`} className="text-primary hover:underline">
                        {selectedInquiry.phone}
                      </a>
                    </div>
                  </div>
                )}

                {selectedInquiry.destination && (
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="font-medium">{selectedInquiry.destination}</p>
                      <p className="text-sm text-muted-foreground">Destination</p>
                    </div>
                  </div>
                )}

                {selectedInquiry.travel_date && (
                  <div className="flex items-start gap-3">
                    <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="font-medium">{format(new Date(selectedInquiry.travel_date), "MMMM d, yyyy")}</p>
                      <p className="text-sm text-muted-foreground">Travel Date</p>
                    </div>
                  </div>
                )}

                {selectedInquiry.travelers && (
                  <div className="flex items-start gap-3">
                    <Users className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="font-medium">{selectedInquiry.travelers} Travelers</p>
                    </div>
                  </div>
                )}

                {selectedInquiry.budget && (
                  <div className="p-3 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">Budget</p>
                    <p className="font-medium">{selectedInquiry.budget}</p>
                  </div>
                )}

                {selectedInquiry.message && (
                  <div className="p-3 bg-muted rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <MessageSquare className="h-4 w-4 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">Message</p>
                    </div>
                    <p className="text-sm">{selectedInquiry.message}</p>
                  </div>
                )}
              </div>

              <div className="pt-4 border-t text-xs text-muted-foreground">
                Received on {format(new Date(selectedInquiry.created_at), "MMMM d, yyyy 'at' h:mm a")}
                {selectedInquiry.source && ` • Source: ${selectedInquiry.source}`}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}