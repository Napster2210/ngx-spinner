import {
  EnvironmentProviders,
  inject,
  Injectable,
  InjectionToken,
  makeEnvironmentProviders,
  Provider,
} from "@angular/core";
import {
  HttpContextToken,
  HttpEvent,
  HttpHandler,
  HttpHandlerFn,
  HttpInterceptor,
  HttpInterceptorFn,
  HttpRequest,
} from "@angular/common/http";
import { Observable } from "rxjs";
import { finalize } from "rxjs/operators";
import { NgxSpinnerService } from "./ngx-spinner.service";
import { NgxSpinnerHttpTrackerService } from "./ngx-spinner-http-tracker.service";
import { PRIMARY_SPINNER, Spinner } from "./ngx-spinner.enum";

/**
 * Configuration for `ngxSpinnerInterceptor` / `NgxSpinnerInterceptor`.
 */
export interface NgxSpinnerHttpConfig {
  /**
   * Name of the spinner to show/hide for tracked requests.
   * Defaults to the primary spinner (`'primary'`).
   */
  name?: string;
  /**
   * Extra options passed through to `NgxSpinnerService.show()`, e.g. to
   * pick a different `type`, `color` or `fullScreen` for HTTP-triggered
   * loading.
   */
  spinner?: Spinner;
  /**
   * Requests whose URL matches any of these patterns are ignored by the
   * interceptor and never trigger the spinner.
   */
  excludedUrls?: (string | RegExp)[];
}

/** Injection token used to configure `ngxSpinnerInterceptor` / `NgxSpinnerInterceptor`. */
export const NGX_SPINNER_HTTP_CONFIG =
  new InjectionToken<NgxSpinnerHttpConfig>("NGX_SPINNER_HTTP_CONFIG");

/**
 * Set on an individual request's `HttpContext` to exclude that request from
 * the ngx-spinner HTTP interceptor, e.g.:
 *
 * ```ts
 * this.http.get(url, { context: new HttpContext().set(NGX_SPINNER_SKIP, true) });
 * ```
 */
export const NGX_SPINNER_SKIP = new HttpContextToken<boolean>(() => false);

/**
 * Registers the configuration used by `ngxSpinnerInterceptor` /
 * `NgxSpinnerInterceptor`. Only needed if you want to customize the
 * spinner name, its options, or exclude certain URLs - the interceptor
 * works with no configuration at all.
 *
 * @example
 * ```ts
 * import { provideNgxSpinnerHttpConfig } from 'ngx-spinner';
 *
 * bootstrapApplication(AppComponent, {
 *   providers: [
 *     provideNgxSpinnerHttpConfig({ excludedUrls: ['/api/poll'] }),
 *   ],
 * });
 * ```
 */
export const provideNgxSpinnerHttpConfig = (
  config: NgxSpinnerHttpConfig,
): EnvironmentProviders => {
  const providers: Provider[] = [
    {
      provide: NGX_SPINNER_HTTP_CONFIG,
      useValue: config,
    },
  ];

  return makeEnvironmentProviders(providers);
};

function isExcluded(url: string, excludedUrls?: (string | RegExp)[]): boolean {
  if (!excludedUrls) {
    return false;
  }
  return excludedUrls.some((pattern) =>
    typeof pattern === "string" ? url.includes(pattern) : pattern.test(url),
  );
}

function handleSpinnerForRequest<T>(
  req: HttpRequest<unknown>,
  event$: Observable<HttpEvent<T>>,
  spinnerService: NgxSpinnerService,
  tracker: NgxSpinnerHttpTrackerService,
  config: NgxSpinnerHttpConfig | null,
): Observable<HttpEvent<T>> {
  if (req.context.get(NGX_SPINNER_SKIP) || isExcluded(req.urlWithParams, config?.excludedUrls)) {
    return event$;
  }

  const name = config?.name ?? PRIMARY_SPINNER;

  if (tracker.start(name)) {
    spinnerService.show(name, config?.spinner);
  }

  return event$.pipe(
    finalize(() => {
      if (tracker.end(name)) {
        spinnerService.hide(name);
      }
    }),
  );
}

/**
 * Functional HTTP interceptor that shows the ngx-spinner while requests are
 * in flight, and hides it once every concurrent request has completed.
 * Purely opt-in - existing `NgxSpinnerService`/`<ngx-spinner>` usage is
 * unaffected unless this interceptor is registered.
 *
 * @example
 * ```ts
 * import { provideHttpClient, withInterceptors } from '@angular/common/http';
 * import { ngxSpinnerInterceptor } from 'ngx-spinner';
 *
 * bootstrapApplication(AppComponent, {
 *   providers: [
 *     provideHttpClient(withInterceptors([ngxSpinnerInterceptor])),
 *   ],
 * });
 * ```
 */
export const ngxSpinnerInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
) => {
  const spinnerService = inject(NgxSpinnerService);
  const tracker = inject(NgxSpinnerHttpTrackerService);
  const config = inject(NGX_SPINNER_HTTP_CONFIG, { optional: true });

  return handleSpinnerForRequest(req, next(req), spinnerService, tracker, config);
};

/**
 * Class-based equivalent of `ngxSpinnerInterceptor`, for NgModule-based
 * applications that register interceptors via `HTTP_INTERCEPTORS`.
 *
 * @example
 * ```ts
 * import { HTTP_INTERCEPTORS } from '@angular/common/http';
 * import { NgxSpinnerInterceptor } from 'ngx-spinner';
 *
 * @NgModule({
 *   providers: [
 *     { provide: HTTP_INTERCEPTORS, useClass: NgxSpinnerInterceptor, multi: true },
 *   ],
 * })
 * export class AppModule {}
 * ```
 */
@Injectable()
export class NgxSpinnerInterceptor implements HttpInterceptor {
  private spinnerService = inject(NgxSpinnerService);
  private tracker = inject(NgxSpinnerHttpTrackerService);
  private config = inject(NGX_SPINNER_HTTP_CONFIG, { optional: true });

  intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    return handleSpinnerForRequest(
      req,
      next.handle(req),
      this.spinnerService,
      this.tracker,
      this.config,
    );
  }
}
