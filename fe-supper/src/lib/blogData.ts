// src/lib/blogData.ts
export type BlogStatus = "draft" | "published";

export type BlogPost = {
  id: string;
  slug: string;
  title: string;
  author: string;
  coverImageUrl?: string;
  thumbnailUrl?: string;
  excerpt: string;
  content: string;
  tags: string[];
  status: BlogStatus;
  createdAt: string; // ISO string
};

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "1",
    slug: "huong-dan-chon-proxy-cho-tool-farm",
    title: "Hướng dẫn chọn proxy cho tool farm tài khoản",
    author: "ForgeVault Team",
    coverImageUrl:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1400&q=80",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=400&q=80",
    excerpt:
      "Cách chọn proxy bền, hạn chế die, tối ưu chi phí khi nuôi nhiều tài khoản song song.",
    content: [
      "## Vì sao proxy quan trọng với tool farm?",
      "",
      "Khi bạn chạy nhiều tài khoản cùng lúc, việc dùng chung IP sẽ khiến rủi ro khóa tài khoản tăng rất cao.",
      "",
      "- Proxy giúp phân tách danh tính của từng tài khoản.",
      "- Giảm nguy cơ checkpoint, khóa hàng loạt.",
      "- Dễ dàng scale số lượng account mà vẫn kiểm soát được rủi ro.",
      "",
      "## Các tiêu chí chọn proxy phù hợp",
      "",
      "1. **Tốc độ ổn định**, latency thấp.",
      "2. **Địa lý phù hợp** với thị trường target.",
      "3. **Độ sạch IP** (ít bị spam trước đó).",
      "4. Chính sách **reset / rotation** rõ ràng.",
      "",
      "## Gợi ý setup chung",
      "",
      "- 1 proxy / 3–5 tài khoản (tùy nền tảng).",
      "- Nên mua của nhà cung cấp uy tín, có dashboard quản lý.",
      "",
      "> Tip: Khi dùng cùng với LDPlayer + automation, nên cố định mapping `proxy ↔ device` để hành vi tự nhiên hơn.",
    ].join("\n"),
    tags: ["proxy", "tool-farm", "automation"],
    status: "published",
    createdAt: "2025-12-03T10:00:00Z",
  },
  {
    id: "2",
    slug: "bao-ve-tai-khoan-khi-dung-tool-tu-dong",
    title: "Cách bảo vệ tài khoản khi dùng tool tự động",
    author: "Pháp",
    coverImageUrl:
      "https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=1400&q=80",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=400&q=80",
    excerpt:
      "Checklist cơ bản để hạn chế khóa tài khoản khi chạy tool auto trên nhiều thiết bị.",
    content: [
      "## Nguyên tắc vàng khi dùng automation",
      "",
      "1. Luôn **giả lập hành vi người dùng thật**.",
      "2. Không spam hành động lặp lại ở tần suất phi tự nhiên.",
      "3. Kết hợp **proxy + thiết bị ảo** hợp lý.",
      "",
      "## Những lỗi phổ biến",
      "",
      "- Đăng nhập quá nhiều tài khoản trên cùng IP.",
      "- Chạy tool 24/7 không nghỉ.",
      "- Dùng profile trình duyệt không tách bạch.",
      "",
      "## Gợi ý cấu hình an toàn",
      "",
      "- Giới hạn số luồng chạy đồng thời.",
      "- Cài đặt delay ngẫu nhiên giữa các hành động.",
      "- Log chi tiết để debug khi có vấn đề.",
    ].join("\n"),
    tags: ["security", "automation"],
    status: "published",
    createdAt: "2025-12-02T21:00:00Z",
  },
  // Anh có thể thêm nhiều bài nữa vào đây
];

export function getPublishedPosts() {
  return BLOG_POSTS.filter((p) => p.status === "published").sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export function getPostBySlug(slug: string) {
  return getPublishedPosts().find((p) => p.slug === slug);
}

export function getRelatedPosts(current: BlogPost, limit = 3) {
  const tagsSet = new Set(current.tags);
  return getPublishedPosts()
    .filter((p) => p.id !== current.id)
    .sort((a, b) => {
      const intersectA = a.tags.filter((t) => tagsSet.has(t)).length;
      const intersectB = b.tags.filter((t) => tagsSet.has(t)).length;
      return intersectB - intersectA;
    })
    .slice(0, limit);
}
