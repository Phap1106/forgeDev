// src/app/admin/coupons/page.tsx
"use client";

import { useState } from "react";
import DataTable from "@/components/admin/DataTable";
import type { DataTableColumn } from "@/components/admin/DataTable";
import CouponModal from "@/components/admin/CouponModal";

export type CouponType = "percent" | "fixed";

export type Coupon = {
  id: string;
  code: string;
  description: string;
  type: CouponType;     // "percent" = theo %, "fixed" = giảm thẳng VND
  value: number;
  expiresAt?: string;   // chuỗi ngày hiển thị
  isActive: boolean;
};

const INITIAL_COUPONS: Coupon[] = [
  {
    id: "1",
    code: "FORGE50",
    description: "Giảm 50% tối đa 500K cho khách mới.",
    type: "percent",
    value: 50,
    expiresAt: "1/1/2026",
    isActive: true,
  },
  {
    id: "2",
    code: "TVIP100",
    description: "Giảm thẳng 100K cho mọi đơn.",
    type: "fixed",
    value: 100000,
    expiresAt: "Không giới hạn",
    isActive: false,
  },
];

export default function AdminCouponsPage() {
  const [coupons, setCoupons] = useState<Coupon[]>(INITIAL_COUPONS);
  const [editing, setEditing] = useState<Coupon | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleCreate = () => {
    setEditing(null);
    setModalOpen(true);
  };

  const handleEdit = (coupon: Coupon) => {
    setEditing(coupon);
    setModalOpen(true);
  };

  const handleDelete = (coupon: Coupon) => {
    if (!confirm(`Xoá mã khuyến mãi ${coupon.code}?`)) return;
    setCoupons((prev) => prev.filter((c) => c.id !== coupon.id));
  };

  const handleSave = (value: Coupon) => {
    setCoupons((prev) => {
      const exists = prev.find((c) => c.id === value.id);
      if (exists) {
        return prev.map((c) => (c.id === value.id ? value : c));
      }
      return [...prev, { ...value, id: crypto.randomUUID() }];
    });
    setModalOpen(false);
    setEditing(null);
  };

  const columns: DataTableColumn<Coupon>[] = [
    { label: "MÃ", key: "code" },
    { label: "MÔ TẢ", key: "description" },
    {
      label: "LOẠI",
      render: (row) => (row.type === "percent" ? "Theo %" : "Giảm thẳng (VND)"),
    },
    {
      label: "GIÁ TRỊ",
      render: (row) =>
        row.type === "percent"
          ? `${row.value}%`
          : `${row.value.toLocaleString("vi-VN")}₫`,
    },
    { label: "HẾT HẠN", key: "expiresAt" },
    {
      label: "TRẠNG THÁI",
      render: (row) => (
        <span
          className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] ${
            row.isActive
              ? "bg-emerald-500/15 text-emerald-300"
              : "bg-white/5 text-white/55"
          }`}
        >
          {row.isActive ? "Đang bật" : "Đã tắt"}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* tiêu đề trang (layout admin đã có header chung rồi) */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[11px] uppercase tracking-[0.18em] text-emerald-300">
            Admin
          </p>
          <h1 className="mt-1 text-lg font-semibold">Coupons</h1>
          <p className="mt-1 text-xs text-white/60">
            Tạo và quản lý mã khuyến mãi để áp dụng khi khách mua / thuê tool.
          </p>
        </div>

        <button
          type="button"
          onClick={handleCreate}
          className="rounded-xl bg-emerald-400 px-4 py-2 text-sm font-semibold text-black hover:bg-emerald-300 transition"
        >
          + Tạo mã khuyến mãi
        </button>
      </div>

      {/* bảng dữ liệu – KHÔNG bọc lại Sidebar / Header gì nữa */}
      <DataTable<Coupon>
        columns={columns}
        data={coupons}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* modal tạo / sửa coupon */}
      {modalOpen && (
        <CouponModal
          open={modalOpen}
          initialValue={editing ?? undefined}
          onClose={() => {
            setModalOpen(false);
            setEditing(null);
          }}
          onSave={handleSave}
        />
      )}
    </div>
  );
}
