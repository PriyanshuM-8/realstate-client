import api from "./api";

export const getCampaignsApi = (params) => api.get("/api/marketing/campaigns", { params });
export const getMarketingSpendsApi = (params) => api.get("/api/marketing/spends", { params });
