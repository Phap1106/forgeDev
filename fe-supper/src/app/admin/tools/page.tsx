"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import DataTable, { DataTableColumn } from "@/components/admin/DataTable";
import ToolModal from "@/components/admin/ToolModal";
import {
  fetchTools,
  createTool,
  updateTool,
  deleteTool,
  ToolDto,
} from "@/api/toolsApi";

export default function AdminToolsPage() {
  const [items, setItems] = useState<ToolDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [editing, setEditing] = useState<ToolDto | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchTools();
        setItems(data);
      } catch (err: any) {
        toast.error(err.message || "Failed to load tools.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const columns: DataTableColumn<ToolDto>[] = [
    { label: "Name", key: "name" },
    { label: "Category", key: "category" },
    {
      label: "Base price",
      render: (row) =>
        `${(row.priceVnd ?? 0).toLocaleString("vi-VN")} VND`,
    },
    {
      label: "Billing",
      render: (row) =>
        row.billingMode === "rental" ? "Rental" : "One-time",
    },
    {
      label: "Status",
      render: (row) => row.status ?? "draft",
    },
  ];

  async function handleSave(tool: ToolDto) {
    try {
      let saved: ToolDto;

      if (tool.id) {
        saved = await updateTool(tool.id, tool);
        setItems((prev) =>
          prev.map((t) => (t.id === saved.id ? saved : t)),
        );
      } else {
        saved = await createTool(tool);
        setItems((prev) => [...prev, saved]);
      }

      toast.success("Tool saved successfully.");
      setEditing(null);
      setOpenModal(false);
    } catch (err: any) {
      toast.error(err.message || "Failed to save tool.");
    }
  }

  async function handleDelete(tool: ToolDto) {
    if (!tool.id) return;
    if (!window.confirm(`Delete tool "${tool.name}"?`)) return;
    try {
      await deleteTool(tool.id);
      setItems((prev) => prev.filter((t) => t.id !== tool.id));
      toast.success("Tool deleted.");
    } catch (err: any) {
      toast.error(err.message || "Failed to delete tool.");
    }
  }

  return (
    <div className="min-h-screen bg-[#050B10] text-white px-4 sm:px-6 lg:px-8 py-10">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold">Tools</h1>
            <p className="text-sm text-white/65">
              Manage ForgeVault tools, pricing and rental packages.
            </p>
          </div>
          <button
            onClick={() => {
              setEditing(null);
              setOpenModal(true);
            }}
            className="px-4 py-2 text-sm font-semibold bg-emerald-500 text-black hover:bg-emerald-400 transition rounded-sm"
          >
            New tool
          </button>
        </div>

        <DataTable
          columns={columns}
          data={items}
          loading={loading}
          getRowKey={(row) => row.id ?? row.slug ?? row.name}
          onEdit={(row) => {
            setEditing(row);
            setOpenModal(true);
          }}
          onDelete={handleDelete}
        />
      </div>

      <ToolModal
        open={openModal}
        initial={editing}
        onClose={() => {
          setOpenModal(false);
          setEditing(null);
        }}
        onSave={handleSave}
      />
    </div>
  );
}
