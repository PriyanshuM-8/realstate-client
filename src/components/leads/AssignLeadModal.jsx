import React, { useState } from "react";
import { Modal } from "../common/Modal";
import { Select } from "../common/Select";
import { Button } from "../common/Button";
import { assignLeadApi, bulkAssignLeadsApi } from "../../services/leadApi";
import { toast } from "sonner";

export const AssignLeadModal = ({ isOpen, onClose, lead, bulkLeadIds = [], users = [], onSuccess }) => {
  const [assignedTo, setAssignedTo] = useState(lead?.assignedTo?._id || lead?.assignedTo || "");
  const [coAssignedTo, setCoAssignedTo] = useState(lead?.coAssignedTo?._id || "");
  const [loading, setLoading] = useState(false);

  const isBulk = bulkLeadIds.length > 0;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!assignedTo) {
      toast.error("Please select a sales executive to assign");
      return;
    }

    setLoading(true);
    try {
      if (isBulk) {
        await bulkAssignLeadsApi({ leadIds: bulkLeadIds, assignedTo });
        toast.success(`Successfully assigned ${bulkLeadIds.length} leads!`);
      } else {
        await assignLeadApi(lead._id, { assignedTo, coAssignedTo });
        toast.success(`Lead assigned successfully!`);
      }
      onSuccess();
      onClose();
    } catch (err) {
      toast.error(err.message || "Failed to assign lead");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isBulk ? `Bulk Assign ${bulkLeadIds.length} Leads` : `Assign Lead (${lead?.leadId || ""})`}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {!isBulk && lead && (
          <div className="p-3 bg-slate-50 rounded-lg text-xs text-slate-600 border border-slate-200">
            <p><strong>Customer:</strong> {lead.name} ({lead.phone})</p>
            <p><strong>Current Assignment:</strong> {lead.assignedTo?.name || "Unassigned"}</p>
          </div>
        )}

        <Select
          label="Primary Assigned Sales Executive"
          value={assignedTo}
          onChange={(e) => setAssignedTo(e.target.value)}
          required
        >
          <option value="">-- Select Executive --</option>
          {users.map((u) => (
            <option key={u._id} value={u._id}>
              {u.name} ({u.role} - {u.department})
            </option>
          ))}
        </Select>

        {!isBulk && (
          <Select
            label="Co-Assigned Sales Executive (Optional)"
            value={coAssignedTo}
            onChange={(e) => setCoAssignedTo(e.target.value)}
          >
            <option value="">-- None --</option>
            {users.map((u) => (
              <option key={u._id} value={u._id}>
                {u.name} ({u.role})
              </option>
            ))}
          </Select>
        )}

        <div className="pt-4 flex justify-end gap-2">
          <Button variant="outline" onClick={onClose} type="button">
            Cancel
          </Button>
          <Button variant="primary" type="submit" isLoading={loading}>
            Confirm Assignment
          </Button>
        </div>
      </form>
    </Modal>
  );
};
