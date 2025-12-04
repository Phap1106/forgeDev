"use client";

import { useMemo, useState } from "react";
import { ChevronDown, Search, X } from "lucide-react";

type NFT = { id: string; title: string; img: string };

type FilterGroup = {
  key: string;
  title: string;
  options: string[];
  defaultOpen?: boolean;
};

export default function CollectionsView() {
  const [q, setQ] = useState("");
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({
    clothing: true,
    eyes: true,
    face: false,
    skin: false,
    background: false,
    special: false,
  });

  const [selected, setSelected] = useState<string[]>(["King", "Mix", "Sakura"]);

  const groups: FilterGroup[] = useMemo(
    () => [
      { key: "clothing", title: "CLOTHING", options: ["Combatant", "Ninja", "King", "Queen", "Robot"], defaultOpen: true },
      { key: "eyes", title: "EYES", options: ["Yellow", "Green", "Mix", "Orange", "Glow", "Blue"], defaultOpen: true },
      { key: "face", title: "FACE", options: ["Mask", "Scar", "Paint"] },
      { key: "skin", title: "SKIN", options: ["Human", "Metal", "Alien"] },
      { key: "background", title: "BACKGROUND", options: ["Space", "Neon", "Forest"] },
      { key: "special", title: "SPECIAL", options: ["Crown", "Aura", "Legendary"] },
    ],
    []
  );

  const items: NFT[] = useMemo(
    () => [
      {
        id: "1",
        title: "SKISIRS #02",
        img: "https://images.unsplash.com/photo-1634986666676-ec8fd927c23d?auto=format&fit=crop&w=900&q=80",
      },
      {
        id: "2",
        title: "SKISIRS #02",
        img: "https://images.unsplash.com/photo-1635322966219-b75ed372eb01?auto=format&fit=crop&w=900&q=80",
      },
      {
        id: "3",
        title: "SKISIRS #02",
        img: "https://images.unsplash.com/photo-1520975958225-9e0ce82759c2?auto=format&fit=crop&w=900&q=80",
      },
      {
        id: "4",
        title: "SKISIRS #02",
        img: "https://images.unsplash.com/photo-1520975682369-2b03d3b7a0b1?auto=format&fit=crop&w=900&q=80",
      },
      {
        id: "5",
        title: "SKISIRS #02",
        img: "https://images.unsplash.com/photo-1558980664-10ebc2a82d15?auto=format&fit=crop&w=900&q=80",
      },
      {
        id: "6",
        title: "SKISIRS #02",
        img: "https://images.unsplash.com/photo-1520975869018-4df8d74e0bcb?auto=format&fit=crop&w=900&q=80",
      },
    ],
    []
  );

  const filtered = items.filter((it) => it.title.toLowerCase().includes(q.trim().toLowerCase()));

  return (
    <div className="pt-16">
      {/* Banner */}
      <section className="relative">
        <div
          className="h-[240px] w-full"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?auto=format&fit=crop&w=2000&q=80)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/70 to-[#050B10]" />
        <div className="absolute inset-0">
          <div className="mx-auto max-w-6xl px-4 h-full flex flex-col items-center justify-center text-center">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">EXPLORE COLLECTIONS</h1>
            <div className="mt-2 text-xs text-white/60">
              <a href="#" className="hover:text-white transition">HOME</a>
              <span className="px-2">|</span>
              <span className="text-emerald-300">COLLECTIONS</span>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-10">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid gap-6 lg:grid-cols-12">
            {/* Sidebar */}
            <aside className="lg:col-span-3">
              <div className="rounded-2xl bg-white/5 ring-1 ring-white/10 overflow-hidden">
                {groups.map((g) => {
                  const open = !!openGroups[g.key];
                  return (
                    <div key={g.key} className="border-b border-white/10 last:border-b-0">
                      <button
                        onClick={() => setOpenGroups((p) => ({ ...p, [g.key]: !p[g.key] }))}
                        className="w-full flex items-center justify-between px-4 py-3 text-sm font-semibold text-white/85 hover:bg-white/5 transition"
                      >
                        <span>{g.title}</span>
                        <ChevronDown className={`h-4 w-4 opacity-70 transition ${open ? "rotate-180" : ""}`} />
                      </button>

                      {open && (
                        <div className="px-4 pb-4">
                          <div className="grid gap-2 text-sm text-white/70">
                            {g.options.map((opt) => (
                              <label key={opt} className="flex items-center gap-2 select-none">
                                <input
                                  type="checkbox"
                                  className="h-4 w-4 rounded border-white/20 bg-white/10"
                                  checked={selected.includes(opt)}
                                  onChange={(e) => {
                                    setSelected((prev) => {
                                      if (e.target.checked) return Array.from(new Set([...prev, opt]));
                                      return prev.filter((x) => x !== opt);
                                    });
                                  }}
                                />
                                <span>{opt}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </aside>

            {/* Main */}
            <div className="lg:col-span-9">
              <div className="rounded-2xl bg-white/5 ring-1 ring-white/10 p-5">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <h2 className="text-2xl font-bold">All Items</h2>

                  <div className="relative w-full md:w-[320px]">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/50" />
                    <input
                      value={q}
                      onChange={(e) => setQ(e.target.value)}
                      placeholder="Search NFT"
                      className="w-full h-10 pl-9 pr-3 rounded-xl bg-black/30 ring-1 ring-white/10 focus:outline-none focus:ring-emerald-400/40 text-sm"
                    />
                  </div>
                </div>

                {/* Chips */}
                <div className="mt-4 flex flex-wrap items-center gap-2">
                  {selected.slice(0, 6).map((t) => (
                    <button
                      key={t}
                      onClick={() => setSelected((p) => p.filter((x) => x !== t))}
                      className="inline-flex items-center gap-2 h-9 px-3 rounded-xl bg-black/30 ring-1 ring-white/10 text-sm text-white/80 hover:bg-white/5 transition"
                    >
                      <span>{t}</span>
                      <X className="h-4 w-4 opacity-70" />
                    </button>
                  ))}

                  {selected.length > 0 && (
                    <button
                      onClick={() => setSelected([])}
                      className="ml-1 text-sm text-emerald-300 hover:text-emerald-200 transition"
                    >
                      Clear All
                    </button>
                  )}
                </div>

                {/* Grid */}
                <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {filtered.map((it) => (
                   <a
  key={it.id}
  href={`/collections/${it.id}`}
  className="group rounded-2xl bg-black/25 ring-1 ring-white/10 overflow-hidden hover:ring-emerald-400/25 transition"
>

                      <div className="relative aspect-square">
                        <img src={it.img} alt={it.title} className="h-full w-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/0 to-black/0 opacity-90" />
                      </div>
                      <div className="p-4">
                        <div className="text-sm font-semibold tracking-wide">{it.title}</div>
                        <div className="mt-1 text-xs text-white/55">ForgeVault Collection</div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
