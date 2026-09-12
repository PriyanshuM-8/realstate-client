import api from "./api";

export const getDashboardSummaryApi = () => api.get("/api/dashboard/summary");
export const getLeadsByStatusApi = () => api.get("/api/dashboard/leads-by-status");
export const getLeadsBySourceApi = () => api.get("/api/dashboard/leads-by-source");
export const getProjectPerformanceApi = () => api.get("/api/dashboard/project-performance");
export const getSalesPerformanceApi = () => api.get("/api/dashboard/sales-performance");
