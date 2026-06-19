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
      <About />
      <Services />
      <Projects />
      <GithubActivity />
      <Impact />
      <Experience />
      <Contact />
    </>
  );
}
