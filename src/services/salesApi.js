import api from "./api";

export const getSalesHistoryApi = (params) => api.get("/api/sales/history", { params });
export const getIncentivesApi = (params) => api.get("/api/sales/incentives", { params });
export const getSalesCrmOverviewApi = (params) => api.get("/api/sales/crm", { params });
export const getReimbursementsApi = (params) => api.get("/api/sales/reimbursement", { params });
