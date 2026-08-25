import { Size } from "ngx-spinner";

/**
 * Config driving the playground's live preview and generated code.
 * Field names/shapes mirror the real `Spinner`/`NgxSpinnerComponent` API
 * (see `ngx-spinner/src/lib/ngx-spinner.enum.ts` and `.component.ts`) so the
 * generated code always reflects genuinely supported options.
 */
export interface SpinnerDemoConfig {
  type: string;
  size: Size;
  color: string;
  /** Base hex color for the backdrop, before `alpha` is applied. */
  bdColor: string;
  /** Backdrop opacity, 0-100. */
  alpha: number;
  fullScreen: boolean;
  name: string;
  zIndex: number;
  /** Drives the preview's visibility - mirrors the real `showSpinner` @Input(). */
  showSpinner: boolean;
  disableAnimation: boolean;
  usePopover: boolean;
  loadingText: string;
  /** Advanced: custom HTML/image override, mirrors the real `template` @Input(). */
  template: string | null;
}

export const DEFAULT_DEMO_CONFIG: SpinnerDemoConfig = {
  type: "square-jelly-box",
  size: "medium",
  color: "#ffffff",
  bdColor: "#000000",
  alpha: 80,
  fullScreen: true,
  name: "sample",
  zIndex: 99999,
  showSpinner: false,
  disableAnimation: false,
  usePopover: true,
  loadingText: "Loading...",
  template: null,
};

export const SIZES: Size[] = ["small", "default", "medium", "large"];

/** Converts a hex color + 0-100 alpha into the `rgba(r,g,b,a)` string the library expects. */
export function toRgba(hex: string, alphaPct: number): string {
  const clean = (hex || "#000000").replace("#", "");
  const full =
    clean.length === 3
      ? clean
          .split("")
          .map((c) => c + c)
          .join("")
      : clean;
  const n = parseInt(full, 16) || 0;
  const a = Math.round(alphaPct) / 100;
  return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a})`;
}
