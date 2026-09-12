import { create } from "zustand";
import { getNotificationsApi, markNotificationReadApi, markAllNotificationsReadApi } from "../services/notificationApi";

export const useNotificationStore = create((set, get) => ({
  notifications: [],
  unreadCount: 0,
  loading: false,

  fetchNotifications: async () => {
    set({ loading: true });
    try {
      const res = await getNotificationsApi();
      set({
        notifications: res.data?.notifications || [],
        unreadCount: res.data?.unreadCount || 0,
        loading: false
      });
    } catch (err) {
      set({ loading: false });
    }
  },

  addNotification: (notification) => {
    set((state) => ({
      notifications: [notification, ...state.notifications],
      unreadCount: state.unreadCount + 1
    }));
  },

  markRead: async (id) => {
    try {
      await markNotificationReadApi(id);
      set((state) => ({
        notifications: state.notifications.map((n) => (n._id === id ? { ...n, read: true } : n)),
        unreadCount: Math.max(0, state.unreadCount - 1)
      }));
    } catch (err) {
      console.error("Failed to mark read", err);
    }
  },

  markAllRead: async () => {
    try {
      await markAllNotificationsReadApi();
      set((state) => ({
        notifications: state.notifications.map((n) => ({ ...n, read: true })),
        unreadCount: 0
      }));
    } catch (err) {
      console.error("Failed to mark all read", err);
    }
  }
}));
