import React, { useEffect, useState } from "react";
import { FileCheck } from "lucide-react";
import { getEOIsApi } from "../services/eoiApi";
import { Badge } from "../components/common/Badge";
import { Skeleton } from "../components/common/Skeleton";
import { formatCurrency, formatDate } from "../utils/formatters";
import { toast } from "sonner";

export const EoiPage = () => {
  const [eois, setEois] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEOIs = async () => {
      try {
        const res = await getEOIsApi();
        setEois(res.data || []);
      } catch (err) {
        toast.error(err.message || "Failed to load EOIs");
      } finally {
        setLoading(false);
      }
    };
    fetchEOIs();
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-900">Expression of Interest (EOI)</h1>
        <p className="text-xs text-slate-500">Track customer pre-booking token amounts</p>
      </div>

      {loading ? (
        <Skeleton className="h-64 w-full rounded-2xl" />
      ) : (
        <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 text-slate-700 font-semibold uppercase text-[10px] tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-3 px-3">Lead ID & Customer</th>
                <th className="py-3 px-3">Project</th>
                <th className="py-3 px-3">EOI Amount</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-3">Remarks</th>
                <th className="py-3 px-3">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {eois.map((item) => (
                <tr key={item._id} className="hover:bg-slate-50">
                  <td className="py-3 px-3 font-semibold text-slate-900">
                    {item.lead?.name} ({item.lead?.leadId})
                  </td>
                  <td className="py-3 px-3 font-medium">{item.project?.name}</td>
                  <td className="py-3 px-3 font-bold text-amber-600">{formatCurrency(item.amount)}</td>
                  <td className="py-3 px-3"><Badge variant="warning">{item.status}</Badge></td>
                  <td className="py-3 px-3 text-slate-500">{item.remarks || "-"}</td>
                  <td className="py-3 px-3 text-slate-500">{formatDate(item.date)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
