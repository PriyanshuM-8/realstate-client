import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Building2, Eye, EyeOff, Lock, Mail } from "lucide-react";
import { useAuthStore } from "../../store/authStore";
import { Button } from "../../components/common/Button";
import { Input } from "../../components/common/Input";
import { toast } from "sonner";

export const LoginPage = () => {
  const navigate = useNavigate();
  const { login, loading } = useAuthStore();
  const [email, setEmail] = useState("admin@realestate.com");
  const [password, setPassword] = useState("Admin@123");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please enter both email and password");
      return;
    }

    try {
      const response = await login({ email, password });
      toast.success(response.message || "Logged in successfully!");
      navigate("/dashboard");
    } catch (err) {
      toast.error(err.message || "Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="flex justify-center">
          <div className="p-3 bg-indigo-600 rounded-2xl text-white shadow-xl">
            <Building2 className="w-8 h-8" />
          </div>
        </div>
        <h2 className="mt-4 text-center text-2xl font-bold text-white tracking-tight">
           RealEstate CRM
        </h2>
        <p className="mt-1 text-center text-xs text-slate-400">
          Production Enterprise Lead & Sales Management Platform
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="bg-white py-8 px-6 shadow-2xl rounded-2xl sm:px-10 border border-slate-100">
          <form className="space-y-5" onSubmit={handleSubmit}>
            <Input
              label="Email Address"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@realestate.com"
              icon={Mail}
            />

            <div className="relative">
              <Input
                label="Password"
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                icon={Lock}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-7 text-slate-400 hover:text-slate-600"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                />
                <label htmlFor="remember-me" className="ml-2 block text-xs text-slate-600">
                  Remember me
                </label>
              </div>

              <Link to="/forgot-password" className="text-xs font-semibold text-indigo-600 hover:text-indigo-500">
                Forgot password?
              </Link>
            </div>

            <Button type="submit" variant="primary" className="w-full" isLoading={loading}>
              Sign In to Dashboard
            </Button>
          </form>

          {/* Quick Demo Credentials Guide */}
          {/* <div className="mt-6 pt-4 border-t border-slate-100 text-xs text-slate-500">
            <p className="font-semibold text-slate-700 mb-1">Demo Credentials:</p>
            <div className="bg-slate-50 p-2.5 rounded-lg space-y-1 text-[11px] font-mono">
              <p><span className="text-slate-400">Super Admin:</span> admin@realestate.com / Admin@123</p>
              <p><span className="text-slate-400">Manager:</span> manager@realestate.com / Password@123</p>
              <p><span className="text-slate-400">Executive:</span> priyanshu@realestate.com / Password@123</p>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};
