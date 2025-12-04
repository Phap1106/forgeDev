export default function Marquee() {
  const items = ["BINABOX", "CRYPTO", "BINABOX", "BINABOX", "BINABOX", "BINABOX"];

  return (
    <section className="relative mt-10">
      <div className="bg-emerald-400">
        <div className="mx-auto max-w-6xl px-0">
          <div className="overflow-hidden py-3">
            <div className="marquee-track flex w-max items-center gap-12 px-4">
              {Array.from({ length: 2 }).flatMap((_, loop) =>
                items.map((t, i) => (
                  <span
                    key={`${loop}-${i}`}
                    className="text-black font-extrabold tracking-widest text-sm sm:text-base"
                  >
                    {t}
                  </span>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
