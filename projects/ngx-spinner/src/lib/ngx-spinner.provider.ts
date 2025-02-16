import {
  EnvironmentProviders,
  Provider,
  makeEnvironmentProviders,
} from "@angular/core";
import { NGX_SPINNER_CONFIG, NgxSpinnerConfig } from "./config";

/**
 * Provides the configuration for the NgxSpinner.
 *
 * @param config - The configuration object for NgxSpinner.
 * @returns An array of environment providers configured with the given NgxSpinner configuration.
 * @example
 * ```ts
 * import { provideSpinnerConfig } from 'ngx-spinner';
 *
 * bootstrap(AppComponent, {
 *   providers: [
 *     provideSpinnerConfig({type: 'ball-scale-multiple'}),
 *   ],
 * })
 */
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
