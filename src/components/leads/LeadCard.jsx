import React from "react";
import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Building, Calendar, UserPlus, MoreVertical } from "lucide-react";
import { StatusBadge } from "../common/StatusBadge";
import { formatShortPrice, formatDate } from "../../utils/formatters";

export const LeadCard = ({ lead, onAssign, onChangeStatus, onAddFollowUp }) => {
  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-xs space-y-3">
      <div className="flex items-start justify-between">
        <div>
          <span className="text-[11px] font-bold text-indigo-600 uppercase tracking-wider">{lead.leadId}</span>
          <h4 className="text-sm font-bold text-slate-900 leading-tight mt-0.5">
            <Link to={`/leads/${lead._id}`} className="hover:underline">{lead.name}</Link>
          </h4>
        </div>
        <StatusBadge status={lead.leadStatus} />
      </div>

      <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
        <div>
          <span className="text-[10px] text-slate-400 block uppercase">Project</span>
          <span className="font-semibold text-slate-800">{lead.project?.name || "Unassigned"}</span>
        </div>
        <div>
          <span className="text-[10px] text-slate-400 block uppercase">Budget</span>
          <span className="font-semibold text-slate-800">{formatShortPrice(lead.budgetMin)} - {formatShortPrice(lead.budgetMax)}</span>
        </div>
        <div>
          <span className="text-[10px] text-slate-400 block uppercase">Phone</span>
          <span className="font-medium text-slate-800">{lead.phone}</span>
        </div>
        <div>
          <span className="text-[10px] text-slate-400 block uppercase">Assigned To</span>
          <span className="font-medium text-slate-800">{lead.assignedTo?.name || "Unassigned"}</span>
        </div>
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
        <span className="text-[11px] text-slate-400">
          Next follow-up: <strong className="text-slate-700">{lead.nextFollowUp ? formatDate(lead.nextFollowUp) : "None"}</strong>
        </span>

        <div className="flex items-center gap-1">
          <button
            onClick={() => onAddFollowUp(lead)}
            className="p-1.5 rounded-md bg-slate-100 text-slate-700 hover:bg-slate-200 text-xs font-medium"
          >
            Follow-up
          </button>
          <button
            onClick={() => onAssign(lead)}
            className="p-1.5 rounded-md bg-indigo-50 text-indigo-700 hover:bg-indigo-100 text-xs font-medium"
          >
            Assign
          </button>
        </div>
      </div>
    </div>
  );
};
