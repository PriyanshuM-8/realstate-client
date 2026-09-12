import api from "./api";

export const getProjectsApi = (params) => api.get("/api/projects", { params });
export const getProjectByIdApi = (id) => api.get(`/api/projects/${id}`);
export const createProjectApi = (data) => api.post("/api/projects", data);
export const updateProjectApi = (id, data) => api.put(`/api/projects/${id}`, data);
export const deleteProjectApi = (id) => api.delete(`/api/projects/${id}`);
