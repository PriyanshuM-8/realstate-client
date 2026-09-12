import api from "./api";

export const getUsersApi = (params) => api.get("/api/users", { params });
export const getUserByIdApi = (id) => api.get(`/api/users/${id}`);
export const createUserApi = (userData) => api.post("/api/users", userData);
export const updateUserApi = (id, userData) => api.put(`/api/users/${id}`, userData);
export const deleteUserApi = (id) => api.delete(`/api/users/${id}`);
