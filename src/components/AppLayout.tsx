import { Outlet } from "react-router-dom";
import { TopNavBar } from "@/components/TopNavBar";

export function AppLayout() {
  return (
    <div className="min-h-screen flex flex-col w-full">
      <TopNavBar />
      <main className="flex-1 p-6 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
