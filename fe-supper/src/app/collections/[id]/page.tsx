// import Header from "@/components/Header";
// import Footer from "@/components/Footer";
// import { Download, Zap, ShieldCheck, Clock } from "lucide-react";

// type Tool = {
//   id: string;
//   name: string;
//   tag: string;
//   short: string;
//   price: string;
//   image: string;
//   level: string;
//   runtime: string;
//   useCases: string[];
// };

// const TOOLS: Tool[] = [
//   {
//     id: "1",
//     name: "TikTok Account Farm Pro",
//     tag: "Automation Tool",
//     short: "Tự động tạo & nuôi nhiều tài khoản TikTok với proxy, đổi IP, chống khoá.",
//     price: "$39 / lifetime",
//     image:
//       "https://images.unsplash.com/photo-1634986666676-ec8fd927c23d?auto=format&fit=crop&w=1200&q=80",
//     level: "Intermediate",
//     runtime: "Chạy trên Windows + LDPlayer",
//     useCases: ["Nuôi tài khoản Tiktok", "Làm airdrop / task", "Chạy nhiều profile song song"],
//   },
//   {
//     id: "2",
//     name: "Telegram Lead Collector",
//     tag: "Lead Gen Tool",
//     short: "Quét & lưu khách hàng tiềm năng từ group Telegram về Google Sheet.",
//     price: "$29 / lifetime",
//     image:
//       "https://images.unsplash.com/photo-1635322966219-b75ed372eb01?auto=format&fit=crop&w=1200&q=80",
//     level: "Beginner",
//     runtime: "Web + Google Sheet",
//     useCases: ["Thu thập lead", "Lưu trữ khách hàng", "Kết hợp chatbot chăm sóc"],
//   },
//   {
//     id: "3",
//     name: "ForgeVault Task Runner",
//     tag: "Browser Automation",
//     short: "Tự động hoá thao tác web, login, điểm danh, claim nhiệm vụ mỗi ngày.",
//     price: "$49 / lifetime",
//     image:
//       "https://images.unsplash.com/photo-1520975958225-9e0ce82759c2?auto=format&fit=crop&w=1200&q=80",
//     level: "Advanced",
//     runtime: "Windows / Mac, dùng Chrome profile",
//     useCases: ["Claim airdrop", "Chạy task social", "Automation theo kịch bản"],
//   },
// ];

// function getTool(id: string): Tool {
//   return TOOLS.find((t) => t.id === id) ?? TOOLS[0];
// }

// export default function ToolDetailPage({ params }: { params: { id: string } }) {
//   const tool = getTool(params.id);

//   return (
//     <main className="min-h-screen bg-[#050B10] text-white">
//       <Header />

//       {/* Banner nhỏ */}
//       <section className="relative pt-16">
//         <div
//           className="h-[220px] w-full"
//           style={{
//             backgroundImage:
//               "url(https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=2000&q=80)",
//             backgroundSize: "cover",
//             backgroundPosition: "center",
//           }}
//         />
//         <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/70 to-[#050B10]" />
//         <div className="absolute inset-0">
//           <div className="mx-auto max-w-6xl px-4 h-full flex flex-col justify-center">
//             <p className="text-xs text-white/60">
//               <a href="/" className="hover:text-white transition">
//                 HOME
//               </a>{" "}
//               /{" "}
//               <a href="/collections" className="hover:text-white transition">
//                 COLLECTIONS
//               </a>{" "}
//               / <span className="text-emerald-300">{tool.tag}</span>
//             </p>
//             <h1 className="mt-2 text-3xl sm:text-4xl font-extrabold tracking-tight">
//               {tool.name}
//             </h1>
//             <p className="mt-2 max-w-2xl text-sm sm:text-base text-white/70">{tool.short}</p>
//           </div>
//         </div>
//       </section>

//       {/* Nội dung chính */}
//       <section className="py-10">
//         <div className="mx-auto max-w-6xl px-4">
//           <div className="grid gap-8 lg:grid-cols-12">
//             {/* Preview bên trái */}
//             <div className="lg:col-span-7">
//               <div className="rounded-3xl bg-white/5 ring-1 ring-white/10 overflow-hidden">
//                 <div className="relative">
//                   <img
//                     src={tool.image}
//                     alt={tool.name}
//                     className="w-full h-[340px] sm:h-[420px] object-cover"
//                   />
//                   <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
//                   <div className="absolute left-4 bottom-4 inline-flex items-center gap-2 rounded-2xl bg-black/60 px-3 py-1 text-xs text-white/80 ring-1 ring-white/15">
//                     <span className="inline-flex h-2 w-2 rounded-full bg-emerald-400" />
//                     LIVE TOOL PREVIEW
//                   </div>
//                 </div>
//               </div>

//               {/* Tabs nội dung mô tả (simple) */}
//               <div className="mt-6 rounded-3xl bg-white/5 ring-1 ring-white/10 p-5">
//                 <div className="flex flex-wrap gap-3 text-sm font-semibold">
//                   <button className="px-3 py-1.5 rounded-xl bg-emerald-400 text-black">
//                     Overview
//                   </button>
//                   <button className="px-3 py-1.5 rounded-xl bg-black/40 text-white/70">
//                     Features
//                   </button>
//                   <button className="px-3 py-1.5 rounded-xl bg-black/40 text-white/70">
//                     Usage
//                   </button>
//                   <button className="px-3 py-1.5 rounded-xl bg-black/40 text-white/70">
//                     Changelog
//                   </button>
//                 </div>

//                 <div className="mt-5 space-y-3 text-sm text-white/70">
//                   <p>
//                     Tool này được thiết kế để giúp bạn <b>tiết kiệm thời gian thao tác lặp lại</b>,
//                     giảm rủi ro khoá tài khoản và quản lý nhiều phiên làm việc cùng lúc.
//                   </p>
//                   <p>
//                     Sau khi mua, bạn sẽ nhận được:
//                   </p>
//                   <ul className="list-disc list-inside space-y-1">
//                     <li>File cài đặt / script mới nhất.</li>
//                     <li>Hướng dẫn chi tiết bằng video & tài liệu PDF.</li>
//                     <li>Nhóm hỗ trợ riêng cho khách hàng ForgeVault.</li>
//                     <li>Free update cho các bản vá lỗi & tối ưu nhỏ.</li>
//                   </ul>
//                 </div>
//               </div>
//             </div>

//             {/* Thông tin bán hàng bên phải */}
//             <aside className="lg:col-span-5 space-y-6">
//               <div className="rounded-3xl bg-white/5 ring-1 ring-white/10 p-5">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <p className="text-xs uppercase tracking-[0.18em] text-emerald-300">
//                       {tool.tag}
//                     </p>
//                     <p className="mt-2 text-2xl font-bold">{tool.price}</p>
//                   </div>
//                   <div className="text-right text-xs text-white/60">
//                     <span className="inline-flex items-center gap-1">
//                       <ShieldCheck className="h-4 w-4 text-emerald-300" />
//                       Secure checkout
//                     </span>
//                     <br />
//                     <span className="inline-flex items-center gap-1 mt-1">
//                       <Clock className="h-4 w-4 text-emerald-300" />
//                       Giao tool trong 1–3 phút
//                     </span>
//                   </div>
//                 </div>

//                 <div className="mt-5 grid gap-3">
//                   <button className="inline-flex items-center justify-center h-11 rounded-xl bg-emerald-400 text-black font-semibold hover:bg-emerald-300 transition">
//                     MUA NGAY & NHẬN TOOL
//                   </button>
//                   <button className="inline-flex items-center justify-center h-11 rounded-xl bg-black/40 text-white/85 ring-1 ring-white/15 hover:bg-black/55 transition">
//                     THÊM VÀO GIỎ
//                   </button>
//                   <button className="inline-flex items-center justify-center h-11 rounded-xl bg-black/20 text-white/70 ring-1 ring-white/10 hover:bg-black/40 transition">
//                     DÙNG THỬ TRỰC TIẾP TRÊN WEB (DEMO)
//                   </button>
//                 </div>

//                 <div className="mt-5 grid gap-3 text-sm text-white/75">
//                   <InfoRow
//                     icon={<Zap className="h-4 w-4 text-emerald-300" />}
//                     label="Mức độ"
//                     value={tool.level}
//                   />
//                   <InfoRow
//                     icon={<Clock className="h-4 w-4 text-emerald-300" />}
//                     label="Môi trường chạy"
//                     value={tool.runtime}
//                   />
//                   <InfoRow
//                     icon={<Download className="h-4 w-4 text-emerald-300" />}
//                     label="Cập nhật"
//                     value="Lifetime update nhỏ, big update ưu đãi riêng"
//                   />
//                 </div>
//               </div>

//               <div className="rounded-3xl bg-white/5 ring-1 ring-white/10 p-5">
//                 <p className="text-sm font-semibold mb-3">Tool này phù hợp cho:</p>
//                 <ul className="space-y-2 text-sm text-white/70">
//                   {tool.useCases.map((u) => (
//                     <li key={u} className="flex gap-2">
//                       <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-400" />
//                       <span>{u}</span>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             </aside>
//           </div>
//         </div>
//       </section>

//       <Footer />
//     </main>
//   );
// }

// function InfoRow({
//   icon,
//   label,
//   value,
// }: {
//   icon: React.ReactNode;
//   label: string;
//   value: string;
// }) {
//   return (
//     <div className="flex items-start gap-3">
//       <div className="mt-0.5">{icon}</div>
//       <div>
//         <p className="text-xs uppercase tracking-wide text-white/50">{label}</p>
//         <p className="text-sm text-white/80">{value}</p>
//       </div>
//     </div>
//   );
// }





// src/app/collections/[id]/page.tsx
"use client";

import { useState, type ReactNode } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Download, Zap, ShieldCheck, Clock } from "lucide-react";
import { useCart } from "@/components/cart/CartContext";

type Tool = {
  id: string;
  name: string;
  tag: string;
  short: string;
  price: string;
  image: string;
  level: string;
  runtime: string;
  useCases: string[];
};

const TOOLS: Tool[] = [
  {
    id: "1",
    name: "TikTok Account Farm Pro",
    tag: "Automation Tool",
    short:
      "Tự động tạo & nuôi nhiều tài khoản TikTok với proxy, đổi IP, chống khoá.",
    price: "$39 / lifetime",
    image:
      "https://images.unsplash.com/photo-1634986666676-ec8fd927c23d?auto=format&fit=crop&w=1200&q=80",
    level: "Intermediate",
    runtime: "Chạy trên Windows + LDPlayer",
    useCases: [
      "Nuôi tài khoản TikTok",
      "Làm airdrop / task",
      "Chạy nhiều profile song song",
    ],
  },
  {
    id: "2",
    name: "Telegram Lead Collector",
    tag: "Lead Gen Tool",
    short:
      "Quét & lưu khách hàng tiềm năng từ group Telegram về Google Sheet.",
    price: "$29 / lifetime",
    image:
      "https://images.unsplash.com/photo-1635322966219-b75ed372eb01?auto=format&fit=crop&w=1200&q=80",
    level: "Beginner",
    runtime: "Web + Google Sheet",
    useCases: [
      "Thu thập lead",
      "Lưu trữ khách hàng",
      "Kết hợp chatbot chăm sóc",
    ],
  },
  {
    id: "3",
    name: "ForgeVault Task Runner",
    tag: "Browser Automation",
    short:
      "Tự động hoá thao tác web, login, điểm danh, claim nhiệm vụ mỗi ngày.",
    price: "$49 / lifetime",
    image:
      "https://images.unsplash.com/photo-1520975958225-9e0ce82759c2?auto=format&fit=crop&w=1200&q=80",
    level: "Advanced",
    runtime: "Windows / Mac, dùng Chrome profile",
    useCases: [
      "Claim airdrop",
      "Chạy task social",
      "Automation theo kịch bản",
    ],
  },
];

function getTool(id: string): Tool {
  return TOOLS.find((t) => t.id === id) ?? TOOLS[0];
}

type TabId = "overview" | "features" | "usage" | "changelog";

export default function ToolDetailPage({ params }: { params: { id: string } }) {
  const tool = getTool(params.id);
  const { addItem } = useCart();
  const [tab, setTab] = useState<TabId>("overview");

  return (
    <main className="min-h-screen bg-[#050B10] text-white">
      <Header />

      {/* Banner nhỏ */}
      <section className="relative pt-16">
        <div
          className="h-[220px] w-full"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=2000&q=80)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/70 to-[#050B10]" />
        <div className="absolute inset-0">
          <div className="mx-auto max-w-6xl px-4 h-full flex flex-col justify-center">
            <p className="text-xs text-white/60">
              <a href="/" className="hover:text-white transition">
                HOME
              </a>{" "}
              /{" "}
              <a href="/collections" className="hover:text-white transition">
                COLLECTIONS
              </a>{" "}
              / <span className="text-emerald-300">{tool.tag}</span>
            </p>
            <h1 className="mt-2 text-3xl sm:text-4xl font-extrabold tracking-tight">
              {tool.name}
            </h1>
            <p className="mt-2 max-w-2xl text-sm sm:text-base text-white/70">
              {tool.short}
            </p>
          </div>
        </div>
      </section>

      {/* Nội dung chính */}
      <section className="py-10">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid gap-8 lg:grid-cols-12">
            {/* Preview bên trái */}
            <div className="lg:col-span-7">
              <div className="rounded-3xl bg-white/5 ring-1 ring-white/10 overflow-hidden">
                <div className="relative">
                  <img
                    src={tool.image}
                    alt={tool.name}
                    className="w-full h-[340px] sm:h-[420px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  <div className="absolute left-4 bottom-4 inline-flex items-center gap-2 rounded-2xl bg-black/60 px-3 py-1 text-xs text-white/80 ring-1 ring-white/15">
                    <span className="inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                    LIVE TOOL PREVIEW
                  </div>
                </div>
              </div>

              {/* Tabs nội dung */}
              <div className="mt-6 rounded-3xl bg-white/5 ring-1 ring-white/10 p-5">
                <div className="flex flex-wrap gap-3 text-sm font-semibold">
                  <TabButton
                    id="overview"
                    current={tab}
                    onClick={() => setTab("overview")}
                  >
                    Overview
                  </TabButton>
                  <TabButton
                    id="features"
                    current={tab}
                    onClick={() => setTab("features")}
                  >
                    Features
                  </TabButton>
                  <TabButton
                    id="usage"
                    current={tab}
                    onClick={() => setTab("usage")}
                  >
                    Usage
                  </TabButton>
                  <TabButton
                    id="changelog"
                    current={tab}
                    onClick={() => setTab("changelog")}
                  >
                    Changelog
                  </TabButton>
                </div>

                <div className="mt-5 text-sm text-white/70 space-y-3">
                  {renderTabContent(tab, tool)}
                </div>
              </div>
            </div>

            {/* Thông tin bán hàng bên phải */}
            <aside className="lg:col-span-5 space-y-6">
              <div className="rounded-3xl bg-white/5 ring-1 ring-white/10 p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.18em] text-emerald-300">
                      {tool.tag}
                    </p>
                    <p className="mt-2 text-2xl font-bold">{tool.price}</p>
                  </div>
                  <div className="text-right text-xs text-white/60 space-y-1">
                    <span className="inline-flex items-center gap-1">
                      <ShieldCheck className="h-4 w-4 text-emerald-300" />
                      Secure checkout
                    </span>
                    <br />
                    <span className="inline-flex items-center gap-1">
                      <Clock className="h-4 w-4 text-emerald-300" />
                      Giao tool trong 1–3 phút
                    </span>
                  </div>
                </div>

                <div className="mt-5 grid gap-3">
                  <button className="inline-flex items-center justify-center h-11 rounded-xl bg-emerald-400 text-black font-semibold hover:bg-emerald-300 transition hover:-translate-y-[1px] active:translate-y-[1px] active:scale-[0.97]">
                    MUA NGAY & NHẬN TOOL
                  </button>

                  <button
                    onClick={() =>
                      addItem({
                        id: tool.id,
                        name: tool.name,
                        price: tool.price,
                      })
                    }
                    className="inline-flex items-center justify-center h-11 rounded-xl bg-black/40 text-white/85 ring-1 ring-white/15 hover:bg-black/60 transition hover:-translate-y-[1px] active:translate-y-[1px] active:scale-[0.97]"
                  >
                    THÊM VÀO GIỎ
                  </button>

                  <button className="inline-flex items-center justify-center h-11 rounded-xl bg-black/20 text-white/70 ring-1 ring-white/10 hover:bg-black/40 transition hover:-translate-y-[1px] active:translate-y-[1px] active:scale-[0.97]">
                    DÙNG THỬ TRỰC TIẾP TRÊN WEB (DEMO)
                  </button>
                </div>

                <div className="mt-5 grid gap-3 text-sm text-white/75">
                  <InfoRow
                    icon={<Zap className="h-4 w-4 text-emerald-300" />}
                    label="Mức độ"
                    value={tool.level}
                  />
                  <InfoRow
                    icon={<Clock className="h-4 w-4 text-emerald-300" />}
                    label="Môi trường chạy"
                    value={tool.runtime}
                  />
                  <InfoRow
                    icon={<Download className="h-4 w-4 text-emerald-300" />}
                    label="Cập nhật"
                    value="Lifetime update nhỏ, big update ưu đãi riêng"
                  />
                </div>
              </div>

              <div className="rounded-3xl bg-white/5 ring-1 ring-white/10 p-5">
                <p className="text-sm font-semibold mb-3">
                  Tool này phù hợp cho:
                </p>
                <ul className="space-y-2 text-sm text-white/70">
                  {tool.useCases.map((u) => (
                    <li key={u} className="flex gap-2">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-400" />
                      <span>{u}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

function TabButton({
  id,
  current,
  onClick,
  children,
}: {
  id: TabId;
  current: TabId;
  onClick: () => void;
  children: ReactNode;
}) {
  const active = current === id;
  return (
    <button
      onClick={onClick}
      className={
        "px-3 py-1.5 rounded-xl transition text-sm " +
        (active
          ? "bg-emerald-400 text-black shadow-[0_0_0_1px_rgba(5,250,130,0.6)]"
          : "bg-black/40 text-white/70 hover:bg-black/60")
      }
    >
      {children}
    </button>
  );
}

function renderTabContent(tab: TabId, tool: Tool) {
  switch (tab) {
    case "overview":
      return (
        <>
          <p>
            Tool này được thiết kế để giúp bạn{" "}
            <b>tiết kiệm thời gian thao tác lặp lại</b>, giảm rủi ro khoá tài
            khoản và quản lý nhiều phiên làm việc cùng lúc.
          </p>
          <p>Sau khi mua, bạn sẽ nhận được:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>File cài đặt / script mới nhất.</li>
            <li>Hướng dẫn chi tiết bằng video &amp; tài liệu PDF.</li>
            <li>Nhóm hỗ trợ riêng cho khách hàng ForgeVault.</li>
            <li>Free update cho các bản vá lỗi &amp; tối ưu nhỏ.</li>
          </ul>
        </>
      );
    case "features":
      return (
        <>
          <p className="font-semibold">Tính năng nổi bật:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Quản lý nhiều tài khoản / profile cùng lúc.</li>
            <li>Tích hợp proxy / đổi IP theo từng tài khoản.</li>
            <li>Tuỳ biến kịch bản thao tác theo file config.</li>
            <li>Log chi tiết để debug khi có vấn đề.</li>
          </ul>
        </>
      );
    case "usage":
      return (
        <>
          <p className="font-semibold">Cách sử dụng cơ bản:</p>
          <ol className="list-decimal list-inside space-y-1">
            <li>Tải tool &amp; giải nén theo hướng dẫn.</li>
            <li>Nhập license / key được cấp sau khi thanh toán.</li>
            <li>Điền proxy, cấu hình tài khoản, kịch bản chạy.</li>
            <li>Bấm Start và theo dõi log / kết quả.</li>
          </ol>
          <p className="text-xs text-white/50">
            Lưu ý: luôn test trước trên ít tài khoản để tối ưu cấu hình.
          </p>
        </>
      );
    case "changelog":
      return (
        <>
          <p className="font-semibold">Changelog (lịch sử cập nhật):</p>
          <ul className="list-disc list-inside space-y-1 text-sm">
            <li>
              <b>v1.2.0</b> – Thêm chế độ random delay, tối ưu chống spam.
            </li>
            <li>
              <b>v1.1.0</b> – Hỗ trợ export log ra file CSV.
            </li>
            <li>
              <b>v1.0.0</b> – Phiên bản đầu tiên, hỗ trợ kịch bản cơ bản.
            </li>
          </ul>
        </>
      );
  }
}

function InfoRow({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5">{icon}</div>
      <div>
        <p className="text-xs uppercase tracking-wide text-white/50">
          {label}
        </p>
        <p className="text-sm text-white/80">{value}</p>
      </div>
    </div>
  );
}
