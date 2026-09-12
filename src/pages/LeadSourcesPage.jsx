import React, { useEffect, useState } from "react";
import { Share2, Plus } from "lucide-react";
import { getLeadSourcesApi, createLeadSourceApi } from "../services/leadSourceApi";
import { Button } from "../components/common/Button";
import { Badge } from "../components/common/Badge";
import { Modal } from "../components/common/Modal";
import { Input } from "../components/common/Input";
import { Skeleton } from "../components/common/Skeleton";
import { toast } from "sonner";

export const LeadSourcesPage = () => {
  const [sources, setSources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [createLoading, setCreateLoading] = useState(false);

  const fetchSources = async () => {
    setLoading(true);
    try {
      const res = await getLeadSourcesApi();
      setSources(res.data || []);
    } catch (err) {
      toast.error(err.message || "Failed to load lead sources");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSources();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    setCreateLoading(true);
    try {
      await createLeadSourceApi({ name, subSources: ["Organic", "Paid Ads"] });
      toast.success("Lead Source created!");
      setIsModalOpen(false);
      setName("");
      fetchSources();
    } catch (err) {
      toast.error(err.message || "Failed to create source");
    } finally {
      setCreateLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Lead Sources & Sub-sources</h1>
          <p className="text-xs text-slate-500">Configure acquisition channels (Website, FB, Google, 99acres, etc.)</p>
        </div>

        <Button onClick={() => setIsModalOpen(true)} variant="primary" size="sm" icon={Plus}>
          Add Source
        </Button>
      </div>

      {loading ? (
        <Skeleton className="h-64 w-full rounded-2xl" />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sources.map((s) => (
            <div key={s._id} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-slate-900">{s.name}</h3>
                <Badge variant={s.isActive ? "success" : "default"}>{s.isActive ? "Active" : "Inactive"}</Badge>
              </div>

              <div>
                <span className="text-[10px] text-slate-400 block uppercase mb-1">Sub Sources</span>
                <div className="flex flex-wrap gap-1.5">
                  {s.subSources?.map((sub, i) => (
                    <Badge key={i} variant="primary">{sub}</Badge>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Create Lead Source">
        <form onSubmit={handleCreate} className="space-y-4">
          <Input label="Source Name *" value={name} onChange={(e) => setName(e.target.value)} required placeholder="PropertyPortal.com" />
          <div className="pt-4 flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsModalOpen(false)} type="button">Cancel</Button>
            <Button variant="primary" type="submit" isLoading={createLoading}>Save Source</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
