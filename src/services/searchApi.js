import api from "./api";

export const globalSearchApi = (q) => api.get("/api/search", { params: { q } });
