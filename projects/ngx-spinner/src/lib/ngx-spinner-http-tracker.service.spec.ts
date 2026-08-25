import { TestBed } from "@angular/core/testing";
import { NgxSpinnerHttpTrackerService } from "./ngx-spinner-http-tracker.service";

describe("NgxSpinnerHttpTrackerService", () => {
  let service: NgxSpinnerHttpTrackerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxSpinnerHttpTrackerService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("reports the first start for a name as the one that should show", () => {
    expect(service.start("primary")).toBe(true);
  });

  it("reports subsequent concurrent starts as not needing to show again", () => {
    service.start("primary");
    expect(service.start("primary")).toBe(false);
    expect(service.start("primary")).toBe(false);
  });

  it("only reports hide once every concurrent request has ended", () => {
    service.start("primary");
    service.start("primary");
    service.start("primary");

    expect(service.end("primary")).toBe(false);
    expect(service.end("primary")).toBe(false);
    expect(service.end("primary")).toBe(true);
  });

  it("does not go negative when end is called more than start", () => {
    service.start("primary");
    expect(service.end("primary")).toBe(true);
    expect(service.end("primary")).toBe(true);
  });

  it("tracks counts independently per spinner name", () => {
    expect(service.start("primary")).toBe(true);
    expect(service.start("secondary")).toBe(true);
    expect(service.end("primary")).toBe(true);
    expect(service.end("secondary")).toBe(true);
  });
});
