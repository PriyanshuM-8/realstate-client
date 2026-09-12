import React from "react";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const COLORS = [
  "#3B82F6", "#9CA3AF", "#10B981", "#8B5CF6", "#6366F1",
  "#EF4444", "#059669", "#F59E0B", "#D97706", "#EC4899"
];

export const StatusDonutChart = ({ data = [] }) => {
  const chartData = data.map((item) => ({
    name: item._id || "Unassigned",
    value: item.count || 0
  }));

  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-xs flex flex-col h-80">
      <h3 className="text-sm font-bold text-slate-900 mb-2">Lead Status Distribution</h3>
      {chartData.length === 0 ? (
        <div className="flex-1 flex items-center justify-center text-xs text-slate-400">
          No status distribution data available
        </div>
      ) : (
        <div className="flex-1 w-full min-h-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={80}
                paddingAngle={3}
                dataKey="value"
              >
                {chartData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ backgroundColor: "#0F172A", borderRadius: "8px", border: "none", color: "#FFF", fontSize: "12px" }}
              />
              <Legend wrapperStyle={{ fontSize: "11px", paddingTop: "10px" }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};
