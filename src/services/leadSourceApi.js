import api from "./api";

export const getLeadSourcesApi = () => api.get("/api/lead-sources");
export const createLeadSourceApi = (data) => api.post("/api/lead-sources", data);
export const updateLeadSourceApi = (id, data) => api.put(`/api/lead-sources/${id}`, data);
