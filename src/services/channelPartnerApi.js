import api from "./api";

export const getChannelPartnersApi = (params) => api.get("/api/channel-partners", { params });
export const getChannelPartnerByIdApi = (id) => api.get(`/api/channel-partners/${id}`);
export const createChannelPartnerApi = (data) => api.post("/api/channel-partners", data);
export const updateChannelPartnerApi = (id, data) => api.put(`/api/channel-partners/${id}`, data);
export const deleteChannelPartnerApi = (id) => api.delete(`/api/channel-partners/${id}`);
