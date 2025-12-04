export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black/30">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2">
              <div className="grid h-9 w-9 place-items-center rounded-xl bg-emerald-400/15 ring-1 ring-emerald-400/30">
                <span className="text-emerald-300 font-semibold">B</span>
              </div>
              <span className="font-semibold tracking-wide">BINABOX</span>
            </div>
            <p className="mt-4 max-w-md text-sm text-white/65">
              NFT landing UI template (Next.js + Tailwind). Replace all placeholder
              images and copy later.
            </p>
          </div>

          <FooterCol title="Product" items={["Collection", "Roadmap", "Rarity", "Pricing"]} />
          <FooterCol title="Company" items={["About", "FAQs", "Pages", "Contact"]} />
        </div>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between text-xs text-white/50">
          <span>© {new Date().getFullYear()} Binabox. All rights reserved.</span>
          <span>Privacy · Terms · Support</span>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <div className="font-semibold text-sm">{title}</div>
      <ul className="mt-4 grid gap-2 text-sm text-white/65">
        {items.map((t) => (
          <li key={t}>
            <a href="#" className="hover:text-white transition">
              {t}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
