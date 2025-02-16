import { TestBed } from "@angular/core/testing";
import { NgxSpinnerService } from "./ngx-spinner.service";
import { NgxSpinner, PRIMARY_SPINNER } from "./ngx-spinner.enum";
import { take } from "rxjs/operators";

describe("NgxSpinnerService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const service: NgxSpinnerService = TestBed.get(NgxSpinnerService);
    expect(service).toBeTruthy();
  });

  describe("NgxSpinnerService", () => {
    let service: NgxSpinnerService;

    beforeEach(() => {
      TestBed.configureTestingModule({});
      service = TestBed.inject(NgxSpinnerService);
    });

    it("should be created", () => {
      expect(service).toBeTruthy();
    });

    it("should show spinner", (done) => {
      service.show(PRIMARY_SPINNER).then(() => {
        service.getSpinner(PRIMARY_SPINNER).pipe(take(1)).subscribe((spinner) => {
          expect(spinner).toBeTruthy();
          expect(spinner.name).toBe(PRIMARY_SPINNER);
          expect(spinner.show).toBe(true);
          done();
        });
      });
    });

    it("should hide spinner", (done) => {
      service.show(PRIMARY_SPINNER).then(() => {
        service.hide(PRIMARY_SPINNER).then(() => {
          service.getSpinner(PRIMARY_SPINNER).pipe(take(1)).subscribe((spinner) => {
            expect(spinner).toBeTruthy();
            expect(spinner.name).toBe(PRIMARY_SPINNER);
            expect(spinner.show).toBe(false);
            done();
          });
        });
      });
    });

    it("should show spinner with custom spinner object", (done) => {
      const customSpinner = { bdColor: "rgba(0,0,0,0.8)", size: "large" } as NgxSpinner;
      service.show("customSpinner", customSpinner).then(() => {
        service.getSpinner("customSpinner").pipe(take(1)).subscribe((spinner) => {
          expect(spinner).toBeTruthy();
          expect(spinner.name).toBe("customSpinner");
          expect(spinner.show).toBe(true);
          expect(spinner.bdColor).toBe("rgba(0,0,0,0.8)");
          expect(spinner.size).toBe("large");
          done();
        });
      });
    });
  });
});
