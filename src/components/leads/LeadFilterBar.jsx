import React from "react";
import { Filter, RotateCcw } from "lucide-react";
import { SearchInput } from "../common/SearchInput";
import { Select } from "../common/Select";
import { Button } from "../common/Button";

export const LeadFilterBar = ({
  filters,
  onFilterChange,
  onReset,
  projects = [],
  users = []
}) => {
  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-xs space-y-3">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {/* Search */}
        <SearchInput
          value={filters.search || ""}
          onChange={(val) => onFilterChange({ search: val })}
          onClear={() => onFilterChange({ search: "" })}
          placeholder="Search Name, Phone, Email, Lead ID..."
          className="lg:col-span-2"
        />

        {/* Project Filter */}
        <Select
          value={filters.project || ""}
          onChange={(e) => onFilterChange({ project: e.target.value })}
        >
          <option value="">All Projects</option>
          {projects.map((p) => (
            <option key={p._id} value={p._id}>
              {p.name}
            </option>
          ))}
        </Select>

        {/* Assigned Executive Filter */}
        <Select
          value={filters.assignedTo || ""}
          onChange={(e) => onFilterChange({ assignedTo: e.target.value })}
        >
          <option value="">All Executives</option>
          {users.map((u) => (
            <option key={u._id} value={u._id}>
              {u.name} ({u.role})
            </option>
          ))}
        </Select>

        {/* Source Filter */}
        <Select
          value={filters.source || ""}
          onChange={(e) => onFilterChange({ source: e.target.value })}
        >
          <option value="">All Sources</option>
          <option value="Website">Website</option>
          <option value="Facebook">Facebook</option>
          <option value="Google">Google</option>
          <option value="Instagram">Instagram</option>
          <option value="WhatsApp">WhatsApp</option>
          <option value="99acres">99acres</option>
          <option value="MagicBricks">MagicBricks</option>
          <option value="Channel Partner">Channel Partner</option>
          <option value="Referral">Referral</option>
          <option value="Walk-in">Walk-in</option>
        </Select>
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
        <div className="flex items-center gap-2">
          <Select
            value={filters.priority || ""}
            onChange={(e) => onFilterChange({ priority: e.target.value })}
            className="w-32 py-1 text-xs"
          >
            <option value="">All Priorities</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </Select>
        </div>

        <Button
          onClick={onReset}
          variant="ghost"
          size="sm"
          icon={RotateCcw}
          className="text-xs text-slate-500 hover:text-slate-900"
        >
          Reset Filters
        </Button>
      </div>
    </div>
  );
};
