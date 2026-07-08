import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Experience } from "@/components/sections/Experience";
import { GithubActivity } from "@/components/sections/GithubActivity";
import { Hero } from "@/components/sections/Hero";
import { Impact } from "@/components/sections/Impact";
import { Projects } from "@/components/sections/Projects";
import { Services } from "@/components/sections/Services";
import { SiteBackground } from "@/components/layout/SiteBackground";

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* Content deck — rises over the fixed cinematic backdrop so the final
          night frame stays behind while the light site scrolls up over it.
          The sticky layer carries the site's ambient background and covers the
          canvas for every following section. */}
      <div className="relative z-[2]">
        <div
          aria-hidden="true"
          className="pointer-events-none sticky top-0 -mb-[100svh] h-[100svh] overflow-hidden rounded-t-[2rem] shadow-[0_-40px_90px_-30px_rgba(2,6,23,0.5)]"
        >
          <SiteBackground />
        </div>

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
