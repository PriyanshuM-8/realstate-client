import api from "./api";

export const getLeavesApi = (params) => api.get("/api/hr/leaves", { params });
export const updateLeaveStatusApi = (id, data) => api.put(`/api/hr/leaves/${id}`, data);

export const getAttendanceApi = (params) => api.get("/api/hr/attendance", { params });

export const getCandidatesApi = (params) => api.get("/api/hr/candidates", { params });
export const updateCandidateStatusApi = (id, data) => api.put(`/api/hr/candidates/${id}`, data);
