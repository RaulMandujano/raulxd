import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const sectionClassName = "site-container py-12 sm:py-16";

export const sectionCardClassName =
  "rounded-[2rem] border border-slate-200/80 bg-white/90 p-6 shadow-[0_24px_80px_-36px_rgba(15,23,42,0.28)] backdrop-blur sm:p-10 lg:p-14";

export const glassPanelClassName =
  "border border-white/10 bg-white/[0.38] shadow-[0_22px_60px_-34px_rgba(15,23,42,0.28),inset_0_1px_0_rgba(255,255,255,0.2)] backdrop-blur-md";

export const glassHoverClassName =
  "transition-[box-shadow,transform] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:shadow-[0_34px_96px_-30px_rgba(76,29,149,0.22),0_26px_78px_-26px_rgba(14,165,233,0.24),0_0_0_1px_rgba(255,255,255,0.08)]";
