import api from "./api";

export const getAuditLogsApi = (params) => api.get("/api/audit-logs", { params });
