import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { StatusBadge } from "@/components/StatusBadge";

interface Adjustment {
  id: string; product: string; location: string; systemQty: number; countedQty: number; difference: number; status: string;
}

const initial: Adjustment[] = [
  { id: "ADJ-001", product: "Plywood Sheets", location: "Main Warehouse", systemQty: 50, countedQty: 47, difference: -3, status: "Done" },
  { id: "ADJ-002", product: "LED Panels", location: "Warehouse C", systemQty: 100, countedQty: 98, difference: -2, status: "Waiting" },
];

export default function Adjustments() {
  const [adjustments, setAdjustments] = useState(initial);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ product: "", location: "", systemQty: "", countedQty: "" });

  const handleCreate = () => {
    if (!form.product) return;
    const sys = Number(form.systemQty) || 0;
    const counted = Number(form.countedQty) || 0;
    setAdjustments(prev => [...prev, {
      id: `ADJ-${String(prev.length + 1).padStart(3, "0")}`,
      product: form.product, location: form.location,
      systemQty: sys, countedQty: counted, difference: counted - sys, status: "Draft"
    }]);
    setForm({ product: "", location: "", systemQty: "", countedQty: "" });
    setOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Stock Adjustments</h1>
          <p className="text-sm text-muted-foreground">Correct inventory discrepancies</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild><Button className="gap-2"><Plus className="h-4 w-4" /> New Adjustment</Button></DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>Stock Adjustment</DialogTitle></DialogHeader>
            <div className="grid gap-4 py-4">
              {[
                { label: "Product", key: "product", placeholder: "e.g. Plywood Sheets" },
                { label: "Location", key: "location", placeholder: "e.g. Main Warehouse" },
                { label: "System Quantity", key: "systemQty", placeholder: "50" },
                { label: "Counted Quantity", key: "countedQty", placeholder: "47" },
              ].map(f => (
                <div key={f.key} className="grid gap-1.5">
                  <Label>{f.label}</Label>
                  <Input placeholder={f.placeholder} value={(form as any)[f.key]} onChange={e => setForm(prev => ({ ...prev, [f.key]: e.target.value }))} />
                </div>
              ))}
              <Button onClick={handleCreate}>Log Adjustment</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <div className="bg-card rounded-xl border shadow-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead><TableHead>Product</TableHead><TableHead>Location</TableHead>
              <TableHead>System Qty</TableHead><TableHead>Counted</TableHead><TableHead>Difference</TableHead><TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {adjustments.map(a => (
              <TableRow key={a.id}>
                <TableCell className="font-mono text-sm">{a.id}</TableCell>
                <TableCell className="font-medium">{a.product}</TableCell>
                <TableCell>{a.location}</TableCell>
                <TableCell className="font-mono">{a.systemQty}</TableCell>
                <TableCell className="font-mono">{a.countedQty}</TableCell>
                <TableCell className={`font-mono font-medium ${a.difference < 0 ? "text-destructive" : "text-success"}`}>{a.difference > 0 ? "+" : ""}{a.difference}</TableCell>
                <TableCell><StatusBadge status={a.status} /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
