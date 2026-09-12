import React, { useEffect, useState } from "react";
import { Briefcase, Plus, Phone, Mail, Shield } from "lucide-react";
import { getChannelPartnersApi, createChannelPartnerApi } from "../services/channelPartnerApi";
import { Button } from "../components/common/Button";
import { Badge } from "../components/common/Badge";
import { Modal } from "../components/common/Modal";
import { Input } from "../components/common/Input";
import { Skeleton } from "../components/common/Skeleton";
import { toast } from "sonner";

export const ChannelPartnersPage = () => {
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [name, setName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [reraNumber, setReraNumber] = useState("");
  const [commissionPercentage, setCommissionPercentage] = useState(2.5);
  const [createLoading, setCreateLoading] = useState(false);

  const fetchPartners = async () => {
    setLoading(true);
    try {
      const res = await getChannelPartnersApi();
      setPartners(res.data || []);
    } catch (err) {
      toast.error(err.message || "Failed to load channel partners");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPartners();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    setCreateLoading(true);
    try {
      await createChannelPartnerApi({
        name,
        companyName,
        phone,
        email,
        reraNumber,
        commissionPercentage: Number(commissionPercentage)
      });
      toast.success("Channel Partner created!");
      setIsModalOpen(false);
      fetchPartners();
    } catch (err) {
      toast.error(err.message || "Failed to create partner");
    } finally {
      setCreateLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Channel Partners (RERA)</h1>
          <p className="text-xs text-slate-500">Manage real estate broker networks & commission rates</p>
        </div>

        <Button onClick={() => setIsModalOpen(true)} variant="primary" size="sm" icon={Plus}>
          Add Channel Partner
        </Button>
      </div>

      {loading ? (
        <Skeleton className="h-64 w-full rounded-2xl" />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {partners.map((p) => (
            <div key={p._id} className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider">{p.companyName}</span>
                  <h3 className="text-base font-bold text-slate-900 leading-tight mt-0.5">{p.name}</h3>
                </div>
                <Badge variant={p.status === "Active" ? "success" : "default"}>{p.status}</Badge>
              </div>

              <div className="space-y-1 text-xs text-slate-600">
                <p className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5 text-slate-400" /> {p.phone}</p>
                <p className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5 text-slate-400" /> {p.email}</p>
                <p className="flex items-center gap-1.5"><Shield className="w-3.5 h-3.5 text-slate-400" /> RERA: {p.reraNumber}</p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-400">Commission Rate</span>
                <span className="font-bold text-indigo-600">{p.commissionPercentage}%</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Register Channel Partner">
        <form onSubmit={handleCreate} className="space-y-4">
          <Input label="Contact Person Name *" value={name} onChange={(e) => setName(e.target.value)} required />
          <Input label="Company Name *" value={companyName} onChange={(e) => setCompanyName(e.target.value)} required />
          <div className="grid grid-cols-2 gap-3">
            <Input label="Phone *" value={phone} onChange={(e) => setPhone(e.target.value)} required />
            <Input label="Email *" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Input label="RERA Registration *" value={reraNumber} onChange={(e) => setReraNumber(e.target.value)} required />
            <Input label="Commission %" type="number" step="0.1" value={commissionPercentage} onChange={(e) => setCommissionPercentage(e.target.value)} />
          </div>

          <div className="pt-4 flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsModalOpen(false)} type="button">Cancel</Button>
            <Button variant="primary" type="submit" isLoading={createLoading}>Save Partner</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
