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

      {/* About — second cinematic act: the static night backdrop stays visible
          while the copy settles into place around the seated figure. */}
      <About />

      {/* Content deck — sits directly over the fixed night backdrop. Each
          section carries its own frosted panel, so the video stays visible
          between them instead of being covered by a full-screen veil. */}
      <div className="relative z-[2]">
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
