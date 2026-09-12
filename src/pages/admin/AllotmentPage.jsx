import React from "react";
import { CheckSquare, Plus } from "lucide-react";
import { Badge } from "../../components/common/Badge";
import { Button } from "../../components/common/Button";

export const AllotmentPage = () => {
  const allotments = [
    { id: "ALT-01", employee: "Priyanshu M", asset: "MacBook Pro M2", date: "2026-01-10", qty: 1, status: "Active" },
    { id: "ALT-02", employee: "Pooja Bohra", asset: "Dell 27' Monitor", date: "2026-02-15", qty: 1, status: "Active" },
    { id: "ALT-03", employee: "Adarsh Singh", asset: "iPad Air 5th Gen", date: "2026-03-01", qty: 1, status: "Returned" }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs">
        <div>
          <h1 className="text-xl font-bold text-slate-900 dark:text-white">Asset Allotment History</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">Employee asset assignment logs & custody handovers</p>
        </div>
        <Button icon={Plus} size="sm">+ New Allotment</Button>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs overflow-hidden">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 font-semibold border-b border-slate-200/80 dark:border-slate-800">
              <th className="px-4 py-3">Allotment ID</th>
              <th className="px-4 py-3">Employee</th>
              <th className="px-4 py-3">Asset Allocated</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Quantity</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {allotments.map((a) => (
              <tr key={a.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 text-slate-700 dark:text-slate-300 font-medium">
                <td className="px-4 py-3 font-bold text-slate-900 dark:text-white">{a.id}</td>
                <td className="px-4 py-3 font-semibold">{a.employee}</td>
                <td className="px-4 py-3">{a.asset}</td>
                <td className="px-4 py-3">{a.date}</td>
                <td className="px-4 py-3 font-bold">{a.qty}</td>
                <td className="px-4 py-3">
                  <Badge variant={a.status === "Active" ? "success" : "warning"}>{a.status}</Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
