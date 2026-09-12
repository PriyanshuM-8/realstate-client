import api from "./api";

export const getAssetsApi = (params) => api.get("/api/admin/assets", { params });
export const getAllotmentsApi = (params) => api.get("/api/admin/allotment", { params });
export const getOfficesApi = (params) => api.get("/api/admin/office", { params });
