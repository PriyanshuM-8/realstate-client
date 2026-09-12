import api from "./api";

export const getEOIsApi = (params) => api.get("/api/eois", { params });
export const createEOIApi = (data) => api.post("/api/eois", data);
export const updateEOIApi = (id, data) => api.put(`/api/eois/${id}`, data);
