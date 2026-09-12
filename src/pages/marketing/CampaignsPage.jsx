import React from "react";
import { Megaphone, Plus, TrendingUp, DollarSign } from "lucide-react";
import { Badge } from "../../components/common/Badge";
import { Button } from "../../components/common/Button";

export const CampaignsPage = () => {
  const campaigns = [
    { id: "CMP-01", name: "Prestige City New Launch", platform: "Facebook Ads", project: "Prestige Raintree Park", budget: "₹2,50,000", leads: 7776, conversions: 128, status: "Active" },
    { id: "CMP-02", name: "Google Search High Intent", platform: "Google Ads", project: "Aspen Greens", budget: "₹1,80,000", leads: 3420, conversions: 84, status: "Active" },
    { id: "CMP-03", name: "99acres Banner Promo", platform: "Online Portals", project: "Avalon Park", budget: "₹1,20,000", leads: 1850, conversions: 42, status: "Paused" }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs">
        <div>
          <h1 className="text-xl font-bold text-slate-900 dark:text-white">Marketing Campaigns</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">Track digital ad campaigns, budgets, generated leads & conversion performance</p>
        </div>
        <Button icon={Plus} size="sm">+ Create Campaign</Button>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs overflow-hidden">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 font-semibold border-b border-slate-200/80 dark:border-slate-800">
              <th className="px-4 py-3">Campaign Name</th>
              <th className="px-4 py-3">Platform</th>
              <th className="px-4 py-3">Target Project</th>
              <th className="px-4 py-3">Budget Allocated</th>
              <th className="px-4 py-3">Leads Generated</th>
              <th className="px-4 py-3">Conversions</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {campaigns.map((c) => (
              <tr key={c.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 text-slate-700 dark:text-slate-300 font-medium">
                <td className="px-4 py-3 font-bold text-slate-900 dark:text-white">{c.name}</td>
                <td className="px-4 py-3 font-semibold text-blue-600 dark:text-blue-400">{c.platform}</td>
                <td className="px-4 py-3">{c.project}</td>
                <td className="px-4 py-3 font-bold">{c.budget}</td>
                <td className="px-4 py-3 font-bold text-emerald-600 dark:text-emerald-400">{c.leads}</td>
                <td className="px-4 py-3 font-bold text-purple-600 dark:text-purple-400">{c.conversions}</td>
                <td className="px-4 py-3">
                  <Badge variant={c.status === "Active" ? "success" : "warning"}>{c.status}</Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
