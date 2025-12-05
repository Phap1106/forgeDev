// src/components/admin/CouponModal.tsx
"use client";

import React, { useState } from "react";

export type CouponStatus = "active" | "inactive";
export type DiscountType = "percent" | "fixed";

export type Coupon = {
  id?: string;
  code: string;
  description: string;
  discountType: DiscountType;
  value: number;
  maxUses: number;
  usedCount: number;
  validFrom?: string;
  validTo?: string;
  status: CouponStatus;
};

type Props = {
  initial?: Coupon | null;
  onClose: () => void;
  onSave: (c: Coupon) => void;
};

export function CouponModal({ initial, onClose, onSave }: Props) {
  const [code, setCode] = useState(initial?.code ?? "");
  const [description, setDescription] = useState(initial?.description ?? "");
  const [discountType, setDiscountType] = useState<DiscountType>(
    initial?.discountType ?? "percent"
  );
  const [value, setValue] = useState(initial?.value ?? 10);
  const [maxUses, setMaxUses] = useState(initial?.maxUses ?? 100);
  const [usedCount] = useState(initial?.usedCount ?? 0);
  const [validFrom, setValidFrom] = useState(initial?.validFrom ?? "");
  const [validTo, setValidTo] = useState(initial?.validTo ?? "");
  const [status, setStatus] = useState<CouponStatus>(
    initial?.status ?? "active"
  );

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSave({
      id: initial?.id,
      code: code.trim().toUpperCase(),
      description: description.trim(),
      discountType,
      value: Number(value) || 0,
      maxUses: Number(maxUses) || 0,
      usedCount,
      validFrom: validFrom || undefined,
      validTo: validTo || undefined,
      status,
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
            {initial ? "Chỉnh sửa coupon" : "Tạo coupon mới"}
          </h2>
          <button
            onClick={onClose}
            className="h-8 w-8 grid place-items-center rounded-xl bg-white/5 hover:bg-white/10 transition"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3 text-sm">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-3">
            <div>
              <label className="block text-xs text-white/60 mb-1">
                Mã coupon *
              </label>
              <input
                className="w-full h-10 rounded-xl bg-black/40 ring-1 ring-white/15 px-3 uppercase"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-xs text-white/60 mb-1">
                Trạng thái
              </label>
              <select
                className="w-full h-10 rounded-xl bg-black/40 ring-1 ring-white/15 px-3"
                value={status}
                onChange={(e) =>
                  setStatus(e.target.value as CouponStatus)
                }
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs text-white/60 mb-1">
              Mô tả
            </label>
            <input
              className="w-full h-10 rounded-xl bg-black/40 ring-1 ring-white/15 px-3"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs text-white/60 mb-1">
                Kiểu giảm
              </label>
              <select
                className="w-full h-10 rounded-xl bg-black/40 ring-1 ring-white/15 px-3"
                value={discountType}
                onChange={(e) =>
                  setDiscountType(e.target.value as DiscountType)
                }
              >
                <option value="percent">Phần trăm (%)</option>
                <option value="fixed">Số tiền (VND)</option>
              </select>
            </div>
            <div>
              <label className="block text-xs text-white/60 mb-1">
                Giá trị
              </label>
              <input
                type="number"
                min={0}
                className="w-full h-10 rounded-xl bg-black/40 ring-1 ring-white/15 px-3"
                value={value}
                onChange={(e) => setValue(Number(e.target.value))}
              />
            </div>
            <div>
              <label className="block text-xs text-white/60 mb-1">
                Số lần sử dụng tối đa
              </label>
              <input
                type="number"
                min={0}
                className="w-full h-10 rounded-xl bg-black/40 ring-1 ring-white/15 px-3"
                value={maxUses}
                onChange={(e) => setMaxUses(Number(e.target.value))}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-white/60 mb-1">
                Từ ngày
              </label>
              <input
                type="datetime-local"
                className="w-full h-10 rounded-xl bg-black/40 ring-1 ring-white/15 px-3"
                value={validFrom}
                onChange={(e) => setValidFrom(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-xs text-white/60 mb-1">
                Đến ngày
              </label>
              <input
                type="datetime-local"
                className="w-full h-10 rounded-xl bg-black/40 ring-1 ring-white/15 px-3"
                value={validTo}
                onChange={(e) => setValidTo(e.target.value)}
              />
            </div>
          </div>

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
              {initial ? "Lưu thay đổi" : "Tạo coupon"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CouponModal;
