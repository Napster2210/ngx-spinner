import { EnvironmentProviders, Provider, makeEnvironmentProviders } from "@angular/core"
import { NGX_SPINNER_CONFIG, NgxSpinnerConfig } from "./config"

/**
 * @description
 * Provides the `NGX_SPINNER_CONFIG` token with a custom config values.
 *
 * @param config - Config properties for the spinner.
 * @returns The environment providers.
 *
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

export const provideSpinnerConfig = (config: NgxSpinnerConfig): EnvironmentProviders => {
	const providers: Provider[] = [
		{
			provide: NGX_SPINNER_CONFIG,
			useValue: config
		}
	]

	return makeEnvironmentProviders(providers);
}