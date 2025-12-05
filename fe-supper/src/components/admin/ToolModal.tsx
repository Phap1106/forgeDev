// src/components/admin/ToolModal.tsx
"use client";

import React, { useEffect, useMemo, useState } from "react";

type DeliveryType = "online" | "download";
type BillingMode = "one_time" | "rental";
type RentalStrategy = "fixed_packages" | "user_choose";

export type Tool = {
  id?: string;
  name: string;
  category: string;
  price: number; // one-time price mặc định
  description: string;
  deliveryType: DeliveryType;
  billingMode: BillingMode;
  hourlyPrice?: number;
  rentalStrategy?: RentalStrategy;
  rentalPackages?: string[];
  downloadUrl?: string;
  downloadFileName?: string;
};

type Props = {
  initial?: Tool | null;
  onClose: () => void;
  onSave: (tool: Tool) => void;
};

const RENTAL_OPTIONS = [
  { key: "1d", label: "1 ngày", hours: 24 },
  { key: "2d", label: "2 ngày", hours: 48 },
  { key: "3d", label: "3 ngày", hours: 72 },
  { key: "7d", label: "7 ngày", hours: 7 * 24 },
  { key: "14d", label: "14 ngày", hours: 14 * 24 },
  { key: "1m", label: "1 tháng", hours: 30 * 24 },
  { key: "3m", label: "3 tháng", hours: 90 * 24 },
  { key: "1y", label: "1 năm", hours: 365 * 24 },
  { key: "2y", label: "2 năm", hours: 730 * 24 },
  { key: "forever", label: "Vĩnh viễn", hours: 0 },
];

export function ToolModal({ initial, onClose, onSave }: Props) {
  const [name, setName] = useState(initial?.name ?? "");
  const [category, setCategory] = useState(initial?.category ?? "Automation");
  const [price, setPrice] = useState(initial?.price ?? 0);
  const [description, setDescription] = useState(initial?.description ?? "");
  const [deliveryType, setDeliveryType] = useState<DeliveryType>(
    initial?.deliveryType ?? "online"
  );
  const [billingMode, setBillingMode] = useState<BillingMode>(
    initial?.billingMode ?? "one_time"
  );
  const [rentalStrategy, setRentalStrategy] =
    useState<RentalStrategy>(initial?.rentalStrategy ?? "fixed_packages");
  const [hourlyPrice, setHourlyPrice] = useState<number>(
    initial?.hourlyPrice ?? 0
  );
  const [rentalPackages, setRentalPackages] = useState<string[]>(
    initial?.rentalPackages ?? ["7d", "1m"]
  );
  const [downloadUrl, setDownloadUrl] = useState(initial?.downloadUrl ?? "");
  const [downloadFile, setDownloadFile] = useState<File | null>(null);
  const [downloadFilePreview, setDownloadFilePreview] = useState<string | null>(
    null
  );

  useEffect(() => {
    if (!downloadFile) {
      setDownloadFilePreview(null);
      return;
    }
    const url = URL.createObjectURL(downloadFile);
    setDownloadFilePreview(url);
    return () => URL.revokeObjectURL(url);
  }, [downloadFile]);

  const isEdit = !!initial?.id;

  const computedPackages = useMemo(() => {
    if (!hourlyPrice || hourlyPrice <= 0) return [];
    return RENTAL_OPTIONS.filter((opt) =>
      rentalPackages.includes(opt.key)
    ).map((opt) => ({
      ...opt,
      price:
        opt.hours === 0
          ? price || 0 // vĩnh viễn → dùng price one-time nếu có
          : Math.round(hourlyPrice * opt.hours),
    }));
  }, [hourlyPrice, rentalPackages, price]);

  function toggleRentalPackage(key: string) {
    setRentalPackages((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const payload: Tool = {
      id: initial?.id,
      name: name.trim(),
      category: category.trim(),
      price: Number(price) || 0,
      description: description.trim(),
      deliveryType,
      billingMode,
      hourlyPrice:
        billingMode === "rental" ? Number(hourlyPrice) || 0 : undefined,
      rentalStrategy: billingMode === "rental" ? rentalStrategy : undefined,
      rentalPackages:
        billingMode === "rental" && rentalStrategy === "fixed_packages"
          ? rentalPackages
          : undefined,
      downloadUrl: deliveryType === "download" ? downloadUrl.trim() : undefined,
      downloadFileName:
        deliveryType === "download" && downloadFile
          ? downloadFile.name
          : initial?.downloadFileName,
    };

    onSave(payload);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative w-full max-w-2xl rounded-3xl bg-[#050B10] border border-white/10 p-6 shadow-[0_20px_80px_rgba(0,0,0,0.9)]">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">
            {isEdit ? "Chỉnh sửa tool" : "Thêm tool mới"}
          </h2>
          <button
            onClick={onClose}
            className="h-8 w-8 grid place-items-center rounded-xl bg-white/5 hover:bg-white/10 transition"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-sm">
          <div>
            <label className="block text-xs text-white/60 mb-1">
              Tên tool *
            </label>
            <input
              className="w-full h-10 rounded-xl bg-black/40 ring-1 ring-white/15 px-3 focus:outline-none focus:ring-emerald-400/50"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-white/60 mb-1">
                Loại tool *
              </label>
              <input
                className="w-full h-10 rounded-xl bg-black/40 ring-1 ring-white/15 px-3 focus:outline-none focus:ring-emerald-400/50"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Automation, Account, Proxy,…"
              />
            </div>
            <div>
              <label className="block text-xs text-white/60 mb-1">
                Giá bán trọn đời (VND) *
              </label>
              <input
                type="number"
                min={0}
                className="w-full h-10 rounded-xl bg-black/40 ring-1 ring-white/15 px-3 focus:outline-none focus:ring-emerald-400/50"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs text-white/60 mb-1">
              Mô tả ngắn
            </label>
            <textarea
              rows={3}
              className="w-full rounded-xl bg-black/40 ring-1 ring-white/15 px-3 py-2 focus:outline-none focus:ring-emerald-400/50"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* Hình thức cung cấp */}
          <div className="space-y-2">
            <span className="block text-xs text-white/60">
              Hình thức cung cấp
            </span>
            <div className="flex gap-4 text-xs">
              <label className="inline-flex items-center gap-2">
                <input
                  type="radio"
                  className="accent-emerald-400"
                  checked={deliveryType === "online"}
                  onChange={() => setDeliveryType("online")}
                />
                <span>Online (chạy trực tiếp trên web)</span>
              </label>
              <label className="inline-flex items-center gap-2">
                <input
                  type="radio"
                  className="accent-emerald-400"
                  checked={deliveryType === "download"}
                  onChange={() => setDeliveryType("download")}
                />
                <span>Download (file / folder gửi cho khách)</span>
              </label>
            </div>
          </div>

          {deliveryType === "download" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-white/60 mb-1">
                  Link download (URL)
                </label>
                <input
                  className="w-full h-10 rounded-xl bg-black/40 ring-1 ring-white/15 px-3 focus:outline-none focus:ring-emerald-400/50"
                  placeholder="https://..."
                  value={downloadUrl}
                  onChange={(e) => setDownloadUrl(e.target.value)}
                />
                <p className="mt-1 text-[11px] text-white/45">
                  Sau này BE có thể dùng link từ storage (S3, GDrive, v.v…).
                </p>
              </div>
              <div>
                <label className="block text-xs text-white/60 mb-1">
                  Upload file (.zip, .rar, .pdf…)
                </label>
                <input
                  type="file"
                  className="block w-full text-xs text-white/70"
                  onChange={(e) =>
                    setDownloadFile(e.target.files?.[0] ?? null)
                  }
                />
                {downloadFilePreview && (
                  <p className="mt-1 text-[11px] text-white/50">
                    Đã chọn file: {downloadFile?.name}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Hình thức thanh toán */}
          <div className="space-y-3">
            <span className="block text-xs text-white/60">
              Hình thức thanh toán
            </span>
            <div className="flex flex-col md:flex-row gap-3 text-xs">
              <label className="inline-flex items-center gap-2">
                <input
                  type="radio"
                  className="accent-emerald-400"
                  checked={billingMode === "one_time"}
                  onChange={() => setBillingMode("one_time")}
                />
                <span>Mua trọn đời (1 lần)</span>
              </label>
              <label className="inline-flex items-center gap-2">
                <input
                  type="radio"
                  className="accent-emerald-400"
                  checked={billingMode === "rental"}
                  onChange={() => setBillingMode("rental")}
                />
                <span>Thuê theo thời gian</span>
              </label>
            </div>

            {billingMode === "rental" && (
              <div className="space-y-3 rounded-2xl bg-black/40 ring-1 ring-white/10 p-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-white/60 mb-1">
                      Giá theo giờ (VND) *
                    </label>
                    <input
                      type="number"
                      min={0}
                      className="w-full h-10 rounded-xl bg-black/60 ring-1 ring-white/15 px-3 focus:outline-none focus:ring-emerald-400/50"
                      value={hourlyPrice}
                      onChange={(e) => setHourlyPrice(Number(e.target.value))}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-white/60 mb-1">
                      Cách tính thời gian thuê
                    </label>
                    <div className="flex flex-col gap-1 text-xs">
                      <label className="inline-flex items-center gap-2">
                        <input
                          type="radio"
                          className="accent-emerald-400"
                          checked={rentalStrategy === "fixed_packages"}
                          onChange={() =>
                            setRentalStrategy("fixed_packages")
                          }
                        />
                        <span>Gói cố định do admin set</span>
                      </label>
                      <label className="inline-flex items-center gap-2">
                        <input
                          type="radio"
                          className="accent-emerald-400"
                          checked={rentalStrategy === "user_choose"}
                          onChange={() => setRentalStrategy("user_choose")}
                        />
                        <span>User tự chọn theo số giờ / ngày</span>
                      </label>
                    </div>
                  </div>
                </div>

                {rentalStrategy === "fixed_packages" && (
                  <div className="space-y-2">
                    <p className="text-xs text-white/60">
                      Chọn các gói thời gian cho thuê:
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-xs">
                      {RENTAL_OPTIONS.map((opt) => (
                        <label
                          key={opt.key}
                          className="inline-flex items-center gap-2 rounded-xl bg-black/60 px-2 py-1 ring-1 ring-white/10"
                        >
                          <input
                            type="checkbox"
                            className="accent-emerald-400"
                            checked={rentalPackages.includes(opt.key)}
                            onChange={() => toggleRentalPackage(opt.key)}
                          />
                          <span>{opt.label}</span>
                        </label>
                      ))}
                    </div>

                    {computedPackages.length > 0 && (
                      <div className="mt-2 rounded-xl bg-black/60 px-3 py-2 text-[11px] text-white/70 space-y-1">
                        <p className="font-semibold text-xs">
                          Bảng giá dự kiến (theo giờ * gói):
                        </p>
                        {computedPackages.map((pkg) => (
                          <div
                            key={pkg.key}
                            className="flex justify-between border-t border-white/5 pt-1"
                          >
                            <span>{pkg.label}</span>
                            <span>
                              {pkg.hours === 0
                                ? `${pkg.price.toLocaleString()} VND (vĩnh viễn)`
                                : `${pkg.price.toLocaleString()} VND`}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="flex justify-end gap-2 pt-2">
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
              {isEdit ? "Lưu thay đổi" : "Thêm tool"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ToolModal;
