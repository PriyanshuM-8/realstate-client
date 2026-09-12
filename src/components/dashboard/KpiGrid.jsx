import React from "react";
import { Users, UserCheck, CalendarCheck, BookmarkCheck, FileCheck, Clock, TrendingUp, Sparkles } from "lucide-react";
import { StatCard } from "../common/StatCard";

export const KpiGrid = ({ summary }) => {
  if (!summary) return null;

  const cards = [
    { title: "Total Leads", value: summary.totalLeads || 0, icon: Users, change: "+12.4%", isPositive: true, color: "indigo" },
    { title: "Today's Follow-ups", value: summary.todaysFollowUps || 0, icon: CalendarCheck, change: "+5.1%", isPositive: true, color: "blue" },
    { title: "Verified Leads", value: summary.verifiedLeads || 0, icon: UserCheck, change: "+8.3%", isPositive: true, color: "emerald" },
    { title: "Site Visits", value: summary.siteVisits || 0, icon: Sparkles, change: "+15.0%", isPositive: true, color: "purple" },
    { title: "Bookings", value: summary.bookings || 0, icon: BookmarkCheck, change: "+4.2%", isPositive: true, color: "emerald" },
    { title: "EOI", value: summary.eoi || 0, icon: FileCheck, change: "+2.0%", isPositive: true, color: "amber" },
    { title: "Hold Units", value: summary.hold || 0, icon: Clock, change: "-1.5%", isPositive: false, color: "amber" },
    { title: "Conversion Rate", value: summary.conversionRate || "0.00%", icon: TrendingUp, change: "+0.8%", isPositive: true, color: "indigo" }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card, idx) => (
        <StatCard key={idx} {...card} />
      ))}
    </div>
  );
};
