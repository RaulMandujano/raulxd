// Shared timing for the cinematic hero scrub, used by both the Hero component
// (frame + scene rendering) and the smooth-scroll provider (scroll snapping).

// Fraction of the hero scroll spent scrubbing frames; the remainder holds the
// final night frame while the sticky text lifts away and the page rises over it.
export const SCRUB_FRACTION = 0.66;

// Story-beat windows over the scrub progress `p` (0→1):
// [fadeInStart, fadeInEnd, fadeOutStart, fadeOutEnd]
export const MID_WINDOWS: readonly [number, number, number, number][] = [
  [0.16, 0.22, 0.3, 0.36],
  [0.36, 0.42, 0.48, 0.54],
  [0.56, 0.62, 0.68, 0.74],
  [0.76, 0.82, 0.87, 0.92],
];

// Progress (p) values where each message is fully centred — the scroll "settles"
// on these so each frame/message reads cleanly. Intro (0), each beat's hold
// mid-point, and the final scene (1).
export const SCENE_SNAP_PROGRESS: readonly number[] = [
  0,
  ...MID_WINDOWS.map((w) => (w[1] + w[2]) / 2),
  1,
];
