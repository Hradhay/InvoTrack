import { LucideIcon } from "lucide-react";

interface KpiCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
  variant?: "default" | "warning" | "destructive" | "success";
}

const variantStyles = {
  default: "bg-accent text-accent-foreground",
  warning: "bg-warning/10 text-warning",
  destructive: "bg-destructive/10 text-destructive",
  success: "bg-success/10 text-success",
};

export function KpiCard({ title, value, icon: Icon, trend, variant = "default" }: KpiCardProps) {
  return (
    <div className="bg-card rounded-xl border shadow-card p-5 flex items-start gap-4">
      <div className={`h-11 w-11 rounded-lg flex items-center justify-center shrink-0 ${variantStyles[variant]}`}>
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <p className="text-sm text-muted-foreground mb-1">{title}</p>
        <p className="text-2xl font-display font-bold text-foreground">{value}</p>
        {trend && <p className="text-xs text-muted-foreground mt-1">{trend}</p>}
      </div>
    </div>
  );
}
