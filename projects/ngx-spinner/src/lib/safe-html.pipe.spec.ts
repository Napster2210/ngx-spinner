import { TestBed } from "@angular/core/testing";
import { BrowserModule, DomSanitizer } from "@angular/platform-browser";
import { SafeHtmlPipe } from "./safe-html.pipe";

describe("SafeHtmlPipe", () => {
  let sanitizer: DomSanitizer;
  let pipe: SafeHtmlPipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BrowserModule],
    });

    sanitizer = TestBed.get(DomSanitizer);
    pipe = new SafeHtmlPipe(sanitizer);
  });

  it("should create an instance", () => {
    expect(pipe).toBeTruthy();
  });
});
