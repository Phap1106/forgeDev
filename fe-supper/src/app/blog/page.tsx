// src/app/blog/page.tsx
"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { getPublishedPosts } from "@/lib/blogData";

const PAGE_SIZE = 5;

export default function BlogListingPage() {
  const allPosts = getPublishedPosts();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return allPosts;
    return allPosts.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q))
    );
  }, [allPosts, search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);

  const paginated = filtered.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  function goToPage(p: number) {
    if (p < 1 || p > totalPages) return;
    setPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <main className="min-h-screen bg-[#02060A] text-white">
      <section className="border-b border-white/10 bg-gradient-to-b from-emerald-500/10 via-transparent to-transparent">
        <div className="mx-auto max-w-6xl px-4 pt-28 pb-10">
          <p className="text-xs uppercase tracking-[0.18em] text-emerald-300">
            ForgeVault
          </p>
          <div className="mt-2 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-semibold">
                Blog & Kiến thức automation
              </h1>
              <p className="mt-2 text-sm text-white/70 max-w-xl">
                Tổng hợp kinh nghiệm chạy tool, proxy, nuôi tài khoản và
                tối ưu quy trình automation an toàn, bền vững.
              </p>
            </div>
            <div className="w-full md:w-[320px]">
              <div className="relative">
                <input
                  className="w-full h-10 rounded-2xl bg-black/50 ring-1 ring-white/15 px-3 pr-9 text-sm placeholder:text-white/40 focus:outline-none focus:ring-emerald-400/60"
                  placeholder="Tìm theo tiêu đề, tag, từ khóa…"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setPage(1);
                  }}
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-white/40">
                  ⌘K
                </span>
              </div>
              <p className="mt-1 text-[11px] text-white/45">
                {filtered.length} bài viết được tìm thấy
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-8 space-y-8">
        {/* Bài mới nhất (featured) */}
        {currentPage === 1 && paginated[0] && (
          <Link
            href={`/blog/${paginated[0].slug}`}
            className="group grid gap-6 md:grid-cols-[3fr_2fr] rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 via-black/60 to-black/80 p-4 md:p-6"
          >
            <div className="overflow-hidden rounded-2xl bg-black/40">
              {paginated[0].coverImageUrl ? (
                <img
                  src={paginated[0].coverImageUrl}
                  alt={paginated[0].title}
                  className="h-52 md:h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
              ) : (
                <div className="h-52 md:h-full w-full grid place-items-center text-sm text-white/40">
                  No cover image
                </div>
              )}
            </div>
            <div className="flex flex-col justify-between gap-4">
              <div>
                <p className="text-[11px] uppercase tracking-[0.18em] text-emerald-300 mb-1">
                  Featured
                </p>
                <h2 className="text-xl md:text-2xl font-semibold group-hover:text-emerald-300 transition-colors">
                  {paginated[0].title}
                </h2>
                <p className="mt-2 text-sm text-white/70">
                  {paginated[0].excerpt}
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2 text-[11px] text-white/50">
                <span className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10">
                  {new Date(paginated[0].createdAt).toLocaleDateString(
                    "vi-VN"
                  )}
                </span>
                <span>•</span>
                <span>{paginated[0].author}</span>
                {paginated[0].tags.map((t) => (
                  <span
                    key={t}
                    className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-400/30"
                  >
                    #{t}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        )}

        {/* Danh sách bài (trừ featured nếu ở page1) */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-white/90">
              Tất cả bài viết
            </h3>
            <span className="text-[11px] text-white/50">
              Trang {currentPage}/{totalPages}
            </span>
          </div>

          <div className="space-y-3">
            {paginated
              .slice(currentPage === 1 ? 1 : 0)
              .map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="group flex gap-3 rounded-2xl border border-white/5 bg-black/40 p-3 hover:border-emerald-400/40 hover:bg-black/60 transition-colors"
                >
                  <div className="h-20 w-28 flex-shrink-0 overflow-hidden rounded-xl bg-black/60">
                    {post.thumbnailUrl ? (
                      <img
                        src={post.thumbnailUrl}
                        alt={post.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                      />
                    ) : (
                      <div className="h-full w-full grid place-items-center text-[11px] text-white/40">
                        No image
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-semibold line-clamp-2 group-hover:text-emerald-300 transition-colors">
                      {post.title}
                    </h4>
                    <p className="mt-1 text-xs text-white/60 line-clamp-2">
                      {post.excerpt}
                    </p>
                    <div className="mt-2 flex flex-wrap items-center gap-2 text-[11px] text-white/45">
                      <span>{post.author}</span>
                      <span>•</span>
                      <span>
                        {new Date(post.createdAt).toLocaleDateString("vi-VN")}
                      </span>
                      {post.tags.slice(0, 2).map((t) => (
                        <span
                          key={t}
                          className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10"
                        >
                          #{t}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              ))}

            {paginated.length === 0 && (
              <div className="rounded-2xl border border-dashed border-white/15 bg-black/40 p-6 text-center text-sm text-white/60">
                Không tìm thấy bài viết nào phù hợp từ khóa này.
              </div>
            )}
          </div>
        </div>

        {/* Phân trang */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2 pt-4">
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="h-9 px-3 rounded-xl border border-white/10 bg-black/40 text-xs text-white/70 disabled:opacity-40"
            >
              Trang trước
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => goToPage(p)}
                className={`h-9 w-9 rounded-xl border text-xs ${
                  p === currentPage
                    ? "border-emerald-400 bg-emerald-400 text-black"
                    : "border-white/10 bg-black/40 text-white/70 hover:border-emerald-400/60"
                }`}
              >
                {p}
              </button>
            ))}
            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="h-9 px-3 rounded-xl border border-white/10 bg-black/40 text-xs text-white/70 disabled:opacity-40"
            >
              Trang sau
            </button>
          </div>
        )}
      </section>
    </main>
  );
}
