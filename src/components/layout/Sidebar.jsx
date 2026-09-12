import React from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { cn } from "../../utils/helpers";

export const Sidebar = ({ isMobileOpen, closeMobile }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const currentTab = searchParams.get("tab") || "d1";
  const isDashboard = location.pathname === "/dashboard" || location.pathname === "/";

  const dItems = [
    {
      id: "d1",
      label: "D1",
      title: "Welcome Back",
      onClick: () => navigate("/dashboard?tab=d1")
    },
    {
      id: "d2",
      label: "D2",
      title: "Data Analysis",
      onClick: () => navigate("/dashboard?tab=d2")
    },
    {
      id: "d3",
      label: "D3",
      title: "Charts & Analytics",
      onClick: () => navigate("/dashboard?tab=d3")
    },
    {
      id: "d4",
      label: "D4",
      title: "Site Visiting",
      onClick: () => navigate("/dashboard?tab=d4")
    }
  ];

  const sidebarContent = (
    <div className="flex flex-col h-full bg-slate-100/90 dark:bg-slate-900/90 border-r border-slate-200/80 dark:border-slate-800 w-14 items-center py-4 space-y-4 select-none">
      {dItems.map((item) => {
        const isActive = isDashboard && currentTab === item.id;

        return (
          <button
            key={item.id}
            onClick={() => {
              item.onClick();
              closeMobile?.();
            }}
            className={cn(
              "w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs transition-all shadow-2xs",
              isActive
                ? "bg-[#1E293B] dark:bg-rose-500 text-white shadow-md ring-2 ring-slate-800/30 dark:ring-rose-500/40 scale-105"
                : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white"
            )}
            title={item.title}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );

  return (
    <>
      {/* Desktop Narrow Sidebar */}
      <aside className="hidden md:block fixed top-14 left-0 bottom-0 z-20 w-14">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Overlay */}
      {isMobileOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs" onClick={closeMobile} />
          <div className="relative w-14 flex-1 z-10">{sidebarContent}</div>
        </div>
      )}
    </>
  );
};
