"use client";

import { useState } from "react";
import DataTable, { DataTableColumn } from "@/components/admin/DataTable";
import UserModal from "@/components/admin/UserModal";

export type UserRow = {
  id: number;
  email: string;
  role: "admin" | "customer";
  balance: number;
  status: "Active" | "Banned";
};

export default function UsersPage() {
  const [users, setUsers] = useState<UserRow[]>([
    {
      id: 1,
      email: "admin@forgevault.io",
      role: "admin",
      balance: 0,
      status: "Active",
    },
    {
      id: 2,
      email: "user1@example.com",
      role: "customer",
      balance: 300000,
      status: "Active",
    },
    {
      id: 3,
      email: "user2@example.com",
      role: "customer",
      balance: 0,
      status: "Banned",
    },
  ]);

  const [selected, setSelected] = useState<UserRow | null>(null);
  const [open, setOpen] = useState(false);

  const columns: DataTableColumn<UserRow>[] = [
    { header: "Email", field: "email" },
    {
      header: "Vai trò",
      field: "role",
      render: (value) => (value === "admin" ? "Admin" : "Customer"),
    },
    {
      header: "Số dư",
      field: "balance",
      render: (value) => `${value.toLocaleString("vi-VN")} ₫`,
    },
    {
      header: "Trạng thái",
      field: "status",
      render: (value) =>
        value === "Active" ? (
          <span className="text-emerald-400">Active</span>
        ) : (
          <span className="text-red-400">Banned</span>
        ),
    },
  ];

  const openEdit = (row: UserRow) => {
    setSelected(row);
    setOpen(true);
  };

  const handleSubmit = (data: Pick<UserRow, "role" | "status">) => {
    if (!selected) return;
    // TODO: call API PATCH /users/:id
    setUsers((prev) =>
      prev.map((u) =>
        u.id === selected.id ? { ...u, role: data.role, status: data.status } : u,
      ),
    );
  };

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-lg font-semibold">User Management</h1>
        <p className="text-xs text-white/60">
          Quản lý tài khoản, phân quyền và trạng thái người dùng.
        </p>
      </div>

      <DataTable<UserRow>
        columns={columns}
        data={users}
        onEdit={openEdit}
      />

      <UserModal
        open={open}
        user={selected}
        onClose={() => setOpen(false)}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
