"use client";

import Image from "next/image";
import { ArrowUpRight, CheckCircle2, Globe } from "lucide-react";
import { m, type Variants } from "framer-motion";

import {
  cn,
  glassHoverClassName,
  glassPanelClassName,
  sectionClassName,
} from "@/lib/utils";
import { fadeUp, sectionMotionProps, staggerContainer } from "@/styles/animations";

type Project = {
  name: string;
  domain: string;
  url: string;
  category: string;
  status: string;
  tagline: string;
  description: string;
  highlights: string[];
  stack: string[];
  /** Optional real screenshot in /public/projects. Falls back to a branded mockup. */
  image?: string;
  /** Two-letter mark used by the branded mockup. */
  mark: string;
  /** Tailwind gradient used for the mockup canvas + accents. */
  accentClassName: string;
  glowClassName: string;
};

const projects: Project[] = [
  {
    name: "Evano Studio",
    domain: "evanostudio.com",
    url: "https://evanostudio.com",
    category: "Desktop App · Local AI",
    status: "Live",
    image: "/projects/evano-studio.png",
    tagline: "Create local AI employees that run privately on your machine.",
    description:
      "A free, open-source desktop app to build and orchestrate AI agents locally — no cloud, no API subscriptions. Agents handle document drafting, knowledge-base queries, and content generation while running entirely on the user's hardware.",
    highlights: [
      "Role-based AI agents with org-chart hierarchies and task hand-offs",
      "Local knowledge base with vector retrieval over private documents",
      "Discord bot control and a live office view of agent status",
    ],
    stack: [
      "Desktop App",
      "Ollama",
      "Local LLMs",
      "ChromaDB",
      "SQLite",
      "ComfyUI",
      "Discord API",
    ],
    mark: "ES",
    accentClassName: "from-sky-400/80 via-cyan-400/55 to-blue-500/70",
    glowClassName: "bg-sky-400/30",
  },
  {
    name: "CrewX",
    domain: "crewx.space",
    url: "https://crewx.space",
    category: "SaaS · Omnichannel CRM",
    status: "Live",
    image: "/projects/crewx.png",
    tagline: "One AI-powered inbox for Facebook, Instagram and WhatsApp.",
    description:
      "An omnichannel CRM that unifies Meta messaging into a single inbox with full conversation context, powered by specialized AI assistants for orchestration, sales qualification and customer support.",
    highlights: [
      "Unified inbox across Messenger, Instagram DM and WhatsApp Cloud",
      "Three specialized GPT agents: orchestration, sales and support",
      "Native Meta Graph + WhatsApp APIs with OAuth 2.0 and AES-256",
    ],
    stack: [
      "Next.js",
      "TypeScript",
      "Firebase",
      "Meta Graph API",
      "WhatsApp Cloud API",
      "OpenAI GPT",
      "Serverless",
    ],
    mark: "CX",
    accentClassName: "from-violet-500/80 via-fuchsia-400/55 to-indigo-500/70",
    glowClassName: "bg-violet-400/30",
  },
  {
    name: "EvanoTask",
    domain: "evanotask.com",
    url: "https://evanotask.com",
    category: "App · Productivity & Finance",
    status: "Live",
    image: "/projects/evano-task.png",
    tagline: "Habits, tasks and money — all in one beautifully simple app.",
    description:
      "A habit tracker, task list and simple money tracker in one place. EvanoTask keeps routines, to-dos and payments on the same beautiful calendar — available on web and as a native iOS app.",
    highlights: [
      "Track habits and tasks with flexible repeats and progress rings",
      "Manage expenses and income with a clear running balance",
      "Real-time sync across web and a native iOS app",
    ],
    stack: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Native iOS",
      "Real-time DB",
    ],
    mark: "ET",
    accentClassName: "from-emerald-400/80 via-teal-400/55 to-green-500/70",
    glowClassName: "bg-emerald-400/30",
  },
  {
    name: "Evano Development",
    domain: "evano.dev",
    url: "https://evano.dev",
    category: "Studio · Brand",
    status: "Live",
    image: "/projects/evano-dev.png",
    tagline: "SaaS & web development studio — the home of the Evano products.",
    description:
      "The studio brand behind the Evano ecosystem. A high-performance marketing site presenting SaaS and web development services, built with motion-rich, scalable front-end architecture.",
    highlights: [
      "Conversion-focused landing experience with refined motion design",
      "Scalable component architecture and design system",
      "Performance-first build with modern rendering",
    ],
    stack: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
    ],
    mark: "ED",
    accentClassName: "from-slate-700/85 via-slate-500/55 to-sky-600/70",
    glowClassName: "bg-slate-500/30",
  },
  {
    name: "El Inka Envíos",
    domain: "inkaenvios.com",
    url: "https://inkaenvios.com",
    category: "Logistics · E-commerce",
    status: "Live",
    image: "/projects/inka-envios.png",
    tagline: "Parcel shipping from the US to Peru and Argentina.",
    description:
      "A shipping and logistics platform connecting diaspora communities — weekly departures from Utah to Latin America, Amazon order forwarding through a US address, and transparent calendar-based scheduling.",
    highlights: [
      "Calendar-based shipment scheduling with clear departure dates",
      "Amazon checkout forwarding via a US warehouse address",
      "Multi-route coverage across Peru and Argentina with tracking",
    ],
    stack: [
      "Next.js",
      "React",
      "Tailwind CSS",
      "Scheduling System",
      "Messenger API",
    ],
    mark: "IE",
    accentClassName: "from-amber-400/80 via-orange-400/55 to-red-500/70",
    glowClassName: "bg-amber-400/30",
  },
];

const projectVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
      staggerChildren: 0.1,
    },
  },
};

function BrowserFrame({ project }: { project: Project }) {
  return (
    <div className="relative w-full overflow-hidden rounded-[1.5rem] border border-white/50 bg-white/45 shadow-[0_28px_80px_-40px_rgba(15,23,42,0.45)] backdrop-blur-xl">
      {/* Window chrome */}
      <div className="flex items-center gap-3 border-b border-white/40 bg-white/55 px-4 py-3 backdrop-blur-md">
        <div className="flex items-center gap-1.5">
          <span className="h-3 w-3 rounded-full bg-red-400/80" />
          <span className="h-3 w-3 rounded-full bg-amber-400/80" />
          <span className="h-3 w-3 rounded-full bg-emerald-400/80" />
        </div>
        <div className="flex flex-1 items-center gap-2 rounded-full border border-white/40 bg-white/60 px-3 py-1 text-xs font-medium text-slate-500">
          <Globe className="h-3 w-3" />
          <span className="truncate">{project.domain}</span>
        </div>
      </div>

      {/* Canvas */}
      <div className="relative aspect-[16/10] w-full overflow-hidden">
        {project.image ? (
          <Image
            src={project.image}
            alt={`${project.name} screenshot`}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover object-top"
          />
        ) : (
          <div
            className={cn(
              "flex h-full w-full flex-col items-center justify-center bg-gradient-to-br",
              project.accentClassName,
            )}
          >
            <div
              className={cn(
                "absolute -left-10 top-6 h-40 w-40 rounded-full blur-3xl",
                project.glowClassName,
              )}
            />
            <div
              className={cn(
                "absolute -right-6 bottom-0 h-44 w-44 rounded-full blur-3xl",
                project.glowClassName,
              )}
            />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.35),transparent_45%),linear-gradient(180deg,rgba(255,255,255,0.12),rgba(15,23,42,0.18))]" />

            <div className="relative flex flex-col items-center text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/40 bg-white/25 text-2xl font-bold tracking-tight text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.4)] backdrop-blur-md">
                {project.mark}
              </div>
              <p className="mt-4 text-lg font-semibold tracking-tight text-white drop-shadow-sm">
                {project.name}
              </p>
              <p className="mt-1 max-w-[16rem] px-4 text-xs font-medium leading-5 text-white/80">
                {project.tagline}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export function Projects() {
  return (
    <section id="projects" className={sectionClassName}>
      <m.div
        variants={staggerContainer}
        {...sectionMotionProps}
        className={cn(
          glassPanelClassName,
          "overflow-hidden rounded-[2rem] p-6 sm:p-10 lg:p-14",
        )}
      >
        <m.div variants={fadeUp} className="mx-auto max-w-3xl text-center">
          <p className="section-eyebrow text-slate-500">Selected Work</p>
          <h2 className="section-title mx-auto mt-4 text-slate-950">
            Products I&apos;ve designed &amp; shipped
          </h2>
          <p className="section-body mx-auto mt-4 text-slate-600">
            Live SaaS platforms, AI tools and web products — each built end to
            end, from architecture to deployment.
          </p>
        </m.div>

        <div className="mt-12 space-y-12 lg:mt-16 lg:space-y-20">
          {projects.map((project, index) => (
            <m.article
              key={project.domain}
              variants={projectVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className={cn(
                "grid items-center gap-8 lg:grid-cols-2 lg:gap-14",
                index % 2 !== 0 && "lg:[&>*:first-child]:order-2",
              )}
            >
              <m.div variants={fadeUp}>
                <a
                  href={project.url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Open ${project.name} (${project.domain}) in a new tab`}
                  className="group block transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1"
                >
                  <BrowserFrame project={project} />
                </a>
              </m.div>

              <m.div variants={fadeUp} className="space-y-5">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="rounded-full border border-white/15 bg-white/30 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-600 backdrop-blur-md">
                    {project.category}
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-300/40 bg-emerald-400/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-700">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    {project.status}
                  </span>
                </div>

                <h3 className="text-[clamp(1.8rem,1.5rem+1vw,2.5rem)] font-semibold leading-[1.05] tracking-[-0.045em] text-slate-950">
                  {project.name}
                </h3>

                <p className="max-w-[40rem] text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
                  {project.description}
                </p>

                <ul className="space-y-2.5">
                  {project.highlights.map((highlight) => (
                    <li
                      key={highlight}
                      className="flex items-start gap-3 text-sm leading-6 text-slate-700 sm:text-base"
                    >
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-sky-500" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>

                <div className="space-y-3 pt-1">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                    Built with
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className={cn(
                          glassPanelClassName,
                          "rounded-full px-3 py-1.5 text-xs font-medium text-slate-700",
                        )}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-2">
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noreferrer"
                    className={cn(
                      glassPanelClassName,
                      glassHoverClassName,
                      "interactive-link inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-slate-900",
                    )}
                  >
                    Visit {project.domain}
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                </div>
              </m.div>
            </m.article>
          ))}
        </div>
      </m.div>
    </section>
  );
}
