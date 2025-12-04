"use client";

import { useEffect, useState } from "react";
import Modal from "./Modal";
import type { UserRow } from "@/app/admin/users/page";

type Props = {
  open: boolean;
  user: UserRow | null;
  onClose: () => void;
  onSubmit: (data: Pick<UserRow, "role" | "status">) => void;
};

export default function UserModal({ open, user, onClose, onSubmit }: Props) {
  const [role, setRole] = useState<"admin" | "customer">("customer");
  const [status, setStatus] = useState<"Active" | "Banned">("Active");

  useEffect(() => {
    if (!open || !user) return;
    setRole(user.role);
    setStatus(user.status);
  }, [open, user]);

  const handleSubmit = () => {
    if (!user) return;
    onSubmit({ role, status });
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} title="Cập nhật người dùng">
      {user ? (
        <div className="space-y-4 text-sm">
          <div>
            <p className="text-xs text-white/60">Email</p>
            <p className="mt-1 rounded-xl bg-black/40 px-3 py-2 text-sm">
              {user.email}
            </p>
          </div>
          <div>
            <p className="mb-1 text-xs text-white/60">Vai trò</p>
            <select
              className="w-full rounded-xl border border-white/15 bg-black/40 px-3 py-2 text-sm"
              value={role}
              onChange={(e) =>
                setRole(e.target.value as "admin" | "customer")
              }
            >
              <option value="customer">Customer</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div>
            <p className="mb-1 text-xs text-white/60">Trạng thái</p>
            <select
              className="w-full rounded-xl border border-white/15 bg-black/40 px-3 py-2 text-sm"
              value={status}
              onChange={(e) =>
                setStatus(e.target.value as "Active" | "Banned")
              }
            >
              <option value="Active">Active</option>
              <option value="Banned">Banned</option>
            </select>
          </div>
          <div className="pt-2 text-right">
            <button
              onClick={handleSubmit}
              className="rounded-xl bg-emerald-500 px-4 py-2 text-sm font-semibold text-black hover:bg-emerald-400"
            >
              Lưu thay đổi
            </button>
          </div>
        </div>
      ) : (
        <p className="text-xs text-white/60">
          Không tìm thấy thông tin người dùng.
        </p>
      )}
    </Modal>
  );
}
