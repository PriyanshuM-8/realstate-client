import React, { useState } from "react";
import { Modal } from "../common/Modal";
import { Input } from "../common/Input";
import { Select } from "../common/Select";
import { Textarea } from "../common/Textarea";
import { Button } from "../common/Button";
import { createSiteVisitApi } from "../../services/siteVisitApi";
import { toast } from "sonner";

export const ScheduleSiteVisitModal = ({ isOpen, onClose, lead, projects = [], users = [], onSuccess }) => {
  const [projectId, setProjectId] = useState(lead?.project?._id || lead?.project || "");
  const [scheduledDate, setScheduledDate] = useState(new Date().toISOString().split("T")[0]);
  const [scheduledTime, setScheduledTime] = useState("11:00 AM");
  const [assignedExecutive, setAssignedExecutive] = useState(lead?.assignedTo?._id || lead?.assignedTo || "");
  const [location, setLocation] = useState(lead?.location || "");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!lead || !projectId) {
      toast.error("Please select a project for site visit");
      return;
    }

    setLoading(true);
    try {
      await createSiteVisitApi({
        leadId: lead._id,
        projectId,
        scheduledDate,
        scheduledTime,
        assignedExecutive: assignedExecutive || lead.assignedTo?._id || lead.assignedTo,
        location,
        notes
      });
      toast.success("Site visit scheduled successfully!");
      onSuccess();
      onClose();
    } catch (err) {
      toast.error(err.message || "Failed to schedule site visit");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Schedule Site Visit (${lead?.leadId || ""})`}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Select label="Project *" value={projectId} onChange={(e) => setProjectId(e.target.value)} required>
          <option value="">-- Select Project --</option>
          {projects.map((p) => (
            <option key={p._id} value={p._id}>
              {p.name} ({p.city})
            </option>
          ))}
        </Select>

        <div className="grid grid-cols-2 gap-3">
          <Input
            label="Scheduled Date *"
            type="date"
            value={scheduledDate}
            onChange={(e) => setScheduledDate(e.target.value)}
            required
          />
          <Input
            label="Scheduled Time"
            type="text"
            value={scheduledTime}
            onChange={(e) => setScheduledTime(e.target.value)}
            placeholder="11:00 AM"
          />
        </div>

        <Select
          label="Assigned Executive"
          value={assignedExecutive}
          onChange={(e) => setAssignedExecutive(e.target.value)}
        >
          <option value="">-- Select Executive --</option>
          {users.map((u) => (
            <option key={u._id} value={u._id}>
              {u.name} ({u.role})
            </option>
          ))}
        </Select>

        <Input
          label="Site Location / Address"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Whitefield Site Office..."
        />

        <Textarea
          label="Notes / Preparation Instructions"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Pickup details, sample flat walkthrough notes..."
          rows={3}
        />

        <div className="pt-4 flex justify-end gap-2">
          <Button variant="outline" onClick={onClose} type="button">
            Cancel
          </Button>
          <Button variant="primary" type="submit" isLoading={loading}>
            Schedule Site Visit
          </Button>
        </div>
      </form>
    </Modal>
  );
};
