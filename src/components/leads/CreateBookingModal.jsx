import React, { useState } from "react";
import { Modal } from "../common/Modal";
import { Input } from "../common/Input";
import { Select } from "../common/Select";
import { Textarea } from "../common/Textarea";
import { Button } from "../common/Button";
import { createBookingApi } from "../../services/bookingApi";
import { toast } from "sonner";

export const CreateBookingModal = ({ isOpen, onClose, lead, projects = [], users = [], onSuccess }) => {
  const [projectId, setProjectId] = useState(lead?.project?._id || lead?.project || "");
  const [unitNumber, setUnitNumber] = useState("");
  const [propertyType, setPropertyType] = useState(lead?.propertyType || "Apartment");
  const [bookingAmount, setBookingAmount] = useState(500000);
  const [totalAmount, setTotalAmount] = useState(9500000);
  const [paymentStatus, setPaymentStatus] = useState("Paid");
  const [salesExecutive, setSalesExecutive] = useState(lead?.assignedTo?._id || lead?.assignedTo || "");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!lead || !projectId || !unitNumber) {
      toast.error("Project and Unit Number are required");
      return;
    }

    setLoading(true);
    try {
      await createBookingApi({
        leadId: lead._id,
        projectId,
        unitNumber,
        propertyType,
        bookingAmount: Number(bookingAmount),
        totalAmount: Number(totalAmount),
        paymentStatus,
        salesExecutive: salesExecutive || lead.assignedTo?._id || lead.assignedTo,
        notes
      });
      toast.success("Booking created successfully!");
      onSuccess();
      onClose();
    } catch (err) {
      toast.error(err.message || "Failed to create booking");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Confirm Booking - ${lead?.leadId}`}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Select label="Project *" value={projectId} onChange={(e) => setProjectId(e.target.value)} required>
          <option value="">-- Select Project --</option>
          {projects.map((p) => (
            <option key={p._id} value={p._id}>
              {p.name}
            </option>
          ))}
        </Select>

        <div className="grid grid-cols-2 gap-3">
          <Input
            label="Unit Number *"
            value={unitNumber}
            onChange={(e) => setUnitNumber(e.target.value)}
            placeholder="Tower A - 402"
            required
          />
          <Select label="Property Type" value={propertyType} onChange={(e) => setPropertyType(e.target.value)}>
            <option value="Apartment">Apartment</option>
            <option value="Villa">Villa</option>
            <option value="Plot">Plot</option>
            <option value="Commercial">Commercial</option>
          </Select>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Input
            label="Booking Amount (INR ₹) *"
            type="number"
            value={bookingAmount}
            onChange={(e) => setBookingAmount(e.target.value)}
            required
          />
          <Input
            label="Total Agreement Amount (INR ₹) *"
            type="number"
            value={totalAmount}
            onChange={(e) => setTotalAmount(e.target.value)}
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Select label="Payment Status" value={paymentStatus} onChange={(e) => setPaymentStatus(e.target.value)}>
            <option value="Pending">Pending</option>
            <option value="Partial">Partial</option>
            <option value="Paid">Paid</option>
          </Select>

          <Select
            label="Sales Executive"
            value={salesExecutive}
            onChange={(e) => setSalesExecutive(e.target.value)}
          >
            <option value="">-- Select Executive --</option>
            {users.map((u) => (
              <option key={u._id} value={u._id}>
                {u.name}
              </option>
            ))}
          </Select>
        </div>

        <Textarea
          label="Booking Payment Notes / Reference"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Cheque / NEFT reference number..."
          rows={2}
        />

        <div className="pt-4 flex justify-end gap-2">
          <Button variant="outline" onClick={onClose} type="button">
            Cancel
          </Button>
          <Button variant="primary" type="submit" isLoading={loading}>
            Create Booking
          </Button>
        </div>
      </form>
    </Modal>
  );
};
