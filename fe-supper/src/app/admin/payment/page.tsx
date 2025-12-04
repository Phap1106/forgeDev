"use client";

import { useEffect, useState } from "react";
import Modal from "@/components/admin/Modal";

type PaymentRow = {
  id: number;
  userEmail: string;
  amount: number;
  createdAt: string;
  status: "Pending" | "Completed";
};

export default function PaymentsPage() {
  const [payments, setPayments] = useState<PaymentRow[]>([]);
  const [showQR, setShowQR] = useState(false);
  const [qrUrl, setQrUrl] = useState<string>("");

  useEffect(() => {
    // TODO: call API GET /payments
    setPayments([
      {
        id: 1,
        userEmail: "user1@example.com",
        amount: 200000,
        createdAt: "2025-12-02 10:30",
        status: "Pending",
      },
      {
        id: 2,
        userEmail: "user2@example.com",
        amount: 500000,
        createdAt: "2025-12-01 18:10",
        status: "Completed",
      },
    ]);

    setQrUrl(
      "https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=FORGEVAULT-PAYMENT",
    );
  }, []);

  const markCompleted = (id: number) => {
    // TODO: call API PATCH /payments/:id
    setPayments((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, status: "Completed" } : p,
      ),
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold">Payment Management</h1>
          <p className="text-xs text-white/60">
            Xem lịch sử nạp tiền, xử lý giao dịch và quản lý QR thanh toán.
          </p>
        </div>
        <button
          onClick={() => setShowQR(true)}
          className="rounded-xl bg-white/10 px-3 py-2 text-xs hover:bg-white/15"
        >
          Xem QR thanh toán mặc định
        </button>
      </div>

      <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
        <table className="min-w-full text-sm">
          <thead className="bg-white/5 text-xs uppercase text-white/60">
            <tr>
              <th className="px-4 py-3 text-left">User</th>
              <th className="px-4 py-3 text-right">Số tiền</th>
              <th className="px-4 py-3 text-left">Thời gian</th>
              <th className="px-4 py-3 text-center">Trạng thái</th>
              <th className="px-4 py-3 text-center">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((p) => (
              <tr
                key={p.id}
                className="border-t border-white/5 hover:bg-white/5"
              >
                <td className="px-4 py-3 text-left">{p.userEmail}</td>
                <td className="px-4 py-3 text-right">
                  {p.amount.toLocaleString("vi-VN")} ₫
                </td>
                <td className="px-4 py-3 text-left">{p.createdAt}</td>
                <td className="px-4 py-3 text-center">
                  {p.status === "Completed" ? (
                    <span className="text-emerald-400">Completed</span>
                  ) : (
                    <span className="text-yellow-300">Pending</span>
                  )}
                </td>
                <td className="px-4 py-3 text-center">
                  {p.status === "Pending" && (
                    <button
                      onClick={() => markCompleted(p.id)}
                      className="text-xs text-emerald-400 hover:underline"
                    >
                      Xác nhận
                    </button>
                  )}
                </td>
              </tr>
            ))}
            {payments.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="px-4 py-4 text-center text-xs text-white/60"
                >
                  Chưa có giao dịch nào.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Modal open={showQR} title="QR thanh toán mặc định" onClose={() => setShowQR(false)}>
        <div className="flex flex-col items-center gap-3">
          {qrUrl && (
            <img src={qrUrl} alt="QR" className="h-44 w-44 rounded-lg bg-white" />
          )}
          <p className="text-xs text-white/60">
            Khách hàng sẽ quét mã này để chuyển khoản. Sau khi đối soát, admin
            xác nhận giao dịch thành &gt; cộng tiền vào ví user.
          </p>
        </div>
      </Modal>
    </div>
  );
}
