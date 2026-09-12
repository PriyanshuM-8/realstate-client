export const LEAD_STATUS_CONFIG = {
  Initial: {
    label: "Initial",
    color: "bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100",
    dot: "bg-blue-500",
    key: "initial"
  },
  RNR: {
    label: "RNR",
    color: "bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200",
    dot: "bg-slate-500",
    key: "rnr"
  },
  Verified: {
    label: "Verified",
    color: "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100",
    dot: "bg-emerald-500",
    key: "verified"
  },
  "Site Visit Scheduled": {
    label: "Site Visit Scheduled",
    color: "bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100",
    dot: "bg-purple-500",
    key: "siteVisitScheduled"
  },
  "Site Visit Done": {
    label: "Site Visit Done",
    color: "bg-indigo-50 text-indigo-700 border-indigo-200 hover:bg-indigo-100",
    dot: "bg-indigo-500",
    key: "siteVisitDone"
  },
  "Not Interested": {
    label: "Not Interested",
    color: "bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100",
    dot: "bg-rose-500",
    key: "notInterested"
  },
  Booked: {
    label: "Booked",
    color: "bg-emerald-100 text-emerald-800 border-emerald-300 font-semibold hover:bg-emerald-200",
    dot: "bg-emerald-600",
    key: "booked"
  },
  EOI: {
    label: "EOI",
    color: "bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100",
    dot: "bg-amber-500",
    key: "eoi"
  },
  Hold: {
    label: "Hold",
    color: "bg-orange-50 text-orange-700 border-orange-200 hover:bg-orange-100",
    dot: "bg-orange-500",
    key: "hold"
  },
  "Re-Sale": {
    label: "Re-Sale",
    color: "bg-pink-50 text-pink-700 border-pink-200 hover:bg-pink-100",
    dot: "bg-pink-500",
    key: "reSale"
  },
  Duplicate: {
    label: "Duplicate",
    color: "bg-gray-100 text-gray-600 border-gray-200 hover:bg-gray-200",
    dot: "bg-gray-400",
    key: "duplicate"
  },
  "Project Mismatch": {
    label: "Project Mismatch",
    color: "bg-red-50 text-red-700 border-red-200 hover:bg-red-100",
    dot: "bg-red-500",
    key: "projectMismatch"
  },
  Cancelled: {
    label: "Cancelled",
    color: "bg-red-100 text-red-800 border-red-300 hover:bg-red-200",
    dot: "bg-red-700",
    key: "cancelled"
  }
};

export const PRIORITY_CONFIG = {
  High: { label: "High", color: "bg-red-50 text-red-700 border-red-200" },
  Medium: { label: "Medium", color: "bg-amber-50 text-amber-700 border-amber-200" },
  Low: { label: "Low", color: "bg-slate-100 text-slate-600 border-slate-200" }
};

export const ROLES = [
  "Super Admin",
  "Admin",
  "Sales Manager",
  "Sales Executive",
  "HR",
  "Marketing",
  "Channel Partner",
  "Telecaller"
];
