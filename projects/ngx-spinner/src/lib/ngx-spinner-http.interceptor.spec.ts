import { fakeAsync, TestBed, tick } from "@angular/core/testing";
import {
  HTTP_INTERCEPTORS,
  HttpClient,
  HttpContext,
  provideHttpClient,
  withInterceptors,
  withInterceptorsFromDi,
} from "@angular/common/http";
import {
  HttpTestingController,
  provideHttpClientTesting,
} from "@angular/common/http/testing";
import { NgxSpinnerService } from "./ngx-spinner.service";
import { PRIMARY_SPINNER } from "./ngx-spinner.enum";
import {
  NGX_SPINNER_HTTP_CONFIG,
  NGX_SPINNER_SKIP,
  NgxSpinnerInterceptor,
  ngxSpinnerInterceptor,
} from "./ngx-spinner-http.interceptor";

describe("ngxSpinnerInterceptor", () => {
  let httpMock: HttpTestingController;
  let http: HttpClient;
  let spinnerService: NgxSpinnerService;

  function isShowing(name = PRIMARY_SPINNER): boolean {
    const spinner = spinnerService.spinnerObservable.value;
    return !!spinner?.show && spinner.name === name;
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptors([ngxSpinnerInterceptor])),
        provideHttpClientTesting(),
      ],
    });
    httpMock = TestBed.inject(HttpTestingController);
    http = TestBed.inject(HttpClient);
    spinnerService = TestBed.inject(NgxSpinnerService);
  });

  afterEach(() => httpMock.verify());

  it("shows the primary spinner while a request is in flight", fakeAsync(() => {
    http.get("/api/one").subscribe();
    tick(10);
    expect(isShowing()).toBe(true);
    httpMock.expectOne("/api/one").flush({});
    tick(10);
  }));

  it("hides the spinner once the request completes", fakeAsync(() => {
    http.get("/api/one").subscribe();
    tick(10);
    httpMock.expectOne("/api/one").flush({});
    tick(10);
    expect(isShowing()).toBe(false);
  }));

  it("hides the spinner when the request errors", fakeAsync(() => {
    http.get("/api/one").subscribe({ error: () => undefined });
    tick(10);
    httpMock
      .expectOne("/api/one")
      .flush("failed", { status: 500, statusText: "Server Error" });
    tick(10);
    expect(isShowing()).toBe(false);
  }));

  it("keeps the spinner visible until every concurrent request finishes", fakeAsync(() => {
    http.get("/api/one").subscribe();
    http.get("/api/two").subscribe();
    tick(10);

    expect(isShowing()).toBe(true);

    httpMock.expectOne("/api/one").flush({});
    tick(10);
    expect(isShowing()).toBe(true);

    httpMock.expectOne("/api/two").flush({});
    tick(10);
    expect(isShowing()).toBe(false);
  }));

  it("skips requests that opt out via NGX_SPINNER_SKIP", fakeAsync(() => {
    http
      .get("/api/one", { context: new HttpContext().set(NGX_SPINNER_SKIP, true) })
      .subscribe();
    tick(10);

    expect(isShowing()).toBe(false);
    httpMock.expectOne("/api/one").flush({});
    tick(10);
  }));
});

describe("ngxSpinnerInterceptor with NGX_SPINNER_HTTP_CONFIG", () => {
  let httpMock: HttpTestingController;
  let http: HttpClient;
  let spinnerService: NgxSpinnerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptors([ngxSpinnerInterceptor])),
        provideHttpClientTesting(),
        {
          provide: NGX_SPINNER_HTTP_CONFIG,
          useValue: { name: "customSpinner", excludedUrls: ["/skip-me"] },
        },
      ],
    });
    httpMock = TestBed.inject(HttpTestingController);
    http = TestBed.inject(HttpClient);
    spinnerService = TestBed.inject(NgxSpinnerService);
  });

  afterEach(() => httpMock.verify());

  it("uses the configured spinner name", fakeAsync(() => {
    http.get("/api/one").subscribe();
    tick(10);
    expect(spinnerService.spinnerObservable.value?.name).toBe("customSpinner");
    httpMock.expectOne("/api/one").flush({});
    tick(10);
  }));

  it("ignores requests matching an excluded URL", fakeAsync(() => {
    http.get("/skip-me").subscribe();
    tick(10);
    expect(spinnerService.spinnerObservable.value).toBeNull();
    httpMock.expectOne("/skip-me").flush({});
    tick(10);
  }));
});

describe("NgxSpinnerInterceptor (class-based)", () => {
  let httpMock: HttpTestingController;
  let http: HttpClient;
  let spinnerService: NgxSpinnerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        {
          provide: HTTP_INTERCEPTORS,
          useClass: NgxSpinnerInterceptor,
          multi: true,
        },
      ],
    });
    httpMock = TestBed.inject(HttpTestingController);
    http = TestBed.inject(HttpClient);
    spinnerService = TestBed.inject(NgxSpinnerService);
  });

  afterEach(() => httpMock.verify());

  it("shows and hides the spinner around the request", fakeAsync(() => {
    http.get("/api/one").subscribe();
    tick(10);
    expect(spinnerService.spinnerObservable.value?.show).toBe(true);

    httpMock.expectOne("/api/one").flush({});
    tick(10);
    expect(spinnerService.spinnerObservable.value?.show).toBe(false);
  }));
});
