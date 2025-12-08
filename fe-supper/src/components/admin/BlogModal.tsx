// src/components/admin/BlogModal.tsx
"use client";

import React, { useEffect, useState } from "react";

export type BlogStatus = "draft" | "published";

export type BlogPost = {
  id?: string;
  title: string;
  slug: string;
  author: string;
  coverImageUrl?: string;
  thumbnailUrl?: string;
  videoUrl?: string;
  excerpt: string;
  content: string;
  tags: string[];
  status: BlogStatus;
  scheduledAt?: string;
};

type Props = {
  initial?: BlogPost | null;
  aiDraft?: Partial<BlogPost> | null;
  onClose: () => void;
  onSave: (post: BlogPost) => void;
};

export function BlogModal({ initial, aiDraft, onClose, onSave }: Props) {
  const [title, setTitle] = useState(initial?.title ?? aiDraft?.title ?? "");
  const [slug, setSlug] = useState(initial?.slug ?? aiDraft?.slug ?? "");
  const [author, setAuthor] = useState(
    initial?.author ?? aiDraft?.author ?? "ForgeVault Team",
  );
  const [coverImageUrl, setCoverImageUrl] = useState(
    initial?.coverImageUrl ?? aiDraft?.coverImageUrl ?? "",
  );
  const [thumbnailUrl, setThumbnailUrl] = useState(
    initial?.thumbnailUrl ?? aiDraft?.thumbnailUrl ?? "",
  );
  const [videoUrl, setVideoUrl] = useState(
    initial?.videoUrl ?? aiDraft?.videoUrl ?? "",
  );
  const [excerpt, setExcerpt] = useState(
    initial?.excerpt ?? aiDraft?.excerpt ?? "",
  );
  const [content, setContent] = useState(
    initial?.content ?? aiDraft?.content ?? "",
  );
  const [tags, setTags] = useState<string[]>(
    initial?.tags ?? aiDraft?.tags ?? [],
  );
  const [status, setStatus] = useState<BlogStatus>(
    initial?.status ?? "draft",
  );
  const [scheduledAt, setScheduledAt] = useState(
    initial?.scheduledAt ?? "",
  );

  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [thumbFile, setThumbFile] = useState<File | null>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);

  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const [thumbPreview, setThumbPreview] = useState<string | null>(null);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);

  // preview cover
  useEffect(() => {
    if (!coverFile) {
      setCoverPreview(coverImageUrl || null);
      return;
    }
    const url = URL.createObjectURL(coverFile);
    setCoverPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [coverFile, coverImageUrl]);

  // preview thumb
  useEffect(() => {
    if (!thumbFile) {
      setThumbPreview(thumbnailUrl || null);
      return;
    }
    const url = URL.createObjectURL(thumbFile);
    setThumbPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [thumbFile, thumbnailUrl]);

  // preview video
  useEffect(() => {
    if (!videoFile) {
      setVideoPreview(videoUrl || null);
      return;
    }
    const url = URL.createObjectURL(videoFile);
    setVideoPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [videoFile, videoUrl]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSave({
      id: initial?.id,
      title: title.trim(),
      slug: slug.trim(),
      author: author.trim(),
      coverImageUrl: coverImageUrl.trim() || coverPreview || undefined,
      thumbnailUrl: thumbnailUrl.trim() || thumbPreview || undefined,
      videoUrl: videoUrl.trim() || videoPreview || undefined,
      excerpt: excerpt.trim(),
      content,
      tags: tags.map((t) => t.trim()).filter(Boolean),
      status,
      scheduledAt: scheduledAt || undefined,
    });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#050B10] border border-white/10 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">
            {initial ? "Chỉnh sửa bài viết" : "Thêm bài viết mới"}
          </h2>
          <button
            onClick={onClose}
            className="h-8 w-8 grid place-items-center rounded-xl bg-white/5 hover:bg-white/10 transition"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-sm">
          {/* Tiêu đề + Slug */}
          <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-4">
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
                Slug *
              </label>
              <input
                className="w-full h-10 rounded-xl bg-black/40 ring-1 ring-white/15 px-3"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="toi-uu-proxy-cho-tool-farm"
                required
              />
            </div>
          </div>

          {/* Tác giả + Trạng thái */}
          <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-4">
            <div>
              <label className="block text-xs text-white/60 mb-1">
                Tác giả
              </label>
              <input
                className="w-full h-10 rounded-xl bg-black/40 ring-1 ring-white/15 px-3"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-xs text-white/60 mb-1">
                Trạng thái
              </label>
              <select
                className="w-full h-10 rounded-xl bg-black/40 ring-1 ring-white/15 px-3"
                value={status}
                onChange={(e) => setStatus(e.target.value as BlogStatus)}
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>
          </div>

          {/* Cover & Thumb */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
            {/* COVER */}
            <div>
              <label className="block text-xs text-white/60 mb-1">
                Cover image URL (ảnh lớn trên đầu bài)
              </label>
              <input
                className="w-full h-10 rounded-xl bg-black/40 ring-1 ring-white/15 px-3"
                placeholder="https://..."
                value={coverImageUrl}
                onChange={(e) => setCoverImageUrl(e.target.value)}
              />

              {/* input ẩn + button upload */}
              <input
                id="cover-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => setCoverFile(e.target.files?.[0] ?? null)}
              />
              <div className="mt-2 flex items-center gap-2 text-xs">
                <label
                  htmlFor="cover-upload"
                  className="inline-flex items-center rounded-xl bg-white/5 px-3 py-1.5 cursor-pointer hover:bg-white/10 ring-1 ring-white/15"
                >
                  Chọn ảnh cover từ thiết bị
                </label>
                {coverFile && (
                  <span className="text-white/60 truncate">
                    {coverFile.name}
                  </span>
                )}
              </div>

              {coverPreview && (
                <img
                  src={coverPreview}
                  alt="Cover preview"
                  className="mt-2 w-full max-h-40 object-cover rounded-xl border border-white/10"
                />
              )}
            </div>

            {/* THUMBNAIL */}
            <div>
              <label className="block text-xs text-white/60 mb-1">
                Thumbnail URL (ảnh nhỏ hiển thị danh sách)
              </label>
              <input
                className="w-full h-10 rounded-xl bg-black/40 ring-1 ring-white/15 px-3"
                placeholder="https://..."
                value={thumbnailUrl}
                onChange={(e) => setThumbnailUrl(e.target.value)}
              />

              <input
                id="thumb-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => setThumbFile(e.target.files?.[0] ?? null)}
              />
              <div className="mt-2 flex items-center gap-2 text-xs">
                <label
                  htmlFor="thumb-upload"
                  className="inline-flex items-center rounded-xl bg-white/5 px-3 py-1.5 cursor-pointer hover:bg-white/10 ring-1 ring-white/15"
                >
                  Chọn thumbnail từ thiết bị
                </label>
                {thumbFile && (
                  <span className="text-white/60 truncate">
                    {thumbFile.name}
                  </span>
                )}
              </div>

              {thumbPreview && (
                <img
                  src={thumbPreview}
                  alt="Thumb preview"
                  className="mt-2 w-32 h-20 object-cover rounded-xl border border-white/10"
                />
              )}
            </div>
          </div>

          {/* VIDEO */}
          <div>
            <label className="block text-xs text-white/60 mb-1">
              Video URL (tuỳ chọn) / hoặc upload video từ thiết bị
            </label>
            <input
              className="w-full h-10 rounded-xl bg-black/40 ring-1 ring-white/15 px-3"
              placeholder="https://...mp4"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
            />

            <input
              id="video-upload"
              type="file"
              accept="video/*"
              className="hidden"
              onChange={(e) => setVideoFile(e.target.files?.[0] ?? null)}
            />
            <div className="mt-2 flex items-center gap-2 text-xs">
              <label
                htmlFor="video-upload"
                className="inline-flex items-center rounded-xl bg-white/5 px-3 py-1.5 cursor-pointer hover:bg-white/10 ring-1 ring-white/15"
              >
                Chọn video từ thiết bị
              </label>
              {videoFile && (
                <span className="text-white/60 truncate">
                  {videoFile.name}
                </span>
              )}
            </div>

            {videoPreview && (
              <video
                src={videoPreview}
                controls
                className="mt-2 w-full max-h-56 rounded-xl border border-white/10"
              />
            )}
          </div>

          {/* Excerpt */}
          <div>
            <label className="block text-xs text-white/60 mb-1">
              Tóm tắt (excerpt)
            </label>
            <textarea
              rows={3}
              className="w-full rounded-xl bg-black/40 ring-1 ring-white/15 px-3 py-2"
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
            />
          </div>

          {/* Content */}
          <div>
            <label className="block text-xs text-white/60 mb-1">
              Nội dung chính (có thể viết Markdown)
            </label>
            <textarea
              rows={10}
              className="w-full rounded-xl bg-black/40 ring-1 ring-white/15 px-3 py-2 font-mono text-xs"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>

          {/* Tags + Schedule */}
          <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-4">
            <div>
              <label className="block text-xs text-white/60 mb-1">
                Tags (phân cách bằng dấu phẩy)
              </label>
              <input
                className="w-full h-10 rounded-xl bg-black/40 ring-1 ring-white/15 px-3"
                value={tags.join(",")}
                onChange={(e) =>
                  setTags(
                    e.target.value
                      .split(",")
                      .map((t) => t.trim())
                      .filter(Boolean),
                  )
                }
              />
            </div>
            <div>
              <label className="block text-xs text-white/60 mb-1">
                Thời gian hẹn đăng (nếu Scheduled)
              </label>
              <input
                type="datetime-local"
                className="w-full h-10 rounded-xl bg-black/40 ring-1 ring-white/15 px-3"
                value={scheduledAt}
                onChange={(e) => setScheduledAt(e.target.value)}
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
              {initial ? "Lưu thay đổi" : "Tạo bài viết"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default BlogModal;
