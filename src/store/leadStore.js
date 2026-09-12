import { create } from "zustand";
import { getLeadsApi, getLeadStatsApi } from "../services/leadApi";

export const useLeadStore = create((set, get) => ({
  leads: [],
  stats: {
    all: 0,
    initial: 0,
    rnr: 0,
    verified: 0,
    siteVisitScheduled: 0,
    siteVisitDone: 0,
    notInterested: 0,
    booked: 0,
    eoi: 0,
    hold: 0,
    reSale: 0,
    duplicate: 0,
    projectMismatch: 0,
    cancelled: 0
  },
  pagination: {
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 1
  },
  filters: {
    status: "",
    search: "",
    project: "",
    assignedTo: "",
    source: "",
    priority: "",
    fromDate: "",
    toDate: ""
  },
  loading: false,
  statsLoading: false,
  error: null,

  setFilters: (newFilters) => {
    set((state) => ({
      filters: { ...state.filters, ...newFilters },
      pagination: { ...state.pagination, page: 1 } // Reset to page 1 on filter change
    }));
    get().fetchLeads();
  },

  resetFilters: () => {
    set({
      filters: {
        status: "",
        search: "",
        project: "",
        assignedTo: "",
        source: "",
        priority: "",
        fromDate: "",
        toDate: ""
      },
      pagination: { page: 1, limit: 10, total: 0, totalPages: 1 }
    });
    get().fetchLeads();
  },

  setPage: (page) => {
    set((state) => ({ pagination: { ...state.pagination, page } }));
    get().fetchLeads();
  },

  setLimit: (limit) => {
    set((state) => ({ pagination: { ...state.pagination, limit, page: 1 } }));
    get().fetchLeads();
  },

  fetchStats: async () => {
    set({ statsLoading: true });
    try {
      const res = await getLeadStatsApi();
      set({ stats: res.data || {}, statsLoading: false });
    } catch (err) {
      set({ statsLoading: false });
    }
  },

  fetchLeads: async () => {
    set({ loading: true, error: null });
    try {
      const { pagination, filters } = get();
      const params = {
        page: pagination.page,
        limit: pagination.limit,
        ...filters
      };
      // Remove empty params
      Object.keys(params).forEach((key) => !params[key] && delete params[key]);

      const res = await getLeadsApi(params);
      set({
        leads: res.data || [],
        pagination: res.pagination || pagination,
        loading: false
      });
    } catch (err) {
      set({ loading: false, error: err.message });
    }
  }
}));
