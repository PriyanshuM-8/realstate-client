import React, { useEffect, useState } from "react";
import { BookmarkCheck, TrendingUp, CheckCircle } from "lucide-react";
import { getBookingsApi } from "../services/bookingApi";
import { Badge } from "../components/common/Badge";
import { StatCard } from "../components/common/StatCard";
import { Skeleton } from "../components/common/Skeleton";
import { formatCurrency, formatDate } from "../utils/formatters";
import { toast } from "sonner";

export const BookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await getBookingsApi();
        setBookings(res.data || []);
      } catch (err) {
        toast.error(err.message || "Failed to load bookings");
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  const totalRevenue = bookings.reduce((acc, b) => acc + (b.totalAmount || 0), 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-900">Unit Bookings Dashboard</h1>
        <p className="text-xs text-slate-500">Track confirmed customer property bookings & payment status</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard title="Total Bookings" value={bookings.length} icon={BookmarkCheck} color="emerald" />
        <StatCard title="Total Booking Value" value={formatCurrency(totalRevenue)} icon={TrendingUp} color="indigo" />
        <StatCard title="Confirmed Payments" value={bookings.filter((b) => b.paymentStatus === "Paid").length} icon={CheckCircle} color="purple" />
      </div>

      {loading ? (
        <Skeleton className="h-64 w-full rounded-2xl" />
      ) : (
        <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-600">
              <thead className="bg-slate-50 text-slate-700 font-semibold uppercase text-[10px] tracking-wider border-b border-slate-200">
                <tr>
                  <th className="py-3 px-3">Customer</th>
                  <th className="py-3 px-3">Project & Unit</th>
                  <th className="py-3 px-3">Booking Amount</th>
                  <th className="py-3 px-3">Total Amount</th>
                  <th className="py-3 px-3">Payment Status</th>
                  <th className="py-3 px-3">Executive</th>
                  <th className="py-3 px-3">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {bookings.map((item) => (
                  <tr key={item._id} className="hover:bg-slate-50">
                    <td className="py-3 px-3 font-semibold text-slate-900">
                      {item.customer?.name}
                      <span className="block text-[10px] text-slate-400 font-normal">{item.customer?.phone}</span>
                    </td>
                    <td className="py-3 px-3">
                      <div className="font-semibold text-indigo-600">{item.unitNumber}</div>
                      <div className="text-[10px] text-slate-500">{item.project?.name}</div>
                    </td>
                    <td className="py-3 px-3 font-bold text-emerald-700">{formatCurrency(item.bookingAmount)}</td>
                    <td className="py-3 px-3 font-semibold text-slate-900">{formatCurrency(item.totalAmount)}</td>
                    <td className="py-3 px-3">
                      <Badge variant={item.paymentStatus === "Paid" ? "success" : "warning"}>{item.paymentStatus}</Badge>
                    </td>
                    <td className="py-3 px-3 font-medium text-slate-800">{item.salesExecutive?.name}</td>
                    <td className="py-3 px-3 text-slate-500">{formatDate(item.bookingDate)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
