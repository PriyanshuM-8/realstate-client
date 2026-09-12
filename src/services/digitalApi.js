import api from "./api";

export const getEventsApi = (params) => api.get("/api/digital/events", { params });
export const getTasksApi = (params) => api.get("/api/digital/tasks", { params });
export const getDigitalSpendsApi = (params) => api.get("/api/digital/spends", { params });
