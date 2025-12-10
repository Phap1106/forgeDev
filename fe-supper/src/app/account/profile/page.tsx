"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { AccountShell } from "@/components/account/AccountShell";

type CurrentUser = {
  id: number | string;
  email: string;
  username?: string;
  fullName?: string;
  role?: string;
};

export default function AccountProfilePage() {
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const storedUser = localStorage.getItem("forgevault_user");
      if (storedUser) {
        const parsed = JSON.parse(storedUser) as CurrentUser;
        setCurrentUser(parsed);
        setFullName(parsed.fullName || "");
        setUsername(parsed.username || "");
      }
    } finally {
      setLoading(false);
    }
  }, []);

  const isAdmin = currentUser?.role === "admin";

  const handleSave = () => {
    if (!currentUser) return;

    const updatedUser: CurrentUser = {
      ...currentUser,
      fullName: fullName.trim() || undefined,
      username: username.trim() || undefined,
    };

    if (typeof window !== "undefined") {
      localStorage.setItem("forgevault_user", JSON.stringify(updatedUser));
    }

    setCurrentUser(updatedUser);
    toast.success("Profile updated successfully.");
  };

  const rightHeader =
    currentUser && (
      <div className="flex flex-col items-start md:items-end gap-1">
        <span className="text-xs text-white/55">Account role</span>
        <span
          className={`inline-flex items-center px-3 py-1 text-[11px] font-semibold border ${
            isAdmin
              ? "border-emerald-400 text-emerald-300 bg-transparent"
              : "border-white/30 text-white/80 bg-transparent"
          }`}
        >
          {isAdmin ? "Administrator" : "Standard user"}
        </span>
      </div>
    );

  return (
    <AccountShell
      activeKey="profile"
      title="Profile settings"
      subtitle="Update your personal details used across ForgeVault."
      rightHeader={rightHeader}
    >
      {loading ? (
        <div className="space-y-3">
          <div className="h-4 w-40 bg-white/10 animate-pulse" />
          <div className="h-10 bg-white/5 animate-pulse" />
          <div className="h-10 bg-white/5 animate-pulse" />
          <div className="h-10 bg-white/5 animate-pulse" />
        </div>
      ) : !currentUser ? (
        <div className="border border-white/15 bg-white/5 px-6 py-10 text-center rounded-md">
          <h2 className="text-lg font-semibold mb-2">
            You are not signed in
          </h2>
          <p className="text-sm text-white/65 mb-4">
            Please sign in to view and edit your account details.
          </p>
          <a
            href="/"
            className="inline-flex items-center justify-center px-4 py-2.5 text-sm font-semibold bg-emerald-400 text-black hover:bg-emerald-300 transition"
          >
            Back to homepage
          </a>
        </div>
      ) : (
        <div className="grid gap-6 xl:grid-cols-[minmax(0,1.6fr)_minmax(0,1.2fr)]">
          {/* Form */}
          <div>
            <h2 className="text-sm font-semibold mb-4">Personal information</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-white/70 mb-1.5">
                  Full name
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Name shown across ForgeVault"
                  className="w-full border border-white/20 bg-black/40 px-3 py-2 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-emerald-400 focus:border-emerald-400 rounded-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-white/70 mb-1.5">
                  Username
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="forge_user_01"
                  className="w-full border border-white/20 bg-black/40 px-3 py-2 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-emerald-400 focus:border-emerald-400 rounded-sm"
                />
                <p className="mt-1 text-[11px] text-white/50">
                  Used for identification in orders, wallet activity and support
                  conversations.
                </p>
              </div>

              <div>
                <label className="block text-xs font-medium text-white/70 mb-1.5">
                  Sign-in e-mail
                </label>
                <input
                  type="email"
                  value={currentUser.email}
                  disabled
                  className="w-full border border-white/20 bg-black/60 px-3 py-2 text-sm text-white/75 rounded-sm cursor-not-allowed"
                />
                <p className="mt-1 text-[11px] text-white/50">
                  This is your primary login e-mail and cannot be changed here.
                </p>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-3 justify-end">
              <button
                type="button"
                onClick={() => {
                  setFullName(currentUser.fullName || "");
                  setUsername(currentUser.username || "");
                }}
                className="px-4 py-2 text-sm border border-white/30 bg-transparent text-white/85 hover:bg-white/10 transition rounded-sm"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSave}
                className="px-4 py-2 text-sm font-semibold bg-emerald-500 text-black hover:bg-emerald-400 transition rounded-sm"
              >
                Save changes
              </button>
            </div>
          </div>

          {/* Side panels */}
          <div className="space-y-4">
            <div className="border border-emerald-400/50 bg-emerald-400/10 p-4 rounded-sm">
              <h3 className="text-sm font-semibold text-emerald-100 mb-2">
                Profile usage
              </h3>
              <p className="text-xs text-emerald-50/85 leading-relaxed">
                Your profile details help us personalise the product, label
                orders correctly and respond faster when you contact support.
                Keeping this information up to date ensures a smoother
                experience across ForgeVault.
              </p>
            </div>

            <div className="border border-white/15 bg-white/5 p-4 rounded-sm">
              <h3 className="text-sm font-semibold mb-2">
                Security and sign-in
              </h3>
              <p className="text-xs text-white/70 leading-relaxed mb-3">
                To change your password or review sign-in activity, please use
                the Security section. We recommend strong, unique passwords and
                reviewing your account activity on a regular basis.
              </p>
              <a
                href="/account/security"
                className="inline-flex items-center justify-center px-3.5 py-2 text-xs font-medium bg-white/10 text-white hover:bg-white/15 transition rounded-sm"
              >
                Open Security settings
              </a>
            </div>
          </div>
        </div>
      )}
    </AccountShell>
  );
}
