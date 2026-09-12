import React, { useEffect, useState } from "react";
import { ShieldAlert } from "lucide-react";
import { getAuditLogsApi } from "../services/auditLogApi";
import { Skeleton } from "../components/common/Skeleton";
import { formatDateTime } from "../utils/formatters";
import { toast } from "sonner";

export const AuditLogsPage = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const res = await getAuditLogsApi();
        setLogs(res.data || []);
      } catch (err) {
        toast.error(err.message || "Failed to load audit logs");
      } finally {
        setLoading(false);
      }
    };
    fetchLogs();
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-900">System Audit Logs</h1>
        <p className="text-xs text-slate-500">Security audit trail of sensitive mutations, user creation & lead operations</p>
      </div>

      {loading ? (
        <Skeleton className="h-64 w-full rounded-2xl" />
      ) : (
        <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-600">
              <thead className="bg-slate-50 text-slate-700 font-semibold uppercase text-[10px] tracking-wider border-b border-slate-200">
                <tr>
                  <th className="py-3 px-3">User</th>
                  <th className="py-3 px-3">Action</th>
                  <th className="py-3 px-3">Module</th>
                  <th className="py-3 px-3">IP Address</th>
                  <th className="py-3 px-3">Timestamp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {logs.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-4 text-center text-slate-400">
                      No audit logs recorded yet.
                    </td>
                  </tr>
                ) : (
                  logs.map((item) => (
                    <tr key={item._id} className="hover:bg-slate-50">
                      <td className="py-3 px-3 font-semibold text-slate-900">
                        {item.user?.name || "System"}
                        <span className="block text-[10px] text-slate-400 font-normal">{item.user?.email}</span>
                      </td>
                      <td className="py-3 px-3 font-bold text-indigo-600">{item.action}</td>
                      <td className="py-3 px-3 font-medium text-slate-800">{item.module}</td>
                      <td className="py-3 px-3 font-mono text-[11px] text-slate-500">{item.ipAddress || "127.0.0.1"}</td>
                      <td className="py-3 px-3 text-slate-500">{formatDateTime(item.timestamp)}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
