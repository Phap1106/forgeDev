"use client";

import { usePathname, useRouter } from "next/navigation";

export default function AdminHeader() {
  const pathname = usePathname();
  const router = useRouter();

  const current =
    pathname === "/admin"
      ? "Dashboard"
      : pathname?.split("/").slice(-1)[0]?.toUpperCase();

  const handleLogout = () => {
    // TODO: call API logout nếu có
    if (typeof window !== "undefined") {
      localStorage.removeItem("forgevault_token");
    }
    router.push("/");
  };

  return (
    <header className="flex h-14 items-center justify-between border-b border-white/10 bg-black/60 px-4">
      <div>
        <p className="text-[11px] uppercase tracking-[0.18em] text-emerald-300">
          Admin
        </p>
        <h1 className="text-sm font-semibold text-white">{current}</h1>
      </div>

      <div className="flex items-center gap-3 text-xs text-white/70">
        <span>Logged in as</span>
        <span className="rounded-full bg-white/10 px-2 py-1 text-[11px]">
          admin@forgevault.io
        </span>
        <button
          onClick={handleLogout}
          className="rounded-xl bg-red-500/90 px-3 py-1.5 text-[11px] font-semibold text-black hover:bg-red-400"
        >
          Logout
        </button>
      </div>
    </header>
  );
}
