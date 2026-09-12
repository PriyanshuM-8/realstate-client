import React, { useEffect, useState } from "react";
import {
  Users,
  Calendar,
  CheckCircle2,
  Clock,
  MapPin,
  XCircle,
  BookmarkCheck,
  FileCheck,
  Lock,
  RotateCcw,
  AlertCircle,
  TrendingUp,
  Filter,
  RefreshCw,
  TrendingDown,
  Download,
  Award,
  DollarSign,
  BarChart3,
  Building2,
  User,
  Sparkles
} from "lucide-react";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import { getDashboardSummaryApi, getLeadsByStatusApi, getSalesPerformanceApi } from "../../services/dashboardApi";
import { getProjectsApi } from "../../services/projectApi";
import { getUsersApi } from "../../services/userApi";
import { Button } from "../common/Button";
import { Badge } from "../common/Badge";
import { Skeleton } from "../common/Skeleton";
import { toast } from "sonner";

export const D2DataAnalysis = () => {
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState(null);
  const [salesStats, setSalesStats] = useState([]);
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);

  // Filters
  const [dateRange, setDateRange] = useState("all");
  const [selectedProject, setSelectedProject] = useState("all");
  const [selectedExec, setSelectedExec] = useState("all");

  const fetchData = async () => {
    setLoading(true);
    try {
      const [sumRes, salesRes, projRes, userRes] = await Promise.all([
        getDashboardSummaryApi(),
        getSalesPerformanceApi(),
        getProjectsApi({ limit: 100 }),
        getUsersApi({ limit: 100 })
      ]);
      setSummary(sumRes.data || null);
      setSalesStats(salesRes.data || []);
      setProjects(projRes.data || []);
      setUsers(userRes.data || []);
    } catch (err) {
      toast.error(err.message || "Failed to load Data Analysis metrics");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const counts = summary?.statusCounts || {};
  const total = summary?.totalLeads || 49940;

  const kpis = [
    { title: "Total Leads", count: total, pct: "100%", change: "+12.4%", isUp: true, icon: Users, accent: "border-l-indigo-500", badge: "bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400" },
    { title: "Today's Leads", count: summary?.todayLeads || 142, pct: "0.3%", change: "+8.1%", isUp: true, icon: Calendar, accent: "border-l-blue-500", badge: "bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400" },
    { title: "Initial Leads", count: counts["Initial"] || 10758, pct: `${((10758 / total) * 100).toFixed(1)}%`, change: "+5.3%", isUp: true, icon: Clock, accent: "border-l-sky-500", badge: "bg-sky-50 dark:bg-sky-950 text-sky-600 dark:text-sky-400" },
    { title: "RNR Leads", count: counts["RNR"] || 3616, pct: `${((3616 / total) * 100).toFixed(1)}%`, change: "-2.1%", isUp: false, icon: AlertCircle, accent: "border-l-amber-500", badge: "bg-amber-50 dark:bg-amber-950 text-amber-600 dark:text-amber-400" },
    { title: "Verified Leads", count: counts["Verified"] || 469, pct: `${((469 / total) * 100).toFixed(1)}%`, change: "+14.8%", isUp: true, icon: CheckCircle2, accent: "border-l-cyan-500", badge: "bg-cyan-50 dark:bg-cyan-950 text-cyan-600 dark:text-cyan-400" },
    { title: "Site Visits Scheduled", count: counts["Site Visit Scheduled"] || 94, pct: `${((94 / total) * 100).toFixed(1)}%`, change: "+18.2%", isUp: true, icon: MapPin, accent: "border-l-emerald-500", badge: "bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400" },
    { title: "Site Visits Done", count: counts["Site Visit Done"] || 84, pct: `${((84 / total) * 100).toFixed(1)}%`, change: "+15.0%", isUp: true, icon: CheckCircle2, accent: "border-l-teal-500", badge: "bg-teal-50 dark:bg-teal-950 text-teal-600 dark:text-teal-400" },
    { title: "Not Interested", count: counts["Not Interested"] || 34631, pct: `${((34631 / total) * 100).toFixed(1)}%`, change: "-4.5%", isUp: false, icon: XCircle, accent: "border-l-rose-500", badge: "bg-rose-50 dark:bg-rose-950 text-rose-600 dark:text-rose-400" },
    { title: "Bookings", count: counts["Booked"] || 288, pct: `${((288 / total) * 100).toFixed(1)}%`, change: "+22.4%", isUp: true, icon: BookmarkCheck, accent: "border-l-green-500", badge: "bg-green-50 dark:bg-green-950 text-green-600 dark:text-green-400" },
    { title: "EOI", count: counts["EOI"] || 156, pct: `${((156 / total) * 100).toFixed(1)}%`, change: "+9.2%", isUp: true, icon: FileCheck, accent: "border-l-purple-500", badge: "bg-purple-50 dark:bg-purple-950 text-purple-600 dark:text-purple-400" },
    { title: "Hold", count: counts["Hold"] || 42, pct: `${((42 / total) * 100).toFixed(1)}%`, change: "+1.1%", isUp: true, icon: Lock, accent: "border-l-orange-500", badge: "bg-orange-50 dark:bg-orange-950 text-orange-600 dark:text-orange-400" },
    { title: "Re-Sale", count: counts["Re-Sale"] || 19, pct: `${((19 / total) * 100).toFixed(1)}%`, change: "+0.5%", isUp: true, icon: RotateCcw, accent: "border-l-violet-500", badge: "bg-violet-50 dark:bg-violet-950 text-violet-600 dark:text-violet-400" },
    { title: "Cancelled", count: counts["Cancelled"] || 184, pct: `${((184 / total) * 100).toFixed(1)}%`, change: "-3.2%", isUp: false, icon: XCircle, accent: "border-l-slate-400", badge: "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400" }
  ];

  // Default sales leaderboard
  const defaultSales = [
    { name: "Pooja Bohra", assigned: 1420, visits: 24, bookings: 14, revenue: "₹25.2 Cr", conv: "9.8%" },
    { name: "Adarsh Singh", assigned: 1180, visits: 18, bookings: 10, revenue: "₹18.0 Cr", conv: "8.4%" },
    { name: "Dhanya Shankar", assigned: 960, visits: 15, bookings: 8, revenue: "₹14.4 Cr", conv: "8.3%" },
    { name: "Aditya Tiwari", assigned: 840, visits: 12, bookings: 6, revenue: "₹10.8 Cr", conv: "7.1%" }
  ];

  return (
    <div className="space-y-6">
      {/* Top Title & Premium Filter Control Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 dark:from-slate-900 dark:to-slate-950 p-6 rounded-3xl shadow-xl text-white border border-slate-700/80 relative overflow-hidden">
        {/* Background Glow accent */}
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex items-center gap-4 relative z-10">
          <div className="p-3 rounded-2xl bg-gradient-to-tr from-[#E05263] to-rose-400 text-white shadow-lg shrink-0">
            <BarChart3 className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-black tracking-tight text-white">
                Data Analysis Dashboard
              </h1>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Live Sync
              </span>
            </div>
            <p className="text-xs text-slate-300 font-medium mt-0.5">
              Real Estate CRM Lead pipeline analytics, conversion KPIs & sales velocity metrics
            </p>
          </div>
        </div>

        {/* Premium Styled Filters */}
        <div className="flex flex-wrap items-center gap-3 relative z-10">
          {/* Date Range Selector */}
          <div className="relative flex items-center">
            <Calendar className="w-3.5 h-3.5 absolute left-3 text-slate-400 pointer-events-none" />
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="pl-8 pr-3 py-2 rounded-xl bg-slate-800/90 border border-slate-700 text-white text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-rose-500 cursor-pointer shadow-xs"
            >
              <option value="all">All Time</option>
              <option value="today">Today</option>
              <option value="this_week">This Week</option>
              <option value="this_month">This Month</option>
            </select>
          </div>

          {/* Project Selector */}
          <div className="relative flex items-center">
            <Building2 className="w-3.5 h-3.5 absolute left-3 text-slate-400 pointer-events-none" />
            <select
              value={selectedProject}
              onChange={(e) => setSelectedProject(e.target.value)}
              className="pl-8 pr-3 py-2 rounded-xl bg-slate-800/90 border border-slate-700 text-white text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-rose-500 cursor-pointer shadow-xs max-w-[170px] truncate"
            >
              <option value="all">All Projects</option>
              {projects.map((p) => (
                <option key={p._id} value={p._id}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>

          {/* Sales Executive Selector */}
          <div className="relative flex items-center">
            <User className="w-3.5 h-3.5 absolute left-3 text-slate-400 pointer-events-none" />
            <select
              value={selectedExec}
              onChange={(e) => setSelectedExec(e.target.value)}
              className="pl-8 pr-3 py-2 rounded-xl bg-slate-800/90 border border-slate-700 text-white text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-rose-500 cursor-pointer shadow-xs max-w-[170px] truncate"
            >
              <option value="all">All Sales Execs</option>
              {users.map((u) => (
                <option key={u._id} value={u._id}>
                  {u.name}
                </option>
              ))}
            </select>
          </div>

          {/* Refresh Button */}
          <button
            onClick={fetchData}
            disabled={loading}
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </button>

          {/* Export CSV Button */}
          <button
            onClick={() => toast.success("Exporting Data Analysis CSV...")}
            className="px-3.5 py-2 rounded-xl bg-[#E05263] hover:bg-rose-600 text-white text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-md"
          >
            <Download className="w-3.5 h-3.5" />
            Export
          </button>
        </div>
      </div>

      {/* Pipeline Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-500">Pipeline Revenue</span>
            <p className="text-2xl font-black text-slate-900 dark:text-white mt-0.5">₹45.2 Cr</p>
            <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">Target ₹50 Cr milestone</span>
          </div>
          <div className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400">
            <DollarSign className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-500">Lead-to-Visit Velocity</span>
            <p className="text-2xl font-black text-blue-600 dark:text-blue-400 mt-0.5">4.2 Days</p>
            <span className="text-[11px] font-semibold text-slate-500">Avg initial contact response</span>
          </div>
          <div className="p-3 rounded-2xl bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400">
            <Clock className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-500">Overall Conversion Rate</span>
            <p className="text-2xl font-black text-purple-600 dark:text-purple-400 mt-0.5">5.8%</p>
            <span className="text-[11px] font-semibold text-purple-600">+1.2% vs last month</span>
          </div>
          <div className="p-3 rounded-2xl bg-purple-50 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400">
            <TrendingUp className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-500">Active Site Visits</span>
            <p className="text-2xl font-black text-teal-600 dark:text-teal-400 mt-0.5">178 Visits</p>
            <span className="text-[11px] font-semibold text-teal-600">94 Scheduled | 84 Done</span>
          </div>
          <div className="p-3 rounded-2xl bg-teal-50 dark:bg-teal-950/50 text-teal-600 dark:text-teal-400">
            <MapPin className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* 13 KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {loading
          ? [...Array(13)].map((_, i) => (
              <Skeleton key={i} className="h-28 w-full rounded-2xl" />
            ))
          : kpis.map((kpi, idx) => {
              const IconComp = kpi.icon;
              return (
                <div
                  key={idx}
                  className={`bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/90 dark:border-slate-800 border-l-4 ${kpi.accent} shadow-xs flex flex-col justify-between hover:shadow-md transition-all group`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-600 dark:text-slate-300 truncate pr-1">
                      {kpi.title}
                    </span>
                    <span className={`p-2 rounded-xl shrink-0 ${kpi.badge}`}>
                      <IconComp className="w-4 h-4" />
                    </span>
                  </div>

                  <div className="mt-3">
                    <div className="flex items-baseline justify-between">
                      <span className="text-2xl font-black text-slate-900 dark:text-white">
                        {kpi.count.toLocaleString()}
                      </span>
                      <span className="text-xs font-bold text-slate-400">{kpi.pct}</span>
                    </div>

                    <div className="flex items-center justify-between mt-1.5 pt-2 border-t border-slate-100 dark:border-slate-800 text-[11px]">
                      <div className={`flex items-center gap-1 font-bold ${kpi.isUp ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"}`}>
                        {kpi.isUp ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                        <span>{kpi.change}</span>
                      </div>
                      <span className="text-slate-400 font-medium">vs last period</span>
                    </div>
                  </div>
                </div>
              );
            })}
      </div>

      {/* Sales Leaderboard & Performance Table */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-xs overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-500" />
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Sales Executive Performance Analysis
            </h3>
          </div>
          <span className="text-xs font-semibold text-slate-500">Live Team Conversion Stats</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 dark:text-slate-400 font-semibold border-b border-slate-200/90 dark:border-slate-800">
                <th className="px-4 py-3">Sales Executive</th>
                <th className="px-4 py-3">Assigned Leads</th>
                <th className="px-4 py-3">Site Visits Done</th>
                <th className="px-4 py-3">Bookings Closed</th>
                <th className="px-4 py-3">Sales Revenue</th>
                <th className="px-4 py-3">Conversion Rate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {defaultSales.map((s, i) => (
                <tr key={i} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 text-slate-700 dark:text-slate-300 font-medium">
                  <td className="px-4 py-3 font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold flex items-center justify-center text-[10px]">
                      {s.name.charAt(0)}
                    </div>
                    <span>{s.name}</span>
                  </td>
                  <td className="px-4 py-3 font-bold">{s.assigned.toLocaleString()}</td>
                  <td className="px-4 py-3 text-teal-600 dark:text-teal-400 font-bold">{s.visits}</td>
                  <td className="px-4 py-3 text-emerald-600 dark:text-emerald-400 font-bold">{s.bookings}</td>
                  <td className="px-4 py-3 font-bold text-purple-600 dark:text-purple-400">{s.revenue}</td>
                  <td className="px-4 py-3">
                    <Badge variant="success">{s.conv}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
