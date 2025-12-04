

// src/components/Header.tsx
"use client";

import {
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  ChevronDown,
  Menu,
  X,
  Sun,
  Moon,
  ShoppingCart,
  User,
  LogIn,
  UserPlus,
  Trash2,
} from "lucide-react";
import { useCart } from "@/components/cart/CartContext";
import AuthModal, { AuthMode } from "@/components/auth/AuthModal";

type NavItem = { label: string; href: string };
type NavGroup = { label: string; href?: string; items?: NavItem[] };

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dark, setDark] = useState(true);
  const [mobileActive, setMobileActive] = useState<string | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<AuthMode>("login");

  const { items, totalCount, removeItem, clear } = useCart();

  const NAV: NavGroup[] = useMemo(
    () => [
      {
        label: "HOME",
        href: "/",
        items: [
          { label: "Home Main", href: "/" },
          { label: "Home Variant", href: "#" },
        ],
      },
      {
        label: "ABOUT",
        href: "#",
        items: [
          { label: "About Us", href: "#about" },
          { label: "Team", href: "#" },
        ],
      },
      {
        label: "ROADMAP",
        href: "#",
        items: [
          { label: "Phase 1", href: "#" },
          { label: "Phase 2", href: "#" },
          { label: "Phase 3", href: "#" },
        ],
      },
      {
        label: "COLLECTIONS",
        href: "/collections",
        items: [
          { label: "Explore Collections", href: "/collections" },
          { label: "Featured", href: "#" },
          { label: "New Drops", href: "#" },
        ],
      },
      {
        label: "FAQS",
        href: "#",
        items: [
          { label: "General", href: "#" },
          { label: "Pricing", href: "#" },
        ],
      },
      {
        label: "PAGES",
        href: "#",
        items: [
          { label: "Pricing", href: "#" },
          { label: "Contact", href: "#" },
          { label: "Blog", href: "#" },
        ],
      },
    ],
    []
  );

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setMobileOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50">
        <div className="bg-black/40 backdrop-blur-xl border-b border-white/10">
          <div className="mx-auto max-w-6xl px-4">
            {/* Hàng trên */}
            <div className="flex h-16 items-center justify-between">
              {/* Logo */}
              <a href="/" className="flex items-center gap-2">
                <div className="grid h-9 w-9 place-items-center rounded-xl bg-emerald-400/15 ring-1 ring-emerald-400/30">
                  <span className="text-emerald-300 font-semibold">F</span>
                </div>
                <span className="font-semibold tracking-wide">FORGEVAULT</span>
              </a>

              {/* Desktop Nav */}
              <nav className="hidden lg:flex items-center gap-6 text-sm text-white/80">
                {NAV.map((group) => {
                  const hasDropdown = !!group.items?.length;
                  return (
                    <div key={group.label} className="relative group">
                      <a
                        href={group.href ?? "#"}
                        className="inline-flex items-center gap-1 hover:text-white transition py-2"
                      >
                        <span className="tracking-wide">{group.label}</span>
                        {hasDropdown && (
                          <ChevronDown className="h-4 w-4 opacity-70 group-hover:opacity-100 transition" />
                        )}
                      </a>

                      {hasDropdown && (
                        <div className="absolute left-0 top-full pt-2 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto group-focus-within:opacity-100 group-focus-within:translate-y-0 group-focus-within:pointer-events-auto transition">
                          <div className="min-w-[220px] rounded-2xl bg-[#0B1218]/95 ring-1 ring-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.6)] overflow-hidden">
                            <div className="p-2">
                              {group.items!.map((it) => (
                                <a
                                  key={it.label}
                                  href={it.href}
                                  className="flex items-center justify-between rounded-xl px-3 py-2 text-sm text-white/80 hover:text-white hover:bg-white/10 transition"
                                >
                                  <span>{it.label}</span>
                                </a>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </nav>

              {/* Right actions */}
              <div className="flex items-center gap-3">
                {/* Dark mode toggle (fake) */}
                <button
                  onClick={() => setDark((v) => !v)}
                  className="hidden sm:inline-flex h-9 w-9 items-center justify-center rounded-xl bg-white/5 ring-1 ring-white/10 hover:bg-white/10 transition hover:-translate-y-[1px] active:translate-y-[1px] active:scale-[0.97]"
                  aria-label="Toggle theme"
                >
                  {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                </button>

                {/* Cart */}
                <button
                  onClick={() => setCartOpen(true)}
                  className="relative inline-flex h-9 w-9 items-center justify-center rounded-xl bg-white/5 ring-1 ring-white/10 hover:bg-white/10 transition hover:-translate-y-[1px] active:translate-y-[1px] active:scale-[0.97]"
                  aria-label="Cart"
                >
                  <ShoppingCart className="h-4 w-4" />
                  {totalCount > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 min-w-[18px] px-1 rounded-full bg-emerald-400 text-black text-[10px] font-semibold flex items-center justify-center">
                      {totalCount}
                    </span>
                  )}
                </button>

                {/* Login / Register */}
                <button
                  onClick={() => {
                    setAuthMode("login");
                    setAuthOpen(true);
                  }}
                  className="hidden md:inline-flex items-center gap-1 h-9 px-3 rounded-xl bg-white/5 ring-1 ring-white/10 hover:bg-white/10 text-xs font-medium transition hover:-translate-y-[1px] active:translate-y-[1px] active:scale-[0.97]"
                >
                  <LogIn className="h-3.5 w-3.5" />
                  Login
                </button>
                <button
                  onClick={() => {
                    setAuthMode("register");
                    setAuthOpen(true);
                  }}
                  className="hidden md:inline-flex items-center gap-1 h-9 px-3 rounded-xl bg-emerald-400/10 ring-1 ring-emerald-400/60 text-xs font-medium text-emerald-300 hover:bg-emerald-400/20 transition hover:-translate-y-[1px] active:translate-y-[1px] active:scale-[0.97]"
                >
                  <UserPlus className="h-3.5 w-3.5" />
                  Register
                </button>

                {/* Mobile menu */}
                <button
                  onClick={() => setMobileOpen((v) => !v)}
                  className="lg:hidden inline-flex h-9 w-9 items-center justify-center rounded-xl bg-white/5 ring-1 ring-white/10 hover:bg-white/10 transition"
                  aria-label="Open menu"
                >
                  {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {/* Mobile Nav */}
            {mobileOpen && (
              <div className="lg:hidden pb-4">
                <div className="rounded-2xl bg-white/5 ring-1 ring-white/10 p-3">
                  <div className="grid gap-2">
                    {NAV.map((group) => {
                      const hasDropdown = !!group.items?.length;
                      const active = mobileActive === group.label;

                      return (
                        <div key={group.label} className="rounded-xl overflow-hidden">
                          <button
                            onClick={() => {
                              if (!hasDropdown) {
                                window.location.href = group.href ?? "#";
                                setMobileOpen(false);
                                return;
                              }
                              setMobileActive(active ? null : group.label);
                            }}
                            className="w-full flex items-center justify-between px-3 py-2 text-sm text-white/85 hover:bg:white/10 hover:bg-white/10 transition"
                          >
                            <span>{group.label}</span>
                            {hasDropdown && (
                              <ChevronDown
                                className={`h-4 w-4 opacity-70 transition ${
                                  active ? "rotate-180" : ""
                                }`}
                              />
                            )}
                          </button>

                          {hasDropdown && active && (
                            <div className="bg-white/5 border-t border-white/10">
                              <div className="p-2 grid gap-1">
                                {group.items!.map((it) => (
                                  <a
                                    key={it.label}
                                    href={it.href}
                                    onClick={() => setMobileOpen(false)}
                                    className="rounded-xl px-3 py-2 text-sm text-white/75 hover:text-white hover:bg-white/10 transition"
                                  >
                                    {it.label}
                                  </a>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}

                    <div className="h-px bg-white/10 my-1" />

                    <button
                      onClick={() => {
                        setAuthMode("login");
                        setAuthOpen(true);
                        setMobileOpen(false);
                      }}
                      className="flex items-center justify-center gap-2 rounded-xl px-3 py-2 text-sm bg-white/10 hover:bg-white/15 transition"
                    >
                      <User className="h-4 w-4" />
                      Login / Register
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Cart drawer */}
      {cartOpen && (
        <Overlay onClose={() => setCartOpen(false)}>
          <div className="fixed right-0 top-0 h-full w-full max-w-sm bg-[#050B10] border-l border-white/10 shadow-[0_0_60px_rgba(0,0,0,0.8)] flex flex-col">
            <div className="flex items-center justify-between px-4 h-16 border-b border-white/10">
              <div className="text-sm font-semibold">Giỏ hàng</div>
              <button
                onClick={() => setCartOpen(false)}
                className="h-8 w-8 grid place-items-center rounded-xl bg-white/5 hover:bg:white/10 hover:bg-white/10 transition"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
              {items.length === 0 && (
                <p className="text-sm text-white/60">
                  Chưa có tool nào trong giỏ. Hãy thêm từ trang chi tiết sản
                  phẩm.
                </p>
              )}

              {items.map((it) => (
                <div
                  key={it.id}
                  className="flex items-center justify-between rounded-2xl bg-white/5 px-3 py-3 text-sm"
                >
                  <div>
                    <div className="font-semibold">{it.name}</div>
                    <div className="text-xs text-white/60">
                      {it.price} · x{it.qty}
                    </div>
                  </div>
                  <button
                    onClick={() => removeItem(it.id)}
                    className="h-8 w-8 grid place-items-center rounded-xl bg-black/40 hover:bg-black/60 transition"
                  >
                    <Trash2 className="h-4 w-4 text-white/70" />
                  </button>
                </div>
              ))}
            </div>

            {items.length > 0 && (
              <div className="border-t border-white/10 px-4 py-4 space-y-3">
                <button className="w-full h-10 rounded-xl bg-emerald-400 text-black text-sm font-semibold hover:bg-emerald-300 transition hover:-translate-y-[1px] active:translate-y-[1px] active:scale-[0.97]">
                  Tiến hành thanh toán
                </button>
                <button
                  onClick={clear}
                  className="w-full h-10 rounded-xl bg-black/40 text-white/75 text-xs ring-1 ring-white/15 hover:bg-black/60 transition"
                >
                  Xoá hết giỏ hàng
                </button>
              </div>
            )}
          </div>
        </Overlay>
      )}

      {/* Auth modal riêng */}
      <AuthModal
        open={authOpen}
        mode={authMode}
        onClose={() => setAuthOpen(false)}
        onModeChange={setAuthMode}
      />
    </>
  );
}

function Overlay({
  onClose,
  children,
}: {
  onClose: () => void;
  children: ReactNode;
}) {
  return (
    <div className="fixed inset-0 z-[60]">
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />
      {children}
    </div>
  );
}