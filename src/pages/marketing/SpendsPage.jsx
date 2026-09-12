import React from "react";
import { DollarSign, TrendingUp, Calendar } from "lucide-react";
import { Badge } from "../../components/common/Badge";

export const SpendsPage = () => {
  const spends = [
    { id: "SPD-01", campaign: "Prestige City New Launch", platform: "Meta Ads", amount: "₹45,000", date: "2026-09-10", project: "Prestige Raintree Park", desc: "Weekly ad spend topup" },
    { id: "SPD-02", campaign: "Google Search High Intent", platform: "Google Ads", amount: "₹35,000", date: "2026-09-08", project: "Aspen Greens", desc: "Keyword bidding budget" },
    { id: "SPD-03", campaign: "99acres Premium Listing", platform: "Portal", amount: "₹60,000", date: "2026-09-01", project: "Avalon Park", desc: "Monthly listing package" }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs">
        <div>
          <h1 className="text-xl font-bold text-slate-900 dark:text-white">Marketing Spends Log</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">Expenditure tracking across digital advertising channels & portals</p>
        </div>
        <div className="text-xs font-bold text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-xl">
          Total Spends This Month: ₹1,40,000
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs overflow-hidden">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 font-semibold border-b border-slate-200/80 dark:border-slate-800">
              <th className="px-4 py-3">Spend ID</th>
              <th className="px-4 py-3">Campaign</th>
              <th className="px-4 py-3">Platform</th>
              <th className="px-4 py-3">Amount</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Project</th>
              <th className="px-4 py-3">Description</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {spends.map((s) => (
              <tr key={s.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 text-slate-700 dark:text-slate-300 font-medium">
                <td className="px-4 py-3 font-bold text-slate-900 dark:text-white">{s.id}</td>
                <td className="px-4 py-3 font-semibold">{s.campaign}</td>
                <td className="px-4 py-3 text-blue-600 dark:text-blue-400 font-semibold">{s.platform}</td>
                <td className="px-4 py-3 font-bold text-emerald-600 dark:text-emerald-400">{s.amount}</td>
                <td className="px-4 py-3">{s.date}</td>
                <td className="px-4 py-3">{s.project}</td>
                <td className="px-4 py-3 text-slate-500">{s.desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
