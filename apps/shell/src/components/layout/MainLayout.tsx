import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";

export default function MainLayout() {
  const [isSheetOpen, setSheetOpen] = useState(false);

  return (
    <div className="h-screen bg-gray-100 flex flex-col">
      <Sidebar isOpen={isSheetOpen} onOpenChange={setSheetOpen} />

      <main className="flex-1 overflow-x-hidden overflow-y-auto">
        <Header onMenuClick={() => setSheetOpen(true)} />

        <div className="p-4 md:p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
