import React, { useState } from "react";
import { Layers, Plus, CheckCircle2 } from "lucide-react";
import { Badge } from "../../components/common/Badge";
import { Button } from "../../components/common/Button";

export const AssetsPage = () => {
  const [assets] = useState([
    { id: "AST-001", name: "MacBook Pro M2", category: "IT Hardware", qty: 15, condition: "Excellent", status: "In Use", assignedTo: "Priyanshu M" },
    { id: "AST-002", name: "Dell 27' Monitor", category: "IT Hardware", qty: 25, condition: "Good", status: "In Use", assignedTo: "Pooja Bohra" },
    { id: "AST-003", name: "Ergonomic Office Chair", category: "Furniture", qty: 50, condition: "New", status: "Available", assignedTo: "Storage" }
  ]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs">
        <div>
          <h1 className="text-xl font-bold text-slate-900 dark:text-white">Admin Company Assets</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">Inventory control, device condition & hardware tracking</p>
        </div>
        <Button icon={Plus} size="sm">+ Add Asset</Button>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs overflow-hidden">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 font-semibold border-b border-slate-200/80 dark:border-slate-800">
              <th className="px-4 py-3">Asset ID</th>
              <th className="px-4 py-3">Asset Name</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Quantity</th>
              <th className="px-4 py-3">Condition</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Assigned To</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {assets.map((a) => (
              <tr key={a.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 text-slate-700 dark:text-slate-300 font-medium">
                <td className="px-4 py-3 font-bold text-slate-900 dark:text-white">{a.id}</td>
                <td className="px-4 py-3 font-semibold">{a.name}</td>
                <td className="px-4 py-3">{a.category}</td>
                <td className="px-4 py-3 font-bold">{a.qty}</td>
                <td className="px-4 py-3">{a.condition}</td>
                <td className="px-4 py-3">
                  <Badge variant={a.status === "In Use" ? "success" : "info"}>{a.status}</Badge>
                </td>
                <td className="px-4 py-3">{a.assignedTo}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
