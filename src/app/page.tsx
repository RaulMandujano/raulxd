import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Experience } from "@/components/sections/Experience";
import { GithubActivity } from "@/components/sections/GithubActivity";
import { Hero } from "@/components/sections/Hero";
import { Impact } from "@/components/sections/Impact";
import { Projects } from "@/components/sections/Projects";
import { Services } from "@/components/sections/Services";

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* Content deck — rises over the fixed cinematic backdrop. The sticky
          veil is translucent frosted glass, so the final night frame stays as
          the page background while all content scrolls over it. */}
      <div className="relative z-[2]">
        <div
          aria-hidden="true"
          className="pointer-events-none sticky top-0 -mb-[100svh] h-[100svh] border-t border-white/20 bg-[linear-gradient(180deg,rgba(247,249,254,0.34)_0%,rgba(240,244,255,0.26)_34%,rgba(240,245,255,0.22)_100%)] shadow-[0_-40px_90px_-30px_rgba(2,6,23,0.55)] backdrop-blur-[8px]"
        />

        <About />
        <Services />
        <Projects />
        <GithubActivity />
        <Impact />
        <Experience />
        <Contact />
      </div>
    </>
  );
}
