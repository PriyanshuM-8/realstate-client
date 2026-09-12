import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";
import { RoleRoute } from "./RoleRoute";
import { MainLayout } from "../components/layout/MainLayout";

// Auth Pages
import { LoginPage } from "../pages/auth/LoginPage";
import { ForgotPasswordPage } from "../pages/auth/ForgotPasswordPage";
import { ResetPasswordPage } from "../pages/auth/ResetPasswordPage";
import { ProfilePage } from "../pages/auth/ProfilePage";
import { ChangePasswordPage } from "../pages/auth/ChangePasswordPage";
import { ProfileSettingsPage } from "../pages/profile/ProfileSettingsPage";

// Main Pages
import { DashboardPage } from "../pages/DashboardPage";
import { LeadsPage } from "../pages/leads/LeadsPage";
import { LeadDetailPage } from "../pages/leads/LeadDetailPage";
import { FollowUpsPage } from "../pages/FollowUpsPage";
import { SiteVisitsPage } from "../pages/SiteVisitsPage";
import { ProjectsPage } from "../pages/projects/ProjectsPage";
import { ProjectDetailPage } from "../pages/projects/ProjectDetailPage";
import { BookingsPage } from "../pages/BookingsPage";
import { EoiPage } from "../pages/EoiPage";
import { HoldsPage } from "../pages/HoldsPage";
import { ChannelPartnersPage } from "../pages/ChannelPartnersPage";
import { LeadSourcesPage } from "../pages/LeadSourcesPage";
import { UsersPage } from "../pages/UsersPage";
import { ReportsPage } from "../pages/ReportsPage";
import { NotificationsPage } from "../pages/NotificationsPage";
import { AuditLogsPage } from "../pages/AuditLogsPage";

// HR Sub-Module Pages
import { LeavePage } from "../pages/hr/LeavePage";
import { AttendancePage } from "../pages/hr/AttendancePage";
import { CandidatesPage } from "../pages/hr/CandidatesPage";

// Admin Sub-Module Pages
import { AssetsPage } from "../pages/admin/AssetsPage";
import { AllotmentPage } from "../pages/admin/AllotmentPage";
import { OfficePage } from "../pages/admin/OfficePage";

// Marketing Sub-Module Pages
import { CampaignsPage } from "../pages/marketing/CampaignsPage";
import { SpendsPage } from "../pages/marketing/SpendsPage";

// Sales Sub-Module Pages
import { SalesHistoryPage } from "../pages/sales/SalesHistoryPage";
import { IncentivesPage } from "../pages/sales/IncentivesPage";
import { SalesCrmOverviewPage } from "../pages/sales/SalesCrmOverviewPage";
import { ReimbursementPage } from "../pages/sales/ReimbursementPage";

// Digital Sub-Module Pages
import { CalendarPage } from "../pages/digital/CalendarPage";
import { TasksPage } from "../pages/digital/TasksPage";
import { DigitalSpendsPage } from "../pages/digital/DigitalSpendsPage";

export const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Auth Routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />

      {/* Protected CRM Routes inside MainLayout */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="leads" element={<LeadsPage />} />
        <Route path="leads/:id" element={<LeadDetailPage />} />
        <Route path="follow-ups" element={<FollowUpsPage />} />
        <Route path="site-visits" element={<SiteVisitsPage />} />
        <Route path="projects" element={<ProjectsPage />} />
        <Route path="projects/:id" element={<ProjectDetailPage />} />
        <Route path="bookings" element={<BookingsPage />} />
        <Route path="eoi" element={<EoiPage />} />
        <Route path="holds" element={<HoldsPage />} />

        {/* HR Sub-Module Routes */}
        <Route path="hr/leave" element={<LeavePage />} />
        <Route path="hr/attendance" element={<AttendancePage />} />
        <Route path="hr/candidates" element={<CandidatesPage />} />

        {/* Admin Sub-Module Routes */}
        <Route path="admin/assets" element={<AssetsPage />} />
        <Route path="admin/allotment" element={<AllotmentPage />} />
        <Route path="admin/office" element={<OfficePage />} />

        {/* Marketing Sub-Module Routes */}
        <Route path="marketing/campaigns" element={<CampaignsPage />} />
        <Route path="marketing/spends" element={<SpendsPage />} />

        {/* Sales Sub-Module Routes */}
        <Route path="sales/history" element={<SalesHistoryPage />} />
        <Route path="sales/incentives" element={<IncentivesPage />} />
        <Route path="sales/crm" element={<SalesCrmOverviewPage />} />
        <Route path="sales/reimbursement" element={<ReimbursementPage />} />

        {/* Digital Sub-Module Routes */}
        <Route path="digital/calendar" element={<CalendarPage />} />
        <Route path="digital/tasks" element={<TasksPage />} />
        <Route path="digital/spends" element={<DigitalSpendsPage />} />

        {/* Role Restricted Routes */}
        <Route
          path="channel-partners"
          element={
            <RoleRoute allowedRoles={["Super Admin", "Admin", "Sales Manager"]}>
              <ChannelPartnersPage />
            </RoleRoute>
          }
        />
        <Route
          path="lead-sources"
          element={
            <RoleRoute allowedRoles={["Super Admin", "Admin", "Marketing"]}>
              <LeadSourcesPage />
            </RoleRoute>
          }
        />
        <Route
          path="users"
          element={
            <RoleRoute allowedRoles={["Super Admin", "Admin", "HR"]}>
              <UsersPage />
            </RoleRoute>
          }
        />
        <Route
          path="reports"
          element={
            <RoleRoute allowedRoles={["Super Admin", "Admin", "Sales Manager"]}>
              <ReportsPage />
            </RoleRoute>
          }
        />
        <Route path="notifications" element={<NotificationsPage />} />
        <Route
          path="audit-logs"
          element={
            <RoleRoute allowedRoles={["Super Admin", "Admin"]}>
              <AuditLogsPage />
            </RoleRoute>
          }
        />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="profile/settings" element={<ProfileSettingsPage />} />
        <Route path="change-password" element={<ChangePasswordPage />} />
      </Route>

      {/* Catch-all Fallback */}
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
};
