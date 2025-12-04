"use client";

import { useState } from "react";

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

  const handleSave = () => {
    if (!rentalPrice || Number(rentalPrice) <= 0) {
      alert("Giá thuê phải > 0");
      return;
    }
    if (Number(trialDays) < 0) {
      alert("Số ngày dùng thử phải >= 0");
      return;
    }

    // TODO: call API PUT /settings
    setMessage("Đã lưu cấu hình hệ thống.");
    setTimeout(() => setMessage(""), 2500);
  };

  const handleChangeQR = (file: File | null) => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    setQrPreview(url);
  };

  return (
    <div className="space-y-6 max-w-xl">
      <div>
        <h1 className="text-lg font-semibold">System Settings</h1>
        <p className="text-xs text-white/60">
          Cấu hình giá thuê, thời gian thuê, QR thanh toán mặc định,...
        </p>
      </div>

      <div className="space-y-4 rounded-2xl border border-white/10 bg-white/5 p-4">
        <div>
          <label className="block text-xs font-medium text-white/70">
            Giá thuê theo giờ (VNĐ/giờ)
          </label>
          <input
            type="number"
            className="mt-1 w-full rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-sm"
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
            className="mt-1 w-full rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-sm"
            value={trialDays}
            onChange={(e) => setTrialDays(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-white/70">
            Thông tin liên hệ hiển thị cho khách
          </label>
          <textarea
            className="mt-1 w-full rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-sm"
            rows={3}
            value={contact}
            onChange={(e) => setContact(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <label className="block text-xs font-medium text-white/70">
            QR thanh toán mặc định
          </label>
          <div className="flex items-center gap-4">
            {qrPreview && (
              <img
                src={qrPreview}
                alt="QR"
                className="h-24 w-24 rounded-lg bg-white"
              />
            )}
            <div className="flex-1">
              <input
                type="file"
                accept="image/*"
                className="block w-full text-xs text-white/70 file:mr-4 file:rounded-xl file:border-0 file:bg-white/10 file:px-3 file:py-2 file:text-xs file:font-medium hover:file:bg-white/20"
                onChange={(e) =>
                  handleChangeQR(e.target.files?.[0] ?? null)
                }
              />
              <p className="mt-1 text-[11px] text-white/50">
                Ảnh QR sẽ sử dụng cho các giao dịch nạp tiền mặc định.
              </p>
            </div>
          </div>
        </div>

        {message && (
          <p className="text-xs font-medium text-emerald-400">{message}</p>
        )}

        <button
          onClick={handleSave}
          className="mt-2 rounded-xl bg-emerald-500 px-4 py-2 text-sm font-semibold text-black hover:bg-emerald-400"
        >
          Lưu cấu hình
        </button>
      </div>
    </div>
  );
}
