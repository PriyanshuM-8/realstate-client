import api from "./api";

export const loginApi = (credentials) => api.post("/api/auth/login", credentials);
export const registerApi = (userData) => api.post("/api/auth/register", userData);
export const logoutApi = () => api.post("/api/auth/logout");
export const getMeApi = () => api.get("/api/auth/me");
export const updateProfileApi = (profileData) => api.put("/api/auth/profile", profileData);
export const changePasswordApi = (passwords) => api.put("/api/auth/change-password", passwords);
export const forgotPasswordApi = (emailData) => api.post("/api/auth/forgot-password", emailData);
export const resetPasswordApi = (resetData) => api.post("/api/auth/reset-password", resetData);
