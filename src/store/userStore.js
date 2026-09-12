import { create } from "zustand";
import { getUsersApi } from "../services/userApi";

export const useUserStore = create((set) => ({
  users: [],
  loading: false,

  fetchUsers: async () => {
    set({ loading: true });
    try {
      const res = await getUsersApi();
      set({ users: res.data || [], loading: false });
    } catch (err) {
      set({ loading: false });
    }
  }
}));
