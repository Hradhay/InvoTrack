import { useState } from "react";
import { Search, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { StatusBadge } from "@/components/StatusBadge";
import { Badge } from "@/components/ui/badge";

const dummyWarehouses = [
  "All Warehouses",
  "Main Warehouse",
  "Warehouse B",
  "Warehouse C",
  "Production Floor",
];

const movementTypes = ["All Types", "Receipts", "Deliveries", "Transfers", "Adjustments"];
const statuses = ["All Status", "Draft", "Waiting", "Ready", "Done"];

interface Movement {
  id: string;
  ref: string;
  product: string;
  type: string;
  from: string;
  to: string;
  user: string;
  status: string;
  date: string;
}

const initialMovements: Movement[] = [
  { id: "1", ref: "MV-1001", product: "Steel Rods", type: "Receipt", from: "", to: "Main Warehouse", user: "John D.", status: "Done", date: "2026-03-14" },
  { id: "2", ref: "MV-1002", product: "Office Chairs", type: "Delivery", from: "Warehouse B", to: "", user: "Sara K.", status: "Ready", date: "2026-03-14" },
  { id: "3", ref: "MV-1003", product: "Copper Wire", type: "Transfer", from: "Rack A", to: "Rack B", user: "Mike R.", status: "Done", date: "2026-03-13" },
  { id: "4", ref: "MV-1004", product: "Plywood Sheets", type: "Adjustment", from: "Main Warehouse", to: "Main Warehouse", user: "John D.", status: "Draft", date: "2026-03-13" },
  { id: "5", ref: "MV-1005", product: "LED Panels", type: "Receipt", from: "", to: "Warehouse C", user: "Sara K.", status: "Waiting", date: "2026-03-12" },
  { id: "6", ref: "MV-1006", product: "Bolts M8", type: "Delivery", from: "Main Warehouse", to: "", user: "Mike R.", status: "Ready", date: "2026-03-12" },
  { id: "7", ref: "MV-1007", product: "Nails 4in", type: "Transfer", from: "Warehouse B", to: "Production Floor", user: "John D.", status: "Done", date: "2026-03-11" },
  { id: "8", ref: "MV-1008", product: "Paint Cans", type: "Adjustment", from: "Main Warehouse", to: "Main Warehouse", user: "Sara K.", status: "Draft", date: "2026-03-10" },
  { id: "9", ref: "MV-1009", product: "Wood Beams", type: "Receipt", from: "", to: "Main Warehouse", user: "Mike R.", status: "Done", date: "2026-03-09" },
  { id: "10", ref: "MV-1010", product: "Office Desks", type: "Delivery", from: "Warehouse C", to: "", user: "John D.", status: "Waiting", date: "2026-03-09" },
  { id: "11", ref: "MV-1011", product: "Copper Pipe", type: "Transfer", from: "Rack B", to: "Rack C", user: "Sara K.", status: "Ready", date: "2026-03-08" },
  { id: "12", ref: "MV-1012", product: "Screws M5", type: "Adjustment", from: "Production Floor", to: "Production Floor", user: "Mike R.", status: "Done", date: "2026-03-07" },
  { id: "13", ref: "MV-1013", product: "Aluminum Sheets", type: "Receipt", from: "", to: "Warehouse B", user: "John D.", status: "Draft", date: "2026-03-06" },
  { id: "14", ref: "MV-1014", product: "Chairs", type: "Delivery", from: "Main Warehouse", to: "", user: "Sara K.", status: "Ready", date: "2026-03-05" },
  { id: "15", ref: "MV-1015", product: "Wires", type: "Transfer", from: "Warehouse C", to: "Rack A", user: "Mike R.", status: "Done", date: "2026-03-04" },
  { id: "16", ref: "MV-1016", product: "Plywood", type: "Adjustment", from: "Rack B", to: "Rack B", user: "John D.", status: "Waiting", date: "2026-03-03" },
  { id: "17", ref: "MV-1017", product: "LED Lights", type: "Receipt", from: "", to: "Production Floor", user: "Sara K.", status: "Done", date: "2026-03-02" },
  { id: "18", ref: "MV-1018", product: "Bolts", type: "Delivery", from: "Warehouse B", to: "", user: "Mike R.", status: "Draft", date: "2026-03-01" },
  { id: "19", ref: "MV-1019", product: "Nails", type: "Transfer", from: "Main Warehouse", to: "Warehouse C", user: "John D.", status: "Ready", date: "2026-02-28" },
  { id: "20", ref: "MV-1020", product: "Paint", type: "Adjustment", from: "Production Floor", to: "Production Floor", user: "Sara K.", status: "Done", date: "2026-02-27" },
];

export default function MoveHistory() {
  const [search, setSearch] = useState("");
  const [warehouseFilter, setWarehouseFilter] = useState("All Warehouses");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [typeFilter, setTypeFilter] = useState("All Types");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [sortBy, setSortBy] = useState<"date" | "ref">("date");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
  const [page, setPage] = useState(1);
  const [selectedMovement, setSelectedMovement] = useState<Movement | null>(null);

  const PAGE_SIZE = 10;

  const filteredMovements = initialMovements
    .filter((m) => {
      const matchesSearch = !search || 
        m.ref.toLowerCase().includes(search.toLowerCase()) ||
        m.product.toLowerCase().includes(search.toLowerCase()) ||
        m.user.toLowerCase().includes(search.toLowerCase()) ||
        m.from.toLowerCase().includes(search.toLowerCase()) ||
        m.to.toLowerCase().includes(search.toLowerCase());
      const matchesWarehouse = warehouseFilter === "All Warehouses" || 
        m.from.includes(warehouseFilter) || m.to.includes(warehouseFilter);
      const matchesDate = !fromDate || !toDate || 
        (new Date(m.date) >= new Date(fromDate) && new Date(m.date) <= new Date(toDate));
      const typeVal = typeFilter === "All Types" ? "" : typeFilter.replace("s", "").toLowerCase();
      const matchesType = !typeVal || m.type.toLowerCase() === typeVal;
      const statusVal = statusFilter === "All Status" ? "" : statusFilter.toLowerCase();
      const matchesStatus = !statusVal || m.status.toLowerCase() === statusVal;
      return matchesSearch && matchesWarehouse && matchesDate && matchesType && matchesStatus;
    })
    .sort((a, b) => {
      let aVal = sortBy === "date" ? new Date(a.date).getTime() : a.ref;
      let bVal = sortBy === "date" ? new Date(b.date).getTime() : b.ref;
      return (aVal < bVal ? -1 : 1) * (sortDir === "asc" ? 1 : -1);
    });

  const paginatedMovements = filteredMovements.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const totalPages = Math.ceil(filteredMovements.length / PAGE_SIZE);

  const formatDate = (dateStr: string) => new Date(dateStr).toLocaleDateString("en-GB");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground">Move History</h1>
        <p className="text-sm text-muted-foreground">Complete ledger of all stock movements</p>
      </div>

      {/* Top Controls */}
      <div className="space-y-4">
        <div className="flex gap-3 items-end flex-wrap">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 text-muted-foreground -translate-y-1/2" />
            <Input 
              placeholder="Search by reference, product, contact…"
              className="pl-9"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Select value={warehouseFilter} onValueChange={setWarehouseFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {dummyWarehouses.map((w) => (
                <SelectItem key={w} value={w}>{w}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="All Types" />
            </SelectTrigger>
            <SelectContent>
              {movementTypes.map((type) => (
                <SelectItem key={type} value={type}>{type}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent>
              {statuses.map((s) => (
                <SelectItem key={s} value={s}>{s}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="flex gap-2">
            <div className="space-y-1">
              <Label className="text-xs">From</Label>
              <Input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
            </div>
            <div className="space-y-1">
              <Label className="text-xs">To</Label>
              <Input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} />
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-card rounded-xl border shadow-card overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead 
                className="cursor-pointer select-none hover:bg-muted"
                onClick={() => {
                  if (sortBy === "ref") {
                    setSortDir(sortDir === "asc" ? "desc" : "asc");
                  } else {
                    setSortBy("ref");
                    setSortDir("desc");
                  }
                }}
              >
                Reference {sortBy === "ref" && (sortDir === "asc" ? " ↑" : " ↓")}
              </TableHead>
              <TableHead>Product</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>From</TableHead>
              <TableHead>To</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Status</TableHead>
              <TableHead 
                className="cursor-pointer select-none hover:bg-muted"
                onClick={() => {
                  if (sortBy === "date") {
                    setSortDir(sortDir === "asc" ? "desc" : "asc");
                  } else {
                    setSortBy("date");
                    setSortDir("desc");
                  }
                }}
              >
                Date {sortBy === "date" && (sortDir === "asc" ? " ↑" : " ↓")}
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedMovements.map((movement) => (
              <TableRow 
                key={movement.id}
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => setSelectedMovement(movement)}
              >
                <TableCell className="font-medium">{movement.ref}</TableCell>
                <TableCell>{movement.product}</TableCell>
                <TableCell><Badge variant="secondary">{movement.type}</Badge></TableCell>
                <TableCell>{movement.from || "-"}</TableCell>
                <TableCell>{movement.to || "-"}</TableCell>
                <TableCell>{movement.user}</TableCell>
                <TableCell><StatusBadge status={movement.status} /></TableCell>
                <TableCell>{formatDate(movement.date)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-6 py-4 bg-muted/50">
            <div className="text-sm text-muted-foreground">
              Page {page} of {totalPages} ({filteredMovements.length} results)
            </div>
            <div className="flex gap-1">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage((p) => Math.max(p - 1, 1))}
                disabled={page === 1}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                disabled={page === totalPages}
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </div>

      <Dialog open={!!selectedMovement} onOpenChange={() => setSelectedMovement(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Movement Details</DialogTitle>
            <DialogDescription>Reference {selectedMovement?.ref}</DialogDescription>
          </DialogHeader>
          {selectedMovement && (
            <div className="space-y-2 text-sm">
              <div><strong>Product:</strong> {selectedMovement.product}</div>
              <div><strong>Type:</strong> {selectedMovement.type}</div>
              <div><strong>From:</strong> {selectedMovement.from || "N/A"}</div>
              <div><strong>To:</strong> {selectedMovement.to || "N/A"}</div>
              <div><strong>User:</strong> {selectedMovement.user}</div>
              <div><strong>Status:</strong> <StatusBadge status={selectedMovement.status} /></div>
              <div><strong>Date:</strong> {formatDate(selectedMovement.date)}</div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
