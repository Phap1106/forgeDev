const IMG_1 =
  "https://images.unsplash.com/photo-1635322966219-b75ed372eb01?auto=format&fit=crop&w=900&q=80";
const IMG_2 =
  "https://images.unsplash.com/photo-1634986666676-ec8fd927c23d?auto=format&fit=crop&w=900&q=80";
const IMG_3 =
  "https://images.unsplash.com/photo-1520975958225-9e0ce82759c2?auto=format&fit=crop&w=900&q=80";

export default function Hero() {
  return (
    <section className="relative pt-24 lg:pt-28">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-emerald-400/15 blur-3xl" />
        <div className="absolute top-28 right-[-180px] h-[520px] w-[520px] rounded-full bg-sky-500/10 blur-3xl" />
        <div className="absolute bottom-[-220px] left-[-160px] h-[520px] w-[520px] rounded-full bg-fuchsia-500/10 blur-3xl" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/50 to-[#050B10]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          {/* Left copy */}
          <div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.05] tracking-tight">
              ON{" "}
              <span className="text-emerald-400 drop-shadow-[0_0_24px_rgba(52,211,153,0.55)]">
                FORGEVAULT
              </span>
              <br />
              TOOL
              <br />
              MARKETPLACE
            </h1>

            <p className="mt-5 max-w-xl text-white/70 text-sm sm:text-base">
              We are the best way to check the rarity of NFT collection. Explore
              trending drops, rarity signals, and curated collections with a
              clean, fast interface.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href="#"
                className="inline-flex h-11 items-center justify-center rounded-xl bg-emerald-400 px-5 font-semibold text-black hover:bg-emerald-300 transition"
              >
                CONNECT WALLET
              </a>
              <a
                href="#"
                className="inline-flex h-11 items-center justify-center rounded-xl px-5 font-semibold text-white ring-1 ring-emerald-400/60 bg-emerald-400/10 hover:bg-emerald-400/15 transition"
              >
                WHITELIST NOW
              </a>
            </div>
          </div>

          {/* Right images */}
          <div className="relative">
            <div className="relative mx-auto max-w-[560px]">
              <div className="grid grid-cols-3 gap-4 md:gap-5">
                <CardImage src={IMG_1} className="translate-y-6 md:translate-y-10" />
                <CardImage src={IMG_2} className="translate-y-0" highlight />
                <CardImage src={IMG_3} className="translate-y-4 md:translate-y-8" />
              </div>

              <div className="pointer-events-none absolute -inset-6 rounded-[32px] bg-gradient-to-r from-emerald-400/10 via-white/5 to-sky-500/10 blur-2xl" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CardImage({
  src,
  className = "",
  highlight = false,
}: {
  src: string;
  className?: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={[
        "relative overflow-hidden rounded-3xl ring-1",
        highlight ? "ring-emerald-400/35" : "ring-white/10",
        "bg-white/5 shadow-[0_20px_70px_rgba(0,0,0,0.55)]",
        className,
      ].join(" ")}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-white/5" />
      <img
        src={src}
        alt="NFT card"
        className="h-[280px] sm:h-[340px] md:h-[380px] w-full object-cover"
      />
      {highlight && (
        <div className="pointer-events-none absolute inset-0 ring-1 ring-emerald-400/25 shadow-[inset_0_0_0_1px_rgba(52,211,153,0.15)]" />
      )}
    </div>
  );
}
