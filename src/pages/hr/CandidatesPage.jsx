import React, { useState } from "react";
import { Users, Plus, FileText, Calendar } from "lucide-react";
import { Badge } from "../../components/common/Badge";
import { Button } from "../../components/common/Button";

export const CandidatesPage = () => {
  const [candidates] = useState([
    { id: "CND-01", name: "Rahul Verma", email: "rahul.verma@example.com", phone: "+91 9876543210", position: "Sales Executive", exp: "3 Years", status: "Interview Scheduled", date: "2026-09-14 11:00 AM" },
    { id: "CND-02", name: "Neha Sharma", email: "neha.sharma@example.com", phone: "+91 9812345678", position: "Telecaller", exp: "1.5 Years", status: "Shortlisted", date: "2026-09-15 02:30 PM" },
    { id: "CND-03", name: "Vikram Malhotra", email: "vikram.m@example.com", phone: "+91 9988776655", position: "Sales Manager", exp: "6 Years", status: "Hired", date: "2026-09-10 10:00 AM" }
  ]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs">
        <div>
          <h1 className="text-xl font-bold text-slate-900 dark:text-white">HR Recruitment & Candidates</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">Manage recruitment pipeline, candidate profiles & interview schedules</p>
        </div>
        <Button icon={Plus} size="sm">+ Add Candidate</Button>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs overflow-hidden">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 font-semibold border-b border-slate-200/80 dark:border-slate-800">
              <th className="px-4 py-3">Candidate Name</th>
              <th className="px-4 py-3">Email & Phone</th>
              <th className="px-4 py-3">Position Applied</th>
              <th className="px-4 py-3">Experience</th>
              <th className="px-4 py-3">Resume</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Interview Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {candidates.map((c) => (
              <tr key={c.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 text-slate-700 dark:text-slate-300 font-medium">
                <td className="px-4 py-3 font-bold text-slate-900 dark:text-white">{c.name}</td>
                <td className="px-4 py-3">
                  <div>{c.email}</div>
                  <div className="text-[11px] text-slate-400">{c.phone}</div>
                </td>
                <td className="px-4 py-3 font-semibold">{c.position}</td>
                <td className="px-4 py-3">{c.exp}</td>
                <td className="px-4 py-3">
                  <a href="#resume" className="text-indigo-600 dark:text-indigo-400 underline font-semibold flex items-center gap-1">
                    <FileText className="w-3.5 h-3.5" /> View PDF
                  </a>
                </td>
                <td className="px-4 py-3">
                  <Badge variant={c.status === "Hired" ? "success" : c.status === "Shortlisted" ? "info" : "warning"}>
                    {c.status}
                  </Badge>
                </td>
                <td className="px-4 py-3 font-medium text-slate-600 dark:text-slate-400">{c.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
