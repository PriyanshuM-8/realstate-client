import React from "react";
import { LEAD_STATUS_CONFIG } from "../../utils/constants";
import { cn } from "../../utils/helpers";

export const StatusBadge = ({ status, className }) => {
  const config = LEAD_STATUS_CONFIG[status] || {
    label: status || "Unknown",
    color: "bg-slate-100 text-slate-700 border-slate-200",
    dot: "bg-slate-500"
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border transition-colors select-none",
        config.color,
        className
      )}
    >
      <span className={cn("w-1.5 h-1.5 rounded-full shrink-0", config.dot)} />
      {config.label}
    </span>
  );
};
