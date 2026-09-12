import { create } from "zustand";
import { getProjectsApi } from "../services/projectApi";

export const useProjectStore = create((set) => ({
  projects: [],
  loading: false,

  fetchProjects: async () => {
    set({ loading: true });
    try {
      const res = await getProjectsApi();
      set({ projects: res.data || [], loading: false });
    } catch (err) {
      set({ loading: false });
    }
  }
}));
