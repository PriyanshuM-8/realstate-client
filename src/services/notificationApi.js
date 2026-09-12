import api from "./api";

export const getNotificationsApi = () => api.get("/api/notifications");
export const markNotificationReadApi = (id) => api.put(`/api/notifications/${id}/read`);
export const markAllNotificationsReadApi = () => api.put("/api/notifications/read-all");
