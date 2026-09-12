import React from "react";
import { DollarSign, Globe } from "lucide-react";
import { Badge } from "../../components/common/Badge";

export const DigitalSpendsPage = () => {
  const spends = [
    { id: "DSP-01", platform: "Google Ads", campaign: "Brand Keyword Bidding", amount: "₹50,000", date: "2026-09-09", purpose: "PPC Traffic", status: "Processed" },
    { id: "DSP-02", platform: "Facebook & Instagram", campaign: "Retargeting Video Ads", amount: "₹40,000", date: "2026-09-08", purpose: "Lead Gen Form", status: "Processed" },
    { id: "DSP-03", platform: "MagicBricks Portal", campaign: "Featured Builder Slot", amount: "₹75,000", date: "2026-09-01", purpose: "High Intent Buyers", status: "Processed" }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs">
        <div>
          <h1 className="text-xl font-bold text-slate-900 dark:text-white">Digital Ad Spends & Analytics</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">Online ad campaign budget disbursement & platform spend tracking</p>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs overflow-hidden">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 font-semibold border-b border-slate-200/80 dark:border-slate-800">
              <th className="px-4 py-3">Spend ID</th>
              <th className="px-4 py-3">Platform</th>
              <th className="px-4 py-3">Campaign</th>
              <th className="px-4 py-3">Amount</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Purpose</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {spends.map((s) => (
              <tr key={s.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 text-slate-700 dark:text-slate-300 font-medium">
                <td className="px-4 py-3 font-bold text-slate-900 dark:text-white">{s.id}</td>
                <td className="px-4 py-3 font-semibold text-blue-600 dark:text-blue-400">{s.platform}</td>
                <td className="px-4 py-3 font-semibold">{s.campaign}</td>
                <td className="px-4 py-3 font-bold text-emerald-600 dark:text-emerald-400">{s.amount}</td>
                <td className="px-4 py-3">{s.date}</td>
                <td className="px-4 py-3">{s.purpose}</td>
                <td className="px-4 py-3">
                  <Badge variant="success">{s.status}</Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
