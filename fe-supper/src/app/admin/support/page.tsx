// src/app/admin/support/page.tsx
"use client";

import React, { useState } from "react";
import DataTable  from "@/components/admin/DataTable";

type TicketStatus = "new" | "in_progress" | "resolved" | "closed";

type Ticket = {
  id: string;
  user: string;
  subject: string;
  createdAt: string;
  status: TicketStatus;
};

const INITIAL_TICKETS: Ticket[] = [
  {
    id: "1",
    user: "user1@example.com",
    subject: "Không nhận được file download",
    createdAt: "2025-12-04 20:00",
    status: "new",
  },
  {
    id: "2",
    user: "user2@example.com",
    subject: "Tool farm TikTok lỗi đăng nhập",
    createdAt: "2025-12-04 18:30",
    status: "in_progress",
  },
];

function statusLabel(status: TicketStatus) {
  switch (status) {
    case "new":
      return "New";
    case "in_progress":
      return "Đang xử lý";
    case "resolved":
      return "Đã xử lý";
    case "closed":
      return "Đóng";
  }
}

function statusClass(status: TicketStatus) {
  switch (status) {
    case "new":
      return "text-xs text-emerald-300";
    case "in_progress":
      return "text-xs text-yellow-300";
    case "resolved":
      return "text-xs text-sky-300";
    case "closed":
      return "text-xs text-white/50";
  }
}

export default function AdminSupportPage() {
  const [tickets, setTickets] = useState<Ticket[]>(INITIAL_TICKETS);

  function updateStatus(id: string, status: TicketStatus) {
    setTickets((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status } : t))
    );
  }

  return (
    <div className="flex-1 px-6 py-6">
      <div className="mb-4">
        <p className="text-xs uppercase tracking-[0.18em] text-emerald-300">
          Admin
        </p>
        <h1 className="mt-1 text-xl font-semibold">Support</h1>
        <p className="text-xs text-white/60">
          Theo dõi phản hồi của user, cập nhật trạng thái để biết ticket đã xử
          lý hay chưa.
        </p>
      </div>

      <div className="rounded-2xl bg-[#050B10] border border-white/10">
        <DataTable
          columns={[
            { key: "subject", label: "TIÊU ĐỀ" },
            { key: "user", label: "USER" },
            { key: "createdAt", label: "NGÀY TẠO" },
            {
              key: "status",
              label: "TRẠNG THÁI",
              render: (row: Ticket) => (
                <select
                  value={row.status}
                  onChange={(e) =>
                    updateStatus(row.id, e.target.value as TicketStatus)
                  }
                  className="bg-black/40 border border-white/10 rounded-lg px-2 py-1 text-xs"
                >
                  <option value="new">New</option>
                  <option value="in_progress">Đang xử lý</option>
                  <option value="resolved">Đã xử lý</option>
                  <option value="closed">Đóng</option>
                </select>
              ),
            },
          ]}
          rows={tickets}
          getRowId={(row) => row.id}
          onEdit={undefined}
          onDelete={undefined}
        />
      </div>
    </div>
  );
}
