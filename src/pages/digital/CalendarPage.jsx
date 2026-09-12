import React from "react";
import { Calendar as CalendarIcon, Clock, MapPin, Users, Plus } from "lucide-react";
import { Badge } from "../../components/common/Badge";
import { Button } from "../../components/common/Button";

export const CalendarPage = () => {
  const events = [
    { title: "Site Visit: Simran Prasad at Prestige Raintree", time: "10:30 AM - 11:30 AM", type: "Site Visit", location: "Whitefield, Bengaluru", host: "Pooja Bohra" },
    { title: "Channel Partner Meet - Bangalore Realtors", time: "02:00 PM - 03:30 PM", type: "Meeting", location: "Conference Room A", host: "Priyanshu M" },
    { title: "Followup Call with Aditya Narayan", time: "04:30 PM - 05:00 PM", type: "Followup", location: "Telecalling Desk", host: "Pooja Bohra" }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs">
        <div>
          <h1 className="text-xl font-bold text-slate-900 dark:text-white">Digital Calendar & Appointments</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">Interactive schedule of site visits, meetings, followups & events</p>
        </div>
        <Button icon={Plus} size="sm">+ New Event</Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">Today's Agenda</h3>
          <div className="space-y-3">
            {events.map((ev, i) => (
              <div key={i} className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 flex items-start justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Badge variant={ev.type === "Site Visit" ? "success" : ev.type === "Meeting" ? "primary" : "info"}>{ev.type}</Badge>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white">{ev.title}</h4>
                  </div>
                  <div className="flex items-center gap-4 text-[11px] text-slate-500 font-medium mt-1">
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{ev.time}</span>
                    <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{ev.location}</span>
                  </div>
                </div>
                <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">Host: {ev.host}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-3">Calendar Snapshot</h3>
          <p className="text-xs text-slate-500">September 2026</p>
          <div className="mt-4 text-center text-xs font-semibold text-slate-400 py-12 border border-dashed border-slate-200 dark:border-slate-800 rounded-xl">
            Interactive Calendar Grid
          </div>
        </div>
      </div>
    </div>
  );
};
