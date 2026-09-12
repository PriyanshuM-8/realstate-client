import React from "react";
import { cn } from "../../utils/helpers";

export const Textarea = React.forwardRef(({ label, error, className, rows = 3, ...props }, ref) => {
  return (
    <div className="w-full">
      {label && <label className="block text-xs font-medium text-slate-700 mb-1">{label}</label>}
      <textarea
        ref={ref}
        rows={rows}
        className={cn(
          "w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 disabled:bg-slate-50 disabled:text-slate-500",
          error && "border-red-500 focus:border-red-500 focus:ring-red-500",
          className
        )}
        {...props}
      />
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
});

Textarea.displayName = "Textarea";
