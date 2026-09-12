import api from "./api";

export const getLeadStatsApi = () => api.get("/api/leads/stats");
export const getLeadsApi = (params) => api.get("/api/leads", { params });
export const getLeadByIdApi = (id) => api.get(`/api/leads/${id}`);
export const createLeadApi = (leadData) => api.post("/api/leads", leadData);
export const updateLeadApi = (id, leadData) => api.put(`/api/leads/${id}`, leadData);
export const deleteLeadApi = (id) => api.delete(`/api/leads/${id}`);
export const assignLeadApi = (id, assignData) => api.put(`/api/leads/${id}/assign`, assignData);
export const bulkAssignLeadsApi = (bulkData) => api.put("/api/leads/bulk-assign", bulkData);
export const checkDuplicateLeadApi = (checkData) => api.post("/api/leads/check-duplicate", checkData);
export const addLeadNoteApi = (id, noteData) => api.post(`/api/leads/${id}/notes`, noteData);

export const importLeadsApi = (formData) =>
  api.post("/api/leads/import", formData, {
    headers: { "Content-Type": "multipart/form-data" }
  });

export const exportLeadsApi = (params) =>
  api.get("/api/leads/export", {
    params,
    responseType: "blob"
  });
