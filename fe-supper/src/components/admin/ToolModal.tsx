"use client";

import { useEffect, useState } from "react";
import Modal from "./Modal";
import type { Tool } from "@/app/admin/tools/page";

type Props = {
  open: boolean;
  initialData: Tool | null;
  onClose: () => void;
  onSubmit: (data: Omit<Tool, "id">) => void;
};

export default function ToolModal({
  open,
  initialData,
  onClose,
  onSubmit,
}: Props) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState<string>("");
  const [delivery, setDelivery] = useState<"online" | "download">("online");
  const [description, setDescription] = useState("");
  const [assetMode, setAssetMode] = useState<"file" | "folder">("file");
  const [assetInfo, setAssetInfo] = useState<string>("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!open) return;

    if (initialData) {
      setName(initialData.name);
      setCategory(initialData.category);
      setPrice(initialData.price.toString());
      setDelivery(initialData.delivery);
      setDescription(initialData.description ?? "");
      setAssetMode(initialData.assetMode ?? "file");
      setAssetInfo(initialData.assetInfo ?? "");
    } else {
      setName("");
      setCategory("");
      setPrice("");
      setDelivery("online");
      setDescription("");
      setAssetMode("file");
      setAssetInfo("");
    }
    setErrors({});
  }, [open, initialData]);

  const handleFilesChange = (files: FileList | null, mode: "file" | "folder") => {
    if (!files || files.length === 0) {
      setAssetInfo("");
      return;
    }

    if (mode === "file") {
      if (files.length === 1) {
        setAssetInfo(`File: ${files[0].name}`);
      } else {
        setAssetInfo(`${files.length} files được chọn`);
      }
    } else {
      // folder: hiển thị tên thư mục đầu tiên
      const first = files[0];
      // @ts-expect-error webkitRelativePath chỉ có trên Chromium
      const relPath: string | undefined = first.webkitRelativePath;
      const folderName = relPath ? relPath.split("/")[0] : "Folder upload";
      setAssetInfo(`Folder: ${folderName} (${files.length} files)`);
    }
  };

  const handleSubmit = () => {
    const nextErrors: Record<string, string> = {};
    if (!name.trim()) nextErrors.name = "Tên tool bắt buộc.";
    if (!category.trim()) nextErrors.category = "Loại tool bắt buộc.";
    if (!price || Number(price) <= 0)
      nextErrors.price = "Giá phải là số > 0.";

    if (delivery === "download" && !assetInfo) {
      nextErrors.asset = "Cần chọn file hoặc folder để khách tải về.";
    }

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    onSubmit({
      name,
      category,
      price: Number(price),
      delivery,
      description,
      imageUrl: initialData?.imageUrl,
      assetMode,
      assetInfo,
    });
    onClose();
  };

  return (
    <Modal
      open={open}
      title={initialData ? "Chỉnh sửa tool" : "Thêm tool mới"}
      onClose={onClose}
    >
      <div className="space-y-3 text-sm">
        <Field
          label="Tên tool"
          required
          error={errors.name}
          input={
            <input
              className="w-full rounded-xl border border-white/15 bg-black/40 px-3 py-2 text-sm"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          }
        />
        <Field
          label="Loại tool"
          required
          error={errors.category}
          input={
            <input
              className="w-full rounded-xl border border-white/15 bg-black/40 px-3 py-2 text-sm"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Automation, Account, Proxy,..."
            />
          }
        />
        <Field
          label="Giá (VNĐ)"
          required
          error={errors.price}
          input={
            <input
              type="number"
              className="w-full rounded-xl border border-white/15 bg-black/40 px-3 py-2 text-sm"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          }
        />
        <Field
          label="Mô tả"
          input={
            <textarea
              rows={3}
              className="w-full rounded-xl border border-white/15 bg-black/40 px-3 py-2 text-sm"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          }
        />

        {/* Hình thức cung cấp */}
        <div>
          <p className="mb-1 text-xs font-medium text-white/70">
            Hình thức cung cấp
          </p>
          <div className="flex flex-col gap-2 text-xs sm:flex-row sm:items-center">
            <label className="inline-flex items-center gap-2">
              <input
                type="radio"
                className="accent-emerald-400"
                checked={delivery === "online"}
                onChange={() => setDelivery("online")}
              />
              <span>Online (chạy trực tiếp trên web)</span>
            </label>
            <label className="inline-flex items-center gap-2">
              <input
                type="radio"
                className="accent-emerald-400"
                checked={delivery === "download"}
                onChange={() => setDelivery("download")}
              />
              <span>Download (file / folder gửi cho khách)</span>
            </label>
          </div>
        </div>

        {/* Upload file / folder – chỉ hiển thị khi chọn Download */}
        {delivery === "download" && (
          <div className="rounded-2xl border border-dashed border-emerald-500/40 bg-black/30 p-3">
            <div className="mb-2 flex items-center justify-between">
              <p className="text-xs font-medium text-white/80">
                File / folder tải về cho khách hàng
              </p>
              <div className="flex gap-2 text-[11px]">
                <button
                  type="button"
                  className={`rounded-full px-2 py-1 ${
                    assetMode === "file"
                      ? "bg-emerald-500 text-black"
                      : "bg-white/10 text-white/70"
                  }`}
                  onClick={() => setAssetMode("file")}
                >
                  File
                </button>
                <button
                  type="button"
                  className={`rounded-full px-2 py-1 ${
                    assetMode === "folder"
                      ? "bg-emerald-500 text-black"
                      : "bg-white/10 text-white/70"
                  }`}
                  onClick={() => setAssetMode("folder")}
                >
                  Folder
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-2 text-xs text-white/70">
              {/* Upload file */}
              {assetMode === "file" && (
                <input
                  type="file"
                  multiple
                  className="block w-full text-xs text-white/70 file:mr-4 file:rounded-xl file:border-0 file:bg-emerald-500/10 file:px-3 file:py-2 file:text-xs file:font-medium hover:file:bg-emerald-500/20"
                  onChange={(e) => handleFilesChange(e.target.files, "file")}
                />
              )}

              {/* Upload folder – chỉ hoạt động tốt trên Chrome/Edge */}
              {assetMode === "folder" && (
                <input
                  type="file"
                  multiple
                  // @ts-expect-error: thuộc tính riêng của Chromium
                  webkitdirectory="true"
                  className="block w-full text-xs text-white/70 file:mr-4 file:rounded-xl file:border-0 file:bg-emerald-500/10 file:px-3 file:py-2 file:text-xs file:font-medium hover:file:bg-emerald-500/20"
                  onChange={(e) => handleFilesChange(e.target.files, "folder")}
                />
              )}

              <p className="text-[11px] text-white/50">
                Sau khi kết nối backend, phần file/folder này sẽ được upload lên
                server hoặc storage (S3, Google Drive…). Hiện tại UI chỉ lưu lại
                mô tả để bạn cấu hình sau.
              </p>

              {assetInfo && (
                <p className="rounded-xl bg-black/40 px-3 py-2 text-[11px] text-emerald-300">
                  {assetInfo}
                </p>
              )}
              {errors.asset && (
                <p className="mt-1 text-[11px] text-red-400">{errors.asset}</p>
              )}
            </div>
          </div>
        )}

        <div className="pt-2 text-right">
          <button
            onClick={handleSubmit}
            className="rounded-xl bg-emerald-500 px-4 py-2 text-sm font-semibold text-black hover:bg-emerald-400"
          >
            {initialData ? "Lưu thay đổi" : "Thêm tool"}
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
