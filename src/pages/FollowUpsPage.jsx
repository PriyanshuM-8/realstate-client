import React, { useEffect, useState } from "react";
import { CalendarCheck, Phone, CheckCircle, Clock, Plus, Filter } from "lucide-react";
import { getFollowUpsApi, getTodayFollowUpsApi, getUpcomingFollowUpsApi, updateFollowUpApi } from "../services/followUpApi";
import { Button } from "../components/common/Button";
import { Badge } from "../components/common/Badge";
import { Skeleton } from "../components/common/Skeleton";
import { formatDate, formatDateTime } from "../utils/formatters";
import { toast } from "sonner";

export const FollowUpsPage = () => {
  const [activeTab, setActiveTab] = useState("all"); // 'all', 'today', 'upcoming'
  const [followUps, setFollowUps] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFollowUps = async () => {
    setLoading(true);
    try {
      let res;
      if (activeTab === "today") {
        res = await getTodayFollowUpsApi();
      } else if (activeTab === "upcoming") {
        res = await getUpcomingFollowUpsApi();
      } else {
        res = await getFollowUpsApi();
      }
      setFollowUps(res.data || []);
    } catch (err) {
      toast.error(err.message || "Failed to load follow-ups");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFollowUps();
  }, [activeTab]);

  const handleComplete = async (id) => {
    const outcome = window.prompt("Enter follow-up outcome notes:");
    if (outcome === null) return;
    try {
      await updateFollowUpApi(id, { status: "Completed", outcome });
      toast.success("Follow-up marked as completed!");
      fetchFollowUps();
    } catch (err) {
      toast.error(err.message || "Failed to update follow-up");
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-900">Follow-up Management</h1>
        <p className="text-xs text-slate-500">Track and schedule customer call & meeting follow-ups</p>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
        {["all", "today", "upcoming"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold capitalize transition-all ${
              activeTab === tab
                ? "bg-indigo-600 text-white shadow-xs"
                : "bg-white text-slate-600 hover:bg-slate-100"
            }`}
          >
            {tab} Follow-ups
          </button>
        ))}
      </div>

      {/* Followup List */}
      {loading ? (
        <div className="space-y-3">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-20 w-full rounded-xl" />
          ))}
        </div>
      ) : followUps.length === 0 ? (
        <div className="bg-white rounded-xl border border-slate-200 p-8 text-center text-slate-400 text-xs">
          No follow-ups found under this view.
        </div>
      ) : (
        <div className="space-y-3">
          {followUps.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
              <div className="flex items-start gap-3">
                <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl shrink-0 mt-0.5">
                  <CalendarCheck className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 text-sm">
                      {item.lead?.name} ({item.lead?.leadId})
                    </span>
                    <Badge variant={item.status === "Completed" ? "success" : "warning"}>
                      {item.status}
                    </Badge>
                    <Badge variant="info">{item.type}</Badge>
                  </div>
                  <p className="text-xs text-slate-600 mt-1">
                    <strong>Date:</strong> {formatDate(item.followUpDate)} at {item.followUpTime} •{" "}
                    <strong>Assigned:</strong> {item.assignedTo?.name || "Unassigned"}
                  </p>
                  <p className="text-xs text-slate-500 italic mt-0.5">"{item.notes || item.purpose}"</p>
                  {item.outcome && (
                    <p className="text-xs text-emerald-700 font-medium mt-1">Outcome: {item.outcome}</p>
                  )}
                </div>
              </div>

              {item.status === "Pending" && (
                <Button onClick={() => handleComplete(item._id)} variant="outline" size="sm" icon={CheckCircle}>
                  Mark Complete
                </Button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
