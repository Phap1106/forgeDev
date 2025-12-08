// // src/app/admin/promotions/page.tsx
// "use client";

// import { useState } from "react";
// import DataTable, {
//   DataTableColumn,
// } from "@/components/admin/DataTable";
// import PromotionModal from "@/components/admin/PromotionModal";

// type PromotionStatus = "active" | "scheduled" | "expired";

// export type Promotion = {
//   id: string;
//   title: string;
//   description: string;
//   bannerImage?: string;
//   startDate?: string; // ISO string hoặc rỗng
//   endDate?: string;   // ISO string hoặc rỗng
//   status: PromotionStatus;
// };

// const INITIAL_PROMOTIONS: Promotion[] = [
//   {
//     id: "1",
//     title: "Giảm 50% tool TikTok Farm",
//     description: "Chương trình khuyến mãi cuối tuần cho khách mới.",
//     bannerImage: "",
//     startDate: "2025-12-05T00:00:00.000Z",
//     endDate: "2025-12-10T23:59:00.000Z",
//     status: "active",
//   },
//   {
//     id: "2",
//     title: "Giảm thẳng 100K cho mọi đơn",
//     description: "Áp dụng cho tất cả tool trong hệ thống.",
//     bannerImage: "",
//     startDate: "",
//     endDate: "",
//     status: "expired",
//   },
// ];

// const columns: DataTableColumn<Promotion>[] = [
//   {
//     header: "TIÊU ĐỀ",
//     field: "title",
//   },
//   {
//     header: "THỜI GIAN",
//     field: "startDate",
//     render: (_value, row) => {
//       const promo = row as Promotion | undefined;

//       if (!promo || (!promo.startDate && !promo.endDate)) {
//         return "Không đặt lịch";
//       }

//       const start = promo.startDate
//         ? new Date(promo.startDate).toLocaleString("vi-VN")
//         : "—";

//       const end = promo.endDate
//         ? new Date(promo.endDate).toLocaleString("vi-VN")
//         : "Không giới hạn";

//       return `${start} - ${end}`;
//     },
//   },
//   {
//     header: "TRẠNG THÁI",
//     field: "status",
//     render: (_value, row) => {
//       const promo = row as Promotion | undefined;
//       const status = promo?.status ?? "expired";

//       let label = "";
//       let classes = "";

//       switch (status) {
//         case "active":
//           label = "Đang chạy";
//           classes = "bg-emerald-500/15 text-emerald-300";
//           break;
//         case "scheduled":
//           label = "Chờ chạy";
//           classes = "bg-amber-500/15 text-amber-300";
//           break;
//         default:
//           label = "Đã kết thúc";
//           classes = "bg-white/5 text-white/55";
//       }

//       return (
//         <span
//           className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] ${classes}`}
//         >
//           {label}
//         </span>
//       );
//     },
//   },
//   {
//     header: "MÔ TẢ",
//     field: "description",
//     render: (value) => (
//       <span className="line-clamp-1 text-white/75">
//         {(value ?? "") as string}
//       </span>
//     ),
//   },
// ];

// export default function AdminPromotionsPage() {
//   const [promotions, setPromotions] =
//     useState<Promotion[]>(INITIAL_PROMOTIONS);
//   const [editing, setEditing] = useState<Promotion | null>(null);
//   const [open, setOpen] = useState(false);

//   const handleCreate = () => {
//     setEditing(null);
//     setOpen(true);
//   };

//   const handleEdit = (promo: Promotion) => {
//     setEditing(promo);
//     setOpen(true);
//   };

//   const handleDelete = (promo: Promotion) => {
//     setPromotions((prev) =>
//       prev.filter((p) => p.id !== promo.id),
//     );
//   };

//   const handleSave = (promo: Promotion) => {
//     setPromotions((prev) => {
//       const exists = prev.some((p) => p.id === promo.id);
//       if (exists) {
//         return prev.map((p) => (p.id === promo.id ? promo : p));
//       }

//       const newPromo: Promotion = {
//         ...promo,
//         id: promo.id || `promo_${Date.now()}`,
//       };
//       return [newPromo, ...prev];
//     });
//     setOpen(false);
//   };

//   return (
//     <div className="space-y-6">
//       {/* Header trong content */}
//       <div className="flex items-center justify-between">
//         <div>
//           <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-400">
//             ADMIN
//           </p>
//           <h1 className="mt-1 text-xl font-semibold">Promotions</h1>
//           <p className="mt-1 text-sm text-white/60">
//             Quản lý banner / bài quảng cáo sẽ hiển thị trên trang
//             chủ.
//           </p>
//         </div>

//         <button
//           onClick={handleCreate}
//           className="inline-flex items-center rounded-xl bg-emerald-500 px-4 py-2 text-sm font-semibold text-black shadow-lg shadow-emerald-500/30 hover:bg-emerald-400 transition hover:-translate-y-[1px] active:translate-y-[1px] active:scale-[0.97]"
//         >
//           + Thêm khuyến mãi
//         </button>
//       </div>

//       {/* Bảng danh sách */}
//       <DataTable
//         columns={columns}
//         data={promotions}
//         onEdit={handleEdit}
//         onDelete={handleDelete}
//       />

//       {/* Modal tạo / sửa khuyến mãi */}
//       <PromotionModal
//         open={open}
//         initial={editing}
//         onClose={() => setOpen(false)}
//         onSave={handleSave}
//       />
//     </div>
//   );
// }
















// src/app/admin/promotions/page.tsx
"use client";

import { useState } from "react";
import DataTable, {
  DataTableColumn,
} from "@/components/admin/DataTable";
import PromotionModal from "@/components/admin/PromotionModal";

type PromotionStatus = "active" | "scheduled" | "expired";

export type Promotion = {
  id: string;
  title: string;
  description: string;
  bannerImage?: string;
  startDate?: string; // ISO string hoặc rỗng
  endDate?: string;   // ISO string hoặc rỗng
  status: PromotionStatus;
};

const INITIAL_PROMOTIONS: Promotion[] = [
  {
    id: "1",
    title: "Giảm 50% tool TikTok Farm",
    description: "Chương trình khuyến mãi cuối tuần cho khách mới.",
    bannerImage: "",
    startDate: "2025-12-05T00:00:00.000Z",
    endDate: "2025-12-10T23:59:00.000Z",
    status: "active",
  },
  {
    id: "2",
    title: "Giảm thẳng 100K cho mọi đơn",
    description: "Áp dụng cho tất cả tool trong hệ thống.",
    bannerImage: "",
    startDate: "",
    endDate: "",
    status: "expired",
  },
];

const columns: DataTableColumn<Promotion>[] = [
  {
    header: "TIÊU ĐỀ",
    field: "title",
  },
  {
    header: "THỜI GIAN",
    field: "startDate",
    render: (_value, row) => {
      const promo = row as Promotion | undefined;

      if (!promo || (!promo.startDate && !promo.endDate)) {
        return "Không đặt lịch";
      }

      const start = promo.startDate
        ? new Date(promo.startDate).toLocaleString("vi-VN")
        : "—";

      const end = promo.endDate
        ? new Date(promo.endDate).toLocaleString("vi-VN")
        : "Không giới hạn";

      return `${start} - ${end}`;
    },
  },
  {
    header: "TRẠNG THÁI",
    field: "status",
    render: (_value, row) => {
      const promo = row as Promotion | undefined;
      const status = promo?.status ?? "expired";

      let label = "";
      let classes = "";

      switch (status) {
        case "active":
          label = "Đang chạy";
          classes = "bg-emerald-500/15 text-emerald-300";
          break;
        case "scheduled":
          label = "Chờ chạy";
          classes = "bg-amber-500/15 text-amber-300";
          break;
        default:
          label = "Đã kết thúc";
          classes = "bg-white/5 text-white/55";
      }

      return (
        <span
          className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] ${classes}`}
        >
          {label}
        </span>
      );
    },
  },
  {
    header: "MÔ TẢ",
    field: "description",
    render: (value, _row) => (
      <span className="line-clamp-1 text-white/75">
        {(value ?? "") as string}
      </span>
    ),
  },
];

export default function AdminPromotionsPage() {
  const [promotions, setPromotions] =
    useState<Promotion[]>(INITIAL_PROMOTIONS);
  const [editing, setEditing] = useState<Promotion | null>(null);
  const [open, setOpen] = useState(false);

  const handleCreate = () => {
    setEditing(null);
    setOpen(true);
  };

  const handleEdit = (promo: Promotion) => {
    setEditing(promo);
    setOpen(true);
  };

  const handleDelete = (promo: Promotion) => {
    setPromotions((prev) =>
      prev.filter((p) => p.id !== promo.id),
    );
  };

  const handleSave = (promo: Promotion) => {
    setPromotions((prev) => {
      const exists = prev.some((p) => p.id === promo.id);
      if (exists) {
        return prev.map((p) => (p.id === promo.id ? promo : p));
      }

      const newPromo: Promotion = {
        ...promo,
        id: promo.id || `promo_${Date.now()}`,
      };
      return [newPromo, ...prev];
    });
    setOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header trong content */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-400">
            ADMIN
          </p>
          <h1 className="mt-1 text-xl font-semibold">Promotions</h1>
          <p className="mt-1 text-sm text-white/60">
            Quản lý banner / bài quảng cáo sẽ hiển thị trên trang
            chủ.
          </p>
        </div>

        <button
          onClick={handleCreate}
          className="inline-flex items-center rounded-xl bg-emerald-500 px-4 py-2 text-sm font-semibold text-black shadow-lg shadow-emerald-500/30 hover:bg-emerald-400 transition hover:-translate-y-[1px] active:translate-y-[1px] active:scale-[0.97]"
        >
          + Thêm khuyến mãi
        </button>
      </div>

      {/* Bảng danh sách */}
            <DataTable
        columns={columns}
        data={promotions}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* Modal tạo / sửa khuyến mãi */}
      {open && (
        <PromotionModal
          initial={editing}
          onClose={() => setOpen(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}