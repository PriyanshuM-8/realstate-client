import React, { useState, useEffect } from "react";
import { Modal } from "../common/Modal";
import { Input } from "../common/Input";
import { Select } from "../common/Select";
import { Textarea } from "../common/Textarea";
import { Button } from "../common/Button";
import { AlertTriangle, User, Phone, Mail, MapPin } from "lucide-react";
import { createLeadApi, updateLeadApi, checkDuplicateLeadApi } from "../../services/leadApi";
import { toast } from "sonner";

export const LeadFormModal = ({
  isOpen,
  onClose,
  lead = null,
  projects = [],
  users = [],
  onSuccess
}) => {
  const isEdit = !!lead;

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [alternatePhone, setAlternatePhone] = useState("");
  const [project, setProject] = useState("");
  const [propertyType, setPropertyType] = useState("Residential Apartment");
  const [configuration, setConfiguration] = useState("2 BHK");
  const [budgetMin, setBudgetMin] = useState(5000000);
  const [budgetMax, setBudgetMax] = useState(15000000);
  const [location, setLocation] = useState("");
  const [preferredLocation, setPreferredLocation] = useState("");
  const [area, setArea] = useState(1200);
  const [source, setSource] = useState("Website");
  const [priority, setPriority] = useState("Medium");
  const [assignedTo, setAssignedTo] = useState("");
  const [coAssignedTo, setCoAssignedTo] = useState("");
  const [notes, setNotes] = useState("");

  // Duplicate Check Warning state
  const [duplicateWarning, setDuplicateWarning] = useState(null);
  const [forceCreate, setForceCreate] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (lead) {
      setName(lead.name || "");
      setPhone(lead.phone || "");
      setEmail(lead.email || "");
      setAlternatePhone(lead.alternatePhone || "");
      setProject(lead.project?._id || lead.project || "");
      setPropertyType(lead.propertyType || "Residential Apartment");
      setConfiguration(lead.configuration || "2 BHK");
      setBudgetMin(lead.budgetMin || 0);
      setBudgetMax(lead.budgetMax || 0);
      setLocation(lead.location || "");
      setPreferredLocation(lead.preferredLocation || "");
      setArea(lead.area || 0);
      setSource(lead.source || "Website");
      setPriority(lead.priority || "Medium");
      setAssignedTo(lead.assignedTo?._id || lead.assignedTo || "");
      setCoAssignedTo(lead.coAssignedTo?._id || lead.coAssignedTo || "");
      setNotes(lead.notes || "");
    } else {
      resetForm();
    }
  }, [lead, isOpen]);

  const resetForm = () => {
    setName("");
    setPhone("");
    setEmail("");
    setAlternatePhone("");
    setProject("");
    setPropertyType("Residential Apartment");
    setConfiguration("2 BHK");
    setBudgetMin(5000000);
    setBudgetMax(15000000);
    setLocation("");
    setPreferredLocation("");
    setArea(1200);
    setSource("Website");
    setPriority("Medium");
    setAssignedTo("");
    setCoAssignedTo("");
    setNotes("");
    setDuplicateWarning(null);
    setForceCreate(false);
  };

  // Real-time backend duplicate check when phone or email changes
  const handleBlurDuplicateCheck = async () => {
    if (isEdit || (!phone && !email)) return;
    try {
      const res = await checkDuplicateLeadApi({ phone, email });
      if (res.isDuplicate) {
        setDuplicateWarning(res.duplicateLead);
      } else {
        setDuplicateWarning(null);
      }
    } catch (e) {
      // Ignore
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !phone) {
      toast.error("Name and Phone number are required");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        name,
        phone,
        email,
        alternatePhone,
        project: project || null,
        propertyType,
        configuration,
        budgetMin: Number(budgetMin),
        budgetMax: Number(budgetMax),
        location,
        preferredLocation: preferredLocation || location,
        area: Number(area),
        source,
        priority,
        assignedTo: assignedTo || null,
        coAssignedTo: coAssignedTo || null,
        notes,
        forceCreate
      };

      if (isEdit) {
        await updateLeadApi(lead._id, payload);
        toast.success("Lead updated successfully!");
      } else {
        await createLeadApi(payload);
        toast.success("Lead created successfully!");
      }

      onSuccess();
      onClose();
      resetForm();
    } catch (err) {
      toast.error(err.message || "Failed to save lead");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEdit ? `Edit Lead (${lead?.leadId})` : "Create New Lead"}
      maxWidth="max-w-3xl"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Duplicate Warning Banner */}
        {duplicateWarning && (
          <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="font-bold">Duplicate Lead Warning</p>
              <p>
                A customer already exists with this phone ({duplicateWarning.phone}) or email ({duplicateWarning.email}).
                Existing Lead ID: <strong>{duplicateWarning.leadId}</strong> ({duplicateWarning.name}).
              </p>
              <div className="mt-2 flex items-center gap-2">
                <input
                  type="checkbox"
                  id="force"
                  checked={forceCreate}
                  onChange={(e) => setForceCreate(e.target.checked)}
                  className="rounded border-amber-300 text-indigo-600 focus:ring-indigo-500"
                />
                <label htmlFor="force" className="font-semibold text-slate-800">
                  Force create duplicate lead anyway
                </label>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          <Input
            label="Customer Name *"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            icon={User}
            placeholder="Priyanshu Sharma"
          />
          <Input
            label="Phone Number *"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            onBlur={handleBlurDuplicateCheck}
            required
            icon={Phone}
            placeholder="+91 9876543210"
          />
          <Input
            label="Email Address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={handleBlurDuplicateCheck}
            icon={Mail}
            placeholder="priyanshu@example.com"
          />
          <Input
            label="Alternate Phone"
            value={alternatePhone}
            onChange={(e) => setAlternatePhone(e.target.value)}
            placeholder="+91 9988776655"
          />
          <Select label="Select Project" value={project} onChange={(e) => setProject(e.target.value)}>
            <option value="">-- Select Project --</option>
            {projects.map((p) => (
              <option key={p._id} value={p._id}>
                {p.name} ({p.city})
              </option>
            ))}
          </Select>
          <Select label="Configuration" value={configuration} onChange={(e) => setConfiguration(e.target.value)}>
            <option value="1 BHK">1 BHK</option>
            <option value="2 BHK">2 BHK</option>
            <option value="3 BHK">3 BHK</option>
            <option value="4 BHK">4 BHK</option>
            <option value="Penthouse">Penthouse</option>
            <option value="Plot">Plot</option>
          </Select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          <Input
            label="Min Budget (INR ₹)"
            type="number"
            value={budgetMin}
            onChange={(e) => setBudgetMin(e.target.value)}
          />
          <Input
            label="Max Budget (INR ₹)"
            type="number"
            value={budgetMax}
            onChange={(e) => setBudgetMax(e.target.value)}
          />
          <Input
            label="Area (sq.ft)"
            type="number"
            value={area}
            onChange={(e) => setArea(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          <Input
            label="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            icon={MapPin}
            placeholder="Whitefield, Bengaluru"
          />
          <Select label="Lead Source" value={source} onChange={(e) => setSource(e.target.value)}>
            <option value="Website">Website</option>
            <option value="Facebook">Facebook</option>
            <option value="Google">Google</option>
            <option value="Instagram">Instagram</option>
            <option value="WhatsApp">WhatsApp</option>
            <option value="99acres">99acres</option>
            <option value="MagicBricks">MagicBricks</option>
            <option value="Housing.com">Housing.com</option>
            <option value="Channel Partner">Channel Partner</option>
            <option value="Referral">Referral</option>
            <option value="Walk-in">Walk-in</option>
          </Select>
          <Select label="Priority" value={priority} onChange={(e) => setPriority(e.target.value)}>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </Select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Select label="Assigned Executive" value={assignedTo} onChange={(e) => setAssignedTo(e.target.value)}>
            <option value="">-- Assign to Me / Unassigned --</option>
            {users.map((u) => (
              <option key={u._id} value={u._id}>
                {u.name} ({u.role})
              </option>
            ))}
          </Select>
          <Select label="Co-Assigned Executive" value={coAssignedTo} onChange={(e) => setCoAssignedTo(e.target.value)}>
            <option value="">-- None --</option>
            {users.map((u) => (
              <option key={u._id} value={u._id}>
                {u.name} ({u.role})
              </option>
            ))}
          </Select>
        </div>

        <Textarea
          label="Lead Notes & Requirement Details"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Client preferences, budget flexibility, timeline..."
          rows={3}
        />

        <div className="pt-4 flex justify-end gap-2">
          <Button variant="outline" onClick={onClose} type="button">
            Cancel
          </Button>
          <Button variant="primary" type="submit" isLoading={loading}>
            {isEdit ? "Update Lead" : "Create Lead"}
          </Button>
        </div>
      </form>
    </Modal>
  );
};
