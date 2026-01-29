import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, Loader2, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface Destination {
  id: string;
  name: string;
  country: string;
  region: string | null;
  description: string | null;
  image_url: string | null;
  price_from: number | null;
  is_featured: boolean;
  is_active: boolean;
  display_order: number | null;
}

export default function AdminDestinations() {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterFeatured, setFilterFeatured] = useState<string>("all");
  const [filterActive, setFilterActive] = useState<string>("all");
  const [formData, setFormData] = useState({
    name: "",
    country: "",
    region: "",
    description: "",
    image_url: "",
    price_from: "",
    is_featured: false,
    is_active: true,
    display_order: "0",
  });

  useEffect(() => {
    fetchDestinations();
  }, []);

  async function fetchDestinations() {
    const { data, error } = await supabase
      .from("destinations")
      .select("*")
      .order("display_order", { ascending: false })
      .order("created_at", { ascending: false });

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      setDestinations(data || []);
    }
    setLoading(false);
  }

  const filteredDestinations = destinations.filter((dest) => {
    const matchesSearch = searchQuery === "" || 
      dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dest.country.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFeatured = filterFeatured === "all" || 
      (filterFeatured === "yes" && dest.is_featured) ||
      (filterFeatured === "no" && !dest.is_featured);
    const matchesActive = filterActive === "all" || 
      (filterActive === "yes" && dest.is_active) ||
      (filterActive === "no" && !dest.is_active);
    return matchesSearch && matchesFeatured && matchesActive;
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const payload = {
      name: formData.name,
      country: formData.country,
      region: formData.region || null,
      description: formData.description || null,
      image_url: formData.image_url || null,
      price_from: formData.price_from ? parseFloat(formData.price_from) : null,
      is_featured: formData.is_featured,
      is_active: formData.is_active,
      display_order: formData.display_order ? parseInt(formData.display_order) : 0,
    };

    if (editingId) {
      const { error } = await supabase.from("destinations").update(payload).eq("id", editingId);
      if (error) {
        toast({ title: "Error", description: error.message, variant: "destructive" });
        return;
      }
      toast({ title: "Success", description: "Destination updated successfully" });
    } else {
      const { error } = await supabase.from("destinations").insert(payload);
      if (error) {
        toast({ title: "Error", description: error.message, variant: "destructive" });
        return;
      }
      toast({ title: "Success", description: "Destination created successfully" });
    }

    setDialogOpen(false);
    resetForm();
    fetchDestinations();
  };

  const handleEdit = (dest: Destination) => {
    setEditingId(dest.id);
    setFormData({
      name: dest.name,
      country: dest.country,
      region: dest.region || "",
      description: dest.description || "",
      image_url: dest.image_url || "",
      price_from: dest.price_from?.toString() || "",
      is_featured: dest.is_featured,
      is_active: dest.is_active,
      display_order: dest.display_order?.toString() || "0",
    });
    setDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this destination?")) return;
    
    const { error } = await supabase.from("destinations").delete().eq("id", id);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Deleted", description: "Destination deleted successfully" });
      fetchDestinations();
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData({
      name: "",
      country: "",
      region: "",
      description: "",
      image_url: "",
      price_from: "",
      is_featured: false,
      is_active: true,
      display_order: "0",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-3xl font-bold">Destinations</h2>
          <p className="text-muted-foreground">Manage travel destinations</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={(open) => { setDialogOpen(open); if (!open) resetForm(); }}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Destination
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>{editingId ? "Edit Destination" : "Add New Destination"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label>Name *</Label>
                <Input value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
              </div>
              <div>
                <Label>Country *</Label>
                <Input value={formData.country} onChange={(e) => setFormData({ ...formData, country: e.target.value })} required />
              </div>
              <div>
                <Label>Region</Label>
                <Input value={formData.region} onChange={(e) => setFormData({ ...formData, region: e.target.value })} />
              </div>
              <div>
                <Label>Description</Label>
                <Textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
              </div>
              <div>
                <Label>Image URL</Label>
                <Input value={formData.image_url} onChange={(e) => setFormData({ ...formData, image_url: e.target.value })} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Price From (₹)</Label>
                  <Input type="number" value={formData.price_from} onChange={(e) => setFormData({ ...formData, price_from: e.target.value })} />
                </div>
                <div>
                  <Label>Display Order</Label>
                  <Input type="number" value={formData.display_order} onChange={(e) => setFormData({ ...formData, display_order: e.target.value })} placeholder="Higher = show first" />
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <Switch checked={formData.is_featured} onCheckedChange={(checked) => setFormData({ ...formData, is_featured: checked })} />
                  <Label>Featured (Show on Homepage)</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Switch checked={formData.is_active} onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })} />
                  <Label>Active</Label>
                </div>
              </div>
              <Button type="submit" className="w-full">{editingId ? "Update" : "Create"}</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search destinations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <div className="flex gap-2">
              <Select value={filterFeatured} onValueChange={setFilterFeatured}>
                <SelectTrigger className="w-36">
                  <SelectValue placeholder="Featured" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="yes">Featured</SelectItem>
                  <SelectItem value="no">Not Featured</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterActive} onValueChange={setFilterActive}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="yes">Active</SelectItem>
                  <SelectItem value="no">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-0">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          ) : destinations.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">No destinations yet</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Country</TableHead>
                  <TableHead>Price From</TableHead>
                  <TableHead>Order</TableHead>
                  <TableHead>Featured</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDestinations.map((dest) => (
                  <TableRow key={dest.id}>
                    <TableCell className="font-medium">{dest.name}</TableCell>
                    <TableCell>{dest.country}</TableCell>
                    <TableCell>{dest.price_from ? `₹${dest.price_from.toLocaleString()}` : "-"}</TableCell>
                    <TableCell>{dest.display_order || 0}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${dest.is_featured ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}`}>
                        {dest.is_featured ? "Yes" : "No"}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${dest.is_active ? "bg-green-100 text-green-700" : "bg-muted text-muted-foreground"}`}>
                        {dest.is_active ? "Active" : "Inactive"}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon" onClick={() => handleEdit(dest)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(dest.id)}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}