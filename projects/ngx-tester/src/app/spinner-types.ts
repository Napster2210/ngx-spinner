import { LOADERS } from "ngx-spinner";

export type SpinnerFamily = "dots" | "ring" | "spin" | "grid" | "bars" | "square";

/**
 * Maps each real spinner `type` to a lightweight animation "family" used to
 * render a cheap representative icon in the type gallery (54 simultaneously
 * animated tiles is too heavy to run the real per-type animation on each).
 * Falls back to "ring" for any type not explicitly classified below, so a
 * newly added animation in the library still renders something reasonable
 * here instead of silently disappearing.
 */
const FAMILY_BY_TYPE: Record<string, SpinnerFamily> = {
  "ball-8bits": "grid",
  "ball-atom": "spin",
  "ball-beat": "dots",
  "ball-circus": "dots",
  "ball-climbing-dot": "dots",
  "ball-clip-rotate": "ring",
  "ball-clip-rotate-multiple": "ring",
  "ball-clip-rotate-pulse": "ring",
  "ball-elastic-dots": "dots",
  "ball-fall": "dots",
  "ball-fussion": "spin",
  "ball-grid-beat": "grid",
  "ball-grid-pulse": "grid",
  "ball-newton-cradle": "dots",
  "ball-pulse": "dots",
  "ball-pulse-rise": "dots",
  "ball-pulse-sync": "dots",
  "ball-rotate": "ring",
  "ball-running-dots": "spin",
  "ball-scale": "ring",
  "ball-scale-multiple": "ring",
  "ball-scale-pulse": "ring",
  "ball-scale-ripple": "ring",
  "ball-scale-ripple-multiple": "ring",
  "ball-spin": "spin",
  "ball-spin-clockwise": "spin",
  "ball-spin-clockwise-fade": "spin",
  "ball-spin-clockwise-fade-rotating": "spin",
  "ball-spin-fade": "spin",
  "ball-spin-fade-rotating": "spin",
  "ball-spin-rotate": "ring",
  "ball-square-clockwise-spin": "square",
  "ball-square-spin": "square",
  "ball-triangle-path": "spin",
  "ball-zig-zag": "dots",
  "ball-zig-zag-deflect": "dots",
  cog: "ring",
  "cube-transition": "square",
  fire: "bars",
  "line-scale": "bars",
  "line-scale-party": "bars",
  "line-scale-pulse-out": "bars",
  "line-scale-pulse-out-rapid": "bars",
  "line-spin-clockwise-fade": "spin",
  "line-spin-clockwise-fade-rotating": "spin",
  "line-spin-fade": "spin",
  "line-spin-fade-rotating": "spin",
  pacman: "ring",
  "square-jelly-box": "square",
  "square-loader": "square",
  "square-spin": "square",
  timer: "ring",
  "triangle-skew-spin": "square",
};

export interface SpinnerTypeInfo {
  name: string;
  family: SpinnerFamily;
}

/** Every real spinner type, built from the library's own `LOADERS` map so it can never drift. */
export const SPINNER_TYPES: SpinnerTypeInfo[] = Object.keys(LOADERS)
  .sort()
  .map((name) => ({ name, family: FAMILY_BY_TYPE[name] ?? "ring" }));
