import { useEffect } from "react";
import { io } from "socket.io-client";
import { useAuthStore } from "../store/authStore";
import { useNotificationStore } from "../store/notificationStore";
import { toast } from "sonner";

let socket;

export const useSocket = () => {
  const { user, token } = useAuthStore();
  const { addNotification } = useNotificationStore();

  useEffect(() => {
    if (!token || !user?._id) return;

    const socketUrl = import.meta.env.VITE_SOCKET_URL || "http://localhost:5000";
    socket = io(socketUrl, {
      transports: ["websocket", "polling"],
      reconnection: true
    });

    socket.on("connect", () => {
      console.log("Socket connected:", socket.id);
      socket.emit("join", user._id);
    });

    socket.on("notification", (notification) => {
      addNotification(notification);
      toast.info(notification.title || "New Notification", {
        description: notification.message
      });
    });

    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, [user?._id, token, addNotification]);

  return socket;
};
