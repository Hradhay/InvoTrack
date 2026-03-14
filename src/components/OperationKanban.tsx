import { StatusBadge } from "@/components/StatusBadge";

interface KanbanItem {
  id: string;
  reference: string;
  contact: string;
  scheduleDate: string;
  productSummary: string;
  status: string;
}

interface OperationKanbanProps {
  items: KanbanItem[];
  columns: string[];
}

export function OperationKanban({ items, columns }: OperationKanbanProps) {
  return (
    <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${columns.length}, minmax(200px, 1fr))` }}>
      {columns.map((col) => {
        const colItems = items.filter((i) => i.status === col);
        return (
          <div key={col} className="space-y-3">
            <div className="flex items-center justify-between px-1">
              <h3 className="text-sm font-semibold text-foreground">{col}</h3>
              <span className="text-xs text-muted-foreground bg-muted rounded-full px-2 py-0.5">
                {colItems.length}
              </span>
            </div>
            <div className="space-y-2 min-h-[120px]">
              {colItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-card border rounded-lg p-3 shadow-card space-y-2 cursor-pointer hover:shadow-elevated transition-shadow"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-medium text-foreground">{item.reference}</span>
                    <StatusBadge status={item.status} />
                  </div>
                  <p className="text-sm text-foreground">{item.contact}</p>
                  <p className="text-xs text-muted-foreground">{item.productSummary}</p>
                  <p className="text-xs text-muted-foreground">{item.scheduleDate}</p>
                </div>
              ))}
              {colItems.length === 0 && (
                <div className="border border-dashed rounded-lg p-4 text-center text-xs text-muted-foreground">
                  No items
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
