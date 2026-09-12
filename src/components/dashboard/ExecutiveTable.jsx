import React from "react";
import { formatCurrency } from "../../utils/formatters";

export const ExecutiveTable = ({ data = [] }) => {
  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-xs">
      <h3 className="text-sm font-bold text-slate-900 mb-4">Sales Executive Leaderboard</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs text-slate-600">
          <thead className="bg-slate-50 text-slate-700 font-semibold uppercase text-[10px] tracking-wider border-b border-slate-200">
            <tr>
              <th className="py-2.5 px-3">Executive</th>
              <th className="py-2.5 px-3">Total Leads</th>
              <th className="py-2.5 px-3">Site Visits</th>
              <th className="py-2.5 px-3">Bookings</th>
              <th className="py-2.5 px-3">Conversion Rate</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {data.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-4 text-center text-slate-400">
                  No sales performance metrics available
                </td>
              </tr>
            ) : (
              data.map((item, idx) => {
                const convRate = item.totalLeads > 0
                  ? ((item.bookedLeads / item.totalLeads) * 100).toFixed(1) + "%"
                  : "0.0%";

                return (
                  <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-3 font-semibold text-slate-900 flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-xs shrink-0">
                        {item.name ? item.name.charAt(0) : "U"}
                      </div>
                      <div>
                        <p>{item.name}</p>
                        <p className="text-[10px] text-slate-400 font-normal">{item.email}</p>
                      </div>
                    </td>
                    <td className="py-3 px-3 font-medium">{item.totalLeads}</td>
                    <td className="py-3 px-3 font-medium text-purple-700">{item.siteVisits}</td>
                    <td className="py-3 px-3 font-semibold text-emerald-700">{item.bookedLeads}</td>
                    <td className="py-3 px-3">
                      <span className="inline-flex px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 font-bold text-[11px]">
                        {convRate}
                      </span>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
