"use client";

import { useState } from "react";
import DataTable, { DataTableColumn } from "@/components/admin/DataTable";
import ToolModal from "@/components/admin/ToolModal";

export type Tool = {
  id: number;
  name: string;
  category: string;
  price: number;
  delivery: "online" | "download";
  description?: string;
  imageUrl?: string;

  // MỚI: thông tin file/folder để tải về
  assetMode?: "file" | "folder";
  assetInfo?: string; // vd: "3 files", "Folder: tool-v1.0"
};

export default function ToolsPage() {
  const [tools, setTools] = useState<Tool[]>([
    {
      id: 1,
      name: "TikTok Account Farm Pro",
      category: "Automation",
      price: 990000,
      delivery: "online",
      description: "Tự động nuôi nhiều tài khoản TikTok với proxy + LDPlayer.",
    },
    {
      id: 2,
      name: "Gmail Creator Script",
      category: "Download",
      price: 490000,
      delivery: "download",
      description: "Script tạo Gmail hàng loạt, xuất file cấu hình.",
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Tool | null>(null);

  const columns: DataTableColumn<Tool>[] = [
    { header: "Tên tool", field: "name" },
    { header: "Loại", field: "category" },
    {
      header: "Giá",
      field: "price",
      render: (value) => `${value.toLocaleString("vi-VN")} ₫`,
    },
    {
      header: "Hình thức",
      field: "delivery",
      render: (value) => (value === "online" ? "Online" : "Download"),
    },
  ];

  const openCreate = () => {
    setEditing(null);
    setShowModal(true);
  };

  const openEdit = (tool: Tool) => {
    setEditing(tool);
    setShowModal(true);
  };

  const handleDelete = (tool: Tool) => {
    if (!confirm(`Xoá tool "${tool.name}"?`)) return;
    // TODO: call API DELETE /tools/:id
    setTools((prev) => prev.filter((t) => t.id !== tool.id));
  };

  const handleSubmit = (data: Omit<Tool, "id">) => {
    if (editing) {
      // update
      // TODO: call API PUT /tools/:id
      setTools((prev) =>
        prev.map((t) => (t.id === editing.id ? { ...t, ...data } : t)),
      );
    } else {
      // create
      // TODO: call API POST /tools
      const newTool: Tool = { id: Date.now(), ...data };
      setTools((prev) => [...prev, newTool]);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold">Tool Management</h1>
          <p className="text-xs text-white/60">
            Quản lý tất cả các tool bán / cho thuê trên ForgeVault.
          </p>
        </div>
        <button
          onClick={openCreate}
          className="rounded-xl bg-emerald-500 px-4 py-2 text-sm font-semibold text-black hover:bg-emerald-400"
        >
          + Thêm tool
        </button>
      </div>

      <DataTable<Tool>
        columns={columns}
        data={tools}
        onEdit={openEdit}
        onDelete={handleDelete}
      />

      <ToolModal
        open={showModal}
        initialData={editing}
        onClose={() => setShowModal(false)}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
