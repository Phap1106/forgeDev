"use client";

import { AccountShell } from "@/components/account/AccountShell";

const MOCK_ORDERS = [
  {
    id: "#FV-1001",
    date: "03 Dec 2025",
    item: "Automation toolkit",
    total: "£49.00",
    status: "Completed",
  },
  {
    id: "#FV-1000",
    date: "28 Nov 2025",
    item: "Workflow builder",
    total: "£29.00",
    status: "Completed",
  },
];

export default function AccountOrdersPage() {
  return (
    <AccountShell
      activeKey="orders"
      title="My orders"
      subtitle="Previous purchases and licences associated with your account."
    >
      <div className="border border-white/15 bg-white/5 rounded-sm overflow-hidden">
        <div className="px-4 py-3 border-b border-white/10 flex items-center justify-between">
          <span className="text-sm font-semibold">Order history</span>
          <span className="text-xs text-white/60">
            {MOCK_ORDERS.length} records (demo)
          </span>
        </div>

        <div className="overflow-x-auto text-sm">
          <table className="min-w-full border-collapse">
            <thead className="bg-black/40 text-xs text-white/60 uppercase tracking-wide">
              <tr>
                <th className="text-left px-4 py-2">Order ID</th>
                <th className="text-left px-4 py-2">Date</th>
                <th className="text-left px-4 py-2">Item</th>
                <th className="text-left px-4 py-2">Total</th>
                <th className="text-left px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_ORDERS.map((order, idx) => (
                <tr
                  key={order.id}
                  className={idx % 2 === 0 ? "bg-white/[0.02]" : ""}
                >
                  <td className="px-4 py-2">{order.id}</td>
                  <td className="px-4 py-2">{order.date}</td>
                  <td className="px-4 py-2">{order.item}</td>
                  <td className="px-4 py-2">{order.total}</td>
                  <td className="px-4 py-2">
                    <span className="inline-flex items-center px-2 py-0.5 text-[11px] font-semibold rounded-sm bg-emerald-500/15 text-emerald-200">
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}

              {MOCK_ORDERS.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-4 py-8 text-center text-sm text-white/65"
                  >
                    You have not placed any orders yet.
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
