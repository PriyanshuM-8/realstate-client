import React, { useState } from "react";
import { Modal } from "../common/Modal";
import { Button } from "../common/Button";
import { Upload, FileSpreadsheet, AlertTriangle, CheckCircle } from "lucide-react";
import { importLeadsApi } from "../../services/leadApi";
import { toast } from "sonner";

export const ImportLeadsModal = ({ isOpen, onClose, onSuccess }) => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      toast.error("Please select an Excel (.xlsx) or CSV file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);
    try {
      const res = await importLeadsApi(formData);
      setResult(res.data);
      toast.success(res.message || "Import completed!");
      onSuccess();
    } catch (err) {
      toast.error(err.message || "Failed to import file");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Import Leads via Excel / CSV" maxWidth="max-w-xl">
      {!result ? (
        <form onSubmit={handleUpload} className="space-y-4">
          <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center hover:border-indigo-400 transition-colors bg-slate-50">
            <FileSpreadsheet className="w-10 h-10 text-indigo-500 mx-auto mb-2" />
            <p className="text-sm font-semibold text-slate-800">
              {file ? file.name : "Click to select or drag Excel/CSV file"}
            </p>
            <p className="text-xs text-slate-400 mt-1">Supports .xlsx, .xls, .csv up to 10MB</p>

            <input
              type="file"
              accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
              onChange={handleFileChange}
              className="mt-4 block w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
            />
          </div>

          <div className="p-3 bg-indigo-50 rounded-lg text-xs text-indigo-900 border border-indigo-100">
            <p className="font-semibold mb-1">Expected Excel Columns:</p>
            <p className="font-mono text-[11px]">name, phone, email, source, location, budgetMin, budgetMax, status</p>
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <Button variant="outline" onClick={onClose} type="button">
              Cancel
            </Button>
            <Button variant="primary" type="submit" isLoading={loading} icon={Upload}>
              Upload & Process Leads
            </Button>
          </div>
        </form>
      ) : (
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-200">
              <CheckCircle className="w-5 h-5 text-emerald-600 mx-auto mb-1" />
              <span className="text-lg font-bold text-emerald-900">{result.successCount}</span>
              <p className="text-[10px] text-emerald-700 uppercase font-bold">Imported</p>
            </div>
            <div className="p-3 bg-amber-50 rounded-lg border border-amber-200">
              <AlertTriangle className="w-5 h-5 text-amber-600 mx-auto mb-1" />
              <span className="text-lg font-bold text-amber-900">{result.duplicateCount}</span>
              <p className="text-[10px] text-amber-700 uppercase font-bold">Duplicates</p>
            </div>
            <div className="p-3 bg-red-50 rounded-lg border border-red-200">
              <AlertTriangle className="w-5 h-5 text-red-600 mx-auto mb-1" />
              <span className="text-lg font-bold text-red-900">{result.errorCount}</span>
              <p className="text-[10px] text-red-700 uppercase font-bold">Failed</p>
            </div>
          </div>

          {result.duplicates?.length > 0 && (
            <div className="max-h-40 overflow-y-auto p-3 bg-slate-50 rounded-lg text-xs space-y-1">
              <p className="font-bold text-slate-700">Duplicate Records (Skipped):</p>
              {result.duplicates.map((d, i) => (
                <p key={i} className="text-slate-500">
                  Row {d.row}: {d.name} ({d.phone}) - Matches existing Lead {d.leadId}
                </p>
              ))}
            </div>
          )}

          <div className="pt-4 flex justify-end">
            <Button variant="primary" onClick={() => setResult(null)}>
              Done
            </Button>
          </div>
        </div>
      )}
    </Modal>
  );
};
