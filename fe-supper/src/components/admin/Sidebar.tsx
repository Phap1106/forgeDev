"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { label: "Dashboard", href: "/admin" },
  { label: "Tools", href: "/admin/tools" },
  { label: "Users", href: "/admin/users" },
  { label: "Payments", href: "/admin/payment" },
  { label: "Promotions", href: "/admin/promotions" },
  { label: "Blog", href: "/admin/blog" },
  { label: "Orders", href: "/admin/orders" },
  { label: "Support", href: "/admin/support" },
  { label: "Settings", href: "/admin/settings" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-60 flex-col border-r border-white/10 bg-black/80 px-4 pt-6 md:flex">
      <div className="mb-6 text-lg font-semibold tracking-wide">
        FORGEVAULT
      </div>
      <nav className="space-y-1 text-sm">
        {NAV_ITEMS.map((item) => {
          const active =
            pathname === item.href || pathname?.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center justify-between rounded-xl px-3 py-2 ${
                active
                  ? "bg-emerald-500 text-black font-semibold"
                  : "text-white/70 hover:bg-white/5 hover:text-white"
              }`}
            >
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
      <div className="mt-auto pb-4 text-[11px] text-white/40">
        © {new Date().getFullYear()} ForgeVault
      </div>
    </aside>
  );
}
