import { LOADERS } from "ngx-spinner";

export interface SpinnerTypeInfo {
  name: string;
  /** Number of child `<div>`s the real `.la-{name}` animation needs - mirrors `NgxSpinnerComponent.getClass()`. */
  divs: number[];
}

/**
 * Every real spinner type, built from the library's own `LOADERS` map so it
 * can never drift. Each entry renders with the library's own `.la-{name}`
 * CSS classes (loaded globally for this app via `angular.json`), so the
 * gallery tile is pixel-identical to the real animation - not an
 * approximation of it.
 */
export const SPINNER_TYPES: SpinnerTypeInfo[] = Object.keys(LOADERS)
  .sort()
  .map((name) => ({
    name,
    divs: Array.from({ length: LOADERS[name as keyof typeof LOADERS] }, (_, i) => i),
  }));
