import React, { useState } from "react";
import { BarChart3, Download, FileSpreadsheet } from "lucide-react";
import { Button } from "../components/common/Button";
import { Select } from "../components/common/Select";
import { exportLeadsApi } from "../services/leadApi";
import { toast } from "sonner";

export const ReportsPage = () => {
  const [reportType, setReportType] = useState("leads");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleExport = async () => {
    setLoading(true);
    try {
      toast.info("Generating report Excel file...");
      const blob = await exportLeadsApi({ status });
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `report_${reportType}_${Date.now()}.xlsx`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      toast.error(err.message || "Failed to export report");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-900">CRM Reports & Analytics Export</h1>
        <p className="text-xs text-slate-500">Generate and export comprehensive sales reports to Excel / CSV</p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs max-w-2xl space-y-6">
        <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
          <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
            <BarChart3 className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">Report Generator</h3>
            <p className="text-xs text-slate-500">Select parameters to download analytical reports</p>
          </div>
        </div>

        <div className="space-y-4">
          <Select label="Select Report Type" value={reportType} onChange={(e) => setReportType(e.target.value)}>
            <option value="leads">Master Lead Report</option>
            <option value="sales">Sales Performance Report</option>
            <option value="bookings">Bookings & Revenue Report</option>
            <option value="site_visits">Site Visits Report</option>
          </Select>

          <Select label="Filter Lead Status" value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="">All Statuses</option>
            <option value="Initial">Initial</option>
            <option value="Verified">Verified</option>
            <option value="Site Visit Scheduled">Site Visit Scheduled</option>
            <option value="Site Visit Done">Site Visit Done</option>
            <option value="Booked">Booked</option>
            <option value="EOI">EOI</option>
            <option value="Hold">Hold</option>
          </Select>

          <div className="pt-4">
            <Button onClick={handleExport} variant="primary" className="w-full" isLoading={loading} icon={Download}>
              Download Excel Report (.xlsx)
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
