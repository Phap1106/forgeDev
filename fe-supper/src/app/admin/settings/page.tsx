// src/app/admin/settings/page.tsx
"use client";

import { useState } from "react";
import { Plus, Trash2, UploadCloud } from "lucide-react";

type PaymentMethodType = "qr" | "wallet" | "bank";

type PaymentMethod = {
  id: string;
  label: string; // tên hiển thị: "QR Binance", "Ví USDT TRC20",...
  type: PaymentMethodType;
  details: string; // địa chỉ ví / nội dung chuyển khoản / ghi chú
  qrImage?: string; // link hoặc blob URL ảnh QR (nếu có)
};

export default function SettingsPage() {
  const [rentalPrice, setRentalPrice] = useState<string>("10000");
  const [trialDays, setTrialDays] = useState<string>("3");
  const [contact, setContact] = useState<string>(
    "Zalo: 0900.xxx.xxx\nEmail: support@forgevault.io",
  );
  const [qrPreview, setQrPreview] = useState<string>(
    "https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=FORGEVAULT-DEFAULT-QR",
  );
  const [message, setMessage] = useState<string>("");

  // Danh sách phương thức thanh toán online
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    {
      id: "pm-1",
      label: "QR Binance (USDT TRC20)",
      type: "qr",
      details: "Ví USDT TRC20 – dùng cho thanh toán tự động trên Binance Pay.",
      qrImage: "",
    },
  ]);
  const [defaultMethodId, setDefaultMethodId] = useState<string>("pm-1");

  const handleSave = () => {
    if (!rentalPrice || Number(rentalPrice) <= 0) {
      alert("Giá thuê phải > 0");
      return;
    }
    if (Number(trialDays) < 0) {
      alert("Số ngày dùng thử phải >= 0");
      return;
    }

    // TODO: call API PUT /settings với payload đầy đủ
    // ví dụ:
    // const payload = {
    //   rentalPrice: Number(rentalPrice),
    //   trialDays: Number(trialDays),
    //   contact,
    //   defaultQr: qrPreview,
    //   paymentMethods,
    //   defaultMethodId,
    // };

    setMessage("Đã lưu cấu hình hệ thống.");
    setTimeout(() => setMessage(""), 2500);
  };

  const handleChangeQR = (file: File | null) => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    setQrPreview(url);
  };

  const handleMethodFieldChange = <K extends keyof PaymentMethod>(
    id: string,
    field: K,
    value: PaymentMethod[K],
  ) => {
    setPaymentMethods((prev) =>
      prev.map((m) => (m.id === id ? { ...m, [field]: value } : m)),
    );
  };

  const handleMethodQRChange = (id: string, file: File | null) => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPaymentMethods((prev) =>
      prev.map((m) => (m.id === id ? { ...m, qrImage: url } : m)),
    );
  };

  const handleAddMethod = () => {
    const id = `pm-${Date.now()}`;
    setPaymentMethods((prev) => [
      ...prev,
      {
        id,
        label: "Phương thức mới",
        type: "qr",
        details: "",
        qrImage: "",
      },
    ]);
    setDefaultMethodId((prevDefault) => prevDefault || id);
  };

  const handleRemoveMethod = (id: string) => {
    if (!confirm("Xóa phương thức thanh toán này?")) return;
    setPaymentMethods((prev) => prev.filter((m) => m.id !== id));
    if (defaultMethodId === id) {
      const next = paymentMethods.find((m) => m.id !== id);
      setDefaultMethodId(next?.id ?? "");
    }
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-lg font-semibold">System Settings</h1>
        <p className="text-xs text-white/60">
          Cấu hình giá thuê, thời gian thuê, thông tin liên hệ và các phương
          thức thanh toán online.
        </p>
      </div>

      <div className="space-y-5 rounded-2xl border border-white/12 bg-[#050B10] p-5">
        {/* CẤU HÌNH THUÊ / LIÊN HỆ */}
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-white/70">
              Giá thuê theo giờ (VNĐ/giờ)
            </label>
            <input
              type="number"
              className="mt-1 w-full rounded-xl bg-black/40 px-3 py-2 text-sm outline-none ring-1 ring-white/12 focus:ring-emerald-400/60"
              value={rentalPrice}
              onChange={(e) => setRentalPrice(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-white/70">
              Số ngày dùng thử (0 = không dùng thử)
            </label>
            <input
              type="number"
              className="mt-1 w-full rounded-xl bg-black/40 px-3 py-2 text-sm outline-none ring-1 ring-white/12 focus:ring-emerald-400/60"
              value={trialDays}
              onChange={(e) => setTrialDays(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-white/70">
              Thông tin liên hệ hiển thị cho khách
            </label>
            <textarea
              className="mt-1 w-full rounded-xl bg-black/40 px-3 py-2 text-sm outline-none ring-1 ring-white/12 focus:ring-emerald-400/60"
              rows={3}
              value={contact}
              onChange={(e) => setContact(e.target.value)}
            />
          </div>
        </div>

        {/* QR MẶC ĐỊNH HIỆN TẠI */}
        <div className="space-y-2">
          <label className="block text-xs font-medium text-white/70">
            QR thanh toán mặc định hiện tại
          </label>
          <div className="flex items-center gap-4">
            {qrPreview && (
              <img
                src={qrPreview}
                alt="QR"
                className="h-24 w-24 rounded-lg bg-white"
              />
            )}
            <div className="flex-1 space-y-2">
              <div className="inline-flex items-center gap-2 rounded-xl bg-black/40 px-3 py-2 text-xs ring-1 ring-white/15">
                <UploadCloud className="h-4 w-4" />
                <label className="cursor-pointer">
                  <span className="mr-2">Chọn ảnh QR từ máy</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) =>
                      handleChangeQR(e.target.files?.[0] ?? null)
                    }
                  />
                </label>
              </div>
              <p className="text-[11px] text-white/50">
                Ảnh QR này sẽ dùng cho các giao dịch nạp tiền mặc định (khi
                chưa chọn phương thức cụ thể).
              </p>
            </div>
          </div>
        </div>

        {/* DANH SÁCH PHƯƠNG THỨC THANH TOÁN ONLINE */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-300">
                Payment Methods
              </h2>
              <p className="text-[11px] text-white/55">
                Quản lý các phương thức thanh toán online (QR Binance,
                địa chỉ ví, QR sàn khác...). Sau này FE có thể hiển thị đầy đủ
                danh sách này cho khách chọn.
              </p>
            </div>
            <button
              type="button"
              onClick={handleAddMethod}
              className="inline-flex items-center gap-1 rounded-xl bg-emerald-500 px-3 py-1.5 text-xs font-semibold text-black hover:bg-emerald-400"
            >
              <Plus className="h-3.5 w-3.5" />
              Thêm phương thức
            </button>
          </div>

          <div className="space-y-3">
            {paymentMethods.map((pm) => (
              <div
                key={pm.id}
                className="space-y-2 rounded-2xl bg-black/40 p-3 text-xs ring-1 ring-white/10"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 space-y-2">
                    <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-3">
                      <div>
                        <label className="block text-[11px] text-white/60 mb-1">
                          Tên hiển thị
                        </label>
                        <input
                          className="w-full rounded-xl bg-black/60 px-3 py-1.5 text-xs outline-none ring-1 ring-white/10 focus:ring-emerald-400/60"
                          placeholder="QR Binance, Ví USDT TRC20..."
                          value={pm.label}
                          onChange={(e) =>
                            handleMethodFieldChange(pm.id, "label", e.target.value)
                          }
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] text-white/60 mb-1">
                          Loại
                        </label>
                        <select
                          className="w-full rounded-xl bg-black/60 px-3 py-1.5 text-xs outline-none ring-1 ring-white/10 focus:ring-emerald-400/60"
                          value={pm.type}
                          onChange={(e) =>
                            handleMethodFieldChange(
                              pm.id,
                              "type",
                              e.target.value as PaymentMethodType,
                            )
                          }
                        >
                          <option value="qr">QR / mã quét</option>
                          <option value="wallet">Địa chỉ ví</option>
                          <option value="bank">Ngân hàng / chuyển khoản</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] text-white/60 mb-1">
                        Thông tin chi tiết
                      </label>
                      <textarea
                        rows={2}
                        className="w-full rounded-xl bg-black/60 px-3 py-1.5 text-xs outline-none ring-1 ring-white/10 focus:ring-emerald-400/60"
                        placeholder="Địa chỉ ví, nội dung chuyển khoản, ghi chú thêm..."
                        value={pm.details}
                        onChange={(e) =>
                          handleMethodFieldChange(pm.id, "details", e.target.value)
                        }
                      />
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                      <div className="inline-flex items-center gap-2 rounded-xl bg-black/60 px-3 py-1.5 ring-1 ring-white/10">
                        <UploadCloud className="h-4 w-4" />
                        <label className="cursor-pointer">
                          <span>Upload QR / hình logo</span>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) =>
                              handleMethodQRChange(
                                pm.id,
                                e.target.files?.[0] ?? null,
                              )
                            }
                          />
                        </label>
                      </div>
                      {pm.qrImage && (
                        <img
                          src={pm.qrImage}
                          alt="QR method preview"
                          className="h-14 w-14 rounded-lg bg-white"
                        />
                      )}

                      <label className="inline-flex items-center gap-2 text-[11px] text-white/70">
                        <input
                          type="radio"
                          className="accent-emerald-400"
                          checked={defaultMethodId === pm.id}
                          onChange={() => setDefaultMethodId(pm.id)}
                        />
                        <span>Đặt làm mặc định</span>
                      </label>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleRemoveMethod(pm.id)}
                    className="mt-1 inline-flex h-7 w-7 items-center justify-center rounded-full bg-red-500/10 text-red-400 hover:bg-red-500/20"
                    title="Xóa phương thức"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            ))}

            {paymentMethods.length === 0 && (
              <p className="text-[11px] text-white/45 italic">
                Chưa có phương thức nào. Nhấn &quot;Thêm phương thức&quot; để
                cấu hình.
              </p>
            )}
          </div>
        </div>

        {message && (
          <p className="text-xs font-medium text-emerald-400">{message}</p>
        )}

        <button
          onClick={handleSave}
          className="mt-1 inline-flex items-center justify-center rounded-xl bg-emerald-500 px-4 py-2 text-sm font-semibold text-black hover:bg-emerald-400"
        >
          Lưu cấu hình
        </button>
      </div>
    </div>
  );
}
