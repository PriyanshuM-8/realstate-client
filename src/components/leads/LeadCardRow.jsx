import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Eye,
  EyeOff,
  Edit,
  Phone,
  MessageSquare,
  MapPin,
  FileText,
  Calendar
} from "lucide-react";
import { StatusBadge } from "../common/StatusBadge";
import { formatDateTime } from "../../utils/formatters";

export const LeadCardRow = ({
  lead,
  onAssign,
  onChangeStatus,
  onScheduleSiteVisit,
  onCreateBooking,
  onAddFollowUp
}) => {
  const [showPhone, setShowPhone] = useState(false);

  const maskPhone = (ph) => {
    if (!ph) return "*********00";
    if (showPhone) return ph;
    return `*********${ph.slice(-2)}`;
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs hover:shadow-md transition-all">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        {/* Column 1: Customer & Property Info (md:col-span-4) */}
        <div className="md:col-span-4 space-y-2 text-xs">
          <div>
            <span className="font-semibold text-slate-500">Name: </span>
            <Link to={`/leads/${lead._id}`} className="font-bold text-slate-900 hover:text-indigo-600">
              {lead.name}
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-500">Phone No.: </span>
            <span className="font-mono text-slate-800">{maskPhone(lead.phone)}</span>
            <button
              onClick={() => setShowPhone(!showPhone)}
              className="p-1 rounded-md text-slate-400 hover:bg-slate-100 hover:text-slate-700"
              title="Mask/Unmask Phone"
            >
              {showPhone ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
            </button>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-500">Alternate Phone No.: </span>
            <span className="font-mono text-slate-800">
              {lead.alternatePhone ? maskPhone(lead.alternatePhone) : "0"}
            </span>
            <button
              onClick={() => setShowPhone(!showPhone)}
              className="p-1 rounded-md text-slate-400 hover:bg-slate-100 hover:text-slate-700"
            >
              <Eye className="w-3.5 h-3.5" />
            </button>
          </div>

          <div>
            <span className="font-semibold text-slate-500">Project: </span>
            <span className="font-bold text-slate-800">
              {lead.project?.name || "Prestige Ferns Residency"}
            </span>
          </div>
        </div>

        {/* Column 2: Notes & Activity History (md:col-span-5) */}
        <div className="md:col-span-5 border-t md:border-t-0 md:border-l border-slate-100 md:pl-6 pt-3 md:pt-0 space-y-1.5 text-xs">
          <span className="font-bold text-slate-700 block mb-1">Notes:</span>

          {lead.activityHistory?.length > 0 ? (
            lead.activityHistory.slice(0, 2).map((act) => (
              <div key={act._id} className="text-slate-600 font-mono text-[11px] leading-tight">
                <span className="text-slate-400">{formatDateTime(act.createdAt)}</span> |{" "}
                <span className="font-medium text-slate-800">{act.activityType}</span> |{" "}
                <span className="text-slate-500">{act.user?.name || "System"}</span>
              </div>
            ))
          ) : (
            <div className="text-slate-600 font-mono text-[11px] leading-tight">
              <span className="text-slate-400">{formatDateTime(lead.createdAt)}</span> |{" "}
              <span className="font-medium text-slate-800">{lead.leadStatus}</span> |{" "}
              <span className="text-slate-500">{lead.assignedTo?.name || "System"}</span>
            </div>
          )}

          {lead.notes && (
            <p className="text-slate-500 italic text-[11px] truncate mt-1">"{lead.notes}"</p>
          )}
        </div>

        {/* Column 3: ID, Unit, Actions & Status Badge (md:col-span-3) */}
        <div className="md:col-span-3 border-t md:border-t-0 md:border-l border-slate-100 md:pl-6 pt-3 md:pt-0 flex flex-col justify-between items-start md:items-end space-y-3">
          {/* Top Right Actions Row: ✏ 📞 💬 📍 📝 */}
          <div className="flex items-center gap-1.5 self-end">
            <button
              onClick={() => onChangeStatus(lead)}
              title="Edit Status"
              className="p-1.5 rounded-lg border border-amber-200 bg-amber-50 text-amber-600 hover:bg-amber-100 transition-colors"
            >
              <Edit className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => onAddFollowUp(lead)}
              title="Call Follow-up"
              className="p-1.5 rounded-lg border border-red-200 bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => onAddFollowUp(lead)}
              title="WhatsApp Message"
              className="p-1.5 rounded-lg border border-emerald-200 bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition-colors"
            >
              <MessageSquare className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => onScheduleSiteVisit(lead)}
              title="Schedule Site Visit"
              className="p-1.5 rounded-lg border border-purple-200 bg-purple-50 text-purple-600 hover:bg-purple-100 transition-colors"
            >
              <MapPin className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => onCreateBooking(lead)}
              title="Create Booking"
              className="p-1.5 rounded-lg border border-indigo-200 bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition-colors"
            >
              <FileText className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* ID, Unit & Date */}
          <div className="text-right text-xs space-y-0.5">
            <div className="font-bold text-slate-800">
              ID: <span className="text-indigo-600">{lead.leadId}</span> | Unit: <span className="text-slate-600">0</span>
            </div>
            <div className="text-[11px] text-slate-400">
              Updated Date: <span className="font-medium text-slate-600">{formatDateTime(lead.updatedAt || lead.createdAt)}</span>
            </div>
          </div>

          {/* Status Badge */}
          <div className="self-end pt-1">
            <StatusBadge status={lead.leadStatus} />
          </div>
        </div>
      </div>
    </div>
  );
};
