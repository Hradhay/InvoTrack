import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

interface StockItem {
  id: number;
  product: string;
  perUnitCost: number;
  onHand: number;
  freeToUse: number;
}

const initialStock: StockItem[] = [
  { id: 1, product: "Desk", perUnitCost: 3000, onHand: 50, freeToUse: 45 },
  { id: 2, product: "Table", perUnitCost: 3000, onHand: 50, freeToUse: 50 },
  { id: 3, product: "Office Chair", perUnitCost: 4500, onHand: 45, freeToUse: 35 },
  { id: 4, product: "LED Panel", perUnitCost: 1200, onHand: 100, freeToUse: 100 },
  { id: 5, product: "Copper Wire (m)", perUnitCost: 80, onHand: 800, freeToUse: 600 },
  { id: 6, product: "Bolts M8", perUnitCost: 5, onHand: 5000, freeToUse: 4800 },
  { id: 7, product: "Steel Rods (kg)", perUnitCost: 150, onHand: 150, freeToUse: 130 },
  { id: 8, product: "Plywood Sheets", perUnitCost: 900, onHand: 2, freeToUse: 2 },
];

export default function Stock() {
  const [stock, setStock] = useState(initialStock);
  const [editing, setEditing] = useState<number | null>(null);
  const [editValues, setEditValues] = useState({ onHand: 0, freeToUse: 0 });

  const startEdit = (item: StockItem) => {
    setEditing(item.id);
    setEditValues({ onHand: item.onHand, freeToUse: item.freeToUse });
  };

  const saveEdit = () => {
    if (editing === null) return;
    setStock((prev) =>
      prev.map((s) =>
        s.id === editing ? { ...s, onHand: editValues.onHand, freeToUse: editValues.freeToUse } : s
      )
    );
    setEditing(null);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground">Stock</h1>
        <p className="text-sm text-muted-foreground">Warehouse product stock availability</p>
      </div>

      <div className="bg-card rounded-xl border shadow-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>Per Unit Cost</TableHead>
              <TableHead>On Hand</TableHead>
              <TableHead>Free to Use</TableHead>
              <TableHead className="w-[80px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {stock.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.product}</TableCell>
                <TableCell className="font-mono">{item.perUnitCost.toLocaleString()} Rs</TableCell>
                {editing === item.id ? (
                  <>
                    <TableCell>
                      <Input
                        type="number"
                        className="w-24 h-8"
                        value={editValues.onHand}
                        onChange={(e) => setEditValues((v) => ({ ...v, onHand: Number(e.target.value) }))}
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        className="w-24 h-8"
                        value={editValues.freeToUse}
                        onChange={(e) => setEditValues((v) => ({ ...v, freeToUse: Number(e.target.value) }))}
                      />
                    </TableCell>
                    <TableCell>
                      <Button size="sm" variant="ghost" onClick={saveEdit}>
                        <Check className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </>
                ) : (
                  <>
                    <TableCell className="font-mono">{item.onHand}</TableCell>
                    <TableCell className="font-mono">{item.freeToUse}</TableCell>
                    <TableCell>
                      <Button size="sm" variant="ghost" className="text-xs text-primary" onClick={() => startEdit(item)}>
                        Edit
                      </Button>
                    </TableCell>
                  </>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
