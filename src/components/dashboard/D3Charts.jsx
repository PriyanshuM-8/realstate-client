import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  AreaChart,
  Area,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";
import { Calendar, Filter, RefreshCw, PhoneCall, CheckCircle, TrendingUp } from "lucide-react";
import {
  getDashboardSummaryApi,
  getLeadsByStatusApi,
  getLeadsBySourceApi,
  getProjectPerformanceApi,
  getSalesPerformanceApi
} from "../../services/dashboardApi";
import { Select } from "../common/Select";
import { Button } from "../common/Button";
import { Skeleton } from "../common/Skeleton";
import { toast } from "sonner";

const COLORS = ["#8B5CF6", "#3B82F6", "#F59E0B", "#10B981", "#EC4899", "#6366F1", "#EF4444", "#14B8A6"];

export const D3Charts = () => {
  const [loading, setLoading] = useState(true);
  const [statusStats, setStatusStats] = useState([]);
  const [sourceStats, setSourceStats] = useState([]);
  const [projectStats, setProjectStats] = useState([]);
  const [salesStats, setSalesStats] = useState([]);

  // Filter State
  const [timeFilter, setTimeFilter] = useState("Hours");
  const [timeSlot, setTimeSlot] = useState("07:00 PM");
  const [selectedDate, setSelectedDate] = useState("2026-09-11");

  const fetchData = async () => {
    setLoading(true);
    try {
      const [statusRes, sourceRes, projRes, salesRes] = await Promise.all([
        getLeadsByStatusApi(),
        getLeadsBySourceApi(),
        getProjectPerformanceApi(),
        getSalesPerformanceApi()
      ]);

      setStatusStats(statusRes.data || []);
      setSourceStats(sourceRes.data || []);
      setProjectStats(projRes.data || []);
      setSalesStats(salesRes.data || []);
    } catch (err) {
      toast.error(err.message || "Failed to load chart analytics");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Agent Calls Data matching reference screenshot media_1789132269958.png
  const agentCallsData = [
    { name: "Adarsh", connected: 0, notConnected: 0 },
    { name: "Aditya", connected: 5, notConnected: 3 },
    { name: "Saloni", connected: 1, notConnected: 1 },
    { name: "Souvik", connected: 2, notConnected: 0 },
    { name: "Aman", connected: 2, notConnected: 0 },
    { name: "Mainuddin", connected: 0, notConnected: 0 },
    { name: "Faliha", connected: 1, notConnected: 2 },
    { name: "Sneh", connected: 17, notConnected: 1 },
    { name: "Avi", connected: 32, notConnected: 18 },
    { name: "Tarron", connected: 1, notConnected: 1 },
    { name: "Rashmi", connected: 0, notConnected: 0 },
    { name: "Syed", connected: 0, notConnected: 0 },
    { name: "Atul", connected: 0, notConnected: 0 },
    { name: "Navneet", connected: 11, notConnected: 1 },
    { name: "Soumya", connected: 0, notConnected: 0 },
    { name: "Satwik", connected: 14, notConnected: 1 },
    { name: "Aadrik", connected: 0, notConnected: 0 },
    { name: "Shreya", connected: 0, notConnected: 0 },
    { name: "Rejo", connected: 3, notConnected: 1 }
  ];

  // Leads over time trend data
  const trendData = [
    { date: "01 Sep", leads: 420, siteVisits: 45, bookings: 8 },
    { date: "03 Sep", leads: 580, siteVisits: 62, bookings: 12 },
    { date: "05 Sep", leads: 640, siteVisits: 75, bookings: 15 },
    { date: "07 Sep", leads: 790, siteVisits: 90, bookings: 19 },
    { date: "09 Sep", leads: 910, siteVisits: 110, bookings: 24 },
    { date: "11 Sep", leads: 1050, siteVisits: 130, bookings: 28 }
  ];

  return (
    <div className="space-y-6">
      {/* 1. Connected Calls vs Not Connected Calls Stacked Bar Chart (Reference Screenshot UI) */}
      <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <Select value={timeFilter} onChange={(e) => setTimeFilter(e.target.value)} className="w-28 text-xs">
              <option value="Hours">Hours</option>
              <option value="Days">Days</option>
            </Select>

            <Select value={timeSlot} onChange={(e) => setTimeSlot(e.target.value)} className="w-32 text-xs">
              <option value="07:00 PM">07:00 PM</option>
              <option value="08:00 PM">08:00 PM</option>
              <option value="09:00 PM">09:00 PM</option>
            </Select>

            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-200"
            />
          </div>

          <div className="flex items-center gap-6 text-xs font-bold">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 bg-[#1A73E8] rounded-xs" />
              <span className="text-slate-700 dark:text-slate-300">Connected Calls</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 bg-[#E53935] rounded-xs" />
              <span className="text-slate-700 dark:text-slate-300">Not Connected Calls</span>
            </div>
          </div>
        </div>

        {/* Recharts Agent Call Stacked Bar Chart */}
        <div className="h-72 w-full mt-2">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={agentCallsData} margin={{ top: 20, right: 10, left: -20, bottom: 25 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
              <XAxis
                dataKey="name"
                angle={-45}
                textAnchor="end"
                interval={0}
                tick={{ fontSize: 10, fill: "#64748B" }}
              />
              <YAxis tick={{ fontSize: 10, fill: "#64748B" }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#0F172A",
                  borderColor: "#334155",
                  color: "#FFF",
                  borderRadius: "8px",
                  fontSize: "12px"
                }}
              />
              <Bar dataKey="connected" name="Connected Calls" stackId="a" fill="#1A73E8" radius={[0, 0, 0, 0]} />
              <Bar dataKey="notConnected" name="Not Connected Calls" stackId="a" fill="#E53935" radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Grid of 4 Recharts Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Leads Over Time */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs">
          <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-4">Leads & Conversion Trend</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="date" tick={{ fontSize: 11, fill: "#64748B" }} />
                <YAxis tick={{ fontSize: 11, fill: "#64748B" }} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="leads" name="Total Leads" stroke="#3B82F6" strokeWidth={2.5} />
                <Line type="monotone" dataKey="siteVisits" name="Site Visits" stroke="#10B981" strokeWidth={2.5} />
                <Line type="monotone" dataKey="bookings" name="Bookings" stroke="#F59E0B" strokeWidth={2.5} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Lead Status Distribution */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs">
          <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-4">Lead Status Distribution</h3>
          <div className="h-64 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusStats.length ? statusStats : [{ name: "Initial", count: 10758 }, { name: "Not Interested", count: 34631 }, { name: "RNR", count: 3616 }]}
                  dataKey="count"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                >
                  {statusStats.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
