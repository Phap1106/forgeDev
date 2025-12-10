"use client";

import { useState } from "react";
import { toast } from "sonner";
import { AccountShell } from "@/components/account/AccountShell";

export default function AccountSecurityPage() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword || newPassword !== confirm) {
      toast.error("Please confirm your new password correctly.");
      return;
    }
    // TODO: call API
    toast.success("Security settings saved (demo only).");
    setCurrentPassword("");
    setNewPassword("");
    setConfirm("");
  };

  return (
    <AccountShell
      activeKey="security"
      title="Security"
      subtitle="Manage your password and basic security preferences."
    >
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1.1fr)]">
        <form onSubmit={handleSubmit} className="space-y-4">
          <h2 className="text-sm font-semibold mb-1">Change password</h2>
          <p className="text-xs text-white/65 mb-3">
            Your password should be at least 8 characters and difficult to
            guess. Avoid re-using passwords from other services.
          </p>

          <div>
            <label className="block text-xs font-medium text-white/70 mb-1.5">
              Current password
            </label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full border border-white/20 bg-black/40 px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-emerald-400 rounded-sm"
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-xs font-medium text-white/70 mb-1.5">
                New password
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full border border-white/20 bg-black/40 px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-emerald-400 rounded-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-white/70 mb-1.5">
                Confirm new password
              </label>
              <input
                type="password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                className="w-full border border-white/20 bg-black/40 px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-emerald-400 rounded-sm"
              />
            </div>
          </div>

          <div className="pt-2 flex justify-end gap-3">
            <button
              type="button"
              onClick={() => {
                setCurrentPassword("");
                setNewPassword("");
                setConfirm("");
              }}
              className="px-4 py-2 text-sm border border-white/30 bg-transparent text-white/85 hover:bg-white/10 transition rounded-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-semibold bg-emerald-500 text-black hover:bg-emerald-400 transition rounded-sm"
            >
              Save changes
            </button>
          </div>
        </form>

        <div className="space-y-4">
          <div className="border border-white/15 bg-white/5 p-4 rounded-sm">
            <h3 className="text-sm font-semibold mb-2">
              Sign-in activity (placeholder)
            </h3>
            <p className="text-xs text-white/70">
              When activity logging is enabled, recent sign-ins, device details
              and IP addresses will be listed here to help you spot anything
              unusual.
            </p>
          </div>

          <div className="border border-white/15 bg-white/5 p-4 rounded-sm">
            <h3 className="text-sm font-semibold mb-2">Security tips</h3>
            <ul className="text-xs text-white/70 space-y-1.5 list-disc list-inside">
              <li>Use a unique password for ForgeVault.</li>
              <li>Never share your password with anyone.</li>
              <li>Sign out on shared or public devices.</li>
            </ul>
          </div>
        </div>
      </div>
    </AccountShell>
  );
}
