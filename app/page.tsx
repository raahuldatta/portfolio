import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Terminal from "@/components/Terminal";
import About from "@/components/About";
import Stack from "@/components/Stack";
import Work from "@/components/Work";
import Building from "@/components/Building";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";
import ScrollProgress from "@/components/ScrollProgress";

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <Header />
      <main id="main-content" tabIndex={-1} className="outline-none">
        <Hero />
        <Terminal />
        <About />
        <Stack />
        <Work />
        <Building />
        <Experience />
      </main>
      <Contact />
    </>
  );
}
