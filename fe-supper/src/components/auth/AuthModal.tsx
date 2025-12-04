// src/components/auth/AuthModal.tsx
"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { apiPost } from "@/lib/api";

export type AuthMode = "login" | "register";

type AuthModalProps = {
  open: boolean;
  mode: AuthMode;
  onClose: () => void;
  onModeChange: (mode: AuthMode) => void;
};

export default function AuthModal({
  open,
  mode,
  onClose,
  onModeChange,
}: AuthModalProps) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open) {
      setError(null);
      setLoading(false);
    }
  }, [open, mode]);

  if (!open) return null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      let payload: any;
      let path: string;

      if (mode === "login") {
        path = "/auth/login";
        payload = { email, password };
      } else {
        path = "/auth/register";
        payload = { fullName, email, password };
      }

      const data = await apiPost<{ accessToken: string; user: any }>(
        path,
        payload
      );

      if (typeof window !== "undefined") {
        localStorage.setItem("fv_token", data.accessToken);
        localStorage.setItem("fv_user", JSON.stringify(data.user));
      }

      onClose();
    } catch (err: any) {
      setError(err.message || "Có lỗi xảy ra, vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-[60]">
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative h-full w-full flex items-center justify-center">
        <div className="w-full max-w-md rounded-3xl bg-[#050B10] border border-white/10 p-6 shadow-[0_20px_80px_rgba(0,0,0,0.9)]">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-emerald-300">
                {mode === "login" ? "Welcome back" : "Create account"}
              </p>
              <h2 className="mt-1 text-lg font-semibold">
                {mode === "login"
                  ? "Đăng nhập ForgeVault"
                  : "Đăng ký ForgeVault"}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="h-8 w-8 grid place-items-center rounded-xl bg-white/5 hover:bg-white/10 transition"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3 text-sm">
            {mode === "register" && (
              <div>
                <label className="block text-xs text-white/60 mb-1">
                  Tên hiển thị
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full h-10 rounded-xl bg-black/40 ring-1 ring-white/15 px-3 text-sm focus:outline-none focus:ring-emerald-400/50"
                  placeholder="ForgeVault user"
                />
              </div>
            )}

            <div>
              <label className="block text-xs text-white/60 mb-1">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-10 rounded-xl bg-black/40 ring-1 ring-white/15 px-3 text-sm focus:outline-none focus:ring-emerald-400/50"
                placeholder="you@domain.com"
              />
            </div>

            <div>
              <label className="block text-xs text-white/60 mb-1">
                Mật khẩu
              </label>
              <input
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-10 rounded-xl bg-black/40 ring-1 ring-white/15 px-3 text-sm focus:outline-none focus:ring-emerald-400/50"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <p className="text-xs text-red-400 mt-1 whitespace-pre-line">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="mt-3 w-full h-11 rounded-xl bg-emerald-400 text-black font-semibold hover:bg-emerald-300 transition hover:-translate-y-[1px] active:translate-y-[1px] active:scale-[0.97] disabled:opacity-60 disabled:hover:translate-y-0 disabled:active:scale-100"
            >
              {loading
                ? "Đang xử lý..."
                : mode === "login"
                ? "Đăng nhập"
                : "Đăng ký"}
            </button>

            <button
              type="button"
              onClick={() =>
                onModeChange(mode === "login" ? "register" : "login")
              }
              className="w-full h-10 rounded-xl bg-black/40 text-xs text-white/70 ring-1 ring-white/15 hover:bg-black/60 transition"
            >
              {mode === "login"
                ? "Chưa có tài khoản? Đăng ký"
                : "Đã có tài khoản? Đăng nhập"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
