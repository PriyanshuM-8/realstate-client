import React, { useState } from "react";
import { Clock, Plus, CheckCircle2, XCircle, Filter } from "lucide-react";
import { Badge } from "../../components/common/Badge";
import { Button } from "../../components/common/Button";
import { format } from "date-fns";
import { toast } from "sonner";

export const LeavePage = () => {
  const [leaves, setLeaves] = useState([
    { id: "LV-101", employee: "Pooja Bohra", type: "Sick Leave", from: "2026-09-12", to: "2026-09-13", days: 2, reason: "Viral fever", status: "Pending" },
    { id: "LV-102", employee: "Adarsh Singh", type: "Casual Leave", from: "2026-09-15", to: "2026-09-16", days: 2, reason: "Family event", status: "Approved" },
    { id: "LV-103", employee: "Dhanya Shankar", type: "Earned Leave", from: "2026-09-20", to: "2026-09-24", days: 5, reason: "Vacation", status: "Pending" }
  ]);

  const handleUpdateStatus = (id, newStatus) => {
    setLeaves(leaves.map(l => l.id === id ? { ...l, status: newStatus } : l));
    toast.success(`Leave request ${id} updated to ${newStatus}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs">
        <div>
          <h1 className="text-xl font-bold text-slate-900 dark:text-white">HR Leave Management</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">Review employee leave applications, balances & approval status</p>
        </div>
        <Button icon={Plus} size="sm">+ Apply Leave</Button>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs overflow-hidden">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 font-semibold border-b border-slate-200/80 dark:border-slate-800">
              <th className="px-4 py-3">Leave ID</th>
              <th className="px-4 py-3">Employee</th>
              <th className="px-4 py-3">Leave Type</th>
              <th className="px-4 py-3">From Date</th>
              <th className="px-4 py-3">To Date</th>
              <th className="px-4 py-3">Duration</th>
              <th className="px-4 py-3">Reason</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {leaves.map((l) => (
              <tr key={l.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 text-slate-700 dark:text-slate-300 font-medium">
                <td className="px-4 py-3 font-bold text-slate-900 dark:text-white">{l.id}</td>
                <td className="px-4 py-3 font-semibold">{l.employee}</td>
                <td className="px-4 py-3">{l.type}</td>
                <td className="px-4 py-3">{l.from}</td>
                <td className="px-4 py-3">{l.to}</td>
                <td className="px-4 py-3 font-semibold">{l.days} Days</td>
                <td className="px-4 py-3 text-slate-500">{l.reason}</td>
                <td className="px-4 py-3">
                  <Badge variant={l.status === "Approved" ? "success" : l.status === "Rejected" ? "danger" : "warning"}>
                    {l.status}
                  </Badge>
                </td>
                <td className="px-4 py-3 text-right">
                  {l.status === "Pending" && (
                    <div className="flex items-center justify-end gap-1">
                      <button onClick={() => handleUpdateStatus(l.id, "Approved")} className="p-1 text-emerald-600 hover:bg-emerald-50 rounded" title="Approve">
                        <CheckCircle2 className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleUpdateStatus(l.id, "Rejected")} className="p-1 text-rose-600 hover:bg-rose-50 rounded" title="Reject">
                        <XCircle className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
