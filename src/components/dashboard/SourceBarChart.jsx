import React from "react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

export const SourceBarChart = ({ data = [] }) => {
  const chartData = data.map((item) => ({
    source: item._id || "Unknown",
    leads: item.count || 0
  }));

  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-xs flex flex-col h-80">
      <h3 className="text-sm font-bold text-slate-900 mb-2">Lead Generation by Source</h3>
      {chartData.length === 0 ? (
        <div className="flex-1 flex items-center justify-center text-xs text-slate-400">
          No lead source data available
        </div>
      ) : (
        <div className="flex-1 w-full min-h-0">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
              <XAxis dataKey="source" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "#64748B" }} />
              <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "#64748B" }} />
              <Tooltip
                contentStyle={{ backgroundColor: "#0F172A", borderRadius: "8px", border: "none", color: "#FFF", fontSize: "12px" }}
              />
              <Bar dataKey="leads" fill="#4F46E5" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};
