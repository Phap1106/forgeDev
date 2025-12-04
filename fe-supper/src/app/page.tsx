import Header from "../components/Header";
import Hero from "../components/Hero";
import Marquee from "../components/Marquee";
import About from "../components/About";
import Footer from "../components/Footer";


export default function Page() {
  return (
    <main className="min-h-screen bg-[#050B10] text-white">
      <Header />
      <Hero />
      <Marquee />
      <About />
      <Footer />
    </main>
  );
}
