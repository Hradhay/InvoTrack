import { useState } from "react";
import { Plus, Search, List, LayoutGrid, Printer, X, Check, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { StatusBadge } from "@/components/StatusBadge";
import { StateIndicator } from "@/components/StateIndicator";
import { OperationKanban } from "@/components/OperationKanban";

interface DeliveryLine { product: string; qty: number; availableStock?: number }

interface Delivery {
  id: number;
  reference: string;
  from: string;
  to: string;
  contact: string;
  scheduleDate: string;
  status: string;
  responsible: string;
  operationType: string;
  lines: DeliveryLine[];
}

const DELIVERY_STATES = ["Draft", "Waiting", "Ready", "Done"];

const initialDeliveries: Delivery[] = [
  { id: 1, reference: "WH/OUT/0001", from: "WH/Stock1", to: "Customer", contact: "Azure Interior", scheduleDate: "2026-03-14", status: "Ready", responsible: "John D.", operationType: "Delivery", lines: [{ product: "Desk", qty: 6, availableStock: 50 }] },
  { id: 2, reference: "WH/OUT/0002", from: "WH/Stock1", to: "Customer", contact: "BuildPro", scheduleDate: "2026-03-13", status: "Draft", responsible: "Sara K.", operationType: "Delivery", lines: [{ product: "Bolts M8", qty: 200, availableStock: 5000 }] },
  { id: 3, reference: "WH/OUT/0003", from: "WH/Stock2", to: "Customer", contact: "HomeFix", scheduleDate: "2026-03-12", status: "Done", responsible: "Mike R.", operationType: "Delivery", lines: [{ product: "Plywood Sheets", qty: 15, availableStock: 2 }] },
];

const WAREHOUSES = ["WH/Stock1", "WH/Stock2", "WH/Stock3"];
const OP_TYPES = ["Delivery", "Return"];

export default function Deliveries() {
  const [deliveries, setDeliveries] = useState(initialDeliveries);
  const [view, setView] = useState<"list" | "kanban">("list");
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [formMode, setFormMode] = useState<"none" | "new" | "edit">("none");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState({ contact: "", from: "WH/Stock1", scheduleDate: "", operationType: "Delivery", lines: [{ product: "", qty: 0, availableStock: 100 }] as DeliveryLine[] });
  const [stockAlert, setStockAlert] = useState<string | null>(null);

  const nextRef = `WH/OUT/${String(deliveries.length + 1).padStart(4, "0")}`;

  const filtered = deliveries.filter((d) => {
    const q = search.toLowerCase();
    return d.reference.toLowerCase().includes(q) || d.contact.toLowerCase().includes(q);
  });

  const openNew = () => {
    setForm({ contact: "", from: "WH/Stock1", scheduleDate: new Date().toISOString().split("T")[0], operationType: "Delivery", lines: [{ product: "", qty: 0, availableStock: 100 }] });
    setEditingId(null);
    setFormMode("new");
    setStockAlert(null);
  };

  const openEdit = (d: Delivery) => {
    setForm({ contact: d.contact, from: d.from, scheduleDate: d.scheduleDate, operationType: d.operationType, lines: [...d.lines] });
    setEditingId(d.id);
    setFormMode("edit");
    setStockAlert(null);
  };

  const handleValidate = () => {
    // Check stock
    const overStock = form.lines.find((l) => l.product && l.qty > (l.availableStock || 0));
    if (overStock) {
      setStockAlert(`Insufficient stock for "${overStock.product}": requested ${overStock.qty}, available ${overStock.availableStock}`);
      return;
    }

    if (formMode === "new") {
      if (!form.contact) return;
      setDeliveries((prev) => [...prev, {
        id: prev.length + 1,
        reference: nextRef,
        from: form.from,
        to: "Customer",
        contact: form.contact,
        scheduleDate: form.scheduleDate,
        status: "Draft",
        responsible: "Current User",
        operationType: form.operationType,
        lines: form.lines.filter((l) => l.product),
      }]);
    } else if (editingId !== null) {
      setDeliveries((prev) => prev.map((d) => {
        if (d.id !== editingId) return d;
        const currentIdx = DELIVERY_STATES.indexOf(d.status);
        const nextStatus = currentIdx < DELIVERY_STATES.length - 1 ? DELIVERY_STATES[currentIdx + 1] : d.status;
        return { ...d, status: nextStatus, contact: form.contact, from: form.from, scheduleDate: form.scheduleDate, operationType: form.operationType, lines: form.lines.filter((l) => l.product) };
      }));
    }
    setFormMode("none");
  };

  const handleCancel = () => { setFormMode("none"); setStockAlert(null); };

  const addLine = () => setForm((f) => ({ ...f, lines: [...f.lines, { product: "", qty: 0, availableStock: 100 }] }));

  const updateLine = (idx: number, field: keyof DeliveryLine, value: string | number) => {
    setForm((f) => ({
      ...f,
      lines: f.lines.map((l, i) => (i === idx ? { ...l, [field]: value } : l)),
    }));
    setStockAlert(null);
  };

  const currentDelivery = editingId ? deliveries.find((d) => d.id === editingId) : null;

  if (formMode !== "none") {
    const currentStatus = currentDelivery?.status || "Draft";
    return (
      <div className="space-y-6">
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
          <StateIndicator states={DELIVERY_STATES} current={currentStatus} />
        </div>

        {stockAlert && (
          <div className="flex items-center gap-2 bg-destructive/10 border border-destructive/20 text-destructive rounded-lg p-3 text-sm">
            <AlertTriangle className="h-4 w-4 shrink-0" />
            {stockAlert}
          </div>
        )}

        <div className="bg-card rounded-xl border shadow-card p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label className="text-muted-foreground text-xs">Reference</Label>
                <p className="font-mono text-lg font-semibold text-foreground">{editingId ? currentDelivery?.reference : nextRef}</p>
              </div>
              <div className="grid gap-1.5">
                <Label>Delivery Address / Customer</Label>
                <Input value={form.contact} onChange={(e) => setForm((f) => ({ ...f, contact: e.target.value }))} placeholder="e.g. Azure Interior" />
              </div>
              <div className="grid gap-1.5">
                <Label>Responsible</Label>
                <Input value={currentDelivery?.responsible || "Current User"} disabled className="bg-muted" />
              </div>
            </div>
            <div className="space-y-4">
              <div className="grid gap-1.5">
                <Label>Schedule Date</Label>
                <Input type="date" value={form.scheduleDate} onChange={(e) => setForm((f) => ({ ...f, scheduleDate: e.target.value }))} />
              </div>
              <div className="grid gap-1.5">
                <Label>Source Location</Label>
                <select
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                  value={form.from}
                  onChange={(e) => setForm((f) => ({ ...f, from: e.target.value }))}
                >
                  {WAREHOUSES.map((w) => <option key={w} value={w}>{w}</option>)}
                </select>
              </div>
              <div className="grid gap-1.5">
                <Label>Operation Type</Label>
                <select
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                  value={form.operationType}
                  onChange={(e) => setForm((f) => ({ ...f, operationType: e.target.value }))}
                >
                  {OP_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
            </div>
          </div>

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
                  {form.lines.map((line, i) => {
                    const isOver = line.product && line.qty > (line.availableStock || 0);
                    return (
                      <TableRow key={i} className={isOver ? "bg-destructive/5" : ""}>
                        <TableCell>
                          <Input value={line.product} onChange={(e) => updateLine(i, "product", e.target.value)} placeholder="e.g. [DESK001] Desk" className={isOver ? "border-destructive" : ""} />
                        </TableCell>
                        <TableCell>
                          <Input type="number" value={line.qty || ""} onChange={(e) => updateLine(i, "qty", Number(e.target.value))} placeholder="0" className={isOver ? "border-destructive" : ""} />
                        </TableCell>
                      </TableRow>
                    );
                  })}
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

  const kanbanItems = filtered.map((d) => ({
    id: String(d.id),
    reference: d.reference,
    contact: d.contact,
    scheduleDate: d.scheduleDate,
    productSummary: d.lines.map((l) => `${l.product} x${l.qty}`).join(", "),
    status: d.status,
  }));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button onClick={openNew} className="gap-2"><Plus className="h-4 w-4" /> NEW</Button>
          <h1 className="font-display text-2xl font-bold text-foreground">Delivery</h1>
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
              {filtered.map((d) => (
                <TableRow key={d.id} className="cursor-pointer hover:bg-muted/50" onClick={() => openEdit(d)}>
                  <TableCell className="font-mono text-sm font-medium">{d.reference}</TableCell>
                  <TableCell>{d.from}</TableCell>
                  <TableCell>{d.to}</TableCell>
                  <TableCell>{d.contact}</TableCell>
                  <TableCell>{d.scheduleDate}</TableCell>
                  <TableCell><StatusBadge status={d.status} /></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <OperationKanban items={kanbanItems} columns={DELIVERY_STATES} />
      )}
    </div>
  );
}
