"use client";

import { useEffect, useState } from "react";
import Modal from "./Modal";
import type { PromotionRow } from "@/app/admin/promotions/page";

type Props = {
  open: boolean;
  initialData: PromotionRow | null;
  onClose: () => void;
  onSubmit: (data: Omit<PromotionRow, "id">) => void;
};

export default function PromotionModal({
  open,
  initialData,
  onClose,
  onSubmit,
}: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!open) return;
    if (initialData) {
      setTitle(initialData.title);
      setDescription(initialData.description);
      setStartDate(initialData.startDate);
      setEndDate(initialData.endDate);
    } else {
      setTitle("");
      setDescription("");
      setStartDate("");
      setEndDate("");
    }
    setErrors({});
  }, [open, initialData]);

  const handleSubmit = () => {
    const nextErrors: Record<string, string> = {};
    if (!title.trim()) nextErrors.title = "Tiêu đề bắt buộc.";
    if (!description.trim()) nextErrors.description = "Mô tả bắt buộc.";
    if (!startDate) nextErrors.startDate = "Chọn thời gian bắt đầu.";
    if (!endDate) nextErrors.endDate = "Chọn thời gian kết thúc.";
    if (startDate && endDate && new Date(startDate) > new Date(endDate)) {
      nextErrors.endDate = "Kết thúc phải sau thời gian bắt đầu.";
    }

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    onSubmit({ title, description, startDate, endDate, image: initialData?.image });
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={initialData ? "Chỉnh sửa khuyến mãi" : "Thêm khuyến mãi"}
    >
      <div className="space-y-3 text-sm">
        <Field
          label="Tiêu đề"
          required
          error={errors.title}
          input={
            <input
              className="w-full rounded-xl border border-white/15 bg-black/40 px-3 py-2 text-sm"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          }
        />
        <Field
          label="Mô tả"
          required
          error={errors.description}
          input={
            <textarea
              rows={3}
              className="w-full rounded-xl border border-white/15 bg-black/40 px-3 py-2 text-sm"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          }
        />
        <Field
          label="Bắt đầu"
          required
          error={errors.startDate}
          input={
            <input
              type="datetime-local"
              className="w-full rounded-xl border border-white/15 bg-black/40 px-3 py-2 text-sm"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          }
        />
        <Field
          label="Kết thúc"
          required
          error={errors.endDate}
          input={
            <input
              type="datetime-local"
              className="w-full rounded-xl border border-white/15 bg-black/40 px-3 py-2 text-sm"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          }
        />
        <div className="pt-2 text-right">
          <button
            onClick={handleSubmit}
            className="rounded-xl bg-emerald-500 px-4 py-2 text-sm font-semibold text-black hover:bg-emerald-400"
          >
            {initialData ? "Lưu thay đổi" : "Thêm khuyến mãi"}
          </button>
        </div>
      </div>
    </Modal>
  );
}

function Field({
  label,
  required,
  error,
  input,
}: {
  label: string;
  required?: boolean;
  error?: string;
  input: React.ReactNode;
}) {
  return (
    <div>
      <div className="mb-1 flex items-center gap-1 text-xs font-medium text-white/70">
        <span>{label}</span>
        {required && <span className="text-red-400">*</span>}
      </div>
      {input}
      {error && <p className="mt-1 text-[11px] text-red-400">{error}</p>}
    </div>
  );
}
