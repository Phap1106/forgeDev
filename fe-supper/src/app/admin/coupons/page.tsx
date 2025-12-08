// src/app/admin/coupons/page.tsx
"use client";

import { useState } from "react";
import DataTable, {
  DataTableColumn,
} from "@/components/admin/DataTable";
import CouponModal, {
  Coupon,
} from "@/components/admin/CouponModal";

const INITIAL_COUPONS: Coupon[] = [
  {
    id: "1",
    code: "FORGE50",
    description: "Giảm 50% tối đa 500K cho khách mới.",
    discountType: "percent",
    value: 50,
    maxUses: 100,
    usedCount: 10,
    validFrom: "2025-01-01T00:00",
    validTo: "2025-12-31T23:59",
    status: "active",
  },
  {
    id: "2",
    code: "TVIP100",
    description: "Giảm thẳng 100K cho mọi đơn.",
    discountType: "fixed",
    value: 100000,
    maxUses: 0, // 0 = không giới hạn
    usedCount: 5,
    validFrom: undefined,
    validTo: undefined,
    status: "inactive",
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
      if (value.id) {
        // update
        return prev.map((c) => (c.id === value.id ? value : c));
      }
      // create
      const newItem: Coupon = {
        ...value,
        id: crypto.randomUUID(),
        usedCount: value.usedCount ?? 0,
      };
      return [...prev, newItem];
    });
    setModalOpen(false);
    setEditing(null);
  };

  const columns: DataTableColumn<Coupon>[] = [
    { label: "MÃ", key: "code" },
    { label: "MÔ TẢ", key: "description" },
    {
      label: "LOẠI",
      key: "discountType",
      render: (value) =>
        value === "percent" ? "Theo %" : "Giảm thẳng (VND)",
    },
    {
      label: "GIÁ TRỊ",
      key: "value",
      render: (value, row) =>
        row.discountType === "percent"
          ? `${value}%`
          : `${Number(value).toLocaleString("vi-VN")}₫`,
    },
    {
      label: "SỬ DỤNG",
      render: (_value, row) =>
        `${row.usedCount} / ${row.maxUses > 0 ? row.maxUses : "∞"}`,
    },
    {
      label: "THỜI GIAN",
      render: (_value, row) => {
        if (!row.validFrom && !row.validTo) {
          return "Không giới hạn";
        }
        const from = row.validFrom
          ? new Date(row.validFrom).toLocaleString("vi-VN")
          : "—";
        const to = row.validTo
          ? new Date(row.validTo).toLocaleString("vi-VN")
          : "Không giới hạn";
        return `${from} - ${to}`;
      },
    },
    {
      label: "TRẠNG THÁI",
      key: "status",
      render: (value) => {
        const isActive = value === "active";
        return (
          <span
            className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] ${
              isActive
                ? "bg-emerald-500/15 text-emerald-300"
                : "bg-white/5 text-white/55"
            }`}
          >
            {isActive ? "Đang bật" : "Đã tắt"}
          </span>
        );
      },
    },
  ];

  return (
    <div className="space-y-6">
      {/* header nhỏ trong content */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[11px] uppercase tracking-[0.18em] text-emerald-300">
            Admin
          </p>
          <h1 className="mt-1 text-lg font-semibold">Coupons</h1>
          <p className="mt-1 text-xs text-white/60">
            Tạo và quản lý mã khuyến mãi, theo dõi số lần sử dụng.
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

      <DataTable<Coupon>
        columns={columns}
        data={coupons}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {modalOpen && (
        <CouponModal
          initial={editing ?? undefined}
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
