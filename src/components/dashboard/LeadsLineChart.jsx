import React from "react";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

const sampleData = [
  { day: "Mon", leads: 12, bookings: 2 },
  { day: "Tue", leads: 19, bookings: 4 },
  { day: "Wed", leads: 15, bookings: 3 },
  { day: "Thu", leads: 22, bookings: 5 },
  { day: "Fri", leads: 28, bookings: 7 },
  { day: "Sat", leads: 35, bookings: 9 },
  { day: "Sun", leads: 20, bookings: 4 }
];

export const LeadsLineChart = () => {
  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-xs flex flex-col h-80">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-bold text-slate-900">Leads & Bookings Trend</h3>
        <span className="text-xs text-slate-400">Last 7 Days</span>
      </div>
      <div className="flex-1 w-full min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={sampleData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorLeads" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366F1" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#6366F1" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorBookings" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10B981" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
            <XAxis dataKey="day" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "#64748B" }} />
            <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "#64748B" }} />
            <Tooltip
              contentStyle={{ backgroundColor: "#0F172A", borderRadius: "8px", border: "none", color: "#FFF", fontSize: "12px" }}
            />
            <Area type="monotone" dataKey="leads" stroke="#6366F1" strokeWidth={2} fillOpacity={1} fill="url(#colorLeads)" />
            <Area type="monotone" dataKey="bookings" stroke="#10B981" strokeWidth={2} fillOpacity={1} fill="url(#colorBookings)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
