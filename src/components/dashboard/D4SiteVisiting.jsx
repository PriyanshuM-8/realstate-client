import React, { useEffect, useState } from "react";
import {
  CalendarCheck,
  Plus,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  XCircle,
  MapPin,
  Eye,
  Edit,
  RotateCcw
} from "lucide-react";
import { getSiteVisitsApi, updateSiteVisitStatusApi } from "../../services/siteVisitApi";
import { getProjectsApi } from "../../services/projectApi";
import { getUsersApi } from "../../services/userApi";
import { ScheduleSiteVisitModal } from "../leads/ScheduleSiteVisitModal";
import { Button } from "../common/Button";
import { Select } from "../common/Select";
import { Badge } from "../common/Badge";
import { Skeleton } from "../common/Skeleton";
import { format } from "date-fns";
import { toast } from "sonner";
import { cn } from "../../utils/helpers";

export const D4SiteVisiting = () => {
  const [loading, setLoading] = useState(true);
  const [siteVisits, setSiteVisits] = useState([]);
  const [activeTab, setActiveTab] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProject, setSelectedProject] = useState("all");
  const [selectedExec, setSelectedExec] = useState("all");

  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);

  const fetchSiteVisits = async () => {
    setLoading(true);
    try {
      const [visitRes, projRes, userRes] = await Promise.all([
        getSiteVisitsApi({ status: activeTab !== "All" ? activeTab : undefined }),
        getProjectsApi({ limit: 100 }),
        getUsersApi({ limit: 100 })
      ]);
      setSiteVisits(visitRes.data || []);
      setProjects(projRes.data || []);
      setUsers(userRes.data || []);
    } catch (err) {
      toast.error(err.message || "Failed to load site visits");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSiteVisits();
  }, [activeTab]);

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      await updateSiteVisitStatusApi(id, { status: newStatus });
      toast.success(`Site visit status updated to ${newStatus}`);
      fetchSiteVisits();
    } catch (err) {
      toast.error(err.message || "Failed to update site visit status");
    }
  };

  const tabs = ["All", "Scheduled", "Confirmed", "Completed", "Missed", "Cancelled"];

  const stats = [
    { title: "Total Site Visits", count: siteVisits.length, color: "bg-slate-800 text-white" },
    { title: "Scheduled", count: siteVisits.filter((s) => s.status === "Scheduled").length, color: "bg-blue-50 text-blue-700" },
    { title: "Confirmed", count: siteVisits.filter((s) => s.status === "Confirmed").length, color: "bg-cyan-50 text-cyan-700" },
    { title: "Completed", count: siteVisits.filter((s) => s.status === "Completed").length, color: "bg-emerald-50 text-emerald-700" },
    { title: "Missed", count: siteVisits.filter((s) => s.status === "Missed").length, color: "bg-amber-50 text-amber-700" },
    { title: "Cancelled", count: siteVisits.filter((s) => s.status === "Cancelled").length, color: "bg-rose-50 text-rose-700" }
  ];

  return (
    <div className="space-y-6">
      {/* Header & Stats */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs">
        <div>
          <h1 className="text-xl font-bold text-slate-900 dark:text-white">Site Visiting Management</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Track customer site visits, executive assignments & feedback logs
          </p>
        </div>

        <Button
          onClick={() => setIsModalOpen(true)}
          icon={Plus}
          size="sm"
          className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold"
        >
          + Schedule Site Visit
        </Button>
      </div>

      {/* Top Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {stats.map((st, i) => (
          <div
            key={i}
            className={`p-3.5 rounded-2xl border border-slate-200/80 dark:border-slate-800 ${st.color} flex flex-col justify-between`}
          >
            <span className="text-[11px] font-bold opacity-80">{st.title}</span>
            <span className="text-2xl font-black mt-1">{st.count}</span>
          </div>
        ))}
      </div>

      {/* Filter Bar & Tabs */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-3">
        {/* Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 border-b border-slate-100 dark:border-slate-800">
          {tabs.map((tb) => (
            <button
              key={tb}
              onClick={() => setActiveTab(tb)}
              className={cn(
                "px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer",
                activeTab === tb
                  ? "bg-slate-900 dark:bg-rose-500 text-white shadow-xs"
                  : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
              )}
            >
              {tb}
            </button>
          ))}
        </div>

        {/* Inputs */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search customer, project or Lead ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-800 dark:text-slate-100 placeholder-slate-400"
            />
          </div>

          <Select
            value={selectedProject}
            onChange={(e) => setSelectedProject(e.target.value)}
            className="w-40 text-xs"
          >
            <option value="all">All Projects</option>
            {projects.map((p) => (
              <option key={p._id} value={p._id}>
                {p.name}
              </option>
            ))}
          </Select>

          <Select
            value={selectedExec}
            onChange={(e) => setSelectedExec(e.target.value)}
            className="w-44 text-xs"
          >
            <option value="all">All Sales Execs</option>
            {users.map((u) => (
              <option key={u._id} value={u._id}>
                {u.name}
              </option>
            ))}
          </Select>
        </div>
      </div>

      {/* Site Visit Table */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 dark:text-slate-400 font-semibold border-b border-slate-200/80 dark:border-slate-800">
                <th className="px-4 py-3">Customer</th>
                <th className="px-4 py-3">Phone</th>
                <th className="px-4 py-3">Project</th>
                <th className="px-4 py-3">Visit Date & Time</th>
                <th className="px-4 py-3">Assigned Executive</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Feedback / Last Note</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {loading ? (
                [...Array(5)].map((_, i) => (
                  <tr key={i}>
                    <td colSpan={8} className="p-3">
                      <Skeleton className="h-6 w-full rounded-md" />
                    </td>
                  </tr>
                ))
              ) : siteVisits.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center py-8 text-slate-400">
                    No site visits scheduled for this status filter.
                  </td>
                </tr>
              ) : (
                siteVisits.map((sv) => (
                  <tr
                    key={sv._id}
                    className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 text-slate-700 dark:text-slate-300 font-medium"
                  >
                    <td className="px-4 py-3 font-bold text-slate-900 dark:text-white">
                      {sv.lead?.name || sv.customerName || "Customer"}
                    </td>
                    <td className="px-4 py-3">{sv.lead?.phone || sv.phone || "N/A"}</td>
                    <td className="px-4 py-3">{sv.project?.name || "Prestige City"}</td>
                    <td className="px-4 py-3 font-semibold text-slate-800 dark:text-slate-200">
                      {sv.visitDate ? format(new Date(sv.visitDate), "dd MMM yyyy, hh:mm a") : "-"}
                    </td>
                    <td className="px-4 py-3">{sv.assignedTo?.name || "Pooja Bohra"}</td>
                    <td className="px-4 py-3">
                      <Badge
                        variant={
                          sv.status === "Completed"
                            ? "success"
                            : sv.status === "Scheduled"
                            ? "info"
                            : sv.status === "Confirmed"
                            ? "primary"
                            : "warning"
                        }
                      >
                        {sv.status}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-slate-500 truncate max-w-xs">
                      {sv.feedback || sv.notes || "Customer planned site visit with executive"}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        {sv.status !== "Completed" && (
                          <button
                            onClick={() => handleStatusUpdate(sv._id, "Completed")}
                            className="p-1 rounded text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950"
                            title="Mark Completed"
                          >
                            <CheckCircle2 className="w-4 h-4" />
                          </button>
                        )}
                        {sv.status !== "Cancelled" && (
                          <button
                            onClick={() => handleStatusUpdate(sv._id, "Cancelled")}
                            className="p-1 rounded text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950"
                            title="Cancel Visit"
                          >
                            <XCircle className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Schedule Site Visit Modal */}
      {isModalOpen && (
        <ScheduleSiteVisitModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSuccess={fetchSiteVisits}
        />
      )}
    </div>
  );
};
