"use client";

import { AccountShell } from "@/components/account/AccountShell";

export default function AccountOverviewPage() {
  return (
    <AccountShell
      activeKey="overview"
      title="Account overview"
      subtitle="Key information about your ForgeVault account at a glance."
    >
      <div className="grid gap-4 md:grid-cols-3">
        <div className="border border-white/15 bg-white/5 p-4 rounded-sm">
          <div className="text-xs text-white/60 mb-1">Current balance</div>
          <div className="text-xl font-semibold">£0.00</div>
          <p className="mt-1 text-[11px] text-white/55">
            Top up your wallet to purchase tools and subscriptions.
          </p>
        </div>

        <div className="border border-white/15 bg-white/5 p-4 rounded-sm">
          <div className="text-xs text-white/60 mb-1">Active licences</div>
          <div className="text-xl font-semibold">0</div>
          <p className="mt-1 text-[11px] text-white/55">
            Licences for ForgeVault tools currently assigned to your account.
          </p>
        </div>

        <div className="border border-white/15 bg-white/5 p-4 rounded-sm">
          <div className="text-xs text-white/60 mb-1">Last sign-in</div>
          <div className="text-sm font-medium">Recently</div>
          <p className="mt-1 text-[11px] text-white/55">
            Sign-in history will appear here once tracking is connected.
          </p>
        </div>
      </div>

      <div className="mt-8 grid gap-4 lg:grid-cols-2">
        <div className="border border-white/15 bg-white/5 p-4 rounded-sm">
          <h2 className="text-sm font-semibold mb-3">
            Recent orders (placeholder)
          </h2>
          <p className="text-xs text-white/65">
            Once you start purchasing tools, your latest orders will be listed
            here for quick access.
          </p>
        </div>

        <div className="border border-white/15 bg-white/5 p-4 rounded-sm">
          <h2 className="text-sm font-semibold mb-3">
            Recent transactions (placeholder)
          </h2>
          <p className="text-xs text-white/65">
            Wallet deposits, withdrawals and payments will appear here when
            billing is connected.
          </p>
        </div>
      </div>
    </AccountShell>
  );
}
