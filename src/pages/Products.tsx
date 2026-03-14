import { useState } from "react";
import { Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { StatusBadge } from "@/components/StatusBadge";

interface Product {
  id: number; 
  name: string; 
  sku: string; 
  category: string; 
  uom: string; 
  stock: number; 
  location: string;
}

const initialProducts: Product[] = [
  { id: 1, name: "Steel Rods", sku: "STL-001", category: "Raw Materials", uom: "kg", stock: 150, location: "Main Warehouse" },
  { id: 2, name: "Office Chairs", sku: "FRN-012", category: "Furniture", uom: "pcs", stock: 45, location: "Warehouse B" },
  { id: 3, name: "Copper Wire", sku: "ELC-003", category: "Electrical", uom: "meters", stock: 800, location: "Rack A" },
  { id: 4, name: "Plywood Sheets", sku: "WD-007", category: "Raw Materials", uom: "sheets", stock: 2, location: "Main Warehouse" },
  { id: 5, name: "LED Panels", sku: "ELC-015", category: "Electrical", uom: "pcs", stock: 0, location: "Warehouse C" },
  { id: 6, name: "Bolts M8", sku: "HDW-022", category: "Hardware", uom: "pcs", stock: 5000, location: "Main Warehouse" },
];

export default function Products() {
  const [products, setProducts] = useState(initialProducts);
  const [search, setSearch] = useState("");
  const [catFilter, setCatFilter] = useState("all");
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: "", sku: "", category: "", uom: "pcs", stock: "", location: "" });

  const filtered = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.sku.toLowerCase().includes(search.toLowerCase());
    const matchesCat = catFilter === "all" || p.category === catFilter;
    return matchesSearch && matchesCat;
  });

  const categories = [...new Set(products.map(p => p.category))];

  const handleCreate = () => {
    if (!form.name || !form.sku) return;
    setProducts(prev => [...prev, { ...form, id: Date.now(), stock: Number(form.stock) || 0 }]);
    setForm({ name: "", sku: "", category: "", uom: "pcs", stock: "", location: "" });
    setOpen(false);
  };

  const stockStatus = (s: number) => s === 0 ? "Out of Stock" : s < 10 ? "Low Stock" : "In Stock";
  const stockVariant = (s: number) => s === 0 ? "Cancelled" : s < 10 ? "Waiting" : "Done";

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Products</h1>
          <p className="text-sm text-muted-foreground">Manage your product catalog</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2"><Plus className="h-4 w-4" /> Add Product</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>New Product</DialogTitle></DialogHeader>
            <div className="grid gap-4 py-4">
              {[
                { label: "Product Name", key: "name", placeholder: "e.g. Steel Rods" },
                { label: "SKU / Code", key: "sku", placeholder: "e.g. STL-001" },
                { label: "Category", key: "category", placeholder: "e.g. Raw Materials" },
                { label: "Unit of Measure", key: "uom", placeholder: "e.g. kg, pcs" },
                { label: "Initial Stock", key: "stock", placeholder: "0" },
                { label: "Warehouse Location", key: "location", placeholder: "e.g. Main Warehouse" },
              ].map(f => (
                <div key={f.key} className="grid gap-1.5">
                  <Label>{f.label}</Label>
value={form[f.key as keyof typeof form] as string} onChange={e => setForm(prev => ({ ...prev, [f.key as keyof typeof form]: e.target.value } as typeof form))}
                </div>
              ))}
              <Button onClick={handleCreate}>Create Product</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex gap-3 justify-between items-end">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search by name or SKU..." className="pl-9" value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <Select value={catFilter} onValueChange={setCatFilter}>
          <SelectTrigger className="w-[220px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      <div className="bg-card rounded-xl border shadow-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>SKU</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map(p => (
              <TableRow key={p.id}>
                <TableCell className="font-medium">{p.name}</TableCell>
                <TableCell className="font-mono text-sm">{p.sku}</TableCell>
                <TableCell>{p.category}</TableCell>
                <TableCell className="font-mono">{p.stock} {p.uom}</TableCell>
                <TableCell>{p.location}</TableCell>
                <TableCell><StatusBadge status={stockVariant(p.stock)} /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

