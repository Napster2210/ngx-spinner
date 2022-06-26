import { InjectionToken } from "@angular/core";

export interface NgxSpinnerConfig {
  type?: string;
}

export const NGX_SPINNER_CONFIG = new InjectionToken<NgxSpinnerConfig>(
  "NGX_SPINNER_CONFIG"
);
