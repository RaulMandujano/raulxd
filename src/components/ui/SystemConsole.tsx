"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

const logLines = [
  "Lets do business together...",
  "Request a free quote...",
  "I can build you a website...",
];

export function SystemConsole() {
  const shouldReduceMotion = useReducedMotion() ?? false;
  const [lineIndex, setLineIndex] = useState(0);
  const [typedLength, setTypedLength] = useState(0);
  const [completedLines, setCompletedLines] = useState<string[]>([]);

  useEffect(() => {
    if (shouldReduceMotion) {
      return;
    }

    const currentLine = logLines[lineIndex];
    const isLineComplete = typedLength >= currentLine.length;

    const timeout = window.setTimeout(
      () => {
        if (!isLineComplete) {
          setTypedLength((value) => value + 1);
          return;
        }

        setCompletedLines((value) => [...value.slice(-1), currentLine]);
        setTypedLength(0);
        setLineIndex((value) => (value + 1) % logLines.length);
      },
      isLineComplete ? 1050 : 42,
    );

    return () => {
      window.clearTimeout(timeout);
    };
  }, [lineIndex, shouldReduceMotion, typedLength]);

  const activeLine = logLines[lineIndex]?.slice(0, typedLength) ?? "";
  const visibleLines = shouldReduceMotion
    ? logLines
    : [...completedLines, activeLine].filter(Boolean);

  return (
    <div className="max-w-md rounded-[1.5rem] border border-white/15 bg-slate-950/70 p-4 shadow-[0_26px_70px_-36px_rgba(15,23,42,0.68)] backdrop-blur-xl">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-rose-300/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-300/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-300/80" />
        </div>
        <span className="text-[11px] font-medium uppercase tracking-[0.22em] text-slate-400">
          System Console
        </span>
      </div>

      <div className="mt-4 space-y-2.5 font-mono text-xs leading-6 text-emerald-200/90 sm:text-[13px]">
        {visibleLines.map((line, index) => {
          const isActive = !shouldReduceMotion && index === visibleLines.length - 1;

          return (
            <div
              key={`${line}-${index}`}
              className={isActive ? "text-emerald-100" : "text-emerald-200/70"}
            >
              <span className="mr-2 text-emerald-300/70">&gt;</span>
              <span>{line}</span>
              {isActive ? (
                <span
                  aria-hidden="true"
                  className="console-cursor ml-1 inline-block h-4 w-[0.45rem] rounded-[2px] bg-emerald-300/90 align-[-0.2rem]"
                />
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}
