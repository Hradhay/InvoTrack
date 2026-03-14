import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { StatusBadge } from "@/components/StatusBadge";

interface Transfer {
  id: string; product: string; from: string; to: string; qty: number; date: string; status: string;
}

const initial: Transfer[] = [
  { id: "TRF-001", product: "Copper Wire", from: "Rack A", to: "Rack B", qty: 30, date: "2026-03-13", status: "Done" },
  { id: "TRF-002", product: "Steel Rods", from: "Main Warehouse", to: "Production Floor", qty: 20, date: "2026-03-14", status: "Waiting" },
];

export default function Transfers() {
  const [transfers, setTransfers] = useState(initial);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ product: "", from: "", to: "", qty: "" });

  const handleCreate = () => {
    if (!form.product || !form.from || !form.to) return;
    setTransfers(prev => [...prev, {
      id: `TRF-${String(prev.length + 1).padStart(3, "0")}`,
      ...form, qty: Number(form.qty) || 0, date: new Date().toISOString().split("T")[0], status: "Draft"
    }]);
    setForm({ product: "", from: "", to: "", qty: "" });
    setOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Internal Transfers</h1>
          <p className="text-sm text-muted-foreground">Move products between warehouse locations</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild><Button className="gap-2"><Plus className="h-4 w-4" /> New Transfer</Button></DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>Create Transfer</DialogTitle></DialogHeader>
            <div className="grid gap-4 py-4">
              {[
                { label: "Product", key: "product", placeholder: "e.g. Steel Rods" },
                { label: "From Location", key: "from", placeholder: "e.g. Main Warehouse" },
                { label: "To Location", key: "to", placeholder: "e.g. Production Floor" },
                { label: "Quantity", key: "qty", placeholder: "0" },
              ].map(f => (
                <div key={f.key} className="grid gap-1.5">
                  <Label>{f.label}</Label>
                  <Input placeholder={f.placeholder} value={(form as any)[f.key]} onChange={e => setForm(prev => ({ ...prev, [f.key]: e.target.value }))} />
                </div>
              ))}
              <Button onClick={handleCreate}>Create</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <div className="bg-card rounded-xl border shadow-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead><TableHead>Product</TableHead><TableHead>From</TableHead>
              <TableHead>To</TableHead><TableHead>Qty</TableHead><TableHead>Date</TableHead><TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transfers.map(t => (
              <TableRow key={t.id}>
                <TableCell className="font-mono text-sm">{t.id}</TableCell>
                <TableCell className="font-medium">{t.product}</TableCell>
                <TableCell>{t.from}</TableCell>
                <TableCell>{t.to}</TableCell>
                <TableCell className="font-mono">{t.qty}</TableCell>
                <TableCell>{t.date}</TableCell>
                <TableCell><StatusBadge status={t.status} /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
