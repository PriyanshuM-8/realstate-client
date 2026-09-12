import React from "react";
import { UserCheck, Calendar } from "lucide-react";
import { Badge } from "../../components/common/Badge";
import { format } from "date-fns";

export const AttendancePage = () => {
  const records = [
    { employee: "Priyanshu M", date: "2026-09-11", checkIn: "09:15 AM", checkOut: "06:30 PM", hours: "9h 15m", status: "Present" },
    { employee: "Pooja Bohra", date: "2026-09-11", checkIn: "09:30 AM", checkOut: "06:15 PM", hours: "8h 45m", status: "Present" },
    { employee: "Adarsh Singh", date: "2026-09-11", checkIn: "10:05 AM", checkOut: "06:45 PM", hours: "8h 40m", status: "Late" },
    { employee: "Dhanya Shankar", date: "2026-09-11", checkIn: "-", checkOut: "-", hours: "0h", status: "On Leave" }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs">
        <div>
          <h1 className="text-xl font-bold text-slate-900 dark:text-white">HR Attendance List</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">Daily check-in logs, biometric timestamps & total working hours</p>
        </div>
        <div className="text-xs font-semibold text-slate-600 dark:text-slate-300">
          Date: {format(new Date(), "dd MMM yyyy")}
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs overflow-hidden">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 font-semibold border-b border-slate-200/80 dark:border-slate-800">
              <th className="px-4 py-3">Employee Name</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Check In</th>
              <th className="px-4 py-3">Check Out</th>
              <th className="px-4 py-3">Working Hours</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {records.map((r, i) => (
              <tr key={i} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 text-slate-700 dark:text-slate-300 font-medium">
                <td className="px-4 py-3 font-bold text-slate-900 dark:text-white">{r.employee}</td>
                <td className="px-4 py-3">{r.date}</td>
                <td className="px-4 py-3 font-semibold text-emerald-600 dark:text-emerald-400">{r.checkIn}</td>
                <td className="px-4 py-3 font-semibold text-rose-600 dark:text-rose-400">{r.checkOut}</td>
                <td className="px-4 py-3 font-bold">{r.hours}</td>
                <td className="px-4 py-3">
                  <Badge variant={r.status === "Present" ? "success" : r.status === "Late" ? "warning" : "danger"}>
                    {r.status}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
