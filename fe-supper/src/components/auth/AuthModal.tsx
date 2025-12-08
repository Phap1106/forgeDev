"use client";

import { useEffect, useState } from "react";
import { X, LogIn, UserPlus, Loader2 } from "lucide-react";

export type AuthMode = "login" | "register";

type AuthModalProps = {
  open: boolean;
  mode: AuthMode;
  onClose: () => void;
  onModeChange: (mode: AuthMode) => void;
  onAuthSuccess?: (payload: {
    accessToken: string;
    user: {
      id: number | string;
      email: string;
      username?: string;
      fullName?: string;
      role?: string;
    };
  }) => void;
};

// Lấy base URL API từ env, fallback localhost
const API_BASE =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000/api";

export default function AuthModal({
  open,
  mode,
  onClose,
  onModeChange,
  onAuthSuccess,
}: AuthModalProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!open) {
      setEmail("");
      setPassword("");
      setFullName("");
      setUsername("");
      setError(null);
      setLoading(false);
    }
  }, [open, mode]);

  if (!open) return null;

  const isLogin = mode === "login";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const endpoint = isLogin ? "/auth/login" : "/auth/register";

      const body: any = {
        email,
        password,
      };
      if (!isLogin) {
        body.fullName = fullName || undefined;
        body.username = username || undefined;
      }

      const res = await fetch(`${API_BASE}${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data?.message || "Có lỗi xảy ra. Vui lòng thử lại.");
        setLoading(false);
        return;
      }

      // data: { accessToken, user }
      if (typeof window !== "undefined") {
        localStorage.setItem("forgevault_token", data.accessToken);
        localStorage.setItem("forgevault_user", JSON.stringify(data.user));
      }

      if (onAuthSuccess) {
        onAuthSuccess(data);
      }

      setLoading(false);
      onClose();
    } catch (err) {
      console.error(err);
      setError("Không thể kết nối server. Vui lòng thử lại.");
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative z-10 w-full max-w-md rounded-2xl bg-[#050B10] border border-white/10 shadow-[0_20px_90px_rgba(0,0,0,0.9)] p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-[11px] uppercase tracking-[0.2em] text-emerald-300">
              {isLogin ? "Welcome back" : "Create account"}
            </p>
            <h2 className="text-lg font-semibold text-white">
              {isLogin ? "Đăng nhập" : "Đăng ký tài khoản"}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="h-8 w-8 grid place-items-center rounded-xl bg-white/5 hover:bg-white/10 transition"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="mb-4 flex gap-2 text-xs">
          <button
            onClick={() => onModeChange("login")}
            className={`flex-1 inline-flex items-center justify-center gap-1 rounded-xl px-3 py-2 border ${
              isLogin
                ? "border-emerald-400 bg-emerald-400/10 text-emerald-200"
                : "border-white/10 bg-white/5 text-white/70"
            }`}
          >
            <LogIn className="h-3.5 w-3.5" />
            Login
          </button>
          <button
            onClick={() => onModeChange("register")}
            className={`flex-1 inline-flex items-center justify-center gap-1 rounded-xl px-3 py-2 border ${
              !isLogin
                ? "border-emerald-400 bg-emerald-400/10 text-emerald-200"
                : "border-white/10 bg-white/5 text-white/70"
            }`}
          >
            <UserPlus className="h-3.5 w-3.5" />
            Register
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3 text-sm">
          {!isLogin && (
            <>
              <div>
                <label className="block text-xs text-white/70 mb-1">
                  Họ tên (tuỳ chọn)
                </label>
                <input
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full rounded-xl bg-black/40 border border-white/10 px-3 py-2 text-sm outline-none focus:border-emerald-400"
                  placeholder="Nguyễn Văn A"
                />
              </div>
              <div>
                <label className="block text-xs text-white/70 mb-1">
                  Username (tuỳ chọn)
                </label>
                <input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full rounded-xl bg-black/40 border border-white/10 px-3 py-2 text-sm outline-none focus:border-emerald-400"
                  placeholder="forgevault_user"
                />
              </div>
            </>
          )}

          <div>
            <label className="block text-xs text-white/70 mb-1">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl bg-black/40 border border-white/10 px-3 py-2 text-sm outline-none focus:border-emerald-400"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-xs text-white/70 mb-1">
              Mật khẩu
            </label>
            <input
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl bg-black/40 border border-white/10 px-3 py-2 text-sm outline-none focus:border-emerald-400"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <p className="text-xs text-red-400 bg-red-500/10 border border-red-500/40 rounded-xl px-3 py-2">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full h-10 rounded-xl bg-emerald-400 text-black text-sm font-semibold flex items-center justify-center gap-2 hover:bg-emerald-300 transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading && <Loader2 className="h-4 w-4 animate-spin" />}
            {isLogin ? "Đăng nhập" : "Đăng ký"}
          </button>

          {isLogin ? (
            <p className="text-[11px] text-white/50 text-center">
              Chưa có tài khoản?{" "}
              <button
                type="button"
                onClick={() => onModeChange("register")}
                className="text-emerald-300 hover:underline"
              >
                Đăng ký ngay
              </button>
            </p>
          ) : (
            <p className="text-[11px] text-white/50 text-center">
              Đã có tài khoản?{" "}
              <button
                type="button"
                onClick={() => onModeChange("login")}
                className="text-emerald-300 hover:underline"
              >
                Đăng nhập
              </button>
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
