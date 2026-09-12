import api from "./api";

export const getSiteVisitsApi = (params) => api.get("/api/site-visits", { params });
export const getTodaySiteVisitsApi = () => api.get("/api/site-visits/today");
export const createSiteVisitApi = (data) => api.post("/api/site-visits", data);
export const updateSiteVisitApi = (id, data) => api.put(`/api/site-visits/${id}`, data);
export const updateSiteVisitStatusApi = (id, data) => api.put(`/api/site-visits/${id}`, data);
