import React, { useEffect, useState } from "react";
import { Sparkles, MapPin, CheckCircle, Clock } from "lucide-react";
import { getSiteVisitsApi, getTodaySiteVisitsApi, updateSiteVisitApi } from "../services/siteVisitApi";
import { Button } from "../components/common/Button";
import { Badge } from "../components/common/Badge";
import { Skeleton } from "../components/common/Skeleton";
import { formatDate } from "../utils/formatters";
import { toast } from "sonner";

export const SiteVisitsPage = () => {
  const [activeTab, setActiveTab] = useState("all"); // 'all', 'today'
  const [siteVisits, setSiteVisits] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSiteVisits = async () => {
    setLoading(true);
    try {
      let res;
      if (activeTab === "today") {
        res = await getTodaySiteVisitsApi();
      } else {
        res = await getSiteVisitsApi();
      }
      setSiteVisits(res.data || []);
    } catch (err) {
      toast.error(err.message || "Failed to load site visits");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSiteVisits();
  }, [activeTab]);

  const handleUpdateStatus = async (id, status) => {
    const feedback = status === "Completed" ? window.prompt("Enter customer feedback for site visit:") : "";
    try {
      await updateSiteVisitApi(id, { status, feedback });
      toast.success(`Site visit updated to ${status}`);
      fetchSiteVisits();
    } catch (err) {
      toast.error(err.message || "Failed to update site visit");
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-900">Site Visit Management</h1>
        <p className="text-xs text-slate-500">Track and confirm project site walk-throughs with customers</p>
      </div>

      <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveTab("all")}
          className={`px-4 py-2 rounded-xl text-xs font-semibold ${
            activeTab === "all" ? "bg-indigo-600 text-white" : "bg-white text-slate-600"
          }`}
        >
          All Site Visits
        </button>
        <button
          onClick={() => setActiveTab("today")}
          className={`px-4 py-2 rounded-xl text-xs font-semibold ${
            activeTab === "today" ? "bg-indigo-600 text-white" : "bg-white text-slate-600"
          }`}
        >
          Today's Scheduled Visits
        </button>
      </div>

      {loading ? (
        <div className="space-y-3">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-20 w-full rounded-xl" />
          ))}
        </div>
      ) : siteVisits.length === 0 ? (
        <div className="bg-white rounded-xl border border-slate-200 p-8 text-center text-slate-400 text-xs">
          No site visits found.
        </div>
      ) : (
        <div className="space-y-3">
          {siteVisits.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
              <div className="flex items-start gap-3">
                <div className="p-2.5 bg-purple-50 text-purple-600 rounded-xl shrink-0 mt-0.5">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 text-sm">
                      {item.customer?.name} ({item.customer?.phone})
                    </span>
                    <Badge variant={item.status === "Completed" ? "success" : "warning"}>
                      {item.status}
                    </Badge>
                  </div>
                  <p className="text-xs text-slate-600 mt-1">
                    <strong>Project:</strong> {item.project?.name} • <strong>Date:</strong> {formatDate(item.scheduledDate)} at {item.scheduledTime}
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">Executive: {item.assignedExecutive?.name}</p>
                  {item.feedback && (
                    <p className="text-xs text-purple-700 font-medium mt-1">Feedback: {item.feedback}</p>
                  )}
                </div>
              </div>

              {item.status === "Scheduled" && (
                <div className="flex items-center gap-2">
                  <Button onClick={() => handleUpdateStatus(item._id, "Completed")} variant="primary" size="sm">
                    Mark Completed
                  </Button>
                  <Button onClick={() => handleUpdateStatus(item._id, "Cancelled")} variant="outline" size="sm">
                    Cancel Visit
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
