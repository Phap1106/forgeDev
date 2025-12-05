// src/components/admin/PromotionModal.tsx
"use client";

import React, { useEffect, useState } from "react";

export type Promotion = {
  id?: string;
  title: string;
  description: string;
  startAt: string;
  endAt: string;
  imageUrl?: string;
};

type Props = {
  initial?: Promotion | null;
  onClose: () => void;
  onSave: (p: Promotion) => void;
};

export function PromotionModal({ initial, onClose, onSave }: Props) {
  const [title, setTitle] = useState(initial?.title ?? "");
  const [description, setDescription] = useState(initial?.description ?? "");
  const [startAt, setStartAt] = useState(initial?.startAt ?? "");
  const [endAt, setEndAt] = useState(initial?.endAt ?? "");
  const [imageUrl, setImageUrl] = useState(initial?.imageUrl ?? "");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    if (!file) {
      setPreview(imageUrl || null);
      return;
    }
    const url = URL.createObjectURL(file);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [file, imageUrl]);

  const isEdit = !!initial?.id;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSave({
      id: initial?.id,
      title: title.trim(),
      description: description.trim(),
      startAt,
      endAt,
      imageUrl: imageUrl.trim() || preview || undefined,
    });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative w-full max-w-xl rounded-3xl bg-[#050B10] border border-white/10 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">
            {isEdit ? "Chỉnh sửa khuyến mãi" : "Thêm khuyến mãi"}
          </h2>
          <button
            onClick={onClose}
            className="h-8 w-8 grid place-items-center rounded-xl bg-white/5 hover:bg-white/10 transition"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3 text-sm">
          <div>
            <label className="block text-xs text-white/60 mb-1">
              Tiêu đề *
            </label>
            <input
              className="w-full h-10 rounded-xl bg-black/40 ring-1 ring-white/15 px-3"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-xs text-white/60 mb-1">
              Mô tả ngắn
            </label>
            <textarea
              rows={3}
              className="w-full rounded-xl bg-black/40 ring-1 ring-white/15 px-3 py-2"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-white/60 mb-1">
                Bắt đầu
              </label>
              <input
                type="datetime-local"
                className="w-full h-10 rounded-xl bg-black/40 ring-1 ring-white/15 px-3"
                value={startAt}
                onChange={(e) => setStartAt(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-xs text-white/60 mb-1">
                Kết thúc
              </label>
              <input
                type="datetime-local"
                className="w-full h-10 rounded-xl bg-black/40 ring-1 ring-white/15 px-3"
                value={endAt}
                onChange={(e) => setEndAt(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
            <div>
              <label className="block text-xs text-white/60 mb-1">
                Ảnh banner (URL)
              </label>
              <input
                className="w-full h-10 rounded-xl bg-black/40 ring-1 ring-white/15 px-3"
                placeholder="https://..."
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-xs text-white/60 mb-1">
                Hoặc upload ảnh
              </label>
              <input
                type="file"
                accept="image/*"
                className="block w-full text-xs text-white/70"
                onChange={(e) => setFile(e.target.files?.[0] ?? null)}
              />
            </div>
          </div>

          {preview && (
            <div className="mt-2">
              <p className="text-xs text-white/60 mb-1">Preview:</p>
              <img
                src={preview}
                alt="Preview"
                className="w-full max-h-40 object-cover rounded-xl border border-white/10"
              />
            </div>
          )}

          <div className="flex justify-end gap-2 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="h-10 px-4 rounded-xl bg-black/40 text-xs text-white/75 ring-1 ring-white/15 hover:bg-black/60 transition"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="h-10 px-4 rounded-xl bg-emerald-400 text-black text-sm font-semibold hover:bg-emerald-300 transition"
            >
              {isEdit ? "Lưu thay đổi" : "Tạo khuyến mãi"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PromotionModal;
