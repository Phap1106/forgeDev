"use client";

import { AccountShell } from "@/components/account/AccountShell";

const MOCK_TX = [
  {
    id: "#TX-2001",
    date: "03 Dec 2025 · 14:20",
    type: "Deposit",
    method: "Bank transfer",
    amount: "+£50.00",
    status: "Completed",
  },
  {
    id: "#TX-1999",
    date: "28 Nov 2025 · 09:05",
    type: "Tool purchase",
    method: "Wallet",
    amount: "-£29.00",
    status: "Completed",
  },
];

export default function WalletTransactionsPage() {
  return (
    <AccountShell
      activeKey="transactions"
      title="Transactions"
      subtitle="History of wallet deposits, withdrawals and payments."
    >
      <div className="border border-white/15 bg-white/5 rounded-sm overflow-hidden">
        <div className="px-4 py-3 border-b border-white/10 flex items-center justify-between">
          <span className="text-sm font-semibold">Transaction history</span>
          <span className="text-xs text-white/60">
            {MOCK_TX.length} records (demo)
          </span>
        </div>

        <div className="overflow-x-auto text-sm">
          <table className="min-w-full border-collapse">
            <thead className="bg-black/40 text-xs text-white/60 uppercase tracking-wide">
              <tr>
                <th className="text-left px-4 py-2">ID</th>
                <th className="text-left px-4 py-2">Date</th>
                <th className="text-left px-4 py-2">Type</th>
                <th className="text-left px-4 py-2">Method</th>
                <th className="text-left px-4 py-2">Amount</th>
                <th className="text-left px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_TX.map((tx, idx) => (
                <tr
                  key={tx.id}
                  className={idx % 2 === 0 ? "bg-white/[0.02]" : ""}
                >
                  <td className="px-4 py-2">{tx.id}</td>
                  <td className="px-4 py-2 whitespace-nowrap">{tx.date}</td>
                  <td className="px-4 py-2">{tx.type}</td>
                  <td className="px-4 py-2">{tx.method}</td>
                  <td className="px-4 py-2">{tx.amount}</td>
                  <td className="px-4 py-2">
                    <span className="inline-flex items-center px-2 py-0.5 text-[11px] font-semibold rounded-sm bg-emerald-500/15 text-emerald-200">
                      {tx.status}
                    </span>
                  </td>
                </tr>
              ))}

              {MOCK_TX.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="px-4 py-8 text-center text-sm text-white/65"
                  >
                    No transactions have been recorded yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AccountShell>
  );
}
