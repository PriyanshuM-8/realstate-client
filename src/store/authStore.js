import { create } from "zustand";
import { loginApi, logoutApi, getMeApi } from "../services/authApi";

export const useAuthStore = create((set, get) => ({
  user: JSON.parse(localStorage.getItem("crm_user") || "null"),
  token: localStorage.getItem("crm_token") || null,
  isAuthenticated: !!localStorage.getItem("crm_token"),
  loading: false,
  error: null,

  login: async (credentials) => {
    set({ loading: true, error: null });
    try {
      const response = await loginApi(credentials);
      const { token, ...userData } = response.data;

      localStorage.setItem("crm_token", token);
      localStorage.setItem("crm_user", JSON.stringify(userData));

      set({
        user: userData,
        token,
        isAuthenticated: true,
        loading: false
      });
      return response;
    } catch (err) {
      set({ loading: false, error: err.message });
      throw err;
    }
  },

  logout: async () => {
    try {
      await logoutApi();
    } catch (e) {
      console.warn("Logout API failed, clearing client state anyway");
    } finally {
      localStorage.removeItem("crm_token");
      localStorage.removeItem("crm_user");
      set({ user: null, token: null, isAuthenticated: false });
    }
  },

  fetchMe: async () => {
    if (!get().token) return;
    try {
      const response = await getMeApi();
      const userData = response.data;
      localStorage.setItem("crm_user", JSON.stringify(userData));
      set({ user: userData, isAuthenticated: true });
    } catch (err) {
      get().logout();
    }
  },

  updateUserInStore: (updatedUserData) => {
    const newUser = { ...get().user, ...updatedUserData };
    localStorage.setItem("crm_user", JSON.stringify(newUser));
    set({ user: newUser });
  }
}));
