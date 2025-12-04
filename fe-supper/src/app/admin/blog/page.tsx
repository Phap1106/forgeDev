"use client";

import { useState } from "react";
import DataTable, { DataTableColumn } from "@/components/admin/DataTable";
import BlogModal from "@/components/admin/BlogModal";

export type BlogPost = {
  id: number;
  title: string;
  slug: string;
  status: "draft" | "scheduled" | "published";
  createdAt: string;
  author: string;
  coverImageUrl?: string;
  thumbnailUrl?: string;
  scheduledAt?: string | null;
  excerpt?: string;
  content?: string;
  tags?: string[];
};

function generateSlug(raw: string) {
  return raw
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([
    {
      id: 1,
      title: "Hướng dẫn chọn proxy cho tool farm tài khoản",
      slug: "huong-dan-chon-proxy-cho-tool-farm",
      status: "published",
      createdAt: "2025-12-01T10:00:00Z",
      author: "ForgeVault Team",
      coverImageUrl:
        "https://images.pexels.com/photos/5380662/pexels-photo-5380662.jpeg?auto=compress&cs=tinysrgb&w=1200",
      thumbnailUrl: "",
      scheduledAt: null,
      excerpt:
        "Tổng hợp các nguyên tắc chọn proxy an toàn cho các tool farm tài khoản ở quy mô lớn.",
      content: "",
      tags: ["proxy", "account-farm", "security"],
    },
    {
      id: 2,
      title: "Cách bảo vệ tài khoản khi dùng tool tự động",
      slug: "bao-ve-tai-khoan-khi-dung-tool",
      status: "draft",
      createdAt: "2025-12-03T15:20:00Z",
      author: "Pháp",
      coverImageUrl: "",
      thumbnailUrl: "",
      scheduledAt: null,
      excerpt: "",
      content: "",
      tags: ["safety", "automation"],
    },
  ]);

  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<BlogPost | null>(null);
  const [aiLoading, setAiLoading] = useState(false);

  const columns: DataTableColumn<BlogPost>[] = [
    { header: "TIÊU ĐỀ", field: "title" },
    { header: "TÁC GIẢ", field: "author" },
    { header: "SLUG", field: "slug" },
    {
      header: "TRẠNG THÁI",
      field: "status",
      render: (value, row) => {
        const v = value as BlogPost["status"];
        if (v === "published")
          return <span className="text-emerald-400">Published</span>;
        if (v === "scheduled")
          return (
            <span className="text-sky-300">
              Scheduled{" "}
              {row.scheduledAt &&
                `(${new Date(row.scheduledAt).toLocaleString("vi-VN")})`}
            </span>
          );
        return <span className="text-yellow-300">Draft</span>;
      },
    },
    {
      header: "NGÀY TẠO",
      field: "createdAt",
      render: (value) => new Date(value as string).toLocaleString("vi-VN"),
    },
  ];

  const openCreate = () => {
    setEditing(null);
    setOpen(true);
  };

  const openEdit = (row: BlogPost) => {
    setEditing(row);
    setOpen(true);
  };

  const handleDelete = (row: BlogPost) => {
    if (!confirm(`Xoá bài viết "${row.title}"?`)) return;
    // TODO: call API DELETE /blog/:id
    setPosts((prev) => prev.filter((p) => p.id !== row.id));
  };

  const handleSubmit = (data: Omit<BlogPost, "id" | "createdAt">) => {
    if (editing) {
      // TODO: call API PUT /blog/:id
      setPosts((prev) =>
        prev.map((p) => (p.id === editing.id ? { ...p, ...data } : p)),
      );
    } else {
      // TODO: call API POST /blog
      const now = new Date().toISOString();
      setPosts((prev) => [...prev, { id: Date.now(), createdAt: now, ...data }]);
    }
  };

  const handleCreateWithAI = async () => {
    try {
      setAiLoading(true);

      const res = await fetch("/api/admin/blog/ai-draft", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic:
            "blog chia sẻ về tool automation, proxy, account farm, bảo mật tài khoản",
        }),
      });

      if (!res.ok) {
        const text = await res.text();
        console.error("AI draft error:", text);
        alert("Không tạo được bài viết bằng AI. Kiểm tra log / GEMINI_API_KEY.");
        return;
      }

      const draft: {
        title?: string;
        excerpt?: string;
        content?: string;
        tags?: string[];
        coverImageUrl?: string;
      } = await res.json();

      const title = draft.title || "Bài viết từ ForgeVault AI";
      const now = new Date().toISOString();

      const aiPost: BlogPost = {
        id: Date.now(),
        createdAt: now,
        title,
        slug: generateSlug(title),
        status: "draft",
        author: "ForgeVault AI",
        coverImageUrl: draft.coverImageUrl,
        thumbnailUrl: draft.coverImageUrl,
        excerpt: draft.excerpt,
        content: draft.content,
        tags: draft.tags || ["ai-draft"],
        scheduledAt: null,
      };

      // Mở modal với nội dung đã generate sẵn để admin sửa lại rồi lưu
      setEditing(aiPost);
      setOpen(true);
    } catch (err) {
      console.error(err);
      alert("Lỗi gọi AI draft. Xem log console.");
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold">Blog Management</h1>
          <p className="text-xs text-white/60">
            Quản lý bài viết chia sẻ kiến thức, case study, hướng dẫn dùng tool
            và các chương trình khuyến mãi.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleCreateWithAI}
            disabled={aiLoading}
            className="rounded-xl border border-emerald-500/60 bg-emerald-500/10 px-4 py-2 text-sm font-semibold text-emerald-300 hover:bg-emerald-500/20 disabled:opacity-60"
          >
            {aiLoading ? "Đang tạo bằng AI..." : "Tạo bài viết bằng AI"}
          </button>

          <button
            onClick={openCreate}
            className="rounded-xl bg-emerald-500 px-4 py-2 text-sm font-semibold text-black hover:bg-emerald-400"
          >
            + Thêm bài viết
          </button>
        </div>
      </div>

      <DataTable<BlogPost>
        columns={columns}
        data={posts}
        onEdit={openEdit}
        onDelete={handleDelete}
      />

      <BlogModal
        open={open}
        initialData={editing}
        onClose={() => setOpen(false)}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
