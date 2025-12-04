"use client";

import { useEffect, useState } from "react";
import Modal from "./Modal";
import type { BlogPost } from "@/app/admin/blog/page";

type Props = {
  open: boolean;
  initialData: BlogPost | null;
  onClose: () => void;
  onSubmit: (data: Omit<BlogPost, "id" | "createdAt">) => void;
};

export default function BlogModal({
  open,
  initialData,
  onClose,
  onSubmit,
}: Props) {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [status, setStatus] =
    useState<BlogPost["status"]>("draft");
  const [author, setAuthor] = useState("");
  const [coverImageUrl, setCoverImageUrl] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [scheduledAt, setScheduledAt] = useState<string>("");

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!open) return;

    if (initialData) {
      setTitle(initialData.title);
      setSlug(initialData.slug);
      setStatus(initialData.status);
      setAuthor(initialData.author ?? "");
      setCoverImageUrl(initialData.coverImageUrl ?? "");
      setThumbnailUrl(initialData.thumbnailUrl ?? "");
      setExcerpt(initialData.excerpt ?? "");
      setContent(initialData.content ?? "");
      setTags((initialData.tags ?? []).join(","));
      setScheduledAt(
        initialData.scheduledAt
          ? initialData.scheduledAt.slice(0, 16)
          : "",
      );
    } else {
      setTitle("");
      setSlug("");
      setStatus("draft");
      setAuthor("ForgeVault Team");
      setCoverImageUrl("");
      setThumbnailUrl("");
      setExcerpt("");
      setContent("");
      setTags("");
      setScheduledAt("");
    }
    setErrors({});
  }, [open, initialData]);

  const generateSlug = (raw: string) =>
    raw
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

  const handleTitleChange = (value: string) => {
    setTitle(value);
    if (!initialData) {
      setSlug(generateSlug(value));
    }
  };

  const handleSubmit = () => {
    const nextErrors: Record<string, string> = {};
    if (!title.trim()) nextErrors.title = "Tiêu đề bắt buộc.";
    if (!slug.trim()) nextErrors.slug = "Slug bắt buộc.";
    if (!author.trim()) nextErrors.author = "Tác giả bắt buộc.";

    if (status === "scheduled" && !scheduledAt) {
      nextErrors.scheduledAt = "Hãy chọn thời gian hẹn đăng.";
    }

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const tagsArr = tags
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    onSubmit({
      title,
      slug,
      status,
      author,
      coverImageUrl: coverImageUrl || undefined,
      thumbnailUrl: thumbnailUrl || undefined,
      excerpt: excerpt || undefined,
      content: content || undefined,
      tags: tagsArr.length ? tagsArr : undefined,
      scheduledAt: scheduledAt ? new Date(scheduledAt).toISOString() : null,
    });

    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={initialData ? "Chỉnh sửa bài viết" : "Thêm bài viết mới"}
    >
      <div className="space-y-4 text-sm">
        <Field
          label="Tiêu đề"
          required
          error={errors.title}
          input={
            <input
              className="w-full rounded-xl border border-white/15 bg-black/40 px-3 py-2 text-sm"
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
            />
          }
        />
        <Field
          label="Slug"
          required
          error={errors.slug}
          input={
            <input
              className="w-full rounded-xl border border-white/15 bg-black/40 px-3 py-2 text-sm"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="slug-bai-viet"
            />
          }
        />
        <Field
          label="Tác giả"
          required
          error={errors.author}
          input={
            <input
              className="w-full rounded-xl border border-white/15 bg-black/40 px-3 py-2 text-sm"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="ForgeVault Team, Pháp,..."
            />
          }
        />

        <Field
          label="Cover image URL (ảnh lớn trên đầu bài)"
          input={
            <input
              className="w-full rounded-xl border border-white/15 bg-black/40 px-3 py-2 text-sm"
              value={coverImageUrl}
              onChange={(e) => setCoverImageUrl(e.target.value)}
              placeholder="https://..."
            />
          }
        />
        <Field
          label="Thumbnail URL (ảnh nhỏ hiển thị danh sách)"
          input={
            <input
              className="w-full rounded-xl border border-white/15 bg-black/40 px-3 py-2 text-sm"
              value={thumbnailUrl}
              onChange={(e) => setThumbnailUrl(e.target.value)}
              placeholder="https://..."
            />
          }
        />

        <Field
          label="Tóm tắt (excerpt)"
          input={
            <textarea
              rows={2}
              className="w-full rounded-xl border border-white/15 bg-black/40 px-3 py-2 text-sm"
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="Hiển thị ở card blog trên landing..."
            />
          }
        />
        <Field
          label="Nội dung chính (có thể viết Markdown)"
          input={
            <textarea
              rows={6}
              className="w-full rounded-xl border border-white/15 bg-black/40 px-3 py-2 text-sm"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Tool này được thiết kế để giúp bạn tiết kiệm thời gian thao tác lặp lại..."
            />
          }
        />
        <Field
          label="Tags (phân cách bằng dấu phẩy)"
          input={
            <input
              className="w-full rounded-xl border border-white/15 bg-black/40 px-3 py-2 text-sm"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="tiktok,proxy,account-farm"
            />
          }
        />

        <div className="grid gap-3 sm:grid-cols-[1.2fr_1.5fr]">
          <div>
            <p className="mb-1 text-xs font-medium text-white/70">
              Trạng thái bài viết
            </p>
            <select
              className="w-full rounded-xl border border-white/15 bg-black/40 px-3 py-2 text-sm"
              value={status}
              onChange={(e) =>
                setStatus(e.target.value as BlogPost["status"])
              }
            >
              <option value="draft">Draft</option>
              <option value="scheduled">Scheduled</option>
              <option value="published">Published</option>
            </select>
          </div>
          <Field
            label="Thời gian hẹn đăng (nếu Scheduled)"
            error={errors.scheduledAt}
            input={
              <input
                type="datetime-local"
                className="w-full rounded-xl border border-white/15 bg-black/40 px-3 py-2 text-sm"
                value={scheduledAt}
                onChange={(e) => setScheduledAt(e.target.value)}
              />
            }
          />
        </div>

        <div className="pt-2 text-right">
          <button
            onClick={handleSubmit}
            className="rounded-xl bg-emerald-500 px-4 py-2 text-sm font-semibold text-black hover:bg-emerald-400"
          >
            {initialData ? "Lưu thay đổi" : "Tạo bài viết"}
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
