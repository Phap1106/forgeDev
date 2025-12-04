"use client";

import { useState } from "react";
import DataTable, { DataTableColumn } from "@/components/admin/DataTable";
import PromotionModal from "@/components/admin/PromotionModal";

export type PromotionRow = {
  id: number;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  image?: string;
};

export default function PromotionsPage() {
  const [promos, setPromos] = useState<PromotionRow[]>([
    {
      id: 1,
      title: "Giảm 50% tool TikTok Farm",
      description: "Chương trình khuyến mãi cuối tuần.",
      startDate: "2025-12-05T00:00",
      endDate: "2025-12-10T23:59",
    },
  ]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<PromotionRow | null>(null);

  const columns: DataTableColumn<PromotionRow>[] = [
    { header: "Tiêu đề", field: "title" },
    {
      header: "Thời gian",
      field: "startDate",
      render: (_, row) =>
        `${new Date(row.startDate).toLocaleString("vi-VN")} - ${new Date(
          row.endDate,
        ).toLocaleString("vi-VN")}`,
    },
    { header: "Mô tả", field: "description" },
  ];

  const openCreate = () => {
    setEditing(null);
    setOpen(true);
  };

  const openEdit = (row: PromotionRow) => {
    setEditing(row);
    setOpen(true);
  };

  const handleSubmit = (data: Omit<PromotionRow, "id">) => {
    if (editing) {
      setPromos((prev) =>
        prev.map((p) => (p.id === editing.id ? { ...p, ...data } : p)),
      );
    } else {
      setPromos((prev) => [...prev, { id: Date.now(), ...data }]);
    }
  };

  const handleDelete = (row: PromotionRow) => {
    if (!confirm(`Xoá khuyến mãi "${row.title}"?`)) return;
    setPromos((prev) => prev.filter((p) => p.id !== row.id));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold">Promotions</h1>
          <p className="text-xs text-white/60">
            Quản lý banner / bài quảng cáo sẽ hiển thị trên trang chủ.
          </p>
        </div>
        <button
          onClick={openCreate}
          className="rounded-xl bg-emerald-500 px-4 py-2 text-sm font-semibold text-black hover:bg-emerald-400"
        >
          + Thêm khuyến mãi
        </button>
      </div>

      <DataTable<PromotionRow>
        columns={columns}
        data={promos}
        onEdit={openEdit}
        onDelete={handleDelete}
      />

      <PromotionModal
        open={open}
        initialData={editing}
        onClose={() => setOpen(false)}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
