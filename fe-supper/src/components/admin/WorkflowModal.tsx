// src/components/admin/WorkflowModal.tsx
"use client";

import { useState } from "react";
import { UploadCloud, FileJson } from "lucide-react";

export type WorkflowKind =
  | "chatbot"
  | "video_downloader"
  | "http"
  | "file_processor"
  | "other";

export type TestMode = "chat" | "url" | "json" | "file";

export type WorkflowDefinition = {
  id?: string;
  name: string;
  slug: string;
  description?: string;
  type: WorkflowKind;
  visibility: "public" | "admin";
  status: "draft" | "active" | "archived";
  tags: string[];
  n8nId?: string;
  webhookUrl?: string;
  jsonUrl?: string;
  jsonFileName?: string;
  testMode: TestMode;
  testSamplePayload?: string;
};

type Props = {
  initial?: WorkflowDefinition | null;
  onClose: () => void;
  onSave: (wf: WorkflowDefinition) => void;
};

const TYPE_OPTIONS: { value: WorkflowKind; label: string }[] = [
  { value: "chatbot", label: "Chatbot / trợ lý" },
  { value: "video_downloader", label: "Tải video / media" },
  { value: "http", label: "Webhook / HTTP API" },
  { value: "file_processor", label: "Xử lý file" },
  { value: "other", label: "Khác" },
];

const TEST_MODE_OPTIONS: { value: TestMode; label: string }[] = [
  { value: "chat", label: "Khung chat (chatbot)" },
  { value: "url", label: "Input URL" },
  { value: "json", label: "Form JSON" },
  { value: "file", label: "Upload file" },
];

export default function WorkflowModal({
  initial,
  onClose,
  onSave,
}: Props) {
  const [name, setName] = useState(initial?.name ?? "");
  const [slug, setSlug] = useState(initial?.slug ?? "");
  const [description, setDescription] = useState(
    initial?.description ?? "",
  );
  const [type, setType] = useState<WorkflowKind>(
    initial?.type ?? "chatbot",
  );
  const [visibility, setVisibility] = useState<"public" | "admin">(
    initial?.visibility ?? "admin",
  );
  const [status, setStatus] = useState<"draft" | "active" | "archived">(
    initial?.status ?? "draft",
  );
  const [tags, setTags] = useState<string[]>(
    initial?.tags ?? [],
  );

  const [n8nId, setN8nId] = useState(initial?.n8nId ?? "");
  const [webhookUrl, setWebhookUrl] = useState(
    initial?.webhookUrl ?? "",
  );

  const [jsonUrl, setJsonUrl] = useState(initial?.jsonUrl ?? "");
  const [jsonFileName, setJsonFileName] = useState(
    initial?.jsonFileName ?? "",
  );

  const [testMode, setTestMode] = useState<TestMode>(
    initial?.testMode ??
      (type === "chatbot"
        ? "chat"
        : type === "video_downloader"
        ? "url"
        : type === "file_processor"
        ? "file"
        : "json"),
  );
  const [testSamplePayload, setTestSamplePayload] = useState(
    initial?.testSamplePayload ??
      (testMode === "chat"
        ? '{"message": "Xin chào"}'
        : testMode === "url"
        ? '{"url": "https://..."}'
        : "{}"),
  );

  const isEdit = Boolean(initial?.id);

  const handleAutoSlug = (value: string) => {
    setName(value);
    if (!initial?.id) {
      const slugValue = value
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");
      setSlug(slugValue);
    }
  };

  const handleJsonFileChange = (file: File | null) => {
    if (!file) return;
    setJsonFileName(file.name);
    // Sau này BE xử lý upload, FE chỉ cần lưu tên file / hiển thị
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      alert("Tên workflow không được để trống.");
      return;
    }
    if (!slug.trim()) {
      alert("Slug không được để trống.");
      return;
    }

    const payload: WorkflowDefinition = {
      id: initial?.id,
      name: name.trim(),
      slug: slug.trim(),
      description: description.trim() || undefined,
      type,
      visibility,
      status,
      tags: tags.map((t) => t.trim()).filter(Boolean),
      n8nId: n8nId.trim() || undefined,
      webhookUrl: webhookUrl.trim() || undefined,
      jsonUrl: jsonUrl.trim() || undefined,
      jsonFileName: jsonFileName || initial?.jsonFileName,
      testMode,
      testSamplePayload: testSamplePayload?.trim() || undefined,
    };

    onSave(payload);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#050B10] border border-white/10 p-6 shadow-[0_20px_80px_rgba(0,0,0,0.9)]">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">
            {isEdit
              ? "Chỉnh sửa workflow n8n"
              : "Thêm workflow n8n mới"}
          </h2>
          <button
            onClick={onClose}
            className="grid h-8 w-8 place-items-center rounded-xl bg-white/5 hover:bg-white/10"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-sm">
          {/* Tên + slug */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs text-white/60">
                Tên workflow *
              </label>
              <input
                className="h-10 w-full rounded-xl bg-black/40 px-3 text-sm outline-none ring-1 ring-white/15 focus:ring-emerald-400/60"
                value={name}
                onChange={(e) => handleAutoSlug(e.target.value)}
                placeholder="Chatbot hỗ trợ email cá nhân..."
                required
              />
            </div>
            <div>
              <label className="mb-1 block text-xs text-white/60">
                Slug (định danh) *
              </label>
              <input
                className="h-10 w-full rounded-xl bg-black/40 px-3 text-sm outline-none ring-1 ring-white/15 focus:ring-emerald-400/60"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="chatbot-support-email"
                required
              />
            </div>
          </div>

          {/* Loại + trạng thái + hiển thị */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div>
              <label className="mb-1 block text-xs text-white/60">
                Loại workflow
              </label>
              <select
                className="h-10 w-full rounded-xl bg-black/40 px-3 text-sm outline-none ring-1 ring-white/15 focus:ring-emerald-400/60"
                value={type}
                onChange={(e) =>
                  setType(e.target.value as WorkflowKind)
                }
              >
                {TYPE_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1 block text-xs text-white/60">
                Trạng thái
              </label>
              <select
                className="h-10 w-full rounded-xl bg-black/40 px-3 text-sm outline-none ring-1 ring-white/15 focus:ring-emerald-400/60"
                value={status}
                onChange={(e) =>
                  setStatus(
                    e.target.value as "draft" | "active" | "archived",
                  )
                }
              >
                <option value="draft">Nháp (chưa public)</option>
                <option value="active">
                  Active (đang bán / đang dùng)
                </option>
                <option value="archived">Archived (ngừng dùng)</option>
              </select>
            </div>
            <div>
              <label className="mb-1 block text-xs text-white/60">
                Hiển thị
              </label>
              <div className="flex gap-3 text-xs">
                <label className="inline-flex items-center gap-1.5">
                  <input
                    type="radio"
                    className="accent-emerald-400"
                    checked={visibility === "public"}
                    onChange={() => setVisibility("public")}
                  />
                  <span>User nhìn thấy</span>
                </label>
                <label className="inline-flex items-center gap-1.5">
                  <input
                    type="radio"
                    className="accent-emerald-400"
                    checked={visibility === "admin"}
                    onChange={() => setVisibility("admin")}
                  />
                  <span>Chỉ admin</span>
                </label>
              </div>
            </div>
          </div>

          {/* Mô tả ngắn */}
          <div>
            <label className="mb-1 block text-xs text-white/60">
              Mô tả ngắn
            </label>
            <textarea
              rows={3}
              className="w-full rounded-xl bg-black/40 px-3 py-2 text-sm outline-none ring-1 ring-white/15 focus:ring-emerald-400/60"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* n8n ID + endpoint */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs text-white/60">
                n8n Workflow ID (ghi chú nội bộ)
              </label>
              <input
                className="h-10 w-full rounded-xl bg-black/40 px-3 text-sm outline-none ring-1 ring-white/15 focus:ring-emerald-400/60"
                placeholder="VD: 123, wf-email-01..."
                value={n8nId}
                onChange={(e) => setN8nId(e.target.value)}
              />
            </div>
            <div>
              <label className="mb-1 block text-xs text-white/60">
                Endpoint / Webhook URL
              </label>
              <input
                className="h-10 w-full rounded-xl bg-black/40 px-3 text-sm outline-none ring-1 ring-white/15 focus:ring-emerald-400/60"
                placeholder="https://n8n.yourdomain.com/webhook/..."
                value={webhookUrl}
                onChange={(e) => setWebhookUrl(e.target.value)}
              />
            </div>
          </div>

          {/* JSON config */}
          <div className="space-y-2 rounded-2xl bg-black/30 p-3">
            <p className="text-xs font-semibold text-white/70">
              File JSON workflow
            </p>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-[2fr_1fr]">
              <div>
                <label className="mb-1 block text-[11px] text-white/60">
                  Link JSON (tuỳ chọn)
                </label>
                <input
                  className="h-10 w-full rounded-xl bg-black/50 px-3 text-xs outline-none ring-1 ring-white/15 focus:ring-emerald-400/60"
                  placeholder="https://storage.../workflow.json"
                  value={jsonUrl}
                  onChange={(e) => setJsonUrl(e.target.value)}
                />
              </div>
              <div>
                <label className="mb-1 block text-[11px] text-white/60">
                  Upload file JSON (tuỳ chọn)
                </label>
                <div className="flex items-center gap-2">
                  <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-white/5 px-3 py-1.5 text-[11px] hover:bg-white/10">
                    <UploadCloud className="h-4 w-4" />
                    <span>Chọn file .json</span>
                    <input
                      type="file"
                      accept="application/json"
                      className="hidden"
                      onChange={(e) =>
                        handleJsonFileChange(
                          e.target.files?.[0] ?? null,
                        )
                      }
                    />
                  </label>
                  {(jsonFileName || initial?.jsonFileName) && (
                    <span className="flex items-center gap-1 text-[11px] text-white/60">
                      <FileJson className="h-3.5 w-3.5" />
                      {jsonFileName || initial?.jsonFileName}
                    </span>
                  )}
                </div>
                <p className="mt-1 text-[11px] text-white/45">
                  Sau này BE có thể đọc file JSON này để import workflow
                  trực tiếp vào n8n.
                </p>
              </div>
            </div>
          </div>

          {/* Tags */}
          <div>
            <label className="mb-1 block text-xs text-white/60">
              Tags (phân cách bằng dấu phẩy)
            </label>
            <input
              className="h-10 w-full rounded-xl bg-black/40 px-3 text-sm outline-none ring-1 ring-white/15 focus:ring-emerald-400/60"
              value={tags.join(",")}
              onChange={(e) =>
                setTags(
                  e.target.value
                    .split(",")
                    .map((t) => t.trim())
                    .filter(Boolean),
                )
              }
              placeholder="chatbot, email, automation..."
            />
          </div>

          {/* Test mode */}
          <div className="space-y-2 rounded-2xl bg-black/30 p-3">
            <p className="text-xs font-semibold text-white/70">
              Cấu hình test workflow trong admin
            </p>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-[1.2fr_2fr]">
              <div>
                <label className="mb-1 block text-[11px] text-white/60">
                  Test mode
                </label>
                <select
                  className="h-10 w-full rounded-xl bg-black/50 px-3 text-xs outline-none ring-1 ring-white/15 focus:ring-emerald-400/60"
                  value={testMode}
                  onChange={(e) =>
                    setTestMode(e.target.value as TestMode)
                  }
                >
                  {TEST_MODE_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                <p className="mt-1 text-[11px] text-white/50">
                  Tuỳ loại workflow mà chọn mode phù hợp (chatbot, nhập
                  URL, form JSON, upload file).
                </p>
              </div>
              <div>
                <label className="mb-1 block text-[11px] text-white/60">
                  Sample payload mặc định khi test
                </label>
                <textarea
                  rows={5}
                  className="w-full rounded-xl bg-black/50 px-3 py-2 font-mono text-[11px] outline-none ring-1 ring-white/15 focus:ring-emerald-400/60"
                  value={testSamplePayload}
                  onChange={(e) =>
                    setTestSamplePayload(e.target.value)
                  }
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="h-10 rounded-xl bg-black/40 px-4 text-xs text-white/75 ring-1 ring-white/15 hover:bg-black/60"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="h-10 rounded-xl bg-emerald-400 px-4 text-sm font-semibold text-black hover:bg-emerald-300"
            >
              {isEdit ? "Lưu thay đổi" : "Thêm workflow"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
