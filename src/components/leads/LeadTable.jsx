import React from "react";
import { Link } from "react-router-dom";
import {
  Eye,
  Edit,
  Phone,
  UserPlus,
  Calendar,
  Sparkles,
  BookmarkCheck,
  Trash2
} from "lucide-react";
import { StatusBadge } from "../common/StatusBadge";
import { formatShortPrice, formatDate } from "../../utils/formatters";
import { PRIORITY_CONFIG } from "../../utils/constants";

export const LeadTable = ({
  leads = [],
  selectedLeadIds = [],
  onSelectLead,
  onSelectAll,
  onAssign,
  onChangeStatus,
  onScheduleSiteVisit,
  onCreateBooking,
  onAddFollowUp,
  onDelete
}) => {
  const allSelected = leads.length > 0 && selectedLeadIds.length === leads.length;

  return (
    <div className="bg-white rounded-xl border border-slate-200/80 shadow-xs overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs text-slate-600">
          <thead className="bg-slate-50 text-slate-700 font-semibold uppercase text-[10px] tracking-wider border-b border-slate-200 select-none">
            <tr>
              <th className="py-3 px-3 w-10 text-center">
                <input
                  type="checkbox"
                  checked={allSelected}
                  onChange={(e) => onSelectAll(e.target.checked)}
                  className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                />
              </th>
              <th className="py-3 px-3">Customer</th>
              <th className="py-3 px-3">Project</th>
              <th className="py-3 px-3">Status</th>
              <th className="py-3 px-3">Agent / Executive</th>
              <th className="py-3 px-3">Budget</th>
              <th className="py-3 px-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {leads.map((lead) => {
              const isSelected = selectedLeadIds.includes(lead._id);

              return (
                <tr
                  key={lead._id}
                  className={`hover:bg-slate-50/80 transition-colors ${
                    isSelected ? "bg-indigo-50/30" : ""
                  }`}
                >
                  <td className="py-3.5 px-3 text-center">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={(e) => onSelectLead(lead._id, e.target.checked)}
                      className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                    />
                  </td>

                  {/* Customer */}
                  <td className="py-3.5 px-3 font-medium text-slate-900">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-bold text-indigo-600">{lead.leadId}</span>
                      <Link to={`/leads/${lead._id}`} className="font-semibold text-slate-900 hover:text-indigo-600">
                        {lead.name}
                      </Link>
                    </div>
                    <div className="text-[11px] text-slate-500 flex items-center gap-2 mt-0.5">
                      <span className="flex items-center gap-1 text-slate-600">
                        <Phone className="w-3 h-3 text-slate-400" /> {lead.phone}
                      </span>
                    </div>
                  </td>

                  {/* Project */}
                  <td className="py-3.5 px-3">
                    <div className="font-semibold text-slate-800">
                      {lead.project ? lead.project.name : "Unassigned"}
                    </div>
                    <div className="text-[11px] text-slate-500">
                      {lead.configuration || lead.propertyType || "N/A"}
                    </div>
                  </td>

                  {/* Status */}
                  <td className="py-3.5 px-3">
                    <StatusBadge status={lead.leadStatus} />
                  </td>

                  {/* Agent */}
                  <td className="py-3.5 px-3">
                    {lead.assignedTo ? (
                      <div className="flex items-center gap-1.5">
                        <div className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-[10px] font-bold">
                          {lead.assignedTo.name?.charAt(0)}
                        </div>
                        <span className="text-xs font-medium text-slate-800">
                          {lead.assignedTo.name}
                        </span>
                      </div>
                    ) : (
                      <span className="text-slate-400 italic">Unassigned</span>
                    )}
                  </td>

                  {/* Budget */}
                  <td className="py-3.5 px-3 font-semibold text-slate-900">
                    {lead.budgetMin || lead.budgetMax
                      ? `${formatShortPrice(lead.budgetMin)} - ${formatShortPrice(lead.budgetMax)}`
                      : "N/A"}
                  </td>

                  {/* Actions: Inline Buttons (✏ 📞 👁 as shown in reference diagram) */}
                  <td className="py-3.5 px-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      {/* Edit ✏ */}
                      <button
                        onClick={() => onChangeStatus(lead)}
                        title="Edit Status"
                        className="p-1.5 rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:text-indigo-600 transition-colors shadow-2xs"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>

                      {/* Call 📞 */}
                      <button
                        onClick={() => onAddFollowUp(lead)}
                        title="Call / Follow-up"
                        className="p-1.5 rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:text-emerald-600 transition-colors shadow-2xs"
                      >
                        <Phone className="w-3.5 h-3.5" />
                      </button>

                      {/* View 👁 */}
                      <Link
                        to={`/leads/${lead._id}`}
                        title="View Details"
                        className="p-1.5 rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:text-blue-600 transition-colors shadow-2xs"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
