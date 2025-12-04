import { ChevronLeft, ChevronRight } from "lucide-react";

export default function About() {
  return (
    <section id="about" className="relative py-14">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex items-center justify-center gap-3">
          <button className="grid h-11 w-11 place-items-center rounded-xl bg-white/5 ring-1 ring-white/10 hover:bg-white/10 transition">
            <ChevronLeft className="h-5 w-5" />
          </button>

          <h2 className="text-center text-3xl sm:text-4xl font-extrabold tracking-tight">
            ABOUT US
          </h2>

          <button className="grid h-11 w-11 place-items-center rounded-xl bg-white/5 ring-1 ring-white/10 hover:bg-white/10 transition">
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        <p className="mx-auto mt-6 max-w-3xl text-center text-white/70">
          Placeholder nội dung About. Sau bạn gửi copy + assets, mình tách thành
          layout giống mẫu (background, card, slider).
        </p>
      </div>
    </section>
  );
}
