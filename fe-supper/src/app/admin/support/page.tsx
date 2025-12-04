"use client";

type TicketRow = {
  id: number;
  userEmail: string;
  subject: string;
  status: "open" | "closed";
  createdAt: string;
};

export default function SupportPage() {
  const tickets: TicketRow[] = [
    {
      id: 1,
      userEmail: "user1@example.com",
      subject: "Tool TikTok báo lỗi captcha",
      status: "open",
      createdAt: "2025-12-03 09:30",
    },
    {
      id: 2,
      userEmail: "user2@example.com",
      subject: "Không tải được file sau khi thanh toán",
      status: "closed",
      createdAt: "2025-12-01 21:10",
    },
  ];

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-lg font-semibold">Support Tickets</h1>
        <p className="text-xs text-white/60">
          Quản lý yêu cầu hỗ trợ, bug report, liên hệ từ khách hàng.
        </p>
      </div>

      <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
        <table className="min-w-full text-sm">
          <thead className="bg-white/5 text-xs uppercase text-white/60">
            <tr>
              <th className="px-4 py-3 text-left">Ticket #</th>
              <th className="px-4 py-3 text-left">User</th>
              <th className="px-4 py-3 text-left">Subject</th>
              <th className="px-4 py-3 text-center">Status</th>
              <th className="px-4 py-3 text-left">Created</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((t) => (
              <tr
                key={t.id}
                className="border-t border-white/5 hover:bg-white/5"
              >
                <td className="px-4 py-3">{t.id}</td>
                <td className="px-4 py-3">{t.userEmail}</td>
                <td className="px-4 py-3">{t.subject}</td>
                <td className="px-4 py-3 text-center">
                  {t.status === "open" ? (
                    <span className="text-yellow-300">Open</span>
                  ) : (
                    <span className="text-emerald-400">Closed</span>
                  )}
                </td>
                <td className="px-4 py-3">{t.createdAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
