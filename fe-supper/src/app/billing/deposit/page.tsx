"use client";

import { AccountShell } from "@/components/account/AccountShell";

export default function WalletDepositPage() {
  return (
    <AccountShell
      activeKey="wallet"
      title="Wallet"
      subtitle="Top up your ForgeVault balance to purchase tools and services."
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="border border-white/15 bg-white/5 p-4 rounded-sm">
          <h2 className="text-sm font-semibold mb-2">Bank transfer (demo)</h2>
          <p className="text-xs text-white/70 mb-3">
            Display instructions for manual bank transfer or payment provider
            here. When your backend is ready, you can replace this block with a
            live deposit form.
          </p>
          <ul className="text-xs text-white/70 space-y-1.5 list-disc list-inside">
            <li>Reference: your ForgeVault e-mail.</li>
            <li>Top-ups may take a few minutes to appear.</li>
          </ul>
        </div>

        <div className="border border-white/15 bg-white/5 p-4 rounded-sm">
          <h2 className="text-sm font-semibold mb-2">
            Quick amount presets (placeholder)
          </h2>
          <p className="text-xs text-white/70 mb-3">
            In the final version you can show common amounts and link each
            button to your payment gateway.
          </p>
          <div className="flex flex-wrap gap-2">
            {["£10", "£25", "£50", "£100"].map((amount) => (
              <button
                key={amount}
                className="px-3 py-2 text-xs border border-white/25 bg-transparent hover:bg-white/10 transition rounded-sm"
              >
                {amount}
              </button>
            ))}
          </div>
        </div>
      </div>
    </AccountShell>
  );
}
