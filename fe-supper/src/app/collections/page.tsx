import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CollectionsView from "./CollectionsView";

export default function CollectionsPage() {
  return (
    <main className="min-h-screen bg-[#050B10] text-white">
      <Header />
      <CollectionsView />
      <Footer />
    </main>
  );
}
