import { useState } from "react";
import { ClipboardCheck, Truck } from "lucide-react";
import { cn } from "@/lib/utils";
import Receipts from "./Receipts";
import Deliveries from "./Deliveries";

const tabs = [
  { key: "receipts", label: "Receipts", icon: ClipboardCheck, description: "Incoming Stock" },
  { key: "deliveries", label: "Delivery", icon: Truck, description: "Outgoing Stock" },
] as const;

type TabKey = (typeof tabs)[number]["key"];

export default function Operations() {
  const [active, setActive] = useState<TabKey>("receipts");

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 border-b">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActive(tab.key)}
            className={cn(
              "flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 -mb-px transition-colors",
              active === tab.key
                ? "border-primary text-foreground"
                : "border-transparent text-muted-foreground hover:text-foreground"
            )}
          >
            <tab.icon className="h-4 w-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {active === "receipts" ? <Receipts /> : <Deliveries />}
    </div>
  );
}
