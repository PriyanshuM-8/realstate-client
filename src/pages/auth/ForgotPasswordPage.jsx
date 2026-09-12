import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, ArrowLeft } from "lucide-react";
import { forgotPasswordApi } from "../../services/authApi";
import { Button } from "../../components/common/Button";
import { Input } from "../../components/common/Input";
import { toast } from "sonner";

export const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [resetToken, setResetToken] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your registered email address");
      return;
    }

    setLoading(true);
    try {
      const res = await forgotPasswordApi({ email });
      toast.success(res.message || "Reset link generated");
      if (res.data?.resetToken) {
        setResetToken(res.data.resetToken);
      }
    } catch (err) {
      toast.error(err.message || "Failed to process forgot password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center text-2xl font-bold text-white tracking-tight">Forgot Password</h2>
        <p className="mt-1 text-center text-xs text-slate-400">
          Enter your email to receive a password reset token
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 shadow-xl rounded-2xl sm:px-10">
          {!resetToken ? (
            <form className="space-y-4" onSubmit={handleSubmit}>
              <Input
                label="Email Address"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@realestate.com"
                icon={Mail}
              />
              <Button type="submit" variant="primary" className="w-full" isLoading={loading}>
                Generate Reset Token
              </Button>
            </form>
          ) : (
            <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-800 space-y-2">
              <p className="font-semibold">Reset Token Generated:</p>
              <p className="font-mono bg-white p-2 rounded border border-emerald-300 break-all">{resetToken}</p>
              <p>Copy this token and use it on the Reset Password page.</p>
              <Link to="/reset-password">
                <Button variant="primary" size="sm" className="w-full mt-2">
                  Go to Reset Password
                </Button>
              </Link>
            </div>
          )}

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
