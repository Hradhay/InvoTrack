import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";

interface StateIndicatorProps {
  states: string[];
  current: string;
}

export function StateIndicator({ states, current }: StateIndicatorProps) {
  const currentIdx = states.indexOf(current);

  return (
    <div className="flex items-center gap-1">
      {states.map((state, i) => (
        <div key={state} className="flex items-center gap-1">
          <span
            className={cn(
              "px-3 py-1 rounded-full text-xs font-medium border transition-colors",
              i < currentIdx
                ? "bg-success/10 text-success border-success/20"
                : i === currentIdx
                ? "bg-primary/10 text-primary border-primary/20"
                : "bg-muted text-muted-foreground border-border"
            )}
          >
            {state}
          </span>
          {i < states.length - 1 && (
            <ChevronRight className="h-3 w-3 text-muted-foreground" />
          )}
        </div>
      ))}
    </div>
  );
}
