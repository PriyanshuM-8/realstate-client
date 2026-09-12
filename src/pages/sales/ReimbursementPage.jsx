import React, { useState } from "react";
import { DollarSign, Plus, CheckCircle2, XCircle } from "lucide-react";
import { Badge } from "../../components/common/Badge";
import { Button } from "../../components/common/Button";

export const ReimbursementPage = () => {
  const [claims] = useState([
    { id: "RMB-101", employee: "Pooja Bohra", type: "Client Site Transport", amount: "₹2,500", date: "2026-09-08", desc: "Cab fare for Prestige site visit", status: "Approved" },
    { id: "RMB-102", employee: "Adarsh Singh", type: "Client Lunch / Meeting", amount: "₹4,200", date: "2026-09-05", desc: "Lunch with HNI buyer at JW Marriott", status: "Approved" },
    { id: "RMB-103", employee: "Dhanya Shankar", type: "Mobile & Data Allowance", amount: "₹1,500", date: "2026-09-01", desc: "Monthly telecalling reimbursement", status: "Pending" }
  ]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs">
        <div>
          <h1 className="text-xl font-bold text-slate-900 dark:text-white">Expense Reimbursements</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">Travel, client entertainment & official expense claim approvals</p>
        </div>
        <Button icon={Plus} size="sm">+ Submit Claim</Button>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs overflow-hidden">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 font-semibold border-b border-slate-200/80 dark:border-slate-800">
              <th className="px-4 py-3">Claim ID</th>
              <th className="px-4 py-3">Employee</th>
              <th className="px-4 py-3">Expense Type</th>
              <th className="px-4 py-3">Amount</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Description</th>
              <th className="px-4 py-3">Approval Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {claims.map((c) => (
              <tr key={c.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 text-slate-700 dark:text-slate-300 font-medium">
                <td className="px-4 py-3 font-bold text-slate-900 dark:text-white">{c.id}</td>
                <td className="px-4 py-3 font-semibold">{c.employee}</td>
                <td className="px-4 py-3">{c.type}</td>
                <td className="px-4 py-3 font-bold text-emerald-600 dark:text-emerald-400">{c.amount}</td>
                <td className="px-4 py-3">{c.date}</td>
                <td className="px-4 py-3 text-slate-500">{c.desc}</td>
                <td className="px-4 py-3">
                  <Badge variant={c.status === "Approved" ? "success" : "warning"}>{c.status}</Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
