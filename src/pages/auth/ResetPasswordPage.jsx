import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { KeyRound, Lock, ArrowLeft } from "lucide-react";
import { resetPasswordApi } from "../../services/authApi";
import { Button } from "../../components/common/Button";
import { Input } from "../../components/common/Input";
import { toast } from "sonner";

export const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const [resetToken, setResetToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!resetToken || !newPassword) {
      toast.error("Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      const res = await resetPasswordApi({ resetToken, newPassword });
      toast.success(res.message || "Password reset successful! Please login with your new password.");
      navigate("/login");
    } catch (err) {
      toast.error(err.message || "Failed to reset password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center text-2xl font-bold text-white tracking-tight">Reset Password</h2>
        <p className="mt-1 text-center text-xs text-slate-400">
          Enter your reset token and new password
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 shadow-xl rounded-2xl sm:px-10">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <Input
              label="Reset Token"
              type="text"
              required
              value={resetToken}
              onChange={(e) => setResetToken(e.target.value)}
              placeholder="reset_token_..."
              icon={KeyRound}
            />
            <Input
              label="New Password"
              type="password"
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="••••••••"
              icon={Lock}
            />
            <Button type="submit" variant="primary" className="w-full" isLoading={loading}>
              Reset Password
            </Button>
          </form>

          <div className="mt-6 text-center">
            <Link to="/login" className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900">
              <ArrowLeft className="w-4 h-4" /> Back to Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
