import { InjectionToken } from "@angular/core";

export interface NgxSpinnerConfig {
  type?: string;
  /**
   * Whether fullscreen spinners should render using the native Popover API
   * (browser "top layer") so they can appear above elements such as
   * MatDialog that also render in the top layer (Angular CDK v21+ overlays
   * default to `usePopover: true`). Defaults to `true`; falls back to the
   * legacy fixed-position overlay automatically in browsers that don't
   * support the Popover API.
   */
  usePopover?: boolean;
}

export const NGX_SPINNER_CONFIG = new InjectionToken<NgxSpinnerConfig>(
  "NGX_SPINNER_CONFIG",
);
