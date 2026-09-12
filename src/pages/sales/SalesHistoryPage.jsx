import React from "react";
import { Clock, BookmarkCheck } from "lucide-react";
import { Badge } from "../../components/common/Badge";

export const SalesHistoryPage = () => {
  const history = [
    { id: "SLS-801", customer: "Simran Prasad", project: "Prestige Raintree Park Phase 2", unit: "3 BHK - 3T (1.8 Cr)", bookingAmount: "₹1,80,00,000", executive: "Pooja Bohra", date: "2026-09-09", status: "Confirmed" },
    { id: "SLS-802", customer: "Aditya Narayan", project: "Prestige Raintree Park Phase 2", unit: "3 BHK - 2T (1.6 Cr)", bookingAmount: "₹1,60,00,000", executive: "Pooja Bohra", date: "2026-09-08", status: "Confirmed" },
    { id: "SLS-803", customer: "Sumit Sharma", project: "Prestige Serenity Shores", unit: "2 BHK - 2T (1.2 Cr)", bookingAmount: "₹1,20,00,000", executive: "Adarsh Singh", date: "2026-09-05", status: "Pending Registration" }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs">
        <div>
          <h1 className="text-xl font-bold text-slate-900 dark:text-white">Sales History & Transactions</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">Archived property bookings, sales ledger & unit transaction records</p>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs overflow-hidden">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 font-semibold border-b border-slate-200/80 dark:border-slate-800">
              <th className="px-4 py-3">Sales ID</th>
              <th className="px-4 py-3">Customer</th>
              <th className="px-4 py-3">Project</th>
              <th className="px-4 py-3">Unit Specs</th>
              <th className="px-4 py-3">Booking Value</th>
              <th className="px-4 py-3">Sales Executive</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {history.map((h) => (
              <tr key={h.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 text-slate-700 dark:text-slate-300 font-medium">
                <td className="px-4 py-3 font-bold text-slate-900 dark:text-white">{h.id}</td>
                <td className="px-4 py-3 font-semibold">{h.customer}</td>
                <td className="px-4 py-3">{h.project}</td>
                <td className="px-4 py-3">{h.unit}</td>
                <td className="px-4 py-3 font-bold text-emerald-600 dark:text-emerald-400">{h.bookingAmount}</td>
                <td className="px-4 py-3">{h.executive}</td>
                <td className="px-4 py-3">{h.date}</td>
                <td className="px-4 py-3">
                  <Badge variant={h.status === "Confirmed" ? "success" : "warning"}>{h.status}</Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
