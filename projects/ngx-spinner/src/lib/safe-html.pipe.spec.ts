import { TestBed } from "@angular/core/testing";
import { BrowserModule, DomSanitizer } from "@angular/platform-browser";
import { SafeHtmlPipe } from "./safe-html.pipe";
import { Injector, runInInjectionContext } from "@angular/core";

describe("SafeHtmlPipe", () => {
  let sanitizer: DomSanitizer;
  let pipe: SafeHtmlPipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BrowserModule],
    });

    sanitizer = TestBed.inject(DomSanitizer);
    pipe = runInInjectionContext(TestBed.inject(Injector), () => new SafeHtmlPipe());
  });

  it("should create an instance", () => {
    expect(pipe).toBeTruthy();
  });

  it("should transform HTML string to SafeHtml", () => {
    const htmlString = "<div>Test</div>";
    const safeHtml = pipe.transform(htmlString);
    expect(safeHtml).toEqual(sanitizer.bypassSecurityTrustHtml(htmlString));
  });

  it("should return empty string for null input", () => {
    const safeHtml = pipe.transform(null);
    expect(safeHtml).toEqual('');
  });

  it("should return empty string for undefined input", () => {
    const safeHtml = pipe.transform(undefined);
    expect(safeHtml).toEqual('');
  });

  it("should return empty string for empty string input", () => {
    const safeHtml = pipe.transform('');
    expect(safeHtml).toEqual('');
  });
});