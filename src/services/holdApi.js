import api from "./api";

export const getHoldsApi = (params) => api.get("/api/holds", { params });
export const createHoldApi = (data) => api.post("/api/holds", data);
export const updateHoldApi = (id, data) => api.put(`/api/holds/${id}`, data);
