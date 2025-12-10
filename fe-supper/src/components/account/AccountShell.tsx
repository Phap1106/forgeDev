// src/components/account/AccountShell.tsx
import type { ReactNode } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

type SidebarKey =
  | "overview"
  | "profile"
  | "security"
  | "orders"
  | "wallet"
  | "transactions"
  | "support";

type SidebarItem = {
  key: SidebarKey;
  label: string;
  href: string;
};

const SIDEBAR_ITEMS: SidebarItem[] = [
  { key: "overview", label: "Overview", href: "/account/overview" },
  { key: "profile", label: "Profile", href: "/account/profile" },
  { key: "security", label: "Security", href: "/account/security" },
  { key: "orders", label: "My Orders", href: "/account/orders" },
  { key: "wallet", label: "Wallet", href: "/billing/deposit" },
  { key: "transactions", label: "Transactions", href: "/billing/transactions" },
  { key: "support", label: "Support", href: "/support" },
];

export type AccountShellProps = {
  activeKey: SidebarKey;
  title: string;
  subtitle?: string;
  rightHeader?: ReactNode;
  children: ReactNode;
};

export function AccountShell({
  activeKey,
  title,
  subtitle,
  rightHeader,
  children,
}: AccountShellProps) {
  return (
    <main className="min-h-screen bg-[#050B10] text-white">
      <Header />

      <div className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <aside className="w-full lg:w-64 bg-[#050914] border border-white/10 lg:border-r lg:border-y lg:border-l-0 rounded-md lg:rounded-none p-4 lg:p-5">
            <div className="mb-6">
              <div className="text-xs uppercase tracking-wide text-white/45">
                Account
              </div>
              <div className="mt-1 text-sm font-semibold">
                Settings & activity
              </div>
            </div>

            <nav className="space-y-1 text-sm">
              {SIDEBAR_ITEMS.map((item) => {
                const isActive = item.key === activeKey;
                return (
                  <a
                    key={item.key}
                    href={item.href}
                    className={`flex items-center justify-between px-3 py-2 transition
                      ${
                        isActive
                          ? "bg-emerald-500 text-black font-semibold"
                          : "text-white/75 hover:bg-white/10 hover:text-white"
                      }`}
                  >
                    <span>{item.label}</span>
                    {isActive && (
                      <span className="text-[10px] uppercase tracking-wide">
                        Current
                      </span>
                    )}
                  </a>
                );
              })}
            </nav>
          </aside>

          {/* Main content */}
          <section className="flex-1 bg-[#060c18] border border-white/10 rounded-md p-4 sm:p-6 lg:p-7">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-6">
              <div>
                <h1 className="text-xl sm:text-2xl font-semibold">{title}</h1>
                {subtitle && (
                  <p className="mt-1 text-sm text-white/65">{subtitle}</p>
                )}
              </div>
              {rightHeader && (
                <div className="flex-shrink-0">{rightHeader}</div>
              )}
            </div>

            {children}
          </section>
        </div>
      </div>

      <Footer />
    </main>
  );
}
