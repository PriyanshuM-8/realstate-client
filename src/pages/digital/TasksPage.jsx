import React, { useState } from "react";
import { CheckSquare, Plus, Clock } from "lucide-react";
import { Badge } from "../../components/common/Badge";
import { Button } from "../../components/common/Button";

export const TasksPage = () => {
  const [tasks] = useState([
    { id: "TSK-01", name: "Verify lead documents for Booking #BK-000001", assignedTo: "Pooja Bohra", priority: "High", dueDate: "2026-09-12", status: "In Progress" },
    { id: "TSK-02", name: "Upload Facebook campaign creative assets", assignedTo: "Marketing Team", priority: "Medium", dueDate: "2026-09-13", status: "Pending" },
    { id: "TSK-03", name: "Schedule site visit callback for RNR leads", assignedTo: "Adarsh Singh", priority: "Urgent", dueDate: "2026-09-11", status: "Completed" }
  ]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs">
        <div>
          <h1 className="text-xl font-bold text-slate-900 dark:text-white">Digital Task Management</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">Team tasks, priority deadlines & action item tracking</p>
        </div>
        <Button icon={Plus} size="sm">+ Create Task</Button>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs overflow-hidden">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 font-semibold border-b border-slate-200/80 dark:border-slate-800">
              <th className="px-4 py-3">Task Name</th>
              <th className="px-4 py-3">Assigned To</th>
              <th className="px-4 py-3">Priority</th>
              <th className="px-4 py-3">Due Date</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {tasks.map((t) => (
              <tr key={t.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 text-slate-700 dark:text-slate-300 font-medium">
                <td className="px-4 py-3 font-bold text-slate-900 dark:text-white">{t.name}</td>
                <td className="px-4 py-3 font-semibold">{t.assignedTo}</td>
                <td className="px-4 py-3">
                  <Badge variant={t.priority === "Urgent" ? "danger" : t.priority === "High" ? "warning" : "info"}>
                    {t.priority}
                  </Badge>
                </td>
                <td className="px-4 py-3 font-semibold">{t.dueDate}</td>
                <td className="px-4 py-3">
                  <Badge variant={t.status === "Completed" ? "success" : "primary"}>{t.status}</Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
