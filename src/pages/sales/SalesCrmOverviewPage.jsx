import React from "react";
import { Briefcase, TrendingUp, Users, MapPin, BookmarkCheck } from "lucide-react";
import { Badge } from "../../components/common/Badge";

export const SalesCrmOverviewPage = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs">
        <h1 className="text-xl font-bold text-slate-900 dark:text-white">Sales CRM Executive Overview</h1>
        <p className="text-xs text-slate-500 dark:text-slate-400">High-level sales pipeline metrics, conversion velocity & team leaderboards</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800">
          <span className="text-xs font-bold text-slate-500">Active Leads</span>
          <p className="text-2xl font-black text-slate-900 dark:text-white mt-1">49,940</p>
        </div>
        <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800">
          <span className="text-xs font-bold text-slate-500">Completed Site Visits</span>
          <p className="text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-1">84</p>
        </div>
        <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800">
          <span className="text-xs font-bold text-slate-500">Confirmed Bookings</span>
          <p className="text-2xl font-black text-blue-600 dark:text-blue-400 mt-1">288</p>
        </div>
        <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800">
          <span className="text-xs font-bold text-slate-500">Pipeline Value</span>
          <p className="text-2xl font-black text-purple-600 dark:text-purple-400 mt-1">₹45.2 Cr</p>
        </div>
      </div>
    </div>
  );
};
