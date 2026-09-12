import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  Search,
  Bell,
  User,
  LogOut,
  ChevronDown,
  Menu,
  Sun,
  Moon,
  Settings,
  KeyRound,
  Users,
  Briefcase,
  Megaphone,
  DollarSign,
  Calendar,
  Building2,
  CheckSquare,
  Award,
  Layers,
  Clock,
  UserCheck
} from "lucide-react";
import { useAuthStore } from "../../store/authStore";
import { useNotificationStore } from "../../store/notificationStore";
import { useThemeStore } from "../../store/themeStore";
import { Badge } from "../common/Badge";
import { cn } from "../../utils/helpers";

export const Topbar = ({ toggleMobileSidebar, openNotificationPanel, openGlobalSearch }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuthStore();
  const { unreadCount } = useNotificationStore();
  const { theme, toggleTheme } = useThemeStore();

  const [profileOpen, setProfileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const profileRef = useRef(null);
  const navRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
      if (navRef.current && !navRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const directNavItems = [
    { label: "Leads", path: "/leads" },
    { label: "Sellers", path: "/channel-partners" },
    { label: "Data", path: "/reports" },
    { label: "Process", path: "/site-visits" },
    { label: "Notice Board", path: "/notifications" },
    { label: "Channel Partners", path: "/channel-partners" }
  ];

  const dropdownMenus = [
    {
      label: "Admin ▾",
      id: "admin",
      roles: ["Super Admin", "Admin"],
      items: [
        { label: "Users & Roles", path: "/users", icon: Users },
        { label: "Assets", path: "/admin/assets", icon: Layers },
        { label: "Allotment", path: "/admin/allotment", icon: CheckSquare },
        { label: "Office", path: "/admin/office", icon: Building2 }
      ]
    },
    {
      label: "Marketing ▾",
      id: "marketing",
      roles: ["Super Admin", "Admin", "Marketing"],
      items: [
        { label: "Campaigns", path: "/marketing/campaigns", icon: Megaphone },
        { label: "Spends", path: "/marketing/spends", icon: DollarSign },
        { label: "Lead Sources", path: "/lead-sources", icon: Layers }
      ]
    },
    {
      label: "HR ▾",
      id: "hr",
      roles: ["Super Admin", "Admin", "HR"],
      items: [
        { label: "Leave", path: "/hr/leave", icon: Clock },
        { label: "Attendance List", path: "/hr/attendance", icon: UserCheck },
        { label: "Candidates", path: "/hr/candidates", icon: Users }
      ]
    },
    {
      label: "Sales ▾",
      id: "sales",
      roles: ["Super Admin", "Admin", "Sales Manager", "Sales Executive"],
      items: [
        { label: "Sales History", path: "/sales/history", icon: Clock },
        { label: "Incentives", path: "/sales/incentives", icon: Award },
        { label: "CRM Overview", path: "/sales/crm", icon: Briefcase },
        { label: "Reimbursement", path: "/sales/reimbursement", icon: DollarSign }
      ]
    },
    {
      label: "Digital ▾",
      id: "digital",
      roles: ["Super Admin", "Admin", "Marketing"],
      items: [
        { label: "Calendar", path: "/digital/calendar", icon: Calendar },
        { label: "Tasks", path: "/digital/tasks", icon: CheckSquare },
        { label: "Digital Spends", path: "/digital/spends", icon: DollarSign }
      ]
    }
  ];

  return (
    <header className="sticky top-0 z-40 h-14 bg-slate-900 text-white px-3 sm:px-5 flex items-center justify-between shadow-md select-none transition-colors">
      {/* Left: Brand Logo & Navigation */}
      <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0" ref={navRef}>
        <button
          onClick={toggleMobileSidebar}
          className="md:hidden p-1.5 rounded-lg text-white hover:bg-white/10 shrink-0"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Circular Brand Logo */}
        <Link to="/dashboard" className="flex items-center gap-2 shrink-0">
          <div className="w-8 h-8 rounded-full bg-white text-[#0F172A] dark:text-slate-900 font-black text-lg flex items-center justify-center shadow-xs">
            PM
          </div>
        </Link>  

        {/* Navigation Tabs (Direct + Dropdowns) */}
        <nav className="flex items-center gap-1 overflow-x-visible flex-wrap md:flex-nowrap">
          {directNavItems.map((item) => {
            const isActive =
              location.pathname === item.path ||
              (item.path !== "/" && location.pathname.startsWith(item.path));

            return (
              <Link
                key={item.label}
                to={item.path}
                className={cn(
                  "px-2.5 py-1 rounded-full text-xs font-semibold transition-all whitespace-nowrap",
                  isActive
                    ? "bg-white/30 text-white shadow-xs"
                    : "text-white/90 hover:bg-white/20 hover:text-white"
                )}
              >
                {item.label}
              </Link>
            );
          })}

          {/* Dropdown Menus */}
          {dropdownMenus.map((menu) => {
            if (menu.roles && user && !menu.roles.includes(user.role)) return null;

            const isSubActive = menu.items.some(
              (sub) => location.pathname === sub.path || location.pathname.startsWith(sub.path)
            );

            const isOpen = activeDropdown === menu.id;

            return (
              <div key={menu.id} className="relative">
                <button
                  onClick={() => setActiveDropdown(isOpen ? null : menu.id)}
                  className={cn(
                    "px-2.5 py-1 rounded-full text-xs font-semibold transition-all whitespace-nowrap flex items-center gap-1 cursor-pointer",
                    isSubActive || isOpen
                      ? "bg-white/30 text-white shadow-xs"
                      : "text-white/90 hover:bg-white/20 hover:text-white"
                  )}
                >
                  {menu.label}
                </button>

                {isOpen && (
                  <div className="absolute left-0 top-full mt-1.5 w-52 rounded-xl bg-white dark:bg-slate-800 p-1.5 shadow-2xl border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 z-50 animate-in fade-in-50">
                    {menu.items.map((subItem) => {
                      const SubIcon = subItem.icon;
                      const isItemActive = location.pathname === subItem.path;
                      return (
                        <Link
                          key={subItem.label}
                          to={subItem.path}
                          onClick={() => setActiveDropdown(null)}
                          className={cn(
                            "flex items-center gap-2.5 px-3 py-2 text-xs font-medium rounded-lg transition-colors",
                            isItemActive
                              ? "bg-rose-50 text-rose-700 dark:bg-rose-950/50 dark:text-rose-300 font-bold"
                              : "text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700/80"
                          )}
                        >
                          <SubIcon className="w-4 h-4 text-slate-400 dark:text-slate-400 shrink-0" />
                          {subItem.label}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </div>

      {/* Right Action Icons & Profile */}
      <div className="flex items-center gap-2 shrink-0 pl-2">
        {/* Global Search button */}
        <button
          onClick={openGlobalSearch}
          className="p-1.5 rounded-full text-white/90 hover:bg-white/20 hover:text-white transition-colors cursor-pointer"
          title="Search CRM (⌘K)"
        >
          <Search className="w-4 h-4" />
        </button>

        {/* Sun / Moon Theme Switch Pill (No Toast on click) */}
        {/* <button
          onClick={toggleTheme}
          className="flex items-center gap-0.5 bg-white/20 hover:bg-white/30 p-1 rounded-full text-white transition-all cursor-pointer border border-white/30 shadow-xs"
          title={`Currently ${theme === "dark" ? "Dark Mode" : "Light Mode"}. Click to toggle.`}
        >
          <div
            className={cn(
              "p-1 rounded-full transition-all flex items-center justify-center",
              theme === "light" ? "bg-white text-[#E05263] shadow-xs" : "text-white/70 hover:text-white"
            )}
          >
            <Sun className="w-3.5 h-3.5" />
          </div>
          <div
            className={cn(
              "p-1 rounded-full transition-all flex items-center justify-center",
              theme === "dark" ? "bg-slate-800 text-amber-300 shadow-xs" : "text-white/70 hover:text-white"
            )}
          >
            <Moon className="w-3.5 h-3.5" />
          </div>
        </button> */}

        {/* Notifications Bell */}
        <button
          onClick={openNotificationPanel}
          className="relative p-1.5 rounded-full text-white/90 hover:bg-white/20 hover:text-white transition-colors cursor-pointer"
          title="Notifications"
        >
          <Bell className="w-4 h-4" />
          {unreadCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-white dark:bg-rose-500 text-[9px] font-black text-[#E05263] dark:text-white">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
        </button>

        {/* User Profile Menu */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center gap-1.5 p-0.5 rounded-full hover:ring-2 hover:ring-white/40 transition-all cursor-pointer"
          >
            <div className="w-7 h-7 rounded-full bg-white/20 text-white font-bold flex items-center justify-center text-xs border border-white/40">
              {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
            </div>
          </button>

          {profileOpen && (
            <div className="absolute right-0 top-full mt-1.5 w-56 rounded-xl bg-white dark:bg-slate-800 p-1.5 shadow-2xl border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 z-50 animate-in fade-in-50">
              <div className="px-3 py-2 border-b border-slate-100 dark:border-slate-700">
                <p className="text-xs font-semibold text-slate-900 dark:text-slate-100">{user?.name}</p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">{user?.email}</p>
                <Badge variant="primary" className="mt-1">
                  {user?.role}
                </Badge>
              </div>

              <div className="py-1">
                <Link
                  to="/profile"
                  onClick={() => setProfileOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700"
                >
                  <User className="w-4 h-4 text-slate-400" />
                  View Profile
                </Link>
                <Link
                  to="/profile/settings"
                  onClick={() => setProfileOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700"
                >
                  <Settings className="w-4 h-4 text-slate-400" />
                  Profile Settings
                </Link>
                <Link
                  to="/change-password"
                  onClick={() => setProfileOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700"
                >
                  <KeyRound className="w-4 h-4 text-slate-400" />
                  Change Password
                </Link>
              </div>

              <div className="pt-1 border-t border-slate-100 dark:border-slate-700">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-rose-600 dark:text-rose-400 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/40 cursor-pointer"
                >
                  <LogOut className="w-4 h-4 text-rose-500" />
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
