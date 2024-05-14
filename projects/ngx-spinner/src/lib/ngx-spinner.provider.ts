import {
  EnvironmentProviders,
  Provider,
  makeEnvironmentProviders,
} from "@angular/core";
import { NGX_SPINNER_CONFIG, NgxSpinnerConfig } from "./config";

export const provideSpinnerConfig = (
  config: NgxSpinnerConfig,
): EnvironmentProviders => {
  const providers: Provider[] = [
    {
      provide: NGX_SPINNER_CONFIG,
      useValue: config,
    },
  ];

  return makeEnvironmentProviders(providers);
};
