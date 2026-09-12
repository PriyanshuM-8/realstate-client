import React, { useEffect, useState } from "react";
import { Clock } from "lucide-react";
import { getHoldsApi } from "../services/holdApi";
import { Badge } from "../components/common/Badge";
import { Skeleton } from "../components/common/Skeleton";
import { formatDate } from "../utils/formatters";
import { toast } from "sonner";

export const HoldsPage = () => {
  const [holds, setHolds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHolds = async () => {
      try {
        const res = await getHoldsApi();
        setHolds(res.data || []);
      } catch (err) {
        toast.error(err.message || "Failed to load holds");
      } finally {
        setLoading(false);
      }
    };
    fetchHolds();
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-900">Unit Hold Management</h1>
        <p className="text-xs text-slate-500">Track active temporary holds on unit inventory</p>
      </div>

      {loading ? (
        <Skeleton className="h-64 w-full rounded-2xl" />
      ) : (
        <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 text-slate-700 font-semibold uppercase text-[10px] tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-3 px-3">Unit Number</th>
                <th className="py-3 px-3">Project</th>
                <th className="py-3 px-3">Customer</th>
                <th className="py-3 px-3">Hold Date</th>
                <th className="py-3 px-3">Expiry Date</th>
                <th className="py-3 px-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {holds.map((item) => (
                <tr key={item._id} className="hover:bg-slate-50">
                  <td className="py-3 px-3 font-bold text-indigo-600">{item.unitNumber}</td>
                  <td className="py-3 px-3 font-medium">{item.project?.name}</td>
                  <td className="py-3 px-3 font-semibold text-slate-900">{item.lead?.name} ({item.lead?.leadId})</td>
                  <td className="py-3 px-3 text-slate-500">{formatDate(item.holdDate)}</td>
                  <td className="py-3 px-3 font-medium text-orange-600">{formatDate(item.expiryDate)}</td>
                  <td className="py-3 px-3"><Badge variant="warning">{item.status}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
