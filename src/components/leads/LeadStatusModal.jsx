import React, { useState } from "react";
import { Modal } from "../common/Modal";
import { Select } from "../common/Select";
import { Textarea } from "../common/Textarea";
import { Button } from "../common/Button";
import { updateLeadApi } from "../../services/leadApi";
import { LEAD_STATUS_CONFIG } from "../../utils/constants";
import { toast } from "sonner";

export const LeadStatusModal = ({ isOpen, onClose, lead, onSuccess }) => {
  const [status, setStatus] = useState(lead?.leadStatus || "Initial");
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateLeadApi(lead._id, { leadStatus: status, reason });
      toast.success(`Lead status updated to ${status}`);
      onSuccess();
      onClose();
    } catch (err) {
      toast.error(err.message || "Failed to update status");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Update Status - ${lead?.leadId}`}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Select
          label="New Lead Status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          {Object.keys(LEAD_STATUS_CONFIG).map((st) => (
            <option key={st} value={st}>
              {st}
            </option>
          ))}
        </Select>

        <Textarea
          label="Reason / Notes for status change"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="Enter detailed reason for changing lead status..."
          rows={3}
        />

        <div className="pt-4 flex justify-end gap-2">
          <Button variant="outline" onClick={onClose} type="button">
            Cancel
          </Button>
          <Button variant="primary" type="submit" isLoading={loading}>
            Update Status
          </Button>
        </div>
      </form>
    </Modal>
  );
};
