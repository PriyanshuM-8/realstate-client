import React from "react";
import { Award, DollarSign } from "lucide-react";
import { Badge } from "../../components/common/Badge";

export const IncentivesPage = () => {
  const incentives = [
    { id: "INC-01", employee: "Pooja Bohra", booking: "BK-000001 (Simran Prasad)", amount: "₹45,000", status: "Approved", date: "2026-09-15" },
    { id: "INC-02", employee: "Adarsh Singh", booking: "BK-000003 (Sumit Sharma)", amount: "₹30,000", status: "Processing", date: "2026-09-30" },
    { id: "INC-03", employee: "Priyanshu M", booking: "BK-000005 (Deepak Gupta)", amount: "₹50,000", status: "Paid", date: "2026-09-01" }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs">
        <div>
          <h1 className="text-xl font-bold text-slate-900 dark:text-white">Sales Executive Incentives</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">Commission calculations, target milestone rewards & payout status</p>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs overflow-hidden">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 font-semibold border-b border-slate-200/80 dark:border-slate-800">
              <th className="px-4 py-3">Incentive ID</th>
              <th className="px-4 py-3">Employee</th>
              <th className="px-4 py-3">Linked Booking</th>
              <th className="px-4 py-3">Incentive Amount</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Payment Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {incentives.map((inc) => (
              <tr key={inc.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 text-slate-700 dark:text-slate-300 font-medium">
                <td className="px-4 py-3 font-bold text-slate-900 dark:text-white">{inc.id}</td>
                <td className="px-4 py-3 font-semibold">{inc.employee}</td>
                <td className="px-4 py-3">{inc.booking}</td>
                <td className="px-4 py-3 font-bold text-emerald-600 dark:text-emerald-400">{inc.amount}</td>
                <td className="px-4 py-3">
                  <Badge variant={inc.status === "Paid" ? "success" : inc.status === "Approved" ? "info" : "warning"}>{inc.status}</Badge>
                </td>
                <td className="px-4 py-3">{inc.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
