import Navbar from "@/components/Navbar"
import Hero from "@/components/Hero";
import About from "@/components/About";
import Packages from "@/components/Packages";
import Gallery from "@/components/Gallery";
import Testimonials from "@/components/Testimonials";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import ScrollProgress from "@/components/ScrollProgress";
import MouseGlow from "@/components/MouseGlow";

export default function Home() {
  return (
    <>
      <SmoothScroll />
      <ScrollProgress />
      <MouseGlow />

      <main className="bg-black text-white overflow-x-hidden">
        <Navbar />
        <Hero />
        <About />
        <Packages />
        <Gallery />
        {/* <Testimonials /> */}
        <CTA />
        <Footer />
      </main>
    </>
  );
}