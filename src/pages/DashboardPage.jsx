import React from "react";
import { useSearchParams } from "react-router-dom";
import { D1WelcomeBack } from "../components/dashboard/D1WelcomeBack";
import { D2DataAnalysis } from "../components/dashboard/D2DataAnalysis";
import { D3Charts } from "../components/dashboard/D3Charts";
import { D4SiteVisiting } from "../components/dashboard/D4SiteVisiting";

export const DashboardPage = () => {
  const [searchParams] = useSearchParams();
  const activeTab = searchParams.get("tab") || "d1";

  switch (activeTab.toLowerCase()) {
    case "d2":
      return <D2DataAnalysis />;
    case "d3":
      return <D3Charts />;
    case "d4":
      return <D4SiteVisiting />;
    case "d1":
    default:
      return <D1WelcomeBack />;
  }
};
