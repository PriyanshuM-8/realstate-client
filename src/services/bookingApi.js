import api from "./api";

export const getBookingsApi = (params) => api.get("/api/bookings", { params });
export const createBookingApi = (data) => api.post("/api/bookings", data);
export const updateBookingApi = (id, data) => api.put(`/api/bookings/${id}`, data);
