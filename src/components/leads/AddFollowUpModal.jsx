import React, { useState } from "react";
import { Modal } from "../common/Modal";
import { Input } from "../common/Input";
import { Select } from "../common/Select";
import { Textarea } from "../common/Textarea";
import { Button } from "../common/Button";
import { createFollowUpApi } from "../../services/followUpApi";
import { toast } from "sonner";

export const AddFollowUpModal = ({ isOpen, onClose, lead, users = [], onSuccess }) => {
  const [followUpDate, setFollowUpDate] = useState(new Date().toISOString().split("T")[0]);
  const [followUpTime, setFollowUpTime] = useState("10:30 AM");
  const [type, setType] = useState("Call");
  const [purpose, setPurpose] = useState("General Discussion");
  const [assignedTo, setAssignedTo] = useState(lead?.assignedTo?._id || lead?.assignedTo || "");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!lead) return;

    setLoading(true);
    try {
      await createFollowUpApi({
        leadId: lead._id,
        followUpDate,
        followUpTime,
        type,
        purpose,
        assignedTo: assignedTo || lead.assignedTo?._id || lead.assignedTo,
        notes
      });
      toast.success("Follow-up scheduled successfully!");
      onSuccess();
      onClose();
    } catch (err) {
      toast.error(err.message || "Failed to schedule follow-up");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Schedule Follow-up - ${lead?.leadId}`}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <Input
            label="Follow-up Date *"
            type="date"
            value={followUpDate}
            onChange={(e) => setFollowUpDate(e.target.value)}
            required
          />
          <Input
            label="Time"
            type="text"
            value={followUpTime}
            onChange={(e) => setFollowUpTime(e.target.value)}
            placeholder="10:30 AM"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Select label="Follow-up Type" value={type} onChange={(e) => setType(e.target.value)}>
            <option value="Call">Call</option>
            <option value="WhatsApp">WhatsApp</option>
            <option value="Email">Email</option>
            <option value="Meeting">Meeting</option>
            <option value="Site Visit">Site Visit</option>
          </Select>

          <Input
            label="Purpose"
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
            placeholder="Floor plan review..."
          />
        </div>

        <Select label="Assigned To" value={assignedTo} onChange={(e) => setAssignedTo(e.target.value)}>
          <option value="">-- Executive --</option>
          {users.map((u) => (
            <option key={u._id} value={u._id}>
              {u.name}
            </option>
          ))}
        </Select>

        <Textarea
          label="Follow-up Agenda / Notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Enter notes about what to discuss..."
          rows={3}
        />

        <div className="pt-4 flex justify-end gap-2">
          <Button variant="outline" onClick={onClose} type="button">
            Cancel
          </Button>
          <Button variant="primary" type="submit" isLoading={loading}>
            Schedule Follow-up
          </Button>
        </div>
      </form>
    </Modal>
  );
};
