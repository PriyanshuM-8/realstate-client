import React, { useState } from "react";
import { User, Bell, Sun, Moon, Shield, KeyRound, CheckCircle2 } from "lucide-react";
import { useAuthStore } from "../../store/authStore";
import { useThemeStore } from "../../store/themeStore";
import { Button } from "../../components/common/Button";
import { Input } from "../../components/common/Input";
import { toast } from "sonner";

export const ProfileSettingsPage = () => {
  const { user } = useAuthStore();
  const { theme, toggleTheme } = useThemeStore();
  const [activeTab, setActiveTab] = useState("account");

  // Notifications toggles state
  const [notifs, setNotifs] = useState({
    leadAssignment: true,
    followUpReminder: true,
    siteVisit: true,
    booking: true,
    eoi: true,
    holdExpiry: true
  });

  const toggleNotif = (key) => {
    setNotifs((prev) => ({ ...prev, [key]: !prev[key] }));
    toast.success("Notification preference updated");
  };

  const tabs = [
    { id: "account", label: "Account Settings", icon: User },
    { id: "appearance", label: "Appearance", icon: theme === "dark" ? Moon : Sun },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "security", label: "Security & Privacy", icon: Shield }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs">
        <h1 className="text-xl font-bold text-slate-900 dark:text-white">Profile Settings</h1>
        <p className="text-xs text-slate-500 dark:text-slate-400">Manage account information, notification alerts, theme & security preferences</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Settings Navigation */}
        <div className="bg-white dark:bg-slate-900 p-3 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-1">
          {tabs.map((tb) => {
            const IconComp = tb.icon;
            const isActive = activeTab === tb.id;
            return (
              <button
                key={tb.id}
                onClick={() => setActiveTab(tb.id)}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  isActive
                    ? "bg-slate-900 dark:bg-rose-500 text-white shadow-xs"
                    : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                }`}
              >
                <IconComp className="w-4 h-4" />
                <span>{tb.label}</span>
              </button>
            );
          })}
        </div>

        {/* Content View */}
        <div className="md:col-span-3 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs">
          {activeTab === "account" && (
            <div className="space-y-4 max-w-lg">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">Account Details</h3>
              <Input label="Full Name" defaultValue={user?.name || "Priyanshu M"} />
              <Input label="Email Address" defaultValue={user?.email || "admin@realestate.com"} disabled />
              <Input label="Phone Number" defaultValue={user?.phone || "+91 9876543210"} />
              <Button size="sm" className="mt-2">Save Account Changes</Button>
            </div>
          )}

          {activeTab === "appearance" && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">Appearance & Theme Mode</h3>
              <p className="text-xs text-slate-500">Choose between Light Mode and Dark Mode for your CRM workspace.</p>
              <div className="flex items-center gap-4 mt-3">
                <button
                  onClick={toggleTheme}
                  className={`p-4 rounded-2xl border flex items-center gap-3 font-bold text-xs cursor-pointer ${
                    theme === "light"
                      ? "border-slate-900 bg-slate-100 text-slate-900 ring-2 ring-slate-900/20"
                      : "border-slate-700 bg-slate-800 text-slate-300"
                  }`}
                >
                  <Sun className="w-5 h-5 text-amber-500" />
                  <span>Light Mode</span>
                </button>

                <button
                  onClick={toggleTheme}
                  className={`p-4 rounded-2xl border flex items-center gap-3 font-bold text-xs cursor-pointer ${
                    theme === "dark"
                      ? "border-rose-500 bg-slate-800 text-white ring-2 ring-rose-500/40"
                      : "border-slate-200 bg-white text-slate-700"
                  }`}
                >
                  <Moon className="w-5 h-5 text-indigo-400" />
                  <span>Dark Mode</span>
                </button>
              </div>
            </div>
          )}

          {activeTab === "notifications" && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">Notification Alert Preferences</h3>
              <div className="space-y-3 divide-y divide-slate-100 dark:divide-slate-800 text-xs">
                {Object.entries(notifs).map(([key, enabled]) => (
                  <div key={key} className="flex items-center justify-between pt-3">
                    <span className="font-semibold text-slate-700 dark:text-slate-200 capitalize">
                      {key.replace(/([A-Z])/g, " $1")} Alerts
                    </span>
                    <input
                      type="checkbox"
                      checked={enabled}
                      onChange={() => toggleNotif(key)}
                      className="w-4 h-4 accent-[#E05263] cursor-pointer"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "security" && (
            <div className="space-y-4 max-w-lg">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">Security & Active Sessions</h3>
              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900 dark:text-white">Current Web Session</span>
                  <span className="text-[11px] font-semibold text-emerald-600">Active Now</span>
                </div>
                <p className="text-[11px] text-slate-500">Chrome on Windows (127.0.0.1)</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
