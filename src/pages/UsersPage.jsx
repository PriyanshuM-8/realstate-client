import React, { useEffect, useState } from "react";
import { UserCheck, Plus, Shield, Mail, Phone, Edit, Trash2 } from "lucide-react";
import { getUsersApi, createUserApi, updateUserApi, deleteUserApi } from "../services/userApi";
import { Button } from "../components/common/Button";
import { Badge } from "../components/common/Badge";
import { Modal } from "../components/common/Modal";
import { Input } from "../components/common/Input";
import { Select } from "../components/common/Select";
import { Skeleton } from "../components/common/Skeleton";
import { ROLES } from "../utils/constants";
import { toast } from "sonner";

export const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeUser, setActiveUser] = useState(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("Sales Executive");
  const [department, setDepartment] = useState("Sales");
  const [createLoading, setCreateLoading] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await getUsersApi();
      setUsers(res.data || []);
    } catch (err) {
      toast.error(err.message || "Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleCreateOrUpdate = async (e) => {
    e.preventDefault();
    setCreateLoading(true);
    try {
      if (activeUser) {
        await updateUserApi(activeUser._id, { name, phone, role, department });
        toast.success("User updated successfully!");
      } else {
        await createUserApi({ name, email, password, phone, role, department });
        toast.success("User created successfully!");
      }
      setIsModalOpen(false);
      resetForm();
      fetchUsers();
    } catch (err) {
      toast.error(err.message || "Failed to save user");
    } finally {
      setCreateLoading(false);
    }
  };

  const handleDeactivate = async (u) => {
    if (!window.confirm(`Deactivate user ${u.name}?`)) return;
    try {
      await deleteUserApi(u._id);
      toast.success("User deactivated");
      fetchUsers();
    } catch (err) {
      toast.error(err.message || "Failed to deactivate user");
    }
  };

  const resetForm = () => {
    setActiveUser(null);
    setName("");
    setEmail("");
    setPassword("");
    setPhone("");
    setRole("Sales Executive");
    setDepartment("Sales");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-900">User Management & RBAC</h1>
          <p className="text-xs text-slate-500">Manage team member accounts, roles, and department permissions</p>
        </div>

        <Button
          onClick={() => {
            resetForm();
            setIsModalOpen(true);
          }}
          variant="primary"
          size="sm"
          icon={Plus}
        >
          Add Team Member
        </Button>
      </div>

      {loading ? (
        <Skeleton className="h-64 w-full rounded-2xl" />
      ) : (
        <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-600">
              <thead className="bg-slate-50 text-slate-700 font-semibold uppercase text-[10px] tracking-wider border-b border-slate-200">
                <tr>
                  <th className="py-3 px-3">Name & Email</th>
                  <th className="py-3 px-3">Phone</th>
                  <th className="py-3 px-3">Role</th>
                  <th className="py-3 px-3">Department</th>
                  <th className="py-3 px-3">Status</th>
                  <th className="py-3 px-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {users.map((u) => (
                  <tr key={u._id} className="hover:bg-slate-50">
                    <td className="py-3 px-3 font-semibold text-slate-900 flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center text-xs shrink-0">
                        {u.name?.charAt(0)}
                      </div>
                      <div>
                        <p>{u.name}</p>
                        <p className="text-[10px] text-slate-400 font-normal">{u.email}</p>
                      </div>
                    </td>
                    <td className="py-3 px-3 font-medium">{u.phone || "-"}</td>
                    <td className="py-3 px-3"><Badge variant="primary">{u.role}</Badge></td>
                    <td className="py-3 px-3 font-medium text-slate-700">{u.department}</td>
                    <td className="py-3 px-3">
                      <Badge variant={u.isActive ? "success" : "danger"}>
                        {u.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </td>
                    <td className="py-3 px-3 text-right space-x-1">
                      <button
                        onClick={() => {
                          setActiveUser(u);
                          setName(u.name);
                          setEmail(u.email);
                          setPhone(u.phone || "");
                          setRole(u.role);
                          setDepartment(u.department || "Sales");
                          setIsModalOpen(true);
                        }}
                        className="p-1 text-slate-400 hover:text-indigo-600"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeactivate(u)}
                        className="p-1 text-slate-400 hover:text-red-600"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* User Form Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={activeUser ? `Edit User - ${activeUser.name}` : "Create New User"}
      >
        <form onSubmit={handleCreateOrUpdate} className="space-y-4">
          <Input label="Full Name *" value={name} onChange={(e) => setName(e.target.value)} required />
          <Input label="Email Address *" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required disabled={!!activeUser} />
          {!activeUser && (
            <Input label="Password *" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          )}
          <Input label="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} />

          <div className="grid grid-cols-2 gap-3">
            <Select label="Role" value={role} onChange={(e) => setRole(e.target.value)}>
              {ROLES.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </Select>

            <Input label="Department" value={department} onChange={(e) => setDepartment(e.target.value)} />
          </div>

          <div className="pt-4 flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsModalOpen(false)} type="button">Cancel</Button>
            <Button variant="primary" type="submit" isLoading={createLoading}>Save User</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
