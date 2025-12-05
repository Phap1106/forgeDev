// src/app/admin/blog/page.tsx
"use client";

import React, { useState } from "react";
import BlogModal, {
  BlogPost,
  BlogStatus,
} from "@/components/admin/BlogModal";
import { DataTable } from "@/components/admin/DataTable";

const MOCK_BLOGS: BlogPost[] = [
  {
    id: "1",
    title: "Hướng dẫn chọn proxy cho tool farm tài khoản",
    slug: "huong-dan-chon-proxy-cho-tool-farm",
    author: "ForgeVault Team",
    coverImageUrl: "",
    thumbnailUrl: "",
    excerpt: "Các tiêu chí chọn proxy bền, ít die cho tool farm…",
    content: "## Nội dung demo",
    tags: ["proxy", "farm", "tool"],
    status: "published",
    scheduledAt: "",
  },
];

export default function AdminBlogPage() {
  const [items, setItems] = useState<BlogPost[]>(MOCK_BLOGS);
  const [editing, setEditing] = useState<BlogPost | null>(null);
  const [aiDraft, setAiDraft] = useState<Partial<BlogPost> | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const [loadingAi, setLoadingAi] = useState(false);

  function handleSave(post: BlogPost) {
    setItems((prev) => {
      if (post.id) {
        return prev.map((p) => (p.id === post.id ? post : p));
      }
      return [
        ...prev,
        { ...post, id: String(Date.now()) } as BlogPost,
      ];
    });
    setEditing(null);
    setAiDraft(null);
    setOpenModal(false);
  }

  function handleDelete(id: string) {
    if (!confirm("Xóa bài viết này?")) return;
    setItems((prev) => prev.filter((p) => p.id !== id));
  }

  async function handleCreateWithAI() {
    const topic = prompt(
      "Nhập chủ đề / từ khóa để AI viết bài (vd: proxy cho TikTok farm)…"
    );
    if (!topic) return;
    try {
      setLoadingAi(true);
      const res = await fetch("/api/admin/blog/ai-draft", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic }),
      });
      if (!res.ok) {
        alert("AI draft thất bại, hãy thử lại.");
        return;
      }
      const data = await res.json();
      setAiDraft(data);
      setEditing(null);
      setOpenModal(true);
    } catch (err) {
      console.error(err);
      alert("Không gọi được AI, kiểm tra lại key GEMINI_API_KEY.");
    } finally {
      setLoadingAi(false);
    }
  }

  return (
    <div className="flex-1 px-6 py-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-emerald-300">
            Admin
          </p>
          <h1 className="mt-1 text-xl font-semibold">Blog</h1>
          <p className="text-xs text-white/60">
            Quản lý bài viết chia sẻ kiến thức, case study, hướng dẫn dùng
            tool và các chương trình khuyến mãi.
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleCreateWithAI}
            disabled={loadingAi}
            className="h-9 px-4 rounded-xl bg-emerald-500/10 text-xs text-emerald-300 ring-1 ring-emerald-400/40 hover:bg-emerald-500/20 disabled:opacity-60"
          >
            {loadingAi ? "Đang tạo bằng AI..." : "Tạo draft bằng AI"}
          </button>
          <button
            onClick={() => {
              setEditing(null);
              setAiDraft(null);
              setOpenModal(true);
            }}
            className="h-9 px-4 rounded-xl bg-emerald-400 text-black text-xs font-semibold hover:bg-emerald-300"
          >
            + Thêm bài viết
          </button>
        </div>
      </div>

      <div className="rounded-2xl bg-[#050B10] border border-white/10">
        <DataTable
          columns={[
            { key: "title", label: "TIÊU ĐỀ" },
            { key: "author", label: "TÁC GIẢ" },
            { key: "slug", label: "SLUG" },
            {
              key: "status",
              label: "TRẠNG THÁI",
              render: (row: BlogPost) => (
                <span
                  className={
                    row.status === "published"
                      ? "text-xs text-emerald-400"
                      : "text-xs text-yellow-300"
                  }
                >
                  {row.status === "published" ? "Published" : "Draft"}
                </span>
              ),
            },
          ]}
          rows={items}
          getRowId={(row) => row.id!}
          onEdit={(row) => {
            setEditing(row);
            setAiDraft(null);
            setOpenModal(true);
          }}
          onDelete={(row) => handleDelete(row.id!)}
        />
      </div>

      {openModal && (
        <BlogModal
          initial={editing}
          aiDraft={aiDraft}
          onClose={() => {
            setOpenModal(false);
            setEditing(null);
            setAiDraft(null);
          }}
          onSave={handleSave}
        />
      )}
    </div>
  );
}
