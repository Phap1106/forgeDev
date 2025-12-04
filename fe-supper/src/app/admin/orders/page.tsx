"use client";

type OrderRow = {
  id: number;
  userEmail: string;
  toolName: string;
  amount: number;
  status: "pending" | "paid" | "refunded";
  createdAt: string;
};

export default function OrdersPage() {
  const data: OrderRow[] = [
    {
      id: 1001,
      userEmail: "user1@example.com",
      toolName: "TikTok Account Farm Pro",
      amount: 990000,
      status: "paid",
      createdAt: "2025-12-02 10:20",
    },
    {
      id: 1002,
      userEmail: "user2@example.com",
      toolName: "Gmail Creator Script",
      amount: 490000,
      status: "pending",
      createdAt: "2025-12-04 15:00",
    },
  ];

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-lg font-semibold">Order Management</h1>
        <p className="text-xs text-white/60">
          Quản lý các đơn mua / thuê tool, dùng để đối soát với Payments.
        </p>
      </div>

      <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
        <table className="min-w-full text-sm">
          <thead className="bg-white/5 text-xs uppercase text-white/60">
            <tr>
              <th className="px-4 py-3 text-left">Order #</th>
              <th className="px-4 py-3 text-left">User</th>
              <th className="px-4 py-3 text-left">Tool</th>
              <th className="px-4 py-3 text-right">Amount</th>
              <th className="px-4 py-3 text-center">Status</th>
              <th className="px-4 py-3 text-left">Created</th>
            </tr>
          </thead>
          <tbody>
            {data.map((o) => (
              <tr
                key={o.id}
                className="border-t border-white/5 hover:bg-white/5"
              >
                <td className="px-4 py-3">{o.id}</td>
                <td className="px-4 py-3">{o.userEmail}</td>
                <td className="px-4 py-3">{o.toolName}</td>
                <td className="px-4 py-3 text-right">
                  {o.amount.toLocaleString("vi-VN")} ₫
                </td>
                <td className="px-4 py-3 text-center">
                  {o.status === "paid" && (
                    <span className="text-emerald-400">Paid</span>
                  )}
                  {o.status === "pending" && (
                    <span className="text-yellow-300">Pending</span>
                  )}
                  {o.status === "refunded" && (
                    <span className="text-red-400">Refunded</span>
                  )}
                </td>
                <td className="px-4 py-3">{o.createdAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
