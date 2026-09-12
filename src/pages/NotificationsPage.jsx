import React, { useEffect } from "react";
import { Bell, CheckCheck } from "lucide-react";
import { useNotificationStore } from "../store/notificationStore";
import { Button } from "../components/common/Button";
import { Skeleton } from "../components/common/Skeleton";
import { formatRelativeTime } from "../utils/formatters";
import { cn } from "../utils/helpers";

export const NotificationsPage = () => {
  const { notifications, unreadCount, fetchNotifications, markRead, markAllRead, loading } =
    useNotificationStore();

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Notifications Center</h1>
          <p className="text-xs text-slate-500">Real-time alerts for lead assignments, site visits & bookings</p>
        </div>

        {unreadCount > 0 && (
          <Button onClick={markAllRead} variant="outline" size="sm" icon={CheckCheck}>
            Mark All as Read
          </Button>
        )}
      </div>

      {loading ? (
        <div className="space-y-3">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-16 w-full rounded-xl" />
          ))}
        </div>
      ) : notifications.length === 0 ? (
        <div className="bg-white rounded-xl border border-slate-200 p-8 text-center text-slate-400 text-xs">
          No notifications yet.
        </div>
      ) : (
        <div className="space-y-3">
          {notifications.map((item) => (
            <div
              key={item._id}
              onClick={() => !item.read && markRead(item._id)}
              className={cn(
                "p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-4",
                item.read ? "bg-white border-slate-200 opacity-75" : "bg-indigo-50/50 border-indigo-200 shadow-2xs"
              )}
            >
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-bold text-slate-900">{item.title}</h4>
                  {!item.read && <span className="w-2 h-2 rounded-full bg-indigo-600" />}
                </div>
                <p className="text-xs text-slate-600 mt-1">{item.message}</p>
              </div>

              <span className="text-[11px] text-slate-400 shrink-0">
                {formatRelativeTime(item.createdAt)}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
