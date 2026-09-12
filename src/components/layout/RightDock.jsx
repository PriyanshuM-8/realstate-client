import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  BookOpen,
  UserPlus,
  BarChart3,
  Filter,
  FileText,
  Clock,
  Presentation,
  CheckCircle2,
  Search
} from "lucide-react";
import { LeadFormModal } from "../leads/LeadFormModal";
import { GlobalSearchModal } from "./GlobalSearchModal";

export const RightDock = () => {
  const navigate = useNavigate();
  const [isAddLeadOpen, setIsAddLeadOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const tools = [
    {
      icon: BookOpen,
      label: "Knowledge Base",
      onClick: () => navigate("/reports")
    },
    {
      icon: UserPlus,
      label: "Add Lead",
      onClick: () => setIsAddLeadOpen(true)
    },
    {
      icon: BarChart3,
      label: "Report",
      onClick: () => navigate("/reports")
    },
    {
      icon: Filter,
      label: "Filter",
      onClick: () => navigate("/leads")
    },
    {
      icon: Clock,
      label: "Logs",
      onClick: () => navigate("/audit-logs")
    },
    {
      icon: FileText,
      label: "Followup",
      onClick: () => navigate("/follow-ups")
    },
    {
      icon: Presentation,
      label: "Pitch",
      onClick: () => navigate("/projects")
    },
    {
      icon: CheckCircle2,
      label: "Check Lead",
      onClick: () => navigate("/leads")
    },
    {
      icon: Search,
      label: "Search Lead",
      onClick: () => setIsSearchOpen(true)
    }
  ];

  return (
    <>
      <aside className="hidden md:flex fixed top-14 right-0 bottom-0 z-30 w-12 bg-white dark:bg-slate-900 border-l border-slate-200/80 dark:border-slate-800 flex-col items-center py-4 space-y-3 select-none shadow-xs">
        {tools.map((item, idx) => {
          const IconComponent = item.icon;
          return (
            <button
              key={idx}
              onClick={item.onClick}
              title={item.label}
              className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white transition-colors group relative cursor-pointer"
            >
              <IconComponent className="w-4.5 h-4.5 text-slate-600 dark:text-slate-300 group-hover:scale-110 transition-transform" />
              {/* Tooltip */}
              <span className="absolute right-14 top-1/2 -translate-y-1/2 bg-slate-900 dark:bg-slate-700 text-white text-[11px] font-semibold px-2.5 py-1 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                {item.label}
              </span>
            </button>
          );
        })}
      </aside>

      {/* Quick Add Lead Modal */}
      {isAddLeadOpen && (
        <LeadFormModal
          isOpen={isAddLeadOpen}
          onClose={() => setIsAddLeadOpen(false)}
        />
      )}

      {/* Quick Search Modal */}
      {isSearchOpen && (
        <GlobalSearchModal
          isOpen={isSearchOpen}
          onClose={() => setIsSearchOpen(false)}
        />
      )}
    </>
  );
};
