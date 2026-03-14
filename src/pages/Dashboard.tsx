import { Package, AlertTriangle, XCircle, ClipboardCheck, Truck, ArrowLeftRight } from "lucide-react";
import { KpiCard } from "@/components/KpiCard";
import { StatusBadge } from "@/components/StatusBadge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const kpis = [
  { title: "Total Products", value: 248, icon: Package, variant: "default" as const },
  { title: "Low Stock Items", value: 12, icon: AlertTriangle, variant: "warning" as const },
  { title: "Out of Stock", value: 3, icon: XCircle, variant: "destructive" as const },
  { title: "Pending Receipts", value: 8, icon: ClipboardCheck, variant: "default" as const },
  { title: "Pending Deliveries", value: 5, icon: Truck, variant: "default" as const },
  { title: "Scheduled Transfers", value: 4, icon: ArrowLeftRight, variant: "success" as const },
];

const movements = [
  { date: "2026-03-14", product: "Steel Rods", type: "Receipt", qty: "+50", location: "Main Warehouse", status: "Done" },
  { date: "2026-03-14", product: "Office Chairs", type: "Delivery", qty: "-10", location: "Warehouse B", status: "Ready" },
  { date: "2026-03-13", product: "Copper Wire", type: "Transfer", qty: "30", location: "Rack A → Rack B", status: "Done" },
  { date: "2026-03-13", product: "Plywood Sheets", type: "Adjustment", qty: "-3", location: "Main Warehouse", status: "Done" },
  { date: "2026-03-12", product: "LED Panels", type: "Receipt", qty: "+100", location: "Warehouse C", status: "Waiting" },
  { date: "2026-03-12", product: "Bolts M8", type: "Delivery", qty: "-200", location: "Main Warehouse", status: "Draft" },
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-sm text-muted-foreground">Overview of your warehouse operations</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {kpis.map(k => <KpiCard key={k.title} {...k} />)}
      </div>

      <div className="bg-card rounded-xl border shadow-card">
        <div className="p-5 border-b flex flex-wrap items-center justify-between gap-3">
          <h2 className="font-display font-semibold text-foreground">Recent Stock Movements</h2>
          <div className="flex gap-2">
            <Select>
              <SelectTrigger className="w-[140px] h-8 text-xs"><SelectValue placeholder="Operation" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="receipt">Receipts</SelectItem>
                <SelectItem value="delivery">Deliveries</SelectItem>
                <SelectItem value="transfer">Transfers</SelectItem>
                <SelectItem value="adjustment">Adjustments</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-[120px] h-8 text-xs"><SelectValue placeholder="Status" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="done">Done</SelectItem>
                <SelectItem value="ready">Ready</SelectItem>
                <SelectItem value="waiting">Waiting</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Product</TableHead>
              <TableHead>Operation</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {movements.map((m, i) => (
              <TableRow key={i}>
                <TableCell className="text-sm">{m.date}</TableCell>
                <TableCell className="font-medium text-sm">{m.product}</TableCell>
                <TableCell className="text-sm">{m.type}</TableCell>
                <TableCell className="text-sm font-mono">{m.qty}</TableCell>
                <TableCell className="text-sm">{m.location}</TableCell>
                <TableCell><StatusBadge status={m.status} /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
