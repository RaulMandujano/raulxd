const noiseTextureStyle = {
  backgroundImage:
    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220' viewBox='0 0 220 220'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='220' height='220' filter='url(%23n)' opacity='0.6'/%3E%3C/svg%3E\")",
} as const;

export function SiteBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(96,165,250,0.18),transparent_30%),radial-gradient(circle_at_top_right,rgba(168,85,247,0.16),transparent_28%),radial-gradient(circle_at_70%_78%,rgba(15,23,42,0.18),transparent_34%),linear-gradient(180deg,#f7f9fe_0%,#eef2ff_38%,#eef4ff_68%,#f8fafc_100%)]" />

      <div className="absolute -left-28 top-[-8%] h-[34rem] w-[34rem] rounded-full bg-sky-300/25 blur-3xl" />
      <div className="absolute right-[-10%] top-[8%] h-[32rem] w-[32rem] rounded-full bg-fuchsia-300/18 blur-3xl" />
      <div className="absolute bottom-[-12%] left-[28%] h-[28rem] w-[28rem] rounded-full bg-slate-900/10 blur-3xl" />

      <div className="animate-[float-glow_18s_ease-in-out_infinite] absolute left-[10%] top-[18%] h-40 w-40 rounded-full bg-white/30 blur-3xl" />
      <div className="animate-[float-glow_22s_ease-in-out_infinite_2s] absolute right-[18%] top-[28%] h-52 w-52 rounded-full bg-sky-200/20 blur-3xl" />
      <div className="animate-[float-glow_20s_ease-in-out_infinite_4s] absolute bottom-[16%] right-[28%] h-36 w-36 rounded-full bg-violet-200/18 blur-3xl" />

      <div
        className="absolute inset-0 opacity-[0.045] mix-blend-soft-light"
        style={noiseTextureStyle}
      />
    </div>
  );
}
