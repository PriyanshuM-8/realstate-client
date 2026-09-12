import React from "react";
import { LEAD_STATUS_CONFIG } from "../../utils/constants";
import { cn } from "../../utils/helpers";

export const LeadStatusTabs = ({ activeStatus, onSelectStatus, stats = {} }) => {
  const tabs = [
    { key: "", label: "All", count: stats.all || 14037 },
    ...Object.entries(LEAD_STATUS_CONFIG).map(([statusKey, config]) => ({
      key: statusKey,
      label: config.label,
      count: stats[config.key] || 0
    }))
  ];

  return (
    <div className="relative overflow-hidden py-1">
      <div className="overflow-x-auto pb-2 scrollbar-none">
        <div className="flex items-center gap-2.5 min-w-max">
          {tabs.map((tab) => {
            const isActive = activeStatus === tab.key;
            return (
              <button
                key={tab.key || "all"}
                onClick={() => onSelectStatus(tab.key)}
                className={cn(
                  "flex flex-col items-center justify-center min-w-[90px] px-3 py-2 rounded-xl border text-center transition-all select-none shadow-2xs",
                  isActive
                    ? "bg-slate-900 text-white border-slate-900 ring-2 ring-slate-900/20 font-bold"
                    : "bg-white text-slate-800 border-slate-300 hover:border-slate-400 hover:bg-slate-50"
                )}
              >
                <span className="text-[11px] font-semibold text-slate-500 tracking-tight block max-w-[120px] truncate">
                  {tab.label}
                </span>
                <span
                  className={cn(
                    "text-sm font-black mt-0.5",
                    isActive ? "text-white" : "text-slate-900"
                  )}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
