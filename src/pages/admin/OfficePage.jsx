import React from "react";
import { Building2, Plus, MapPin, Users } from "lucide-react";
import { Badge } from "../../components/common/Badge";
import { Button } from "../../components/common/Button";

export const OfficePage = () => {
  const offices = [
    { id: "OFF-01", name: "Corporate HQ", location: "MG Road, Bengaluru", manager: "Priyanshu M", employees: 42, status: "Active" },
    { id: "OFF-02", name: "Sales Hub West", location: "Whitefield, Bengaluru", manager: "Pooja Bohra", managerRole: "Sales Manager", employees: 18, status: "Active" },
    { id: "OFF-03", name: "Regional Office North", location: "Cyber City, Gurugram", manager: "Vikram Malhotra", employees: 12, status: "Active" }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs">
        <div>
          <h1 className="text-xl font-bold text-slate-900 dark:text-white">Admin Office Locations</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">Branch offices, regional hubs, managers & headcount</p>
        </div>
        <Button icon={Plus} size="sm">+ Add Office</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {offices.map((o) => (
          <div key={o.id} className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-rose-50 dark:bg-rose-950/50 text-[#E05263]">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">{o.name}</h3>
                    <p className="text-[11px] text-slate-400 font-semibold">{o.id}</p>
                  </div>
                </div>
                <Badge variant="success">{o.status}</Badge>
              </div>

              <div className="space-y-2 text-xs font-medium text-slate-600 dark:text-slate-300 mt-4">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                  <span>{o.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-slate-400 shrink-0" />
                  <span>Manager: <strong className="text-slate-800 dark:text-slate-100">{o.manager}</strong></span>
                </div>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-500">Total Staff:</span>
              <span className="font-bold text-slate-900 dark:text-white text-sm">{o.employees} Employees</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
