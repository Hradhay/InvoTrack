import { Badge } from "@/components/ui/badge";

const statusConfig: Record<string, string> = {
  Done: "bg-success/10 text-success border-success/20",
  Ready: "bg-primary/10 text-primary border-primary/20",
  Waiting: "bg-warning/10 text-warning border-warning/20",
  Draft: "bg-muted text-muted-foreground border-border",
  Cancelled: "bg-destructive/10 text-destructive border-destructive/20",
};

export function StatusBadge({ status }: { status: string }) {
  return (
    <Badge variant="outline" className={`text-xs font-medium ${statusConfig[status] || ""}`}>
      {status}
    </Badge>
  );
}
