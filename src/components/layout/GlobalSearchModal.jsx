import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, X, Users, Building2, Briefcase, UserCheck } from "lucide-react";
import { globalSearchApi } from "../../services/searchApi";
import { StatusBadge } from "../common/StatusBadge";
import { cn } from "../../utils/helpers";

export const GlobalSearchModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query.trim()) {
      setResults(null);
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await globalSearchApi(query);
        setResults(res.data);
      } catch (err) {
        console.error("Search failed:", err);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-full items-start justify-center p-4 pt-16 text-center sm:p-0">
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity" onClick={onClose} />

        <div className="relative transform overflow-hidden rounded-2xl bg-white text-left shadow-2xl transition-all sm:my-8 w-full max-w-2xl border border-slate-100 z-10">
          {/* Search Box Header */}
          <div className="relative flex items-center border-b border-slate-100 px-4 py-3 bg-white">
            <Search className="w-5 h-5 text-slate-400 mr-3 shrink-0" />
            <input
              type="text"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search leads by name, phone, email, Lead ID, projects..."
              className="w-full text-sm text-slate-900 placeholder-slate-400 focus:outline-none bg-transparent"
            />
            {query && (
              <button onClick={() => setQuery("")} className="p-1 text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Results Area */}
          <div className="max-h-[60vh] overflow-y-auto p-4 space-y-6">
            {loading && <p className="text-xs text-slate-400 text-center py-6">Searching CRM database...</p>}

            {!loading && results && (
              <>
                {/* Leads */}
                {results.leads?.length > 0 && (
                  <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5" /> Leads ({results.leads.length})
                    </h4>
                    <div className="space-y-1.5">
                      {results.leads.map((lead) => (
                        <div
                          key={lead._id}
                          onClick={() => {
                            navigate(`/leads/${lead._id}`);
                            onClose();
                          }}
                          className="flex items-center justify-between p-2.5 rounded-lg hover:bg-slate-50 border border-transparent hover:border-slate-200 cursor-pointer transition-colors"
                        >
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-bold text-indigo-600">{lead.leadId}</span>
                              <span className="text-sm font-semibold text-slate-900">{lead.name}</span>
                            </div>
                            <p className="text-xs text-slate-500">{lead.phone} • {lead.email || "No email"}</p>
                          </div>
                          <StatusBadge status={lead.leadStatus} />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Projects */}
                {results.projects?.length > 0 && (
                  <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5" /> Projects ({results.projects.length})
                    </h4>
                    <div className="space-y-1.5">
                      {results.projects.map((project) => (
                        <div
                          key={project._id}
                          onClick={() => {
                            navigate(`/projects/${project._id}`);
                            onClose();
                          }}
                          className="flex items-center justify-between p-2.5 rounded-lg hover:bg-slate-50 border border-transparent hover:border-slate-200 cursor-pointer transition-colors"
                        >
                          <div>
                            <span className="text-sm font-semibold text-slate-900">{project.name}</span>
                            <p className="text-xs text-slate-500">{project.builder} • {project.location}, {project.city}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Users */}
                {results.users?.length > 0 && (
                  <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <UserCheck className="w-3.5 h-3.5" /> Team Members ({results.users.length})
                    </h4>
                    <div className="space-y-1.5">
                      {results.users.map((user) => (
                        <div
                          key={user._id}
                          className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50/50"
                        >
                          <div>
                            <span className="text-sm font-semibold text-slate-900">{user.name}</span>
                            <p className="text-xs text-slate-500">{user.email} • {user.role}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {!results.leads?.length && !results.projects?.length && !results.users?.length && (
                  <p className="text-xs text-slate-400 text-center py-6">No matching CRM records found for "{query}"</p>
                )}
              </>
            )}

            {!query && (
              <div className="text-center py-8 text-slate-400 text-xs">
                Type a name, phone number, email address, or Lead ID to search.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
