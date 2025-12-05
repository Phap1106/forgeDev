// src/app/blog/[slug]/page.tsx
"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  getPostBySlug,
  getRelatedPosts,
  getPublishedPosts,
} from "@/lib/blogData";
import { MarkdownContent } from "@/components/MarkdownContent";

type Props = {
  params: { slug: string };
};

export default function BlogDetailPage({ params }: Props) {
  const router = useRouter();
  const post = getPostBySlug(params.slug);

  if (!post) {
    // đơn giản: về /blog
    if (typeof window !== "undefined") router.replace("/blog");
    return null;
  }

  const related = getRelatedPosts(post, 3);
  const allPosts = getPublishedPosts();

  return (
    <main className="min-h-screen bg-[#02060A] text-white">
      {/* Header section */}
      <section className="border-b border-white/10 bg-gradient-to-b from-emerald-500/10 via-transparent to-transparent">
        <div className="mx-auto max-w-4xl px-4 pt-28 pb-6 space-y-4">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1 text-xs text-white/60 hover:text-emerald-300"
          >
            ← Quay lại Blog
          </Link>

          <div>
            <p className="text-[11px] uppercase tracking-[0.18em] text-emerald-300 mb-2">
              ForgeVault Blog
            </p>
            <h1 className="text-2xl md:text-3xl font-semibold">
              {post.title}
            </h1>
            <div className="mt-2 flex flex-wrap items-center gap-2 text-[11px] text-white/60">
              <span className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10">
                {post.author}
              </span>
              <span>•</span>
              <span>
                {new Date(post.createdAt).toLocaleDateString("vi-VN", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
              </span>
              {post.tags.map((t) => (
                <span
                  key={t}
                  className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-400/40"
                >
                  #{t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Cover */}
      {post.coverImageUrl && (
        <div className="border-b border-white/10 bg-black/80">
          <div className="mx-auto max-w-4xl px-4 py-4">
            <div className="overflow-hidden rounded-3xl border border-white/10">
              <img
                src={post.coverImageUrl}
                alt={post.title}
                className="w-full max-h-[420px] object-cover"
              />
            </div>
          </div>
        </div>
      )}

      {/* Content + sidebar */}
      <section className="mx-auto max-w-6xl px-4 py-8 grid gap-8 lg:grid-cols-[3fr_1.3fr]">
        <article className="rounded-3xl border border-white/10 bg-black/60 p-5 md:p-7">
          {post.excerpt && (
            <p className="mb-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/30 px-4 py-3 text-sm text-emerald-100">
              {post.excerpt}
            </p>
          )}
          <MarkdownContent content={post.content} />
        </article>

        {/* Sidebar */}
        <aside className="space-y-6">
          {/* Bài mới nhất */}
          <div className="rounded-3xl border border-white/10 bg-black/60 p-4">
            <h3 className="text-xs font-semibold text-white/80 mb-3">
              Bài mới nhất
            </h3>
            <div className="space-y-2">
              {allPosts.slice(0, 4).map((p) => (
                <Link
                  key={p.id}
                  href={`/blog/${p.slug}`}
                  className="group flex gap-3 rounded-2xl bg-white/5 p-2 hover:bg-white/10 transition-colors"
                >
                  <div className="h-12 w-16 flex-shrink-0 overflow-hidden rounded-xl bg-black/60">
                    {p.thumbnailUrl ? (
                      <img
                        src={p.thumbnailUrl}
                        alt={p.title}
                        className="h-full w-full object-cover group-hover:scale-[1.05] transition-transform"
                      />
                    ) : (
                      <div className="h-full w-full grid place-items-center text-[10px] text-white/40">
                        No image
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-medium line-clamp-2 group-hover:text-emerald-300">
                      {p.title}
                    </p>
                    <p className="mt-0.5 text-[11px] text-white/50">
                      {new Date(p.createdAt).toLocaleDateString("vi-VN")}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Tag cloud */}
          {post.tags.length > 0 && (
            <div className="rounded-3xl border border-white/10 bg-black/60 p-4">
              <h3 className="text-xs font-semibold text-white/80 mb-3">
                Chủ đề liên quan
              </h3>
              <div className="flex flex-wrap gap-2 text-[11px]">
                {post.tags.map((t) => (
                  <span
                    key={t}
                    className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-400/40"
                  >
                    #{t}
                  </span>
                ))}
              </div>
            </div>
          )}
        </aside>
      </section>

      {/* Related posts */}
      {related.length > 0 && (
        <section className="border-t border-white/10 bg-black/80">
          <div className="mx-auto max-w-6xl px-4 py-8">
            <h3 className="text-sm font-semibold text-white/90 mb-4">
              Bài viết gợi ý cho bạn
            </h3>
            <div className="grid gap-4 md:grid-cols-3">
              {related.map((p) => (
                <Link
                  key={p.id}
                  href={`/blog/${p.slug}`}
                  className="group rounded-2xl border border-white/10 bg-black/60 p-3 hover:border-emerald-400/40 hover:bg-black/70 transition-colors flex flex-col"
                >
                  <div className="h-28 w-full overflow-hidden rounded-xl bg-black/60 mb-3">
                    {p.thumbnailUrl ? (
                      <img
                        src={p.thumbnailUrl}
                        alt={p.title}
                        className="h-full w-full object-cover group-hover:scale-[1.05] transition-transform"
                      />
                    ) : (
                      <div className="h-full w-full grid place-items-center text-[11px] text-white/40">
                        No image
                      </div>
                    )}
                  </div>
                  <h4 className="text-sm font-semibold line-clamp-2 group-hover:text-emerald-300">
                    {p.title}
                  </h4>
                  <p className="mt-2 text-xs text-white/60 line-clamp-3">
                    {p.excerpt}
                  </p>
                  <div className="mt-3 flex items-center justify-between text-[11px] text-white/50">
                    <span>{p.author}</span>
                    <span>
                      {new Date(p.createdAt).toLocaleDateString("vi-VN")}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
