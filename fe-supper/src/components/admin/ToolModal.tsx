// // src/components/admin/ToolModal.tsx
// "use client";

// import React, { useEffect, useMemo, useState } from "react";
// import { UploadCloud, Image as ImageIcon } from "lucide-react";

// type DeliveryType = "online" | "download";
// type BillingMode = "one_time" | "rental";
// type RentalStrategy = "fixed_packages" | "user_choose";

// export type Tool = {
//   id?: string;

//   // Cơ bản
//   name: string;
//   category: string;
//   price: number;
//   description: string;

//   // Cung cấp / thanh toán
//   deliveryType: DeliveryType;
//   billingMode: BillingMode;
//   hourlyPrice?: number;
//   rentalStrategy?: RentalStrategy;
//   rentalPackages?: string[];
//   downloadUrl?: string;
//   downloadFileName?: string;

//   // Hiển thị landing page
//   priceLabel?: string;
//   heroImageUrl?: string;
//   liveBadgeText?: string;
//   difficulty?: string;
//   environment?: string;
//   updatePolicy?: string;
//   suitableFor?: string[];
//   overviewMd?: string;
//   featuresMd?: string;
//   usageMd?: string;
//   changelogMd?: string;
//   demoUrl?: string;
// };

// type Props = {
//   initial?: Tool | null;
//   onClose: () => void;
//   onSave: (tool: Tool) => void;
// };

// const RENTAL_OPTIONS = [
//   { key: "1d", label: "1 ngày", hours: 24 },
//   { key: "2d", label: "2 ngày", hours: 48 },
//   { key: "3d", label: "3 ngày", hours: 72 },
//   { key: "7d", label: "7 ngày", hours: 7 * 24 },
//   { key: "14d", label: "14 ngày", hours: 14 * 24 },
//   { key: "1m", label: "1 tháng", hours: 30 * 24 },
//   { key: "3m", label: "3 tháng", hours: 90 * 24 },
//   { key: "1y", label: "1 năm", hours: 365 * 24 },
//   { key: "2y", label: "2 năm", hours: 730 * 24 },
//   { key: "forever", label: "Vĩnh viễn", hours: 0 },
// ];

// export function ToolModal({ initial, onClose, onSave }: Props) {
//   // ====== BASIC ======
//   const [name, setName] = useState(initial?.name ?? "");
//   const [category, setCategory] = useState(initial?.category ?? "Automation");
//   const [price, setPrice] = useState(initial?.price ?? 0);
//   const [description, setDescription] = useState(initial?.description ?? "");

//   const [deliveryType, setDeliveryType] = useState<DeliveryType>(
//     initial?.deliveryType ?? "online",
//   );
//   const [billingMode, setBillingMode] = useState<BillingMode>(
//     initial?.billingMode ?? "one_time",
//   );
//   const [rentalStrategy, setRentalStrategy] =
//     useState<RentalStrategy>(initial?.rentalStrategy ?? "fixed_packages");
//   const [hourlyPrice, setHourlyPrice] = useState<number>(
//     initial?.hourlyPrice ?? 0,
//   );
//   const [rentalPackages, setRentalPackages] = useState<string[]>(
//     initial?.rentalPackages ?? ["7d", "1m"],
//   );

//   const [downloadUrl, setDownloadUrl] = useState(initial?.downloadUrl ?? "");
//   const [downloadFile, setDownloadFile] = useState<File | null>(null);
//   const [downloadFilePreview, setDownloadFilePreview] =
//     useState<string | null>(null);

//   // ====== LANDING META ======
//   const [priceLabel, setPriceLabel] = useState(
//     initial?.priceLabel ?? "$39 / lifetime",
//   );
//   const [heroImageUrl, setHeroImageUrl] = useState(
//     initial?.heroImageUrl ?? "",
//   );
//   const [heroImageFile, setHeroImageFile] = useState<File | null>(null);
//   const [heroImagePreview, setHeroImagePreview] = useState<string | null>(null);

//   const [liveBadgeText, setLiveBadgeText] = useState(
//     initial?.liveBadgeText ?? "LIVE TOOL PREVIEW",
//   );
//   const [difficulty, setDifficulty] = useState(
//     initial?.difficulty ?? "Intermediate",
//   );
//   const [environment, setEnvironment] = useState(
//     initial?.environment ?? "Chạy trên Windows + LDPlayer",
//   );
//   const [updatePolicy, setUpdatePolicy] = useState(
//     initial?.updatePolicy ??
//       "Lifetime update nhỏ, big update ưu đãi riêng",
//   );
//   const [suitableFor, setSuitableFor] = useState<string[]>(
//     initial?.suitableFor ?? [
//       "Nuôi tài khoản TikTok",
//       "Làm airdrop / task",
//       "Chạy nhiều profile song song",
//     ],
//   );

//   const [overviewMd, setOverviewMd] = useState(
//     initial?.overviewMd ??
//       "Tool này được thiết kế để giúp bạn tiết kiệm thời gian thao tác lặp lại...",
//   );
//   const [featuresMd, setFeaturesMd] = useState(
//     initial?.featuresMd ??
//       "- Tự động tạo & nuôi tài khoản\n- Quản lý proxy dễ dàng...",
//   );
//   const [usageMd, setUsageMd] = useState(
//     initial?.usageMd ??
//       "- Bước 1: Cài đặt tool\n- Bước 2: Nhập proxy / tài khoản...",
//   );
//   const [changelogMd, setChangelogMd] = useState(
//     initial?.changelogMd ?? "- v1.0: Phát hành phiên bản đầu tiên",
//   );
//   const [demoUrl, setDemoUrl] = useState(initial?.demoUrl ?? "");

//   // ====== EFFECTS ======
//   useEffect(() => {
//     if (!downloadFile) {
//       setDownloadFilePreview(null);
//       return;
//     }
//     const url = URL.createObjectURL(downloadFile);
//     setDownloadFilePreview(url);
//     return () => URL.revokeObjectURL(url);
//   }, [downloadFile]);

//   useEffect(() => {
//     if (!heroImageFile) {
//       setHeroImagePreview(heroImageUrl || null);
//       return;
//     }
//     const url = URL.createObjectURL(heroImageFile);
//     setHeroImagePreview(url);
//     return () => URL.revokeObjectURL(url);
//   }, [heroImageFile, heroImageUrl]);

//   const isEdit = !!initial?.id;

//   const computedPackages = useMemo(() => {
//     if (!hourlyPrice || hourlyPrice <= 0) return [];
//     return RENTAL_OPTIONS.filter((opt) =>
//       rentalPackages.includes(opt.key),
//     ).map((opt) => ({
//       ...opt,
//       price:
//         opt.hours === 0
//           ? price || 0
//           : Math.round(hourlyPrice * opt.hours),
//     }));
//   }, [hourlyPrice, rentalPackages, price]);

//   function toggleRentalPackage(key: string) {
//     setRentalPackages((prev) =>
//       prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key],
//     );
//   }

//   function handleSubmit(e: React.FormEvent) {
//     e.preventDefault();

//     const payload: Tool = {
//       id: initial?.id,
//       name: name.trim(),
//       category: category.trim(),
//       price: Number(price) || 0,
//       description: description.trim(),
//       deliveryType,
//       billingMode,
//       hourlyPrice:
//         billingMode === "rental" ? Number(hourlyPrice) || 0 : undefined,
//       rentalStrategy: billingMode === "rental" ? rentalStrategy : undefined,
//       rentalPackages:
//         billingMode === "rental" && rentalStrategy === "fixed_packages"
//           ? rentalPackages
//           : undefined,
//       downloadUrl: deliveryType === "download" ? downloadUrl.trim() : undefined,
//       downloadFileName:
//         deliveryType === "download" && downloadFile
//           ? downloadFile.name
//           : initial?.downloadFileName,

//       priceLabel: priceLabel.trim(),
//       heroImageUrl: heroImageUrl.trim() || heroImagePreview || undefined,
//       liveBadgeText: liveBadgeText.trim(),
//       difficulty: difficulty.trim(),
//       environment: environment.trim(),
//       updatePolicy: updatePolicy.trim(),
//       suitableFor: suitableFor.map((s) => s.trim()).filter(Boolean),
//       overviewMd,
//       featuresMd,
//       usageMd,
//       changelogMd,
//       demoUrl: demoUrl.trim(),
//     };

//     onSave(payload);
//   }

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center">
//       <div
//         className="absolute inset-0 bg-black/70 backdrop-blur-sm"
//         onClick={onClose}
//       />
//       <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#050B10] border border-white/15 p-6 shadow-[0_20px_80px_rgba(0,0,0,0.9)]">
//         <div className="flex items-center justify-between mb-4">
//           <h2 className="text-lg font-semibold">
//             {isEdit ? "Chỉnh sửa tool" : "Thêm tool mới"}
//           </h2>
//           <button
//             onClick={onClose}
//             className="h-8 w-8 grid place-items-center rounded-xl bg-white/5 hover:bg-white/10 transition"
//           >
//             ✕
//           </button>
//         </div>

//         <form onSubmit={handleSubmit} className="space-y-5 text-sm">
//           {/* CƠ BẢN */}
//           <div className="space-y-3">
//             <div>
//               <label className="block text-xs text-white/60 mb-1">
//                 Tên tool *
//               </label>
//               <input
//                 className="w-full h-10 rounded-xl bg-black/40 px-3 focus:outline-none focus:ring-2 focus:ring-emerald-400/60"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 required
//               />
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//               <div>
//                 <label className="block text-xs text-white/60 mb-1">
//                   Loại tool *
//                 </label>
//                 <input
//                   className="w-full h-10 rounded-xl bg-black/40 px-3 focus:outline-none focus:ring-2 focus:ring-emerald-400/40"
//                   value={category}
//                   onChange={(e) => setCategory(e.target.value)}
//                   placeholder="Automation, Account, Proxy,…"
//                 />
//               </div>
//               <div>
//                 <label className="block text-xs text-white/60 mb-1">
//                   Giá bán trọn đời (VND) *
//                 </label>
//                 <input
//                   type="number"
//                   min={0}
//                   className="w-full h-10 rounded-xl bg-black/40 px-3 focus:outline-none focus:ring-2 focus:ring-emerald-400/40"
//                   value={price}
//                   onChange={(e) => setPrice(Number(e.target.value))}
//                   required
//                 />
//               </div>
//               <div>
//                 <label className="block text-xs text-white/60 mb-1">
//                   Nhãn giá hiển thị
//                 </label>
//                 <input
//                   className="w-full h-10 rounded-xl bg-black/40 px-3 focus:outline-none focus:ring-2 focus:ring-emerald-400/40"
//                   value={priceLabel}
//                   onChange={(e) => setPriceLabel(e.target.value)}
//                   placeholder="$39 / lifetime"
//                 />
//               </div>
//             </div>

//             <div>
//               <label className="block text-xs text-white/60 mb-1">
//                 Mô tả ngắn
//               </label>
//               <textarea
//                 rows={3}
//                 className="w-full rounded-xl bg-black/40 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-400/40"
//                 value={description}
//                 onChange={(e) => setDescription(e.target.value)}
//               />
//             </div>
//           </div>

//           {/* HÌNH THỨC CUNG CẤP */}
//           <div className="space-y-3">
//             <span className="block text-xs text-white/60">
//               Hình thức cung cấp
//             </span>
//             <div className="flex flex-wrap gap-4 text-xs">
//               <label className="inline-flex items-center gap-2">
//                 <input
//                   type="radio"
//                   className="accent-emerald-400"
//                   checked={deliveryType === "online"}
//                   onChange={() => setDeliveryType("online")}
//                 />
//                 <span>Online (chạy trực tiếp trên web)</span>
//               </label>
//               <label className="inline-flex items-center gap-2">
//                 <input
//                   type="radio"
//                   className="accent-emerald-400"
//                   checked={deliveryType === "download"}
//                   onChange={() => setDeliveryType("download")}
//                 />
//                 <span>Download (file / folder gửi cho khách)</span>
//               </label>
//             </div>

//             {deliveryType === "download" && (
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-xs text-white/60 mb-1">
//                     Link download (URL)
//                   </label>
//                   <input
//                     className="w-full h-10 rounded-xl bg-black/40 px-3 focus:outline-none focus:ring-2 focus:ring-emerald-400/40"
//                     placeholder="https://..."
//                     value={downloadUrl}
//                     onChange={(e) => setDownloadUrl(e.target.value)}
//                   />
//                   <p className="mt-1 text-[11px] text-white/45">
//                     Sau này BE có thể dùng link từ storage (S3, GDrive, v.v…).
//                   </p>
//                 </div>
//                 <div>
//                   <label className="block text-xs text-white/60 mb-1">
//                     Upload file (.zip, .rar, .pdf…)
//                   </label>
//                   <div className="flex items-center gap-2">
//                     <label
//                       className="inline-flex items-center gap-2 rounded-xl bg-white/5 px-3 py-1.5 text-xs cursor-pointer hover:bg-white/10"
//                     >
//                       <UploadCloud className="h-4 w-4" />
//                       <span>Chọn file từ máy</span>
//                       <input
//                         type="file"
//                         className="hidden"
//                         onChange={(e) =>
//                           setDownloadFile(e.target.files?.[0] ?? null)
//                         }
//                       />
//                     </label>
//                     {downloadFile && (
//                       <span className="text-[11px] text-white/60 truncate">
//                         {downloadFile.name}
//                       </span>
//                     )}
//                   </div>
//                   {downloadFilePreview && (
//                     <p className="mt-1 text-[11px] text-white/50">
//                       File sẽ được upload ở bước BE (hiện tại chỉ lưu tên file).
//                     </p>
//                   )}
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* THANH TOÁN / THUÊ */}
//           <div className="space-y-3">
//             <span className="block text-xs text-white/60">
//               Hình thức thanh toán
//             </span>
//             <div className="flex flex-wrap gap-3 text-xs">
//               <label className="inline-flex items-center gap-2">
//                 <input
//                   type="radio"
//                   className="accent-emerald-400"
//                   checked={billingMode === "one_time"}
//                   onChange={() => setBillingMode("one_time")}
//                 />
//                 <span>Mua trọn đời (1 lần)</span>
//               </label>
//               <label className="inline-flex items-center gap-2">
//                 <input
//                   type="radio"
//                   className="accent-emerald-400"
//                   checked={billingMode === "rental"}
//                   onChange={() => setBillingMode("rental")}
//                 />
//                 <span>Thuê theo thời gian</span>
//               </label>
//             </div>

//             {billingMode === "rental" && (
//               <div className="space-y-3 rounded-2xl bg-black/30 px-3 py-3">
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-xs text-white/60 mb-1">
//                       Giá theo giờ (VND) *
//                     </label>
//                     <input
//                       type="number"
//                       min={0}
//                       className="w-full h-10 rounded-xl bg-black/50 px-3 focus:outline-none focus:ring-2 focus:ring-emerald-400/40"
//                       value={hourlyPrice}
//                       onChange={(e) =>
//                         setHourlyPrice(Number(e.target.value))
//                       }
//                       required
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-xs text-white/60 mb-1">
//                       Cách tính thời gian thuê
//                     </label>
//                     <div className="flex flex-col gap-1 text-xs">
//                       <label className="inline-flex items-center gap-2">
//                         <input
//                           type="radio"
//                           className="accent-emerald-400"
//                           checked={rentalStrategy === "fixed_packages"}
//                           onChange={() =>
//                             setRentalStrategy("fixed_packages")
//                           }
//                         />
//                         <span>Gói cố định do admin set</span>
//                       </label>
//                       <label className="inline-flex items-center gap-2">
//                         <input
//                           type="radio"
//                           className="accent-emerald-400"
//                           checked={rentalStrategy === "user_choose"}
//                           onChange={() => setRentalStrategy("user_choose")}
//                         />
//                         <span>User tự chọn theo số giờ / ngày</span>
//                       </label>
//                     </div>
//                   </div>
//                 </div>

//                 {rentalStrategy === "fixed_packages" && (
//                   <div className="space-y-2">
//                     <p className="text-xs text-white/60">
//                       Chọn các gói thời gian cho thuê:
//                     </p>
//                     <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-xs">
//                       {RENTAL_OPTIONS.map((opt) => (
//                         <label
//                           key={opt.key}
//                           className="inline-flex items-center gap-2 rounded-xl bg-black/50 px-2 py-1"
//                         >
//                           <input
//                             type="checkbox"
//                             className="accent-emerald-400"
//                             checked={rentalPackages.includes(opt.key)}
//                             onChange={() => toggleRentalPackage(opt.key)}
//                           />
//                           <span>{opt.label}</span>
//                         </label>
//                       ))}
//                     </div>

//                     {computedPackages.length > 0 && (
//                       <div className="mt-2 rounded-xl bg-black/50 px-3 py-2 text-[11px] text-white/70 space-y-1">
//                         <p className="font-semibold text-xs">
//                           Bảng giá dự kiến (theo giờ * gói):
//                         </p>
//                         {computedPackages.map((pkg) => (
//                           <div
//                             key={pkg.key}
//                             className="flex justify-between border-t border-white/10 pt-1"
//                           >
//                             <span>{pkg.label}</span>
//                             <span>
//                               {pkg.hours === 0
//                                 ? `${pkg.price.toLocaleString()} VND (vĩnh viễn)`
//                                 : `${pkg.price.toLocaleString()} VND`}
//                             </span>
//                           </div>
//                         ))}
//                       </div>
//                     )}
//                   </div>
//                 )}
//               </div>
//             )}
//           </div>

//           {/* THÔNG TIN HIỂN THỊ TRANG KHÁCH HÀNG */}
//           <div className="space-y-3 rounded-2xl bg-black/30 px-3 py-3">
//             <p className="text-xs font-semibold text-white/70">
//               Thông tin hiển thị trên trang chi tiết tool
//             </p>

//             {/* Cover + badge */}
//             <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-4 items-start">
//               <div>
//                 <label className="block text-xs text-white/60 mb-1">
//                   Ảnh cover (URL)
//                 </label>
//                 <input
//                   className="w-full h-10 rounded-xl bg-black/50 px-3 focus:outline-none focus:ring-2 focus:ring-emerald-400/40"
//                   placeholder="https://..."
//                   value={heroImageUrl}
//                   onChange={(e) => setHeroImageUrl(e.target.value)}
//                 />

//                 <div className="mt-2 flex items-center gap-2 text-xs">
//                   <label
//                     htmlFor="hero-upload"
//                     className="inline-flex items-center gap-2 rounded-xl bg-white/5 px-3 py-1.5 cursor-pointer hover:bg-white/10"
//                   >
//                     <ImageIcon className="h-4 w-4" />
//                     <span>Chọn ảnh cover từ máy</span>
//                   </label>
//                   <input
//                     id="hero-upload"
//                     type="file"
//                     accept="image/*"
//                     className="hidden"
//                     onChange={(e) =>
//                       setHeroImageFile(e.target.files?.[0] ?? null)
//                     }
//                   />
//                   {heroImageFile && (
//                     <span className="text-[11px] text-white/60 truncate">
//                       {heroImageFile.name}
//                     </span>
//                   )}
//                 </div>

//                 {heroImagePreview && (
//                   <img
//                     src={heroImagePreview}
//                     alt="Hero preview"
//                     className="mt-2 w-full max-h-52 object-cover rounded-2xl"
//                   />
//                 )}
//               </div>

//               <div className="space-y-3">
//                 <div>
//                   <label className="block text-xs text-white/60 mb-1">
//                     Badge hiển thị dưới ảnh
//                   </label>
//                   <input
//                     className="w-full h-10 rounded-xl bg-black/50 px-3 focus:outline-none focus:ring-2 focus:ring-emerald-400/40"
//                     value={liveBadgeText}
//                     onChange={(e) => setLiveBadgeText(e.target.value)}
//                     placeholder="LIVE TOOL PREVIEW"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-xs text-white/60 mb-1">
//                     Mức độ (difficulty)
//                   </label>
//                   <input
//                     className="w-full h-10 rounded-xl bg-black/50 px-3 focus:outline-none focus:ring-2 focus:ring-emerald-400/40"
//                     value={difficulty}
//                     onChange={(e) => setDifficulty(e.target.value)}
//                     placeholder="Beginner / Intermediate / Advanced"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-xs text-white/60 mb-1">
//                     Môi trường chạy
//                   </label>
//                   <input
//                     className="w-full h-10 rounded-xl bg-black/50 px-3 focus:outline-none focus:ring-2 focus:ring-emerald-400/40"
//                     value={environment}
//                     onChange={(e) => setEnvironment(e.target.value)}
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-xs text-white/60 mb-1">
//                     Chính sách cập nhật
//                   </label>
//                   <input
//                     className="w-full h-10 rounded-xl bg-black/50 px-3 focus:outline-none focus:ring-2 focus:ring-emerald-400/40"
//                     value={updatePolicy}
//                     onChange={(e) => setUpdatePolicy(e.target.value)}
//                   />
//                 </div>
//               </div>
//             </div>

//             {/* Suitable for + demo */}
//             <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-4">
//               <div>
//                 <label className="block text-xs text-white/60 mb-1">
//                   Tool này phù hợp cho (mỗi dòng 1 ý)
//                 </label>
//                 <textarea
//                   rows={3}
//                   className="w-full rounded-xl bg-black/50 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-400/40"
//                   value={suitableFor.join("\n")}
//                   onChange={(e) =>
//                     setSuitableFor(
//                       e.target.value
//                         .split("\n")
//                         .map((s) => s.trim())
//                         .filter(Boolean),
//                     )
//                   }
//                 />
//               </div>
//               <div>
//                 <label className="block text-xs text-white/60 mb-1">
//                   Demo URL (nút &quot;Dùng thử trực tiếp&quot;)
//                 </label>
//                 <input
//                   className="w-full h-10 rounded-xl bg-black/50 px-3 focus:outline-none focus:ring-2 focus:ring-emerald-400/40"
//                   placeholder="https://demo-forgevault.com/..."
//                   value={demoUrl}
//                   onChange={(e) => setDemoUrl(e.target.value)}
//                 />
//               </div>
//             </div>
//           </div>

//           {/* NỘI DUNG TAB (MARKDOWN) */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div className="space-y-2">
//               <label className="block text-xs text-white/60 mb-1">
//                 Overview (Markdown)
//               </label>
//               <textarea
//                 rows={6}
//                 className="w-full rounded-xl bg-black/40 px-3 py-2 font-mono text-xs focus:outline-none focus:ring-2 focus:ring-emerald-400/40"
//                 value={overviewMd}
//                 onChange={(e) => setOverviewMd(e.target.value)}
//               />
//               <label className="block text-xs text-white/60 mb-1">
//                 Features (Markdown)
//               </label>
//               <textarea
//                 rows={6}
//                 className="w-full rounded-xl bg-black/40 px-3 py-2 font-mono text-xs focus:outline-none focus:ring-2 focus:ring-emerald-400/40"
//                 value={featuresMd}
//                 onChange={(e) => setFeaturesMd(e.target.value)}
//               />
//             </div>
//             <div className="space-y-2">
//               <label className="block text-xs text-white/60 mb-1">
//                 Usage (Markdown)
//               </label>
//               <textarea
//                 rows={6}
//                 className="w-full rounded-xl bg-black/40 px-3 py-2 font-mono text-xs focus:outline-none focus:ring-2 focus:ring-emerald-400/40"
//                 value={usageMd}
//                 onChange={(e) => setUsageMd(e.target.value)}
//               />
//               <label className="block text-xs text-white/60 mb-1">
//                 Changelog (Markdown)
//               </label>
//               <textarea
//                 rows={6}
//                 className="w-full rounded-xl bg-black/40 px-3 py-2 font-mono text-xs focus:outline-none focus:ring-2 focus:ring-emerald-400/40"
//                 value={changelogMd}
//                 onChange={(e) => setChangelogMd(e.target.value)}
//               />
//             </div>
//           </div>

//           <div className="flex justify-end gap-2 pt-2">
//             <button
//               type="button"
//               onClick={onClose}
//               className="h-10 px-4 rounded-xl bg-black/40 text-xs text-white/75 hover:bg-black/60 transition"
//             >
//               Hủy
//             </button>
//             <button
//               type="submit"
//               className="h-10 px-4 rounded-xl bg-emerald-400 text-black text-sm font-semibold hover:bg-emerald-300 transition"
//             >
//               {isEdit ? "Lưu thay đổi" : "Thêm tool"}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default ToolModal;







"use client";

import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import { uploadToolImage, ToolDto, RentalPackage } from "@/api/toolsApi";
import { toast } from "sonner";

type Props = {
  open: boolean;
  initial: ToolDto | null;
  onClose: () => void;
  onSave: (tool: ToolDto) => void;
};

const RENTAL_PRESETS: { code: string; label: string; hours: number }[] = [
  { code: "1d", label: "1 day", hours: 24 },
  { code: "3d", label: "3 days", hours: 72 },
  { code: "7d", label: "7 days", hours: 168 },
  { code: "14d", label: "14 days", hours: 336 },
  { code: "1m", label: "1 month", hours: 24 * 30 },
  { code: "3m", label: "3 months", hours: 24 * 90 },
  { code: "1y", label: "1 year", hours: 24 * 365 },
];

export default function ToolModal({ open, initial, onClose, onSave }: Props) {
  const isEdit = !!initial?.id;

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [priceVnd, setPriceVnd] = useState<string>("0");
  const [billingMode, setBillingMode] = useState<"one_time" | "rental">(
    "one_time",
  );
  const [deliveryType, setDeliveryType] = useState<"online" | "download">(
    "download",
  );
  const [hourlyPrice, setHourlyPrice] = useState<string>("0");
  const [rentalStrategy, setRentalStrategy] =
    useState<"fixed_packages" | "user_choose">("fixed_packages");
  const [rentalPackages, setRentalPackages] = useState<RentalPackage[]>([]);

  const [description, setDescription] = useState("");
  const [priceLabel, setPriceLabel] = useState("");
  const [heroImageUrl, setHeroImageUrl] = useState("");
  const [liveBadgeText, setLiveBadgeText] = useState("LIVE TOOL PREVIEW");
  const [difficulty, setDifficulty] = useState("");
  const [environment, setEnvironment] = useState("");
  const [updatePolicy, setUpdatePolicy] = useState("");
  const [suitedFor, setSuitedFor] = useState("");
  const [visibility, setVisibility] = useState("public");
  const [status, setStatus] = useState("draft");

  const [uploading, setUploading] = useState(false);
  const [heroImageFile, setHeroImageFile] = useState<File | null>(null);
  const [heroPreview, setHeroPreview] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;
    if (initial) {
      setName(initial.name ?? "");
      setCategory(initial.category ?? "");
      setPriceVnd(String(initial.priceVnd ?? 0));
      setBillingMode(initial.billingMode ?? "one_time");
      setDeliveryType(initial.deliveryType ?? "download");
      setHourlyPrice(String(initial.hourlyPrice ?? 0));
      setRentalStrategy(initial.rentalStrategy ?? "fixed_packages");
      setRentalPackages(initial.rentalPackages ?? []);
      setDescription(initial.description ?? "");
      setPriceLabel(initial.priceLabel ?? "");
      setHeroImageUrl(initial.heroImageUrl ?? "");
      setLiveBadgeText(initial.liveBadgeText ?? "LIVE TOOL PREVIEW");
      setDifficulty(initial.difficulty ?? "");
      setEnvironment(initial.environment ?? "");
      setUpdatePolicy(initial.updatePolicy ?? "");
      setSuitedFor(initial.suitedFor ?? "");
      setVisibility(initial.visibility ?? "public");
      setStatus(initial.status ?? "draft");
      setHeroImageFile(null);
      setHeroPreview(null);
    } else {
      setName("");
      setCategory("");
      setPriceVnd("0");
      setBillingMode("one_time");
      setDeliveryType("download");
      setHourlyPrice("0");
      setRentalStrategy("fixed_packages");
      setRentalPackages([]);
      setDescription("");
      setPriceLabel("");
      setHeroImageUrl("");
      setLiveBadgeText("LIVE TOOL PREVIEW");
      setDifficulty("");
      setEnvironment("");
      setUpdatePolicy("");
      setSuitedFor("");
      setVisibility("public");
      setStatus("draft");
      setHeroImageFile(null);
      setHeroPreview(null);
    }
  }, [open, initial]);

  const handleSelectPreset = (preset: (typeof RENTAL_PRESETS)[number]) => {
    const priceBase = Number(hourlyPrice) || 0;
    const price = Math.round((priceBase * preset.hours) / 2); // anh có thể đổi công thức
    const pkg: RentalPackage = {
      code: preset.code,
      label: preset.label,
      durationHours: preset.hours,
      priceVnd: price,
      isDefault: rentalPackages.length === 0,
    };
    setRentalPackages((prev) => [
      ...prev.filter((p) => p.code !== preset.code),
      pkg,
    ]);
  };

  const handleRemovePkg = (code: string) => {
    setRentalPackages((prev) => prev.filter((p) => p.code !== code));
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setHeroImageFile(file);
    setHeroPreview(URL.createObjectURL(file));

    try {
      setUploading(true);
      const url = await uploadToolImage(file);
      setHeroImageUrl(url); // /uploads/tools/xxx.png
      toast.success("Image uploaded successfully.");
    } catch (err: any) {
      console.error(err);
      toast.error("Failed to upload image.");
      setHeroImageFile(null);
      setHeroPreview(null);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("Please enter tool name.");
      return;
    }

    const payload: ToolDto = {
      id: initial?.id,
      name: name.trim(),
      category: category.trim() || undefined,
      priceVnd: Number(priceVnd) || 0,
      billingMode,
      deliveryType,
      hourlyPrice:
        billingMode === "rental" ? Number(hourlyPrice) || 0 : undefined,
      rentalStrategy:
        billingMode === "rental" ? rentalStrategy : undefined,
      rentalPackages:
        billingMode === "rental" && rentalStrategy === "fixed_packages"
          ? rentalPackages
          : [],
      description: description.trim() || undefined,
      priceLabel: priceLabel.trim() || undefined,
      heroImageUrl: heroImageUrl || undefined,
      liveBadgeText: liveBadgeText.trim() || undefined,
      difficulty: difficulty.trim() || undefined,
      environment: environment.trim() || undefined,
      updatePolicy: updatePolicy.trim() || undefined,
      suitedFor: suitedFor.trim() || undefined,
      visibility,
      status,
    };

    onSave(payload);
  };

  return (
    <Modal
      open={open}
      title={isEdit ? "Edit tool" : "New tool"}
      onClose={onClose}
    >
      <form
        onSubmit={handleSubmit}
        className="space-y-4 max-h-[80vh] overflow-y-auto pr-1"
      >
        {/* Basic */}
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="block text-xs text-white/60 mb-1">
              Tool name
            </label>
            <input
              className="w-full h-9 bg-black/40 border border-white/15 px-3 text-sm rounded-sm focus:outline-none focus:ring-1 focus:ring-emerald-400"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-xs text-white/60 mb-1">
              Category
            </label>
            <input
              className="w-full h-9 bg-black/40 border border-white/15 px-3 text-sm rounded-sm focus:outline-none focus:ring-1 focus:ring-emerald-400"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div>
            <label className="block text-xs text-white/60 mb-1">
              One-time base price (VND)
            </label>
            <input
              type="number"
              className="w-full h-9 bg-black/40 border border-white/15 px-3 text-sm rounded-sm focus:outline-none focus:ring-1 focus:ring-emerald-400"
              value={priceVnd}
              onChange={(e) => setPriceVnd(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-xs text-white/60 mb-1">
              Billing mode
            </label>
            <select
              className="w-full h-9 bg-black/40 border border-white/15 px-3 text-sm rounded-sm focus:outline-none focus:ring-1 focus:ring-emerald-400"
              value={billingMode}
              onChange={(e) =>
                setBillingMode(e.target.value as "one_time" | "rental")
              }
            >
              <option value="one_time">One-time purchase</option>
              <option value="rental">Rental</option>
            </select>
          </div>

          <div>
            <label className="block text-xs text-white/60 mb-1">
              Delivery type
            </label>
            <select
              className="w-full h-9 bg-black/40 border border-white/15 px-3 text-sm rounded-sm focus:outline-none focus:ring-1 focus:ring-emerald-400"
              value={deliveryType}
              onChange={(e) =>
                setDeliveryType(e.target.value as "online" | "download")
              }
            >
              <option value="online">Online (run on web)</option>
              <option value="download">Download package</option>
            </select>
          </div>
        </div>

        {/* Rental config */}
        {billingMode === "rental" && (
          <div className="border border-white/15 bg-white/5 p-3 rounded-sm space-y-3">
            <div className="grid gap-3 md:grid-cols-3">
              <div>
                <label className="block text-xs text-white/60 mb-1">
                  Hourly base price (VND)
                </label>
                <input
                  type="number"
                  className="w-full h-9 bg-black/40 border border-white/15 px-3 text-sm rounded-sm focus:outline-none focus:ring-1 focus:ring-emerald-400"
                  value={hourlyPrice}
                  onChange={(e) => setHourlyPrice(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-xs text-white/60 mb-1">
                  Rental strategy
                </label>
                <select
                  className="w-full h-9 bg-black/40 border border-white/15 px-3 text-sm rounded-sm focus:outline-none focus:ring-1 focus:ring-emerald-400"
                  value={rentalStrategy}
                  onChange={(e) =>
                    setRentalStrategy(
                      e.target.value as "fixed_packages" | "user_choose",
                    )
                  }
                >
                  <option value="fixed_packages">Preset packages</option>
                  <option value="user_choose">User chooses duration</option>
                </select>
              </div>
            </div>

            {rentalStrategy === "fixed_packages" && (
              <>
                <div className="text-xs text-white/60">
                  Quick presets (auto price from hourly base):
                </div>
                <div className="flex flex-wrap gap-2">
                  {RENTAL_PRESETS.map((p) => (
                    <button
                      key={p.code}
                      type="button"
                      onClick={() => handleSelectPreset(p)}
                      className="px-2.5 py-1 text-xs border border-white/25 bg-transparent hover:bg-white/10 rounded-sm"
                    >
                      {p.label}
                    </button>
                  ))}
                </div>

                <div className="mt-2 border-t border-white/10 pt-2 space-y-1">
                  {rentalPackages.length === 0 && (
                    <p className="text-xs text-white/55">
                      No rental packages defined yet.
                    </p>
                  )}
                  {rentalPackages.map((pkg) => (
                    <div
                      key={pkg.code}
                      className="flex items-center justify-between text-xs"
                    >
                      <div>
                        <span className="font-medium">{pkg.label}</span>{" "}
                        <span className="text-white/60">
                          · {pkg.durationHours}h ·{" "}
                          {pkg.priceVnd.toLocaleString("vi-VN")} VND
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemovePkg(pkg.code)}
                        className="text-[11px] text-red-400 hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        )}

        {/* Description */}
        <div>
          <label className="block text-xs text-white/60 mb-1">
            Short description
          </label>
          <textarea
            className="w-full bg-black/40 border border-white/15 px-3 py-2 text-sm rounded-sm resize-none focus:outline-none focus:ring-1 focus:ring-emerald-400"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        {/* Cover + meta */}
        <div className="grid gap-4 md:grid-cols-[2fr_1fr] items-start">
          <div className="space-y-2">
            <label className="block text-xs text-white/60">
              Cover image (upload from your computer)
            </label>
            <div className="flex items-center gap-3">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                disabled={uploading}
                className="text-xs"
              />
              {uploading && (
                <span className="text-[11px] text-white/60">
                  Uploading…
                </span>
              )}
            </div>
            {(heroPreview || heroImageUrl) && (
              <div className="mt-2">
                <img
                  src={heroPreview || heroImageUrl}
                  alt="Preview"
                  className="w-full max-h-56 object-cover border border-white/15"
                />
              </div>
            )}
          </div>

          <div className="space-y-2 text-xs">
            <div>
              <label className="block text-white/60 mb-1">
                Price label (e.g. “$39 / lifetime”)
              </label>
              <input
                className="w-full h-9 bg-black/40 border border-white/15 px-3 text-xs rounded-sm focus:outline-none focus:ring-1 focus:ring-emerald-400"
                value={priceLabel}
                onChange={(e) => setPriceLabel(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-white/60 mb-1">Live badge</label>
              <input
                className="w-full h-9 bg-black/40 border border-white/15 px-3 text-xs rounded-sm focus:outline-none focus:ring-1 focus:ring-emerald-400"
                value={liveBadgeText}
                onChange={(e) => setLiveBadgeText(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-white/60 mb-1">Difficulty</label>
              <input
                className="w-full h-9 bg-black/40 border border-white/15 px-3 text-xs rounded-sm focus:outline-none focus:ring-1 focus:ring-emerald-400"
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-white/60 mb-1">
                Environment (runtime)
              </label>
              <input
                className="w-full h-9 bg-black/40 border border-white/15 px-3 text-xs rounded-sm focus:outline-none focus:ring-1 focus:ring-emerald-400"
                value={environment}
                onChange={(e) => setEnvironment(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Extra info */}
        <div className="grid gap-4 md:grid-cols-3">
          <div className="md:col-span-2">
            <label className="block text-xs text-white/60 mb-1">
              Update policy (markdown or plain text)
            </label>
            <textarea
              className="w-full bg-black/40 border border-white/15 px-3 py-2 text-sm rounded-sm resize-none focus:outline-none focus:ring-1 focus:ring-emerald-400"
              rows={3}
              value={updatePolicy}
              onChange={(e) => setUpdatePolicy(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-xs text-white/60 mb-1">
              Suitable for (comma separated)
            </label>
            <textarea
              className="w-full bg-black/40 border border-white/15 px-3 py-2 text-xs rounded-sm resize-none focus:outline-none focus:ring-1 focus:ring-emerald-400"
              rows={3}
              value={suitedFor}
              onChange={(e) => setSuitedFor(e.target.value)}
              placeholder="TikTok farming, airdrop tasks, multi-profile runs"
            />
          </div>
        </div>

        {/* Visibility / status */}
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="block text-xs text-white/60 mb-1">
              Visibility
            </label>
            <select
              className="w-full h-9 bg-black/40 border border-white/15 px-3 text-sm rounded-sm focus:outline-none focus:ring-1 focus:ring-emerald-400"
              value={visibility}
              onChange={(e) => setVisibility(e.target.value)}
            >
              <option value="public">Public</option>
              <option value="admin">Admin only</option>
            </select>
          </div>
          <div>
            <label className="block text-xs text-white/60 mb-1">
              Status
            </label>
            <select
              className="w-full h-9 bg-black/40 border border-white/15 px-3 text-sm rounded-sm focus:outline-none focus:ring-1 focus:ring-emerald-400"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="draft">Draft</option>
              <option value="active">Active</option>
              <option value="archived">Archived</option>
            </select>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="h-9 px-4 border border-white/35 text-sm rounded-sm hover:bg-white/10"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={uploading}
            className="h-9 px-4 bg-emerald-400 text-black text-sm font-semibold rounded-sm hover:bg-emerald-300 disabled:opacity-60"
          >
            {isEdit ? "Save changes" : "Create tool"}
          </button>
        </div>
      </form>
    </Modal>
  );
}
