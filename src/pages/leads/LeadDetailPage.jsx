import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Phone,
  Mail,
  MapPin,
  Building,
  User,
  Calendar,
  Sparkles,
  BookmarkCheck,
  Edit,
  UserPlus,
  Clock,
  Send
} from "lucide-react";
import { getLeadByIdApi, addLeadNoteApi } from "../../services/leadApi";
import { StatusBadge } from "../../components/common/StatusBadge";
import { Badge } from "../../components/common/Badge";
import { Button } from "../../components/common/Button";
import { Textarea } from "../../components/common/Textarea";
import { Skeleton } from "../../components/common/Skeleton";
import { formatShortPrice, formatDateTime, formatDate } from "../../utils/formatters";
import { PRIORITY_CONFIG } from "../../utils/constants";
import { AssignLeadModal } from "../../components/leads/AssignLeadModal";
import { LeadStatusModal } from "../../components/leads/LeadStatusModal";
import { ScheduleSiteVisitModal } from "../../components/leads/ScheduleSiteVisitModal";
import { CreateBookingModal } from "../../components/leads/CreateBookingModal";
import { AddFollowUpModal } from "../../components/leads/AddFollowUpModal";
import { useProjectStore } from "../../store/projectStore";
import { useUserStore } from "../../store/userStore";
import { toast } from "sonner";

export const LeadDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [lead, setLead] = useState(null);
  const [loading, setLoading] = useState(true);

  // New Note
  const [newNote, setNewNote] = useState("");
  const [noteLoading, setNoteLoading] = useState(false);

  // Modals state
  const [modalType, setModalType] = useState(null);

  const { projects, fetchProjects } = useProjectStore();
  const { users, fetchUsers } = useUserStore();

  const fetchLeadDetails = async () => {
    setLoading(true);
    try {
      const res = await getLeadByIdApi(id);
      setLead(res.data);
    } catch (err) {
      toast.error(err.message || "Failed to load lead details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeadDetails();
    fetchProjects();
    fetchUsers();
  }, [id]);

  const handleAddNote = async (e) => {
    e.preventDefault();
    if (!newNote.trim()) return;

    setNoteLoading(true);
    try {
      await addLeadNoteApi(id, { note: newNote });
      toast.success("Note added!");
      setNewNote("");
      fetchLeadDetails();
    } catch (err) {
      toast.error(err.message || "Failed to add note");
    } finally {
      setNoteLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-20 w-full rounded-2xl" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Skeleton className="h-96 w-full lg:col-span-2 rounded-2xl" />
          <Skeleton className="h-96 w-full rounded-2xl" />
        </div>
      </div>
    );
  }

  if (!lead) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-500">Lead not found</p>
        <Link to="/leads">
          <Button variant="primary" size="sm" className="mt-3">Back to Leads</Button>
        </Link>
      </div>
    );
  }

  const priorityObj = PRIORITY_CONFIG[lead.priority] || PRIORITY_CONFIG.Medium;

  return (
    <div className="space-y-6">
      {/* Top Breadcrumbs & Header */}
      <div className="flex items-center justify-between">
        <Link to="/leads" className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900">
          <ArrowLeft className="w-4 h-4" /> Back to Leads
        </Link>

        <div className="flex items-center gap-2 flex-wrap">
          <Button onClick={() => setModalType("assign")} variant="outline" size="sm" icon={UserPlus}>
            Assign
          </Button>
          <Button onClick={() => setModalType("status")} variant="outline" size="sm" icon={Edit}>
            Change Status
          </Button>
          <Button onClick={() => setModalType("followup")} variant="outline" size="sm" icon={Calendar}>
            Add Follow-up
          </Button>
          <Button onClick={() => setModalType("siteVisit")} variant="outline" size="sm" icon={Sparkles}>
            Site Visit
          </Button>
          <Button onClick={() => setModalType("booking")} variant="primary" size="sm" icon={BookmarkCheck}>
            Book Unit
          </Button>
        </div>
      </div>

      {/* Hero Banner Header Card */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-indigo-600 tracking-wide uppercase">{lead.leadId}</span>
            <StatusBadge status={lead.leadStatus} />
            <span className={`inline-flex px-2 py-0.5 rounded-md text-[10px] font-bold border ${priorityObj.color}`}>
              {lead.priority} Priority
            </span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mt-1">{lead.name}</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Created on {formatDate(lead.createdAt)} • Source: <span className="font-semibold text-slate-700">{lead.source}</span>
          </p>
        </div>

        <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center text-sm shadow-xs">
            {lead.assignedTo?.name ? lead.assignedTo.name.charAt(0) : "U"}
          </div>
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Assigned Executive</span>
            <p className="text-xs font-semibold text-slate-900">{lead.assignedTo?.name || "Unassigned"}</p>
            <p className="text-[10px] text-slate-500">{lead.assignedTo?.phone}</p>
          </div>
        </div>
      </div>

      {/* Main Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (Customer & Requirement Info) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Customer Information Card */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">
              Customer Contact Information
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-slate-400 block mb-0.5">Phone Number</span>
                <p className="font-semibold text-slate-800 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-indigo-500" /> {lead.phone}
                </p>
              </div>
              <div>
                <span className="text-slate-400 block mb-0.5">Email Address</span>
                <p className="font-semibold text-slate-800 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-indigo-500" /> {lead.email || "Not specified"}
                </p>
              </div>
              <div>
                <span className="text-slate-400 block mb-0.5">Alternate Phone</span>
                <p className="font-medium text-slate-700">{lead.alternatePhone || "None"}</p>
              </div>
              <div>
                <span className="text-slate-400 block mb-0.5">Location</span>
                <p className="font-semibold text-slate-800 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-indigo-500" /> {lead.location || lead.preferredLocation || "Not specified"}
                </p>
              </div>
            </div>
          </div>

          {/* Project Requirement Card */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">
              Project & Requirement Details
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div>
                <span className="text-slate-400 block mb-0.5">Preferred Project</span>
                <p className="font-bold text-indigo-600 text-sm">{lead.project?.name || "Unassigned"}</p>
              </div>
              <div>
                <span className="text-slate-400 block mb-0.5">BHK / Configuration</span>
                <p className="font-semibold text-slate-800">{lead.configuration || "2 BHK"}</p>
              </div>
              <div>
                <span className="text-slate-400 block mb-0.5">Budget Range</span>
                <p className="font-bold text-emerald-700">{formatShortPrice(lead.budgetMin)} - {formatShortPrice(lead.budgetMax)}</p>
              </div>
              <div>
                <span className="text-slate-400 block mb-0.5">Property Type</span>
                <p className="font-medium text-slate-800">{lead.propertyType}</p>
              </div>
              <div>
                <span className="text-slate-400 block mb-0.5">Area (sq.ft)</span>
                <p className="font-medium text-slate-800">{lead.area ? `${lead.area} ${lead.areaUnit}` : "N/A"}</p>
              </div>
              <div>
                <span className="text-slate-400 block mb-0.5">Buyer Purpose</span>
                <p className="font-medium text-slate-800">{lead.purpose || "Self Use"}</p>
              </div>
            </div>
          </div>

          {/* Activity History Timeline Card */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">
              Lead Activity Timeline
            </h3>

            <div className="space-y-4">
              {lead.activityHistory?.length === 0 ? (
                <p className="text-xs text-slate-400 italic">No activities recorded yet.</p>
              ) : (
                lead.activityHistory?.map((act) => (
                  <div key={act._id} className="flex items-start gap-3 text-xs border-b border-slate-50 pb-3 last:border-0">
                    <div className="w-7 h-7 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold shrink-0 mt-0.5">
                      <Clock className="w-3.5 h-3.5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-slate-900">{act.activityType}</span>
                        <span className="text-[10px] text-slate-400">{formatDateTime(act.createdAt)}</span>
                      </div>
                      <p className="text-slate-600 mt-0.5">{act.description}</p>
                      {act.user && <span className="text-[10px] text-slate-400 block mt-1">by {act.user.name}</span>}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Right Column (Notes & Quick Follow-ups) */}
        <div className="space-y-6">
          {/* Notes Log Card */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">
              Notes & Discussion Log
            </h3>

            <form onSubmit={handleAddNote} className="space-y-2">
              <Textarea
                placeholder="Type a new note..."
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                rows={3}
              />
              <Button type="submit" variant="primary" size="sm" className="w-full" isLoading={noteLoading} icon={Send}>
                Add Note
              </Button>
            </form>

            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/60 max-h-60 overflow-y-auto font-mono text-[11px] text-slate-700 whitespace-pre-wrap">
              {lead.notes || "No notes logged yet."}
            </div>
          </div>

          {/* Follow-up & Site Visit Summary Card */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-4 text-xs">
            <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">
              CRM Status Summary
            </h3>

            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Next Follow-up</span>
                <span className="font-semibold text-slate-900">{lead.nextFollowUp ? formatDate(lead.nextFollowUp) : "None"}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Last Follow-up</span>
                <span className="font-medium text-slate-700">{lead.lastFollowUp ? formatDate(lead.lastFollowUp) : "None"}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Site Visit Status</span>
                <span className="font-semibold text-purple-700">{lead.siteVisitStatus}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Booking Status</span>
                <span className="font-bold text-emerald-700">{lead.bookingStatus}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dynamic Action Modals */}
      {modalType === "assign" && (
        <AssignLeadModal
          isOpen={true}
          onClose={() => setModalType(null)}
          lead={lead}
          users={users}
          onSuccess={fetchLeadDetails}
        />
      )}

      {modalType === "status" && (
        <LeadStatusModal
          isOpen={true}
          onClose={() => setModalType(null)}
          lead={lead}
          onSuccess={fetchLeadDetails}
        />
      )}

      {modalType === "siteVisit" && (
        <ScheduleSiteVisitModal
          isOpen={true}
          onClose={() => setModalType(null)}
          lead={lead}
          projects={projects}
          users={users}
          onSuccess={fetchLeadDetails}
        />
      )}

      {modalType === "booking" && (
        <CreateBookingModal
          isOpen={true}
          onClose={() => setModalType(null)}
          lead={lead}
          projects={projects}
          users={users}
          onSuccess={fetchLeadDetails}
        />
      )}

      {modalType === "followup" && (
        <AddFollowUpModal
          isOpen={true}
          onClose={() => setModalType(null)}
          lead={lead}
          users={users}
          onSuccess={fetchLeadDetails}
        />
      )}
    </div>
  );
};
