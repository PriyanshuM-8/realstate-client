import React, { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Plus, Download, Upload, UserPlus, LayoutList, Table as TableIcon } from "lucide-react";
import { useLeadStore } from "../../store/leadStore";
import { useProjectStore } from "../../store/projectStore";
import { useUserStore } from "../../store/userStore";
import { exportLeadsApi, deleteLeadApi } from "../../services/leadApi";
import { LeadStatusTabs } from "../../components/leads/LeadStatusTabs";
import { LeadFilterBar } from "../../components/leads/LeadFilterBar";
import { LeadTable } from "../../components/leads/LeadTable";
import { LeadCardRow } from "../../components/leads/LeadCardRow";
import { AssignLeadModal } from "../../components/leads/AssignLeadModal";
import { LeadStatusModal } from "../../components/leads/LeadStatusModal";
import { ImportLeadsModal } from "../../components/leads/ImportLeadsModal";
import { LeadFormModal } from "../../components/leads/LeadFormModal";
import { ScheduleSiteVisitModal } from "../../components/leads/ScheduleSiteVisitModal";
import { CreateBookingModal } from "../../components/leads/CreateBookingModal";
import { AddFollowUpModal } from "../../components/leads/AddFollowUpModal";

import { Button } from "../../components/common/Button";
import { Skeleton } from "../../components/common/Skeleton";
import { EmptyState } from "../../components/common/EmptyState";
import { toast } from "sonner";
import { cn } from "../../utils/helpers";

export const LeadsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const urlStatus = searchParams.get("status") || "";

  const {
    leads,
    stats,
    pagination,
    filters,
    loading,
    setFilters,
    resetFilters,
    setPage,
    setLimit,
    fetchLeads,
    fetchStats
  } = useLeadStore();

  const { projects, fetchProjects } = useProjectStore();
  const { users, fetchUsers } = useUserStore();

  const [selectedLeadIds, setSelectedLeadIds] = useState([]);
  const [modalType, setModalType] = useState(null);
  const [activeLead, setActiveLead] = useState(null);
  const [viewMode, setViewMode] = useState("cards"); // 'cards' (3-col rows like screenshot) or 'table'

  useEffect(() => {
    fetchProjects();
    fetchUsers();
    fetchStats();
  }, [fetchProjects, fetchUsers, fetchStats]);

  useEffect(() => {
    if (urlStatus !== filters.status) {
      setFilters({ status: urlStatus });
    } else {
      fetchLeads();
    }
  }, [urlStatus]);

  const handleSelectStatusTab = (statusKey) => {
    if (statusKey) {
      setSearchParams({ status: statusKey });
    } else {
      setSearchParams({});
    }
  };

  const handleSelectLead = (id, checked) => {
    if (checked) {
      setSelectedLeadIds([...selectedLeadIds, id]);
    } else {
      setSelectedLeadIds(selectedLeadIds.filter((item) => item !== id));
    }
  };

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedLeadIds(leads.map((l) => l._id));
    } else {
      setSelectedLeadIds([]);
    }
  };

  const handleDeleteLead = async (lead) => {
    if (!window.confirm(`Are you sure you want to delete lead ${lead.leadId} (${lead.name})?`)) return;
    try {
      await deleteLeadApi(lead._id);
      toast.success("Lead deleted successfully");
      fetchLeads();
      fetchStats();
    } catch (err) {
      toast.error(err.message || "Failed to delete lead");
    }
  };

  const handleExport = async () => {
    try {
      toast.info("Generating Excel export...");
      const blob = await exportLeadsApi(filters);
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `leads_export_${Date.now()}.xlsx`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      toast.error(err.message || "Failed to export leads");
    }
  };

  return (
    <div className="space-y-4">
      {/* Top Title & Page Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-baseline gap-3">
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Sellers / Leads</h1>
          <span className="text-xs font-semibold text-slate-400">Total: {pagination.total} records</span>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {/* View Mode Toggle Switch */}
          <div className="flex items-center bg-slate-200 p-0.5 rounded-lg border border-slate-300 mr-2">
            <button
              onClick={() => setViewMode("cards")}
              className={cn(
                "p-1 rounded-md text-xs font-medium flex items-center gap-1 transition-all",
                viewMode === "cards" ? "bg-white text-slate-900 shadow-2xs font-bold" : "text-slate-600 hover:text-slate-900"
              )}
              title="3-Column Cards Layout"
            >
              <LayoutList className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("table")}
              className={cn(
                "p-1 rounded-md text-xs font-medium flex items-center gap-1 transition-all",
                viewMode === "table" ? "bg-white text-slate-900 shadow-2xs font-bold" : "text-slate-600 hover:text-slate-900"
              )}
              title="Compact Table Layout"
            >
              <TableIcon className="w-4 h-4" />
            </button>
          </div>

          {selectedLeadIds.length > 0 && (
            <Button
              onClick={() => {
                setActiveLead(null);
                setModalType("assign");
              }}
              variant="secondary"
              size="sm"
              icon={UserPlus}
            >
              Bulk Assign ({selectedLeadIds.length})
            </Button>
          )}

          <Button onClick={() => setModalType("import")} variant="outline" size="sm" icon={Upload}>
            Import
          </Button>

          <Button onClick={handleExport} variant="outline" size="sm" icon={Download}>
            Export
          </Button>

          <Button
            onClick={() => {
              setActiveLead(null);
              setModalType("create");
            }}
            variant="primary"
            size="sm"
            icon={Plus}
          >
            Add Lead
          </Button>
        </div>
      </div>

      {/* Status Pills Bar matching exact Reference Screenshot */}
      <LeadStatusTabs
        activeStatus={filters.status}
        onSelectStatus={handleSelectStatusTab}
        stats={stats}
      />

      {/* Control Filter Bar */}
      <LeadFilterBar
        filters={filters}
        onFilterChange={setFilters}
        onReset={resetFilters}
        projects={projects}
        users={users}
      />

      {/* Data View: 3-Column Card Rows or Table */}
      {loading ? (
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-28 w-full rounded-2xl" />
          ))}
        </div>
      ) : leads.length === 0 ? (
        <EmptyState
          title="No records found"
          description="Try adjusting your status tab or filters."
          actionLabel="Add New Lead"
          onAction={() => {
            setActiveLead(null);
            setModalType("create");
          }}
        />
      ) : (
        <>
          {viewMode === "cards" ? (
            <div className="space-y-3">
              {leads.map((l) => (
                <LeadCardRow
                  key={l._id}
                  lead={l}
                  onAssign={(lead) => {
                    setActiveLead(lead);
                    setModalType("assign");
                  }}
                  onChangeStatus={(lead) => {
                    setActiveLead(lead);
                    setModalType("status");
                  }}
                  onScheduleSiteVisit={(lead) => {
                    setActiveLead(lead);
                    setModalType("siteVisit");
                  }}
                  onCreateBooking={(lead) => {
                    setActiveLead(lead);
                    setModalType("booking");
                  }}
                  onAddFollowUp={(lead) => {
                    setActiveLead(lead);
                    setModalType("followup");
                  }}
                />
              ))}
            </div>
          ) : (
            <LeadTable
              leads={leads}
              selectedLeadIds={selectedLeadIds}
              onSelectLead={handleSelectLead}
              onSelectAll={handleSelectAll}
              onAssign={(l) => {
                setActiveLead(l);
                setModalType("assign");
              }}
              onChangeStatus={(l) => {
                setActiveLead(l);
                setModalType("status");
              }}
              onScheduleSiteVisit={(l) => {
                setActiveLead(l);
                setModalType("siteVisit");
              }}
              onCreateBooking={(l) => {
                setActiveLead(l);
                setModalType("booking");
              }}
              onAddFollowUp={(l) => {
                setActiveLead(l);
                setModalType("followup");
              }}
              onDelete={handleDeleteLead}
            />
          )}

          {/* Pagination Toolbar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs text-xs">
            <div className="text-slate-500">
              Showing <span className="font-semibold text-slate-900">{(pagination.page - 1) * pagination.limit + 1}</span> to{" "}
              <span className="font-semibold text-slate-900">
                {Math.min(pagination.page * pagination.limit, pagination.total)}
              </span>{" "}
              of <span className="font-semibold text-slate-900">{pagination.total}</span> records
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-slate-500">Rows per page:</span>
                <select
                  value={pagination.limit}
                  onChange={(e) => setLimit(Number(e.target.value))}
                  className="rounded-lg border border-slate-300 py-1 px-2 text-xs focus:outline-none"
                >
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={50}>50</option>
                </select>
              </div>

              <div className="flex items-center gap-1">
                <Button
                  onClick={() => setPage(pagination.page - 1)}
                  disabled={pagination.page <= 1}
                  variant="outline"
                  size="sm"
                >
                  &lt;&lt;
                </Button>
                <Button
                  onClick={() => setPage(pagination.page - 1)}
                  disabled={pagination.page <= 1}
                  variant="outline"
                  size="sm"
                >
                  &lt;
                </Button>
                <span className="px-3 py-1 font-bold text-slate-900 bg-indigo-50 border border-indigo-200 rounded-lg">
                  Page {pagination.page} / {pagination.totalPages}
                </span>
                <Button
                  onClick={() => setPage(pagination.page + 1)}
                  disabled={pagination.page >= pagination.totalPages}
                  variant="outline"
                  size="sm"
                >
                  &gt;
                </Button>
                <Button
                  onClick={() => setPage(pagination.totalPages)}
                  disabled={pagination.page >= pagination.totalPages}
                  variant="outline"
                  size="sm"
                >
                  &gt;&gt;
                </Button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Dynamic Action Modals */}
      {(modalType === "create" || modalType === "edit") && (
        <LeadFormModal
          isOpen={true}
          onClose={() => setModalType(null)}
          lead={activeLead}
          projects={projects}
          users={users}
          onSuccess={() => {
            fetchLeads();
            fetchStats();
          }}
        />
      )}

      {modalType === "assign" && (
        <AssignLeadModal
          isOpen={true}
          onClose={() => {
            setModalType(null);
            setSelectedLeadIds([]);
          }}
          lead={activeLead}
          bulkLeadIds={selectedLeadIds}
          users={users}
          onSuccess={() => {
            fetchLeads();
            setSelectedLeadIds([]);
          }}
        />
      )}

      {modalType === "status" && (
        <LeadStatusModal
          isOpen={true}
          onClose={() => setModalType(null)}
          lead={activeLead}
          onSuccess={() => {
            fetchLeads();
            fetchStats();
          }}
        />
      )}

      {modalType === "import" && (
        <ImportLeadsModal
          isOpen={true}
          onClose={() => setModalType(null)}
          onSuccess={() => {
            fetchLeads();
            fetchStats();
          }}
        />
      )}

      {modalType === "siteVisit" && (
        <ScheduleSiteVisitModal
          isOpen={true}
          onClose={() => setModalType(null)}
          lead={activeLead}
          projects={projects}
          users={users}
          onSuccess={fetchLeads}
        />
      )}

      {modalType === "booking" && (
        <CreateBookingModal
          isOpen={true}
          onClose={() => setModalType(null)}
          lead={activeLead}
          projects={projects}
          users={users}
          onSuccess={() => {
            fetchLeads();
            fetchStats();
          }}
        />
      )}

      {modalType === "followup" && (
        <AddFollowUpModal
          isOpen={true}
          onClose={() => setModalType(null)}
          lead={activeLead}
          users={users}
          onSuccess={fetchLeads}
        />
      )}
    </div>
  );
};
