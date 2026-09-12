import api from "./api";

export const getFollowUpsApi = (params) => api.get("/api/followups", { params });
export const getTodayFollowUpsApi = () => api.get("/api/followups/today");
export const getUpcomingFollowUpsApi = () => api.get("/api/followups/upcoming");
export const createFollowUpApi = (data) => api.post("/api/followups", data);
export const updateFollowUpApi = (id, data) => api.put(`/api/followups/${id}`, data);
export const deleteFollowUpApi = (id) => api.delete(`/api/followups/${id}`);
