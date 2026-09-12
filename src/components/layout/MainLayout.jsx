import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";
import { RightDock } from "./RightDock";
import { NotificationPanel } from "./NotificationPanel";
import { GlobalSearchModal } from "./GlobalSearchModal";
import { useSocket } from "../../hooks/useSocket";
import { cn } from "../../utils/helpers";

export const MainLayout = () => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isGlobalSearchOpen, setIsGlobalSearchOpen] = useState(false);

  // Connect WebSockets
  useSocket();

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 flex flex-col font-sans transition-colors">
      {/* Top Coral Header Navbar */}
      <Topbar
        toggleMobileSidebar={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
        openNotificationPanel={() => setIsNotificationOpen(true)}
        openGlobalSearch={() => setIsGlobalSearchOpen(true)}
      />

      <div className="flex flex-1 relative min-h-0">
        {/* Left Narrow Icon Sidebar (D1, D2, D3, D4) */}
        <Sidebar
          isMobileOpen={isMobileSidebarOpen}
          closeMobile={() => setIsMobileSidebarOpen(false)}
        />

        {/* Main Content Viewport */}
        <div className={cn("flex-1 flex flex-col min-w-0 transition-all md:ml-14 md:mr-12")}>
          <main className="flex-1 p-4 sm:p-5 lg:p-6 w-full max-w-[1600px] mx-auto">
            <Outlet />
          </main>
        </div>

        {/* Far Right Utility Tools Dock (9 Icons) */}
        <RightDock />
      </div>

      {/* Slide-over Drawers & Modals */}
      <NotificationPanel
        isOpen={isNotificationOpen}
        onClose={() => setIsNotificationOpen(false)}
      />

      <GlobalSearchModal
        isOpen={isGlobalSearchOpen}
        onClose={() => setIsGlobalSearchOpen(false)}
      />
    </div>
  );
};
