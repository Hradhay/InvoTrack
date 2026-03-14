import { useState } from "react";
import { Plus, Search, List, LayoutGrid, Printer, X, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { StatusBadge } from "@/components/StatusBadge";
import { StateIndicator } from "@/components/StateIndicator";
import { OperationKanban } from "@/components/OperationKanban";

interface ReceiptLine { product: string; qty: number }

interface Receipt {
  id: number;
  reference: string;
  from: string;
  to: string;
  contact: string;
  scheduleDate: string;
  status: string;
  responsible: string;
  lines: ReceiptLine[];
}

const RECEIPT_STATES = ["Draft", "Ready", "Done"];

const initialReceipts: Receipt[] = [
  { id: 1, reference: "WH/IN/0001", from: "Vendor", to: "WH/Stock1", contact: "Azure Interior", scheduleDate: "2026-03-14", status: "Ready", responsible: "John D.", lines: [{ product: "Desk", qty: 6 }] },
  { id: 2, reference: "WH/IN/0002", from: "Vendor", to: "WH/Stock1", contact: "BrightLite Co.", scheduleDate: "2026-03-13", status: "Done", responsible: "Sara K.", lines: [{ product: "LED Panels", qty: 100 }] },
  { id: 3, reference: "WH/IN/0003", from: "Vendor", to: "WH/Stock2", contact: "WireMax", scheduleDate: "2026-03-12", status: "Draft", responsible: "Mike R.", lines: [{ product: "Copper Wire", qty: 200 }] },
];

const WAREHOUSES = ["WH/Stock1", "WH/Stock2", "WH/Stock3"];

export default function Receipts() {
  const [receipts, setReceipts] = useState(initialReceipts);
  const [view, setView] = useState<"list" | "kanban">("list");
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [formMode, setFormMode] = useState<"none" | "new" | "edit">("none");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState({ contact: "", to: "WH/Stock1", scheduleDate: "", lines: [{ product: "", qty: 0 }] as ReceiptLine[] });

  const nextRef = `WH/IN/${String(receipts.length + 1).padStart(4, "0")}`;

  const filtered = receipts.filter((r) => {
    const q = search.toLowerCase();
    return r.reference.toLowerCase().includes(q) || r.contact.toLowerCase().includes(q);
  });

  const openNew = () => {
    setForm({ contact: "", to: "WH/Stock1", scheduleDate: new Date().toISOString().split("T")[0], lines: [{ product: "", qty: 0 }] });
    setEditingId(null);
    setFormMode("new");
  };

  const openEdit = (r: Receipt) => {
    setForm({ contact: r.contact, to: r.to, scheduleDate: r.scheduleDate, lines: [...r.lines] });
    setEditingId(r.id);
    setFormMode("edit");
  };

  const handleValidate = () => {
    if (formMode === "new") {
      if (!form.contact) return;
      setReceipts((prev) => [...prev, {
        id: prev.length + 1,
        reference: nextRef,
        from: "Vendor",
        to: form.to,
        contact: form.contact,
        scheduleDate: form.scheduleDate,
        status: "Draft",
        responsible: "Current User",
        lines: form.lines.filter((l) => l.product),
      }]);
    } else if (editingId !== null) {
      setReceipts((prev) => prev.map((r) => {
        if (r.id !== editingId) return r;
        const currentIdx = RECEIPT_STATES.indexOf(r.status);
        const nextStatus = currentIdx < RECEIPT_STATES.length - 1 ? RECEIPT_STATES[currentIdx + 1] : r.status;
        return { ...r, status: nextStatus, contact: form.contact, to: form.to, scheduleDate: form.scheduleDate, lines: form.lines.filter((l) => l.product) };
      }));
    }
    setFormMode("none");
  };

  const handleCancel = () => setFormMode("none");

  const addLine = () => setForm((f) => ({ ...f, lines: [...f.lines, { product: "", qty: 0 }] }));

  const updateLine = (idx: number, field: keyof ReceiptLine, value: string | number) => {
    setForm((f) => ({
      ...f,
      lines: f.lines.map((l, i) => (i === idx ? { ...l, [field]: value } : l)),
    }));
  };

  const currentReceipt = editingId ? receipts.find((r) => r.id === editingId) : null;

  if (formMode !== "none") {
    const currentStatus = currentReceipt?.status || "Draft";
    return (
      <div className="space-y-6">
        {/* Top control bar */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button onClick={handleValidate} className="gap-2">
              <Check className="h-4 w-4" /> Validate
            </Button>
            <Button variant="outline" className="gap-2" disabled={currentStatus !== "Done"}>
              <Printer className="h-4 w-4" /> Print
            </Button>
            <Button variant="ghost" onClick={handleCancel} className="gap-2">
              <X className="h-4 w-4" /> Cancel
            </Button>
          </div>
          <StateIndicator states={RECEIPT_STATES} current={currentStatus} />
        </div>

        {/* Form */}
        <div className="bg-card rounded-xl border shadow-card p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label className="text-muted-foreground text-xs">Reference</Label>
                <p className="font-mono text-lg font-semibold text-foreground">{editingId ? currentReceipt?.reference : nextRef}</p>
              </div>
              <div className="grid gap-1.5">
                <Label>Receive From (Supplier)</Label>
                <Input value={form.contact} onChange={(e) => setForm((f) => ({ ...f, contact: e.target.value }))} placeholder="e.g. Azure Interior" />
              </div>
              <div className="grid gap-1.5">
                <Label>Responsible</Label>
                <Input value={currentReceipt?.responsible || "Current User"} disabled className="bg-muted" />
              </div>
            </div>
            <div className="space-y-4">
              <div className="grid gap-1.5">
                <Label>Schedule Date</Label>
                <Input type="date" value={form.scheduleDate} onChange={(e) => setForm((f) => ({ ...f, scheduleDate: e.target.value }))} />
              </div>
              <div className="grid gap-1.5">
                <Label>Destination Location</Label>
                <select
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                  value={form.to}
                  onChange={(e) => setForm((f) => ({ ...f, to: e.target.value }))}
                >
                  {WAREHOUSES.map((w) => <option key={w} value={w}>{w}</option>)}
                </select>
              </div>
            </div>
          </div>

          {/* Product lines */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3">Products</h3>
            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead className="w-[120px]">Quantity</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {form.lines.map((line, i) => (
                    <TableRow key={i}>
                      <TableCell>
                        <Input value={line.product} onChange={(e) => updateLine(i, "product", e.target.value)} placeholder="e.g. [DESK001] Desk" />
                      </TableCell>
                      <TableCell>
                        <Input type="number" value={line.qty || ""} onChange={(e) => updateLine(i, "qty", Number(e.target.value))} placeholder="0" />
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow className="cursor-pointer hover:bg-muted/50" onClick={addLine}>
                    <TableCell colSpan={2} className="text-sm text-primary font-medium">
                      <Plus className="h-3 w-3 inline mr-1" /> New Product
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const kanbanItems = filtered.map((r) => ({
    id: String(r.id),
    reference: r.reference,
    contact: r.contact,
    scheduleDate: r.scheduleDate,
    productSummary: r.lines.map((l) => `${l.product} x${l.qty}`).join(", "),
    status: r.status,
  }));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button onClick={openNew} className="gap-2"><Plus className="h-4 w-4" /> NEW</Button>
          <h1 className="font-display text-2xl font-bold text-foreground">Receipts</h1>
        </div>
        <div className="flex items-center gap-1">
          {showSearch && (
            <Input
              className="w-48 h-8 text-sm"
              placeholder="Search ref or contact..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              autoFocus
            />
          )}
          <Button variant="ghost" size="icon" onClick={() => setShowSearch(!showSearch)}>
            <Search className="h-4 w-4" />
          </Button>
          <Button variant={view === "list" ? "secondary" : "ghost"} size="icon" onClick={() => setView("list")}>
            <List className="h-4 w-4" />
          </Button>
          <Button variant={view === "kanban" ? "secondary" : "ghost"} size="icon" onClick={() => setView("kanban")}>
            <LayoutGrid className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {view === "list" ? (
        <div className="bg-card rounded-xl border shadow-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Reference</TableHead>
                <TableHead>From</TableHead>
                <TableHead>To</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Schedule Date</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((r) => (
                <TableRow key={r.id} className="cursor-pointer hover:bg-muted/50" onClick={() => openEdit(r)}>
                  <TableCell className="font-mono text-sm font-medium">{r.reference}</TableCell>
                  <TableCell>{r.from}</TableCell>
                  <TableCell>{r.to}</TableCell>
                  <TableCell>{r.contact}</TableCell>
                  <TableCell>{r.scheduleDate}</TableCell>
                  <TableCell><StatusBadge status={r.status} /></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <OperationKanban items={kanbanItems} columns={RECEIPT_STATES} />
      )}
    </div>
  );
}
